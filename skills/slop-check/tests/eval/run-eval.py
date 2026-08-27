#!/usr/bin/env python3
"""slop-check eval: recall on a committed AI-slop set, and (optional) false-positive
rate on human corpora. Usage:
  python3 run-eval.py                          # recall only (uses slop-samples-*.md)
  python3 run-eval.py --human <dir-or-file>... # add FP check on human text
Human input: NIKL JSON (document[].paragraph[].form), a .txt, or a dir/zip of them.
Recall target: slop samples score high (>=50). FP target: human text scores low (<25)."""
import subprocess, sys, os, re, json, glob, io, zipfile, statistics
HERE=os.path.dirname(os.path.abspath(__file__)); LINT=os.path.join(HERE,'..','..','bin','sloplint.js')
def score(t):
    o=subprocess.run(["node",LINT,"score"],input=t,text=True,capture_output=True).stdout
    m=re.search(r'score:\s*(\d+)',o); return int(m.group(1)) if m else None
def slop_samples():
    for f in glob.glob(os.path.join(HERE,'slop-samples-*.md')):
        for chunk in open(f,encoding='utf-8').read().split('\n===\n'):
            if chunk.strip(): yield f, chunk.strip()
def human_chunks(path):
    if os.path.isdir(path):
        for f in glob.glob(os.path.join(path,'**','*.json'),recursive=True): yield from human_chunks(f)
    elif path.endswith('.zip'):
        zf=zipfile.ZipFile(path)
        for n in [x for x in zf.namelist() if x.endswith('.json')][::37][:60]:
            yield from _paras(json.load(io.TextIOWrapper(zf.open(n),encoding='utf-8')))
    elif path.endswith('.json'):
        try: yield from _paras(json.load(open(path,encoding='utf-8')))
        except: pass
    elif path.endswith('.txt'):
        t=open(path,encoding='utf-8').read()
        for c in re.split(r'\n\s*\n',t):
            if len(c.strip())>60: yield c.strip()
def _paras(d):
    docs=d.get('document',[]) if isinstance(d,dict) else []
    for doc in docs[:400]:
        ps=[p.get('form','') for p in doc.get('paragraph',[]) if p.get('form')]
        for i in range(0,min(len(ps),40),8):
            c=' '.join(ps[i:i+4])
            if len(c)>60: yield c
def report(label,scores,slop):
    s=[x for x in scores if x is not None]; 
    if not s: return print(f'{label}: no samples'); 
    hi=sum(1 for x in s if x>=50); mid=sum(1 for x in s if x>=25)
    if slop: print(f'RECALL {label}: n={len(s)} mean {statistics.mean(s):.0f} | flagged>=50 {hi}/{len(s)} ({100*hi/len(s):.0f}%)')
    else: print(f'FP {label}: n={len(s)} mean {statistics.mean(s):.1f} | >=50 {hi} ({100*hi/len(s):.0f}%)  >=25 {mid} ({100*mid/len(s):.0f}%)')
if __name__=='__main__':
    args=sys.argv[1:]; humans=[]
    if '--human' in args: i=args.index('--human'); humans=args[i+1:]
    print('== slop-check eval ==')
    report('AI-slop', [score(t) for _,t in slop_samples()], slop=True)
    for h in humans:
        chunks=list(human_chunks(h))[:200]
        report(f'human:{os.path.basename(h)}', [score(c) for c in chunks], slop=False)
