# 표준 한국어 용어 조회 (국립국어원 오픈 API)

AI가 어색하거나 번역투인 용어를 쓰는 대신 국립국어원의 표준 용어와 정의를 조회해서 쓰기 위한 참고. 한국어 글을 작성·검수할 때, 용어 선택이 미심쩍으면 여기서 표준 용어·뜻·대역어를 확인한다.

클라이언트: `bin/korterm.js` (Node, 무의존성, `fetch` 사용).

```bash
node <skill-dir>/bin/korterm.js search "학술용어"      # 온용어 용어 검색 (KLI_API_KEY)
node <skill-dir>/bin/korterm.js define "용어"          # 우리말샘 뜻풀이 (KLI_OPENDICT_KEY)
node <skill-dir>/bin/korterm.js search "머신러닝" --json --sort ka
node <skill-dir>/bin/korterm.js search "용어" --dry-run # 요청 URL만 확인(키 불필요)
```

## 인증키 (두 서비스는 키가 별개)

- **온용어(`search`)**: https://kli.korean.go.kr → 회원 가입 → 인증키 신청 → `KLI_API_KEY`
- **우리말샘(`define`)**: https://opendict.korean.go.kr → 오픈 API → 인증키 신청 → `KLI_OPENDICT_KEY`

두 API는 등록·키가 서로 다르다. 온용어 키로 우리말샘을 호출하면 `020 Unregistered key`가 난다.

```bash
export KLI_API_KEY=...          # 온용어
export KLI_OPENDICT_KEY=...     # 우리말샘(선택)
```

키는 코드·문서에 하드코딩하지 말고 환경변수로만 전달한다. `--dry-run`은 키를 마스킹하고 네트워크 호출을 하지 않으므로 명세 점검용으로 안전하다.

> 검증 메모(2026-08-25): `search`(온용어)는 실제 호출로 확인됨 — 표준 용어·정의·대역어·용례 정상. 안내 페이지가 우리말샘 호스트를 `terms.korean.go.kr`로 적었으나 이 호스트는 DNS 해석이 안 된다. 실제 공개 호스트는 `opendict.korean.go.kr`이며 `define`은 이 호스트를 쓴다.

## 두 개의 API

### A. 온용어 용어 검색 — `search`

- URL: `https://kli.korean.go.kr/term/api/search.do` (JSON)
- 문자열 검색. 전문 분야 표준 용어·정의·대역어 중심.

요청 변수:

| 변수 | 타입 | 허용값 | 필수 | 설명 |
|------|------|--------|------|------|
| `key` | string | 16진수 32자리 | 필수 | 인증키 |
| `apiSearchWord` | string | - | 필수 | 검색어(UTF-8) |
| `start` | integer | 1~1000 | 선택 | 시작 번호(기본 1) |
| `num` | integer | 10~100 | 선택 | 출력 건수(기본 10) |
| `sort` | string | wt ka cnt new | 선택 | 정확도/가나다/인기/최신(기본 wt) |

주요 응답 필드: `word`(용어명, `^`는 공백), `category_main`/`category_sub`(분류), `origin`/`origin_cc`(원어/국가), `definition`(정의문), `translation`(대역어), `relate_word`(관련 용어), `source`/`glossary`(출처/용어집), `rate`(완비율), `use_ex`(사용 예), `kr_gvrn_lcns_ty`(공공누리 유형).

에러 코드(`returnCode`): `000` 시스템, `020` 미등록 키, `021` 사용 불가 키, `022` 일일 제한 초과, `100` 부적절한 요청.

### B. 우리말샘 사전 — `define` (별도 키 필요)

- URL: `https://opendict.korean.go.kr/api/search` (JSON: `req_type=json`)
- 표제어의 품사·범주·뜻풀이 등 사전 데이터. **온용어와 다른 키**(`KLI_OPENDICT_KEY`)가 필요하다.

요청 변수:

| 변수 | 타입 | 허용값 | 필수 | 설명 |
|------|------|--------|------|------|
| `key` | string | - | 필수 | 우리말샘 인증키 |
| `q` | string | - | 필수 | 검색어(UTF-8) |
| `req_type` | string | xml json | 선택 | 응답 형식(클라이언트는 json 요청) |
| `sort` | string | dict popular | 선택 | 정렬(클라이언트 기본 dict) |

주요 응답 경로: `channel.item[]` 안에 `word`(표제어), `pos`(품사), `origin`(원어), `sense`(의미)에 `definition`(뜻풀이), `type`(범주), `cat`(전문 분야), `link`. 같은 표제어의 여러 의미는 여러 item으로 반복되며 클라이언트가 표제어 기준으로 묶는다.

에러 코드: `0` 시스템, `20` 미등록 키, `21` 일시 중지 키, `100` 부적절한 쿼리, `102` 부적절한 검색 방식.

(참고: opendict에는 `target_code`로 단일 표제어 상세를 보는 `/api/view`도 있으나, 단어→뜻풀이 조회에는 `/api/search`가 바로 정의를 주므로 `define`은 이쪽을 쓴다.)

## 스킬에서 쓰는 법

한국어 검수(`--lang ko`)나 작성 중 용어가 의심스러울 때:

1. 용어 후보를 `search`로 조회한다. 표준 용어가 있으면 그 표기·띄어쓰기를 따른다("학술 용어", "머신러닝" 등).
2. 영어에서 옮긴 낯선 용어라면 `search`의 `translation`(대역어)이나 `origin`으로 표준 한국어 대역이 있는지 확인한다.
3. 정의가 필요하면 `define`으로 품사·뜻풀이·용례를 가져온다.
4. **조회 결과는 근거이지 자동 치환이 아니다.** 문맥에 맞는지 사람이 판단한다. API에 없다고 틀린 용어는 아니며(신조어·사내 용어), 있다고 무조건 바꾸지 않는다(글쓴이가 의도한 표기 존중 — 보존 규칙 우선).
5. 없는 뜻·용례를 지어내지 않는다. 조회가 안 되면 "표준 용어 미확인"으로 두거나 사용자에게 묻는다.

## 라이선스

용어 데이터에는 공공누리 유형이 붙는다(`kr_gvrn_lcns_ty`). 라이선스 표에 **[AI유형] 인공지능 학습 가능**(출처표시, 상업/비상업 이용·2차 저작 가능) 항목이 있으나, 유형은 결과·용어집마다 다르므로 재배포·학습 활용 전에 각 결과의 출처와 공공누리 유형을 확인한다. 조회해서 표기를 바로잡는 용도는 이용 범위 안이다.
