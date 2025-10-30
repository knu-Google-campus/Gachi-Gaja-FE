import { useState, useEffect } from "react"
import styled from "styled-components"
import ProfileImage from "../components/common/ProfileImage"
import Button from "../components/common/Button"
import Card from "../components/layout/Card"
import ItineraryItem from "../components/general/ItineraryItem"
import LoadingAnimation from "../components/general/LoadingAnimation"
import { FaSync, FaThumbsUp, FaInfoCircle } from "react-icons/fa"
import Inner from "../components/layout/Inner"

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 40px 0;
`

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
`

const TitleSection = styled.div`
  margin-bottom: 32px;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 8px;
`

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 1rem;
`

const TabsWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  border-bottom: 2px solid #e5e7eb;
`

const Tab = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  background: none;
  cursor: pointer;
  color: ${(props) => (props.$active ? "#2563eb" : "#6b7280")};
  border-bottom: 3px solid ${(props) => (props.$active ? "#2563eb" : "transparent")};
  margin-bottom: -2px;
  transition: all 0.2s;

  &:hover {
    color: #2563eb;
  }
`

const DaySection = styled.div`
  margin-bottom: 32px;
`

const DayTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 24px;
`

const VoteButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
`

const ReasoningSection = styled.div`
  margin: 40px 0;
`

const InfoBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  margin: 24px 0;
  color: #1e40af;
`

const InfoIcon = styled.div`
  font-size: 1.25rem;
  flex-shrink: 0;
  margin-top: 2px;
`

const BottomActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 48px;
  padding-top: 24px;
  border-top: 2px solid #e5e7eb;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`

const DaysLeft = styled.div`
  color: #6b7280;
  font-size: 0.95rem;
`

