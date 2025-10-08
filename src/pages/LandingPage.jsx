import styled from "styled-components"
import Button from "../components/common/Button"
import Header from "../components/common/Header"
import Footer from "../components/common/Footer"
import Inner from "../components/layout/Inner"
import { useNavigate } from "react-router-dom"

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`

const MainContent = styled.main`
  padding-top: 64px;
  flex: 1;
`

const HeroSection = styled.div`
  text-align: center;
  padding: 80px 0;
`

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 24px;
  text-wrap: balance;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const PrimaryText = styled.span`
  color: #334155;
`

const HeroDescription = styled.p`
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 32px;
  max-width: 672px;
  margin-left: auto;
  margin-right: auto;
  text-wrap: pretty;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

const FeaturesSection = styled.section`
  padding: 64px 0;
  background-color: rgba(248, 250, 252, 0.3);
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  text-align: center;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const FeatureCard = styled.div`
  padding: 24px;
`

const FeatureIcon = styled.div`
  font-size: 2.25rem;
  margin-bottom: 16px;
`

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #1f2937;
`

const FeatureDescription = styled.p`
  color: #6b7280;
  margin: 0;
`

export default function Home() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/login")
  }
  const headerRight = <Button variant="primary" onClick={handleClick}>로그인</Button>

  return (
    <PageContainer>
      <Header right={headerRight} />

      <MainContent>
        <Inner>
          <HeroSection>
            <HeroTitle>
              모두의 의견을 모아
              <br />
              <PrimaryText>완벽한 단체 여행</PrimaryText>을 계획하세요
            </HeroTitle>

            <HeroDescription>
              친구들, 가족, 동료들의 다양한 의견을 AI가 똑똑하게 분석하여 모두가 만족하는 최적의 여행 계획을
              제안해드립니다.
            </HeroDescription>

            <ButtonContainer>
              <Button variant="primary" size="default" onClick={handleClick}>
                여행 계획 시작하기
              </Button>
            </ButtonContainer>
          </HeroSection>
        </Inner>

        <FeaturesSection>
          <Inner>
            <FeaturesGrid>
              <FeatureCard>
                <FeatureIcon>🗳️</FeatureIcon>
                <FeatureTitle>의견 수집</FeatureTitle>
                <FeatureDescription>모든 참가자의 의견을 간편하게 수집합니다</FeatureDescription>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>🤖</FeatureIcon>
                <FeatureTitle>AI 분석</FeatureTitle>
                <FeatureDescription>수집된 의견을 AI가 분석하여 최적의 여행 계획을 생성합니다</FeatureDescription>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>✈️</FeatureIcon>
                <FeatureTitle>완벽한 계획</FeatureTitle>
                <FeatureDescription>모두가 만족하는 맞춤형 여행 일정을 받아보세요</FeatureDescription>
              </FeatureCard>
            </FeaturesGrid>
          </Inner>
        </FeaturesSection>
      </MainContent>

      <Footer />
    </PageContainer>
  )
}

