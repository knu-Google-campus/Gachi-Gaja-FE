import { useState} from "react"
import styled from "styled-components"
import Button from "../components/common/Button"
import ProfileImage from "../components/common/ProfileImage"
import Card from "../components/layout/Card"
import { FaEdit, FaUserPlus, FaList, FaPencilAlt, FaMagic } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

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
  margin-bottom: 40px;
  
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

const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f9fafb;
    border-color: #d1d5db;
  }
`

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 24px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`

const OpinionsSection = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 24px;
`

const OpinionCard = styled.div`
  display: flex;
  gap: 16px;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 12px;
  margin-bottom: 16px;
  position: relative;
  transition: all 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

const OpinionContent = styled.div`
  flex: 1;
`

const OpinionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`

const OpinionAuthor = styled.div`
  font-weight: 600;
  color: #1f2937;
  font-size: 1rem;
`

const HostBadge = styled.span`
  background-color: #3b82f6;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
`

const OpinionText = styled.p`
  color: #4b5563;
  line-height: 1.6;
  font-size: 0.95rem;
`

const EditIcon = styled(FaPencilAlt)`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #9ca3af;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #6b7280;
  }
`

const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const DaysLeft = styled.div`
  text-align: center;
  color: #9ca3af;
  font-size: 0.85rem;
  margin-top: 12px;
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const InviteLink = styled.div`
  background-color: #f3f4f6;
  padding: 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #6b7280;
  word-break: break-all;
  font-family: monospace;
`

export default function TripRoomPage() {
  const [opinions] = useState([
    {
      id: 1,
      author: "Sarah",
      isHost: true,
      text: "첨성대를 방문하고 싶다.",
    },
    {
      id: 2,
      author: "Emily",
      isHost: false,
      text: "산책 코스 있으면 좋겠음.",
    },
    {
      id: 3,
      author: "Jessica",
      isHost: false,
      text: "월정교를 방문하고 싶은데 꼭 밤에 가서 야경으로 보고 싶음.",
    },
    {
      id: 4,
      author: "Olivia",
      isHost: false,
      text: "불국사는 이전 여행에서 가봤으니 코스에서 빼고싶음.",
    },
  ])

  const inviteLink = "https://voyage.ai/invite/aBcDeFg"
  const navigate = useNavigate()
  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink)
    alert("초대 링크가 복사되었습니다!")
  }

  const handleEditBasicPlan = () => {
    // Navigate to create-trip page
    window.location.href = "/create-trip"
  }

  const handleGenerateTrip = () => {
    navigate("/vote/1")
  }

  const handleGoToRooms = () => {
    window.location.href = "/travel-rooms"
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <TitleSection>
          <Title>경주 여행</Title>
          <Button variant="secondary" onClick={handleEditBasicPlan}>
            <FaEdit />
            여행 기본정보 수정하기
          </Button>
        </TitleSection>

        <MainContent>
          <OpinionsSection>
            <SectionTitle>수집된 의견</SectionTitle>
            {opinions.map((opinion) => (
              <OpinionCard key={opinion.id}>
                <ProfileImage src={opinion.avatar} size="medium" />
                <OpinionContent>
                  <OpinionHeader>
                    <OpinionAuthor>{opinion.author}의 의견</OpinionAuthor>
                    {opinion.isHost && <HostBadge>Host</HostBadge>}
                  </OpinionHeader>
                  <OpinionText>{opinion.text}</OpinionText>
                </OpinionContent>
                <EditIcon />
              </OpinionCard>
            ))}
          </OpinionsSection>

          <SidePanel>
            <Card title="친구 초대">
              <InviteLink>{inviteLink}</InviteLink>
              <Button variant="primary" size="full" onClick={handleCopyLink}>
                <FaUserPlus />
                 링크로 초대하기
              </Button>
            </Card>

            <Card title="여행 생성 준비 완료!" content="모두의 의견이 모였습니다. 이제 여행을 생성해보세요!">
              <Button variant="success" size="full" onClick={handleGenerateTrip}>
                <FaMagic />
                 여행 생성하기
              </Button>
              <DaysLeft>3일 남음</DaysLeft>
            </Card>
          </SidePanel>
        </MainContent>
      </ContentWrapper>
    </PageContainer>
  )
}