export default function VotePage({ params }) {
  const [loading, setLoading] = useState(true)
  const [activeChoice, setActiveChoice] = useState(1)
  const [votedChoice, setVotedChoice] = useState(null) // null, 1, 또는 2

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleVote = () => {
    if (votedChoice === activeChoice) {
      setVotedChoice(null)
      alert(`선택 ${activeChoice} 투표를 취소했습니다.`)
    } else {
      setVotedChoice(activeChoice)
      alert(`선택 ${activeChoice}에 투표했습니다!`)
    }
  }

  const handleRegenerate = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert("새로운 계획이 생성되었습니다!")
    }, 3000)
  }

  const handleConfirm = () => {
    alert("최종 계획이 확정되었습니다!")
  }

  const itineraries = {
    1: {
      day1: {
        title: "1일차: 도착 & 역사 탐방",
        items: [
          { icon: "plane", time: "10:00 AM", title: "김해국제공항 도착" },
          {
            icon: "bed",
            time: "12:30 PM",
            title: "경주 힐튼 호텔 체크인",
            detail: "김해공항에서 버스, 약 1시간 30분",
            transportType: "bus",
          },
          {
            icon: "landmark",
            time: "2:30 PM",
            title: "불국사 방문",
            detail: "호텔에서 택시, 약 20분",
            transportType: "taxi",
          },
          {
            icon: "camera",
            time: "4:30 PM",
            title: "석굴암 탐방",
            detail: "불국사에서 버스, 약 15분",
            transportType: "bus",
          },
          {
            icon: "utensils",
            time: "7:00 PM",
            title: "황남빵 거리에서 저녁 식사",
            detail: "호텔에서 도보 10분",
            transportType: "walking",
          },
        ],
      },
      day2: {
        title: "2일차: 문화 체험",
        items: [
          {
            icon: "landmark",
            time: "9:00 AM",
            title: "첨성대 방문",
            detail: "호텔에서 택시, 약 10분",
            transportType: "taxi",
          },
          {
            icon: "landmark",
            time: "10:30 AM",
            title: "대릉원(천마총) 탐방",
            detail: "첨성대에서 도보 5분",
            transportType: "walking",
          },
          {
            icon: "coffee",
            time: "12:00 PM",
            title: "한옥 카페에서 점심",
            detail: "대릉원에서 도보 3분",
            transportType: "walking",
          },
          {
            icon: "camera",
            time: "2:00 PM",
            title: "동궁과 월지(안압지) 관람",
            detail: "카페에서 택시, 약 10분",
            transportType: "taxi",
          },
          {
            icon: "utensils",
            time: "6:00 PM",
            title: "경주 한정식 저녁",
            detail: "월지에서 택시, 약 15분",
            transportType: "taxi",
          },
        ],
      },
      day3: {
        title: "3일차: 출발",
        items: [
          {
            icon: "plane",
            time: "2:00 PM",
            title: "김해국제공항에서 출발",
            detail: "호텔에서 버스, 약 1시간 30분",
            transportType: "bus",
          },
        ],
      },
      reasoning:
        "이 일정은 경주의 유네스코 세계문화유산과 전통 문화를 균형있게 체험할 수 있도록 구성했습니다. 그룹의 역사적 장소와 한국 전통 문화에 대한 선호도에 맞춰 불국사, 석굴암, 첨성대를 필수 코스로 선정했습니다. 동궁과 월지는 야경이 아름다워 저녁 시간대에 방문하도록 계획했으며, 황남빵과 경주 한정식으로 지역 음식도 경험할 수 있습니다. 일정은 각 장소에서 충분한 관람 시간을 제공하여 여유롭고 의미있는 경험을 보장합니다.",
    },
    2: {
      day1: {
        title: "1일차: 도착 & 자연 탐방",
        items: [
          { icon: "plane", time: "10:00 AM", title: "김해국제공항 도착" },
          {
            icon: "bed",
            time: "12:30 PM",
            title: "경주 코오롱 호텔 체크인",
            detail: "김해공항에서 버스, 약 1시간 30분",
            transportType: "bus",
          },
          {
            icon: "camera",
            time: "2:30 PM",
            title: "보문호 산책",
            detail: "호텔에서 도보 5분",
            transportType: "walking",
          },
          {
            icon: "landmark",
            time: "4:00 PM",
            title: "경주월드 방문",
            detail: "보문호에서 도보 10분",
            transportType: "walking",
          },
          {
            icon: "utensils",
            time: "7:00 PM",
            title: "보문단지 맛집에서 저녁",
            detail: "경주월드에서 도보 15분",
            transportType: "walking",
          },
        ],
      },
      day2: {
        title: "2일차: 역사 & 문화",
        items: [
          {
            icon: "landmark",
            time: "9:00 AM",
            title: "국립경주박물관 관람",
            detail: "호텔에서 택시, 약 15분",
            transportType: "taxi",
          },
          {
            icon: "landmark",
            time: "11:30 AM",
            title: "동궁과 월지 방문",
            detail: "박물관에서 도보 10분",
            transportType: "walking",
          },
          {
            icon: "coffee",
            time: "1:00 PM",
            title: "교촌마을 전통 찻집에서 점심",
            detail: "월지에서 택시, 약 10분",
            transportType: "taxi",
          },
          {
            icon: "camera",
            time: "3:00 PM",
            title: "양동마을 한옥 체험",
            detail: "교촌마을에서 택시, 약 20분",
            transportType: "taxi",
          },
          {
            icon: "utensils",
            time: "6:30 PM",
            title: "경주 쌈밥 저녁",
            detail: "양동마을에서 택시, 약 25분",
            transportType: "taxi",
          },
        ],
      },
      day3: {
        title: "3일차: 출발",
        items: [
          {
            icon: "plane",
            time: "2:00 PM",
            title: "김해국제공항에서 출발",
            detail: "호텔에서 버스, 약 1시간 30분",
            transportType: "bus",
          },
        ],
      },
      reasoning:
        "이 일정은 경주의 자연과 문화를 조화롭게 경험할 수 있도록 구성했습니다. 보문호와 경주월드로 시작하여 여유로운 첫날을 보낸 후, 국립경주박물관과 양동마을에서 깊이 있는 역사 체험을 할 수 있습니다. 그룹의 자연 경관과 전통 한옥 체험 선호도를 반영하여 보문단지와 양동마을을 포함했으며, 경주 쌈밥과 전통 찻집으로 지역 음식 문화도 경험할 수 있습니다. 각 일정 간 이동 시간을 최소화하여 편안한 여행이 되도록 계획했습니다.",
    },
  }

  const currentItinerary = itineraries[activeChoice]

  if (loading) {
    return (
      <PageWrapper>
        <LoadingAnimation />
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <Inner>
        <TitleSection>
          <Title>경주 여행</Title>
          <Subtitle>그룹의 선호도를 바탕으로 AI가 생성한 여행 일정 옵션입니다.</Subtitle>
        </TitleSection>

        <TabsWrapper>
          <Tab $active={activeChoice === 1} onClick={() => setActiveChoice(1)}>
            선택 1
          </Tab>
          <Tab $active={activeChoice === 2} onClick={() => setActiveChoice(2)}>
            선택 2
          </Tab>
        </TabsWrapper>

        <DaySection>
          <DayTitle>{currentItinerary.day1.title}</DayTitle>
          {currentItinerary.day1.items.map((item, index) => (
            <ItineraryItem key={index} {...item} />
          ))}
        </DaySection>

        <DaySection>
          <DayTitle>{currentItinerary.day2.title}</DayTitle>
          {currentItinerary.day2.items.map((item, index) => (
            <ItineraryItem key={index} {...item} />
          ))}
        </DaySection>

        <DaySection>
          <DayTitle>{currentItinerary.day3.title}</DayTitle>
          {currentItinerary.day3.items.map((item, index) => (
            <ItineraryItem key={index} {...item} />
          ))}
        </DaySection>

        <VoteButtonWrapper>
          <Button variant={votedChoice === activeChoice ? "secondary" : "primary"} onClick={handleVote}>
            <FaThumbsUp />
            {votedChoice === activeChoice ? "투표 취소하기" : "이 계획에 투표하기"}
          </Button>
        </VoteButtonWrapper>

        <ReasoningSection>
          <Card title="계획을 이렇게 짠 이유">
            <p style={{ color: "#374151", lineHeight: "1.8" }}>{currentItinerary.reasoning}</p>
          </Card>
        </ReasoningSection>

        <InfoBox>
          <InfoIcon>
            <FaInfoCircle />
          </InfoIcon>
          <div>계획 확정 후에 세부 수정이 가능합니다.</div>
        </InfoBox>

        <BottomActions>
          <Button variant="secondary" onClick={handleRegenerate}>
            <FaSync />
            다시 생성하기
          </Button>
          <RightActions>
            <DaysLeft>2일 남음</DaysLeft>
            <Button variant="primary" onClick={handleConfirm}>
              최종 계획 확정
            </Button>
          </RightActions>
        </BottomActions>
      </Inner>
    </PageWrapper>
  )
}