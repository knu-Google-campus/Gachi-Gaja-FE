# 같이가자 (Gachi-Gaja)

여행 계획을 모두와 함께 만드는 협력적 여행 플래닝 서비스

## 배포주소
[gachi-gaja](https://gachi-gaja.vercel.app/)

## 주요 기능

- **의견 수집**: 여행 멤버들의 스타일, 숙소 기준, 식습관 등을 한 곳에 모으기
- **자동 일정 생성**: AI가 의견을 종합해 여행 후보 일정 생성
- **투표 시스템**: 생성된 후보 중 가장 선호하는 일정을 투표로 결정
- **일정 관리**: 최종 확정된 여행 일정을 한눈에 확인 및 편집

## 기술 스택

- **프론트엔드**: React, React Router, Vite
- **UI**: shadcn/ui, Tailwind CSS, Lucide Icons
- **상태관리**: React Hooks
- **API 통신**: Axios
- **알림**: React Toastify
- **배포**: Vercel

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

## 프로젝트 구조

```
src/
├── pages/          # 페이지 컴포넌트
├── components/     # UI 컴포넌트
├── api/            # API 호출 함수
├── lib/            # 유틸리티 함수
└── router/         # 라우팅 설정
```

## 주요 페이지

- `/` - 로그인/회원가입
- `/rooms` - 여행 방 목록
- `/rooms/[id]` - 여행 상세 페이지 (의견 수집)
- `/rooms/[id]/plans` - 투표 페이지
- `/rooms/[id]/confirmed` - 최종 일정 확인
- `/rooms/create` - 새로운 여행 방 생성





