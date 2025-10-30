import { useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import Button from "../components/common/Button"
import { FaLink } from "react-icons/fa"

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f7f3f0 0%, #e0f2fe 50%, #ecfdf5 100%);
  padding: 40px 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%);
    animation: float 20s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(-20px, -20px) rotate(180deg); }
  }
`

const JoinSection = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 48px 40px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  text-align: center;
`

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    font-size: 2.5rem;
    color: white;
  }
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: #000;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  font-weight: 500;
  margin-bottom: 40px;
`

const InputWrapper = styled.div`
  margin-bottom: 32px;
`

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #374151;
  font-size: 0.95rem;
  margin-bottom: 12px;
  text-align: left;
`

const UrlInput = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  background: #fff;
  color: #1a1a1a;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`

const InfoText = styled.p`
  margin-top: 24px;
  font-size: 0.9rem;
  color: #9ca3af;
  line-height: 1.5;
`

export default function JoinRoomPage() {
  const [url, setUrl] = useState("")
  const navigate = useNavigate()

  const handleJoinRoom = () => {
    // 임시로 URL 입력 여부와 상관없이 trip-room/1로 이동
    navigate("/trip-room/1")
  }

  const handleCancel = () => {
    navigate("/travel-rooms")
  }

  return (
    <PageContainer>
      <JoinSection>
        <IconWrapper>
          <FaLink />
        </IconWrapper>
        
        <Title>여행방 참가하기</Title>
        <Subtitle>초대 링크를 입력해주세요</Subtitle>

        <InputWrapper>
          <Label htmlFor="url">초대 링크</Label>
          <UrlInput
            type="url"
            id="url"
            placeholder="https://example.com/invite/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </InputWrapper>

        <ButtonWrapper>
          <Button 
            type="button" 
            variant="secondary" 
            size="full"
            onClick={handleCancel}
          >
            취소
          </Button>
          <Button 
            type="button" 
            variant="primary" 
            size="full"
            onClick={handleJoinRoom}
          >
            참가하기
          </Button>
        </ButtonWrapper>

        <InfoText>
          초대 링크는 여행방을 만든 호스트에게서<br />
          받을 수 있습니다.
        </InfoText>
      </JoinSection>
    </PageContainer>
  )
}
