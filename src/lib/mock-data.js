// Mock data for the application

export const currentUserId = "1"

export const mockRooms = [
  {
    id: "1",
    name: "제주도 힐링 여행",
    destination: "제주도",
    startDate: "2025-12-01",
    endDate: "2025-12-05",
    coverImage: null,
    status: "planned",
    memberCount: 4,
    opinionDeadline: "2025-11-25",
    hostId: "1", // Added hostId field
    members: [
      { id: "1", name: "김철수", hasOpinion: true },
      { id: "2", name: "이영희", hasOpinion: true },
      { id: "3", name: "박민수", hasOpinion: false },
      { id: "4", name: "정수진", hasOpinion: true },
    ],
  },
  {
    id: "2",
    name: "부산 맛집 투어",
    destination: "부산",
    startDate: "2025-11-15",
    endDate: "2025-11-17",
    coverImage: null,
    status: "planned",
    memberCount: 3,
    opinionDeadline: "2025-11-10",
    hostId: "5", // Added hostId field (not current user)
    members: [
      { id: "1", name: "김철수", hasOpinion: true },
      { id: "5", name: "최지훈", hasOpinion: false },
      { id: "6", name: "강민지", hasOpinion: true },
    ],
  },
  {
    id: "3",
    name: "강릉 바다 여행",
    destination: "강릉",
    startDate: "2025-08-10",
    endDate: "2025-08-12",
    coverImage: null,
    status: "completed",
    memberCount: 5,
    hostId: "1", // Added hostId field
    members: [
      { id: "1", name: "김철수", hasOpinion: true },
      { id: "2", name: "이영희", hasOpinion: true },
      { id: "7", name: "윤서연", hasOpinion: true },
      { id: "8", name: "한동욱", hasOpinion: true },
      { id: "9", name: "임하늘", hasOpinion: true },
    ],
  },
]

export const mockOpinions = {
  1: [
    {
      userId: "1",
      userName: "김철수",
      preferences: "여유로운 일정을 선호합니다. 자연 경관을 즐기고 싶어요.",
      keywords: ["휴식", "자연", "여유"],
    },
    {
      userId: "2",
      userName: "이영희",
      preferences: "맛집 탐방과 쇼핑을 좋아합니다.",
      keywords: ["맛집", "쇼핑", "관광지"],
    },
    {
      userId: "4",
      userName: "정수진",
      preferences: "액티비티를 즐기고 싶습니다. 특히 수상 스포츠!",
      keywords: ["액티비티", "스포츠", "모험"],
    },
  ],
  3: [
    {
      userId: "1",
      userName: "김철수",
      preferences: "바다를 보며 여유롭게 쉬고 싶습니다. 해산물도 많이 먹고 싶어요.",
      keywords: ["휴식", "바다", "맛집"],
    },
    {
      userId: "2",
      userName: "이영희",
      preferences: "해변 산책과 카페 투어를 즐기고 싶습니다.",
      keywords: ["산책", "카페", "여유"],
    },
    {
      userId: "7",
      userName: "윤서연",
      preferences: "일출을 보고 싶고, 사진 찍기 좋은 곳을 가고 싶어요.",
      keywords: ["일출", "사진", "관광지"],
    },
    {
      userId: "8",
      userName: "한동욱",
      preferences: "해변 액티비티와 수상 스포츠를 즐기고 싶습니다.",
      keywords: ["액티비티", "스포츠", "바다"],
    },
    {
      userId: "9",
      userName: "임하늘",
      preferences: "현지 맛집 탐방과 야경을 보고 싶어요.",
      keywords: ["맛집", "야경", "관광지"],
    },
  ],
}

