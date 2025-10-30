import styled from "styled-components"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import TravelCard from "../components/general/TravelCard"
import Inner from "../components/layout/Inner"
import { useHeaderConfig } from "../context/HeaderContext"
import Button from "../components/common/Button"
import ProfileImage from "../components/common/ProfileImage"

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f9fafb;
`

const MainContent = styled.main`
  padding: 40px 0;
`

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #111827;
  margin: 0 0 8px 0;
`

const PageSubtitle = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0 0 48px 0;
`

const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`

const TitleContent = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    width: 100%;
    
    button {
      flex: 1;
      font-size: 0.9rem;
      padding: 10px 16px;
    }
  }
`

const Section = styled.section`
  margin-bottom: 48px;
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2563eb;
  margin: 0 0 24px 0;
`

const SectionTitle2 = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #000;
  margin: 0 0 24px 0;
`

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const TravelRoomsPage = () => {
  const navigate = useNavigate();
  const { setRightContent } = useHeaderConfig();
  
  useEffect(() => {
    // 헤더에서 프로필 이미지만 표시
    setRightContent(<ProfileImage alt="User Profile" size={32} />);
  }, [setRightContent]);
  const activeTrips = [
    {
      id: 1,
      title: "바다 여행 in 제주도",
      date: "6월 15일 - 6월 22일",
      image: "/beautiful-coastal-scenery-with-cliffs-and-blue-oce.jpg",
    },
    {
      id: 2,
      title: "서울 여행",
      date: "7월 5일 - 7월 7일",
      image: "/mountain-landscape-with-layered-hills-and-forest.jpg",
    },
  ]

  const pastTrips = [
    {
      id: 3,
      title: "독도 여행",
      date: "5월 1일 - 5월 5일",
      image: "/paris-cityscape-with-eiffel-tower-and-haussmanian-.jpg",
    },
  ]

  const handleCardClick = (tripId) => {
    console.log(`Clicked trip ${tripId}`)
    // 여기에 여행 상세 페이지로 이동하는 로직 추가
  }

  return (
    <PageWrapper>
      <MainContent>
        <Inner>
          <TitleSection>
            <TitleContent>
              <PageTitle>여행 목록 방</PageTitle>
              <PageSubtitle>당신의 다음 여정이 시작되는 곳</PageSubtitle>
            </TitleContent>
            <ButtonGroup>
              <Button variant="secondary" onClick={() => navigate("/join-room")}>방 참가하기</Button>
              <Button variant="primary" onClick={() => navigate("/create-trip")}>방 생성하기</Button>
            </ButtonGroup>
          </TitleSection>

          <Section>
            <SectionTitle>계획된 여행</SectionTitle>
            <CardsGrid>
              {activeTrips.map((trip) => (
                <TravelCard
                  key={trip.id}
                  title={trip.title}
                  date={trip.date}
                  image={trip.image}
                  onClick={() => handleCardClick(trip.id)}
                />
              ))}
            </CardsGrid>
          </Section>

          <Section>
            <SectionTitle2>다녀온 여행</SectionTitle2>
            <CardsGrid>
              {pastTrips.map((trip) => (
                <TravelCard
                  key={trip.id}
                  title={trip.title}
                  date={trip.date}
                  image={trip.image}
                  onClick={() => handleCardClick(trip.id)}
                />
              ))}
            </CardsGrid>
          </Section>
        </Inner>
      </MainContent>
    </PageWrapper>
  )
}

export default TravelRoomsPage
