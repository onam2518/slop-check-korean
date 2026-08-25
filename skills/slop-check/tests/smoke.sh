#!/usr/bin/env bash
# Smoke test: slop fixtures should score high, the clean fixture should score low.
set -euo pipefail
dir="$(cd "$(dirname "$0")" && pwd)"
lint="$dir/../bin/sloplint.js"
fx="$dir/fixtures"
fail=0
check() { # file min max
  s=$(node "$lint" score "$fx/$1" | sed -n 's/^score: \([0-9]*\).*/\1/p')
  if [ "$s" -lt "$2" ] || [ "$s" -gt "$3" ]; then
    echo "FAIL $1: score $s not in [$2,$3]"; fail=1
  else echo "ok   $1: score $s in [$2,$3]"; fi
}
check slop-en.md   50 100
check slop-ko.md   50 100
check clean-en.md   0  20
check human-ko.txt   0  30   # natural human Korean must not read as slop

# fix must not touch fenced or inline code
fixed=$(node "$lint" fix "$fx/codefence.md")
if echo "$fixed" | grep -q 'rm -- some—file   # this line must stay byte-for-byte' \
   && echo "$fixed" | grep -q 'Inline `a—b` code stays too' \
   && echo "$fixed" | grep -q 'em, dash that should become a comma'; then
  echo "ok   codefence.md: code preserved, prose dash fixed"
else
  echo "FAIL codefence.md: fix altered protected code or missed prose"; fail=1
fi

exit $fail