export const mockTripPlans = {
  1: [
    {
      id: "plan-1",
      name: "Plan A: 자연과 휴식 중심",
      description:
        "자연 경관과 여유로운 일정을 중심으로 구성된 계획입니다. 맛집 탐방과 액티비티도 적절히 포함되어 있습니다.",
      votes: 2,
      schedule: [
        {
          date: "2025-12-01",
          day: 1,
          activities: [
            {
              time: "09:00",
              location: "제주공항 도착",
              transportation: "비행기",
              description: "제주공항 도착 후 렌터카 픽업",
            },
            {
              time: "11:00",
              location: "성산일출봉",
              transportation: "자동차",
              description: "유네스코 세계자연유산 탐방",
            },
            { time: "13:00", location: "해녀의 집", transportation: "도보", description: "신선한 해산물 점심 식사" },
            { time: "15:00", location: "섭지코지", transportation: "자동차", description: "아름다운 해안 산책" },
            {
              time: "18:00",
              location: "숙소 체크인",
              transportation: "자동차",
              description: "서귀포 숙소 체크인 및 휴식",
            },
          ],
        },
        {
          date: "2025-12-02",
          day: 2,
          activities: [
            {
              time: "09:00",
              location: "한라산 어리목 코스",
              transportation: "자동차",
              description: "가벼운 등산 (3시간 코스)",
            },
            { time: "13:00", location: "흑돼지 맛집", transportation: "자동차", description: "제주 흑돼지 점심" },
            { time: "15:00", location: "카멜리아힐", transportation: "자동차", description: "동백꽃 정원 산책" },
            {
              time: "17:00",
              location: "중문 해수욕장",
              transportation: "자동차",
              description: "해변 산책 및 석양 감상",
            },
          ],
        },
      ],
    },
    {
      id: "plan-2",
      name: "Plan B: 액티비티와 관광 중심",
      description: "다양한 액티비티와 주요 관광지를 중심으로 구성된 활동적인 계획입니다.",
      votes: 1,
      schedule: [
        {
          date: "2025-12-01",
          day: 1,
          activities: [
            {
              time: "09:00",
              location: "제주공항 도착",
              transportation: "비행기",
              description: "제주공항 도착 후 렌터카 픽업",
            },
            {
              time: "11:00",
              location: "제주 ATV 체험장",
              transportation: "자동차",
              description: "ATV 오프로드 체험 (2시간)",
            },
            { time: "14:00", location: "동문시장", transportation: "자동차", description: "전통시장 맛집 투어" },
            { time: "16:00", location: "용두암", transportation: "자동차", description: "제주 대표 관광지 방문" },
            { time: "18:00", location: "숙소 체크인", transportation: "자동차", description: "제주시 숙소 체크인" },
          ],
        },
        {
          date: "2025-12-02",
          day: 2,
          activities: [
            {
              time: "09:00",
              location: "서핑 체험",
              transportation: "자동차",
              description: "중문 해변 서핑 레슨 (2시간)",
            },
            { time: "12:00", location: "해산물 뷔페", transportation: "자동차", description: "점심 식사" },
            { time: "14:00", location: "천지연 폭포", transportation: "자동차", description: "폭포 관광" },
            { time: "16:00", location: "이중섭 거리", transportation: "도보", description: "쇼핑 및 카페 투어" },
          ],
        },
      ],
    },
  ],
}

export const mockConfirmedPlan = {
  1: {
    planId: "plan-1",
    name: "Plan A: 자연과 휴식 중심",
    description: "자연 경관과 여유로운 일정을 중심으로 구성된 계획입니다.",
    schedule: [
      {
        date: "2025-12-01",
        day: 1,
        activities: [
          {
            time: "09:00",
            location: "제주공항 도착",
            transportation: "비행기",
            description: "제주공항 도착 후 렌터카 픽업",
          },
          {
            time: "11:00",
            location: "성산일출봉",
            transportation: "자동차",
            description: "유네스코 세계자연유산 탐방",
          },
          { time: "13:00", location: "해녀의 집", transportation: "도보", description: "신선한 해산물 점심 식사" },
          { time: "15:00", location: "섭지코지", transportation: "자동차", description: "아름다운 해안 산책" },
          {
            time: "18:00",
            location: "숙소 체크인",
            transportation: "자동차",
            description: "서귀포 숙소 체크인 및 휴식",
          },
        ],
      },
      {
        date: "2025-12-02",
        day: 2,
        activities: [
          {
            time: "09:00",
            location: "한라산 어리목 코스",
            transportation: "자동차",
            description: "가벼운 등산 (3시간 코스)",
          },
          { time: "13:00", location: "흑돼지 맛집", transportation: "자동차", description: "제주 흑돼지 점심" },
          { time: "15:00", location: "카멜리아힐", transportation: "자동차", description: "동백꽃 정원 산책" },
          { time: "17:00", location: "중문 해수욕장", transportation: "자동차", description: "해변 산책 및 석양 감상" },
        ],
      },
    ],
  },
}
