# 랭디 프론트엔드 사전 과제 (YouTube 채널 Videos 탭 구현)

이 저장소는 Next.js(App Router)로 유튜브 채널의 Videos 탭 화면을 모사하여 구현한 과제입니다. 레이아웃 분리, Route Handler 기반 API(mock), 정렬/무한스크롤 등의 핵심 기능 구현에 집중했습니다.

## 실행 방법

사전 준비:

- Node.js 20 이상 권장 (Next.js 15 기준)
- npm 사용 (repo에 `package-lock.json` 포함)

설치 및 실행:

```bash
# 의존성 설치
npm ci

# 개발 서버 실행 (Turbopack)
npm run dev
# http://localhost:3000 접속

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 린트 체크
npm run lint
```

메인 접근 경로:

- 기본 경로(`/`)는 `useRouter`로 `'/videos'`로 리다이렉트됩니다.

## 스크립트

- `dev`: 개발 서버 실행(Next + Turbopack)
- `build`: 프로덕션 빌드(Next + Turbopack)
- `start`: 프로덕션 서버 실행
- `lint`: ESLint 실행

## 폴더 구조

```text
/ (프로젝트 루트)
  ├─ src/
  │  ├─ app/
  │  │  ├─ api/
  │  │  │  ├─ channel/route.ts        # 채널 정보 mock API (GET)
  │  │  │  └─ videos/route.ts         # 동영상 목록 mock API (GET)
  │  │  ├─ featured/page.tsx          # 홈 탭 (스켈레톤 페이지)
  │  │  ├─ videos/page.tsx            # Videos 탭 (핵심 구현)
  │  │  ├─ shorts/page.tsx            # Shorts 탭 (스켈레톤 페이지)
  │  │  ├─ playlists/page.tsx         # 재생목록 탭 (스켈레톤 페이지)
  │  │  ├─ posts/page.tsx             # 게시물 탭 (스켈레톤 페이지)
  │  │  ├─ layout.tsx                 # 공통 레이아웃 (Header, Sidebar)
  │  │  ├─ globals.css
  │  │  ├─ layout.module.scss
  │  │  └─ home.module.scss
  │  ├─ components/
  │  │  ├─ layout/Header               # 헤더 UI
  │  │  ├─ layout/Sidebar              # 사이드바 UI
  │  │  ├─ common/Banner               # 채널 배너 영역
  │  │  ├─ common/ChannelInformation   # 채널 정보
  │  │  ├─ common/TabMenus             # 탭 메뉴(홈/동영상/Shorts/…)
  │  │  └─ page/videos                 # Videos 탭 전용 컴포넌트들
  │  │     ├─ VideoFilter              # 정렬 필터 (최신/인기/날짜)
  │  │     ├─ VideoItem                # 단일 비디오 카드
  │  │     └─ VideoList                # 목록 + 스켈레톤 + 무한스크롤
  │  ├─ hooks/
  │  │  ├─ useFetch.ts                 # 공통 데이터 요청 훅
  │  │  └─ useInfiniteScroll.ts        # 인터섹션 옵저버 기반 무한스크롤
  │  ├─ data/
  │  │  ├─ channel.json                # 채널 mock 데이터
  │  │  └─ videos.json                 # 동영상 mock 데이터
  │  ├─ types/                         # 타입 정의
  │  └─ utils/                         # 유틸 함수
  ├─ next.config.ts                    # 원격 이미지 도메인 허용 설정
  ├─ package.json                      # 스크립트/의존성
  └─ eslint.config.mjs                 # ESLint 설정
```

## 주요 기능

- 레이아웃 분리: `app/layout.tsx`에서 `Header`/`Sidebar` 공통 적용, 페이지 콘텐츠는 각 `page.tsx`에서 관리
- Videos 탭 화면 구현:
  - 상단 `Banner`, `ChannelInformation`, `TabMenus` 구성
  - `VideoList`에서 정렬(최신순/인기순/날짜순) 필터 제공
  - `useInfiniteScroll` 훅으로 인터섹션 옵저버 기반 무한 스크롤 구현
  - 로딩 중에는 `VideoSkeleton`로 스켈레톤 UI 표시
- 이미지 최적화: `next/image` 사용, `i.ytimg.com`, `yt3.googleusercontent.com` 원격 도메인 허용 설정

## API (Route Handler, Mock)

- 공통: 실제 백엔드가 없다는 가정 하에 Route Handler로 mock 데이터를 제공합니다. 응답은 `{ data: ... }` 형태를 기본으로 사용합니다.

### GET /api/channel

- 응답: 채널 배너/프로필/구독자 수 등 기본 정보
- 예시 응답 형태(요약):

```json
{
  "data": {
    /* channel.json 내용 */
  }
}
```

### GET /api/videos

- 응답: 동영상 리스트 배열
- 현재 쿼리 파라미터는 사용하지 않으며, 정렬/페이지네이션은 프론트에서 처리합니다.
- 예시 응답 형태(요약):

```json
{
  "data": [
    /* videos.json 배열 */
  ]
}
```

## 아키텍처/구현 상세

- 데이터 요청: `useFetch<T>(url)` 훅으로 공통화 (AbortController 적용)
- 무한스크롤: `useInfiniteScroll(items)`에서 `IntersectionObserver`로 추가 아이템 로드
- 타입: `types/`에 `VideoData`, `ChannelData` 등 명세화
- 스타일: SCSS 모듈 기반 컴포넌트 단위 스타일링
- 라우팅: App Router(`app/`) 구조, 각 탭은 개별 `page.tsx`

## 개발/디자인 가정

- 탭/헤더/사이드바는 동작하지 않아도 되는 요구사항에 맞춰 UI 중심으로 구현했습니다.
- Videos 외 탭(`featured`, `shorts`, `playlists`, `posts`)은 레이아웃 확인용 스켈레톤 페이지입니다.
- 날짜 표시는 간단히 `toLocaleDateString()`으로 포맷합니다. (YouTube 스타일의 “n일 전”은 범위 밖)

## 빌드/배포 참고

- 이미지 도메인 허용 설정은 `next.config.ts`의 `images.remotePatterns`에서 관리합니다.
- 프로덕션 실행은 `npm run build && npm run start`로 가능합니다.

## 린트/형식

- ESLint(Next 공식 설정) 적용: `npm run lint`
- TypeScript 사용, 엄격 모드 설정은 `tsconfig.json` 참고

## 제출 안내(가이드)

- 작업 브랜치에서 커밋 정리 후, `main`으로 PR을 생성하는 형태를 권장합니다.
- PR에는 실행 방법과 구현 범위/가정사항을 간단히 요약해 주세요.
