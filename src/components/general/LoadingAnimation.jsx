import styled, { keyframes } from "styled-components"
import { FaPlane, FaMapMarkedAlt, FaUsers } from "react-icons/fa"

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 40px;
  animation: ${fadeIn} 0.6s ease-out;
`

const IconsWrapper = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
`

const IconBox = styled.div`
  font-size: 3rem;
  color: #2563eb;
  animation: ${float} 2s ease-in-out infinite;
  animation-delay: ${(props) => props.$delay || "0s"};
`

const LoadingText = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 16px;
  text-align: center;
`

const LoadingSubtext = styled.p`
  font-size: 1rem;
  color: #6b7280;
  text-align: center;
  margin-bottom: 32px;
`

const Spinner = styled.div`
  border: 4px solid #e5e7eb;
  border-top: 4px solid #2563eb;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: ${spin} 1s linear infinite;
`

const LoadingAnimation = () => {
  return (
    <LoadingContainer>
      <IconsWrapper>
        <IconBox $delay="0s">
          <FaPlane />
        </IconBox>
        <IconBox $delay="0.2s">
          <FaMapMarkedAlt />
        </IconBox>
        <IconBox $delay="0.4s">
          <FaUsers />
        </IconBox>
      </IconsWrapper>
      <LoadingText>AI가 여행 계획을 생성하고 있습니다</LoadingText>
      <LoadingSubtext>그룹의 선호도를 바탕으로 최적의 일정을 만들고 있어요</LoadingSubtext>
      <Spinner />
    </LoadingContainer>
  )
}

export default LoadingAnimation
