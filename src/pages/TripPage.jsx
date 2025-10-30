import { useState } from "react"
import styled from "styled-components"
import ProfileImage from "../components/common/ProfileImage"
import Button from "../components/common/Button"
import Card from "../components/layout/Card"
import { FaEdit, FaUserPlus, FaChevronDown } from "react-icons/fa"

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
`

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`

const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1f2937;
`

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 1rem;
  margin-bottom: 40px;
`

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 24px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`

const PlanSection = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 8px;
`

const SectionSubtitle = styled.p`
  color: #6b7280;
  font-size: 0.95rem;
  margin-bottom: 32px;
`

const DaySection = styled.div`
  margin-bottom: 40px;

  &:last-child {
    margin-bottom: 0;
  }
`

const DayTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #2563eb;
  margin-bottom: 20px;
`

const ActivityItem = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  padding-left: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`

const ActivityNumber = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #2563eb;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.95rem;
  flex-shrink: 0;
`

const ActivityContent = styled.div`
  flex: 1;
`

const ActivityTitle = styled.h4`
  font-size: 1.05rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 6px;
`

const ActivityDescription = styled.p`
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.6;
`

const ExpandButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  color: #6b7280;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
  transition: all 0.2s;

  &:hover {
    background-color: #f3f4f6;
    border-color: #d1d5db;
  }
`

const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const InviteLink = styled.div`
  background-color: #f3f4f6;
  padding: 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #6b7280;
  word-break: break-all;
  font-family: monospace;
  margin-bottom: 12px;
`

const ParticipantsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const ParticipantItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const ParticipantInfo = styled.div`
  flex: 1;
`

const ParticipantName = styled.div`
  font-weight: 600;
  color: #1f2937;
  font-size: 0.95rem;
`

const HostBadge = styled.span`
  background-color: #3b82f6;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 6px;
`

export default function TripPlanPage({ params }) {
  const [expanded, setExpanded] = useState(false)

  const inviteLink = "https://voyage.ai/trip/aBcDeFg"

  const participants = [
    { id: 1, name: "김민수", isHost: true, avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "이지은", isHost: false, avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "박서준", isHost: false, avatar: "/placeholder.svg?height=40&width=40" },
    { id: 4, name: "최유진", isHost: false, avatar: "/placeholder.svg?height=40&width=40" },
  ]

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink)
    alert("초대 링크가 복사되었습니다!")
  }

  const handleEditPlan = () => {
    window.location.href = `/vote/${params.id}`
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <TitleSection>
          <Title>경주 여행</Title>
          <Button variant="primary" onClick={handleEditPlan}>
            <FaEdit />
            계획 수정하기
          </Button>
        </TitleSection>

        <Subtitle>AI가 생성한 여행 일정이 준비되었습니다!</Subtitle>

        <MainContent>
          <PlanSection>
            <SectionTitle>AI 생성 여행 계획</SectionTitle>
            <SectionSubtitle>모두의 의견을 바탕으로 제안된 계획입니다.</SectionSubtitle>

            <DaySection>
              <DayTitle>1일차: 도착 & 역사 탐방</DayTitle>
              <ActivityItem>
                <ActivityNumber>1</ActivityNumber>
                <ActivityContent>
                  <ActivityTitle>불국사 방문</ActivityTitle>
                  <ActivityDescription>
                    오전: 유네스코 세계문화유산인 불국사를 방문하여 신라 시대의 찬란한 불교 문화를 체험하세요. 사전
                    예약으로 긴 대기 시간을 피할 수 있습니다.
                  </ActivityDescription>
                </ActivityContent>
              </ActivityItem>
              <ActivityItem>
                <ActivityNumber>2</ActivityNumber>
                <ActivityContent>
                  <ActivityTitle>석굴암 탐방</ActivityTitle>
                  <ActivityDescription>
                    오후: 불국사에서 가까운 석굴암을 방문하여 정교한 석조 예술을 감상하세요. 본존불의 아름다움에
                    감탄하게 될 것입니다.
                  </ActivityDescription>
                </ActivityContent>
              </ActivityItem>
              <ActivityItem>
                <ActivityNumber>3</ActivityNumber>
                <ActivityContent>
                  <ActivityTitle>황남빵 거리 저녁</ActivityTitle>
                  <ActivityDescription>
                    저녁: 경주의 명물 황남빵을 맛보고 전통 한식당에서 여유로운 저녁 식사를 즐기세요.
                  </ActivityDescription>
                </ActivityContent>
              </ActivityItem>
            </DaySection>

            <DaySection>
              <DayTitle>2일차: 문화 체험 & 야경</DayTitle>
              <ActivityItem>
                <ActivityNumber>1</ActivityNumber>
                <ActivityContent>
                  <ActivityTitle>첨성대 방문</ActivityTitle>
                  <ActivityDescription>
                    오전: 동양에서 가장 오래된 천문대인 첨성대를 방문하여 신라의 과학 기술을 엿보세요.
                  </ActivityDescription>
                </ActivityContent>
              </ActivityItem>
              <ActivityItem>
                <ActivityNumber>2</ActivityNumber>
                <ActivityContent>
                  <ActivityTitle>대릉원 탐방</ActivityTitle>
                  <ActivityDescription>
                    오후: 신라 왕릉이 모여있는 대릉원을 산책하며 고대 역사의 흔적을 느껴보세요. 천마총 내부도 관람할 수
                    있습니다.
                  </ActivityDescription>
                </ActivityContent>
              </ActivityItem>
            </DaySection>

            {expanded && (
              <DaySection>
                <DayTitle>3일차: 출발</DayTitle>
                <ActivityItem>
                  <ActivityNumber>1</ActivityNumber>
                  <ActivityContent>
                    <ActivityTitle>동궁과 월지 아침 산책</ActivityTitle>
                    <ActivityDescription>
                      오전: 출발 전 동궁과 월지를 산책하며 경주에서의 마지막 시간을 보내세요.
                    </ActivityDescription>
                  </ActivityContent>
                </ActivityItem>
                <ActivityItem>
                  <ActivityNumber>2</ActivityNumber>
                  <ActivityContent>
                    <ActivityTitle>김해국제공항 출발</ActivityTitle>
                    <ActivityDescription>
                      오후: 공항으로 이동하여 즐거웠던 경주 여행을 마무리합니다.
                    </ActivityDescription>
                  </ActivityContent>
                </ActivityItem>
              </DaySection>
            )}

            <ExpandButton onClick={() => setExpanded(!expanded)}>
              <FaChevronDown
                style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
              />
              {expanded ? "계획 접기" : "전체 계획 보기"}
            </ExpandButton>
          </PlanSection>

          <SidePanel>
            <Card title="친구 초대">
              <InviteLink>{inviteLink}</InviteLink>
              <Button variant="primary" size="full" onClick={handleCopyLink}>
                <FaUserPlus />
                링크로 초대하기
              </Button>
            </Card>

            <Card title="여행 참가자">
              <ParticipantsList>
                {participants.map((participant) => (
                  <ParticipantItem key={participant.id}>
                    <ProfileImage src={participant.avatar} size="small" />
                    <ParticipantInfo>
                      <ParticipantName>
                        {participant.name}
                        {participant.isHost && <HostBadge>Host</HostBadge>}
                      </ParticipantName>
                    </ParticipantInfo>
                  </ParticipantItem>
                ))}
              </ParticipantsList>
            </Card>
          </SidePanel>
        </MainContent>
      </ContentWrapper>
    </PageContainer>
  )
}
