# 랭디 프론트엔드 사전 과제

이 저장소는 Next.js(App Router)로 유튜브 채널의 Videos 탭 화면을 모사하여 구현한 과제입니다. 레이아웃 분리, Route Handler 기반 API(mock), 정렬/무한스크롤 등의 핵심 기능 구현에 집중했습니다.

## 실행 방법

사전 준비:

- Node.js 20 이상 권장 (Next.js 15 기준)
- npm 사용 (repo에 `package-lock.json` 포함)

설치 및 실행:

```bash
# 개발 서버 실행 (Turbopack)
npm run dev
# http://localhost:3000 접속
```

메인 접근 경로:

- 기본 경로(`/`)는 `useRouter`로 `'/videos'`로 리다이렉트됩니다.

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

## 기타 구현

- 채널 정보 더보기(모달)
- 스크롤 시 헤더/탭메뉴 플로팅

## API (Route Handler, Mock)

- 요청 시 로컬에 작성된 JSON 파일을 전달

### GET /api/channel

- 응답: 채널 배너/프로필/구독자 수 등 기본 정보
- 예시 응답 형태:

```json
{
  "data": {
    "id": "UC12345ABCDEFG",
    "name": "알려줘 랭짱",
    "handle": "@알려줘랭짱",
    "avatarUrl": "https://yt3.googleusercontent.com/dIreTM7Mznzzw9VbeMgQLD86K19Kju0sNaWk8av5id9EbUauIpvRsTycYTEj6PxI1jMY3dkTXw=s160-c-k-c0x00ffffff-no-rj",
    "bannerUrl": "https://yt3.googleusercontent.com/HZsoj65NcT2vtkb6AFAC_WQOg3m3B3ZdCQUisO4a9fQGnRkXIKBlJArUGTPR4dwGYfmiqSYf=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
    "stats": {
      "subscribers": 87272,
      "videos": 74,
      "views": 3475968,
      "description": "랭디(Langdy) 일본어 오리지널 콘텐츠\n\n\"일본인은 애니처럼 말하지 않는다\"\n'알려줘 랭짱(Lang Chan)'는 외국어교육 전문 브랜드 [랭디(Langdy)]에서 운영하는 일본어 오리지널 콘텐츠 채널입니다.\n\n현실감 없는 애니 속 일본어 말고! 지금 이 순간 일본인이 쓰고 있는 일본어회화를 애니처럼 재밌게 알려드립니다."
    },
    "joinDate": "2024-10-08",
    "country": "대한민국",
    "links": [
      {
        "name": "랭디 공식 웹사이트",
        "url": "https://www.langdy.net"
      },
      {
        "name": "Instagram",
        "url": "https://www.instagram.com/rangzzang"
      }
    ]
  }
}
```

### GET /api/videos

- 응답: 동영상 리스트 배열
- 현재 쿼리 파라미터는 사용하지 않으며, 정렬/페이지네이션은 프론트에서 처리합니다.
- 예시 응답 형태:

```json
{
  "data": [
    {
      "id": "mNoPqRsT4uV",
      "title": "주고받기 표현 (あげる, くれる, もらう) 심화편",
      "thumbnail": "https://i.ytimg.com/vi/nzE0GBnG0k8/hqdefault.jpg",
      "channelTitle": "알려줘 랭짱",
      "viewCount": "177,665",
      "publishedAt": "2025-09-22T09:00:00Z",
      "duration": "14:10"
    }
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

- 헤더/사이드바는 동작하지 않아도 되는 요구사항에 맞춰 UI 중심으로 구현했습니다.
- Videos 외 탭(`featured`, `shorts`, `playlists`, `posts`)은 확인용으로 만들어진 페이지 입니다.
