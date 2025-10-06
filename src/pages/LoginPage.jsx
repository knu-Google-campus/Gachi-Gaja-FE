"use client"

import styled from "styled-components"
import Button from "../components/common/Button"
import Header from "../components/common/Header"
import Footer from "../components/common/Footer"
import { useState } from "react"

// 배경 그라데이션 및 애니메이션 효과가 있는 메인 컨테이너
export const PageContainer = styled.div`
  min-height: calc(100vh - 140px);
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

// 로그인 섹션
export const LoginSection = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 48px 40px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
`

// 타이틀 섹션
export const TitleSection = styled.div`
  margin-bottom: 40px;
  text-align: center;
`

export const MainTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #000;
  margin-bottom: 12px;
  letter-spacing: -0.02em;

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`

export const SubTitle = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  font-weight: 500;
`

// 입력 폼 스타일링
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 32px;
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Label = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 0.95rem;
  margin-left: 4px;
`

export const Input = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  background: #fff;
  color: #1a1a1a;
  transition: all 0.1s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`

export const ButtonWrapper = styled.div`
  margin-bottom: 24px;
`

// 회원가입 링크 스타일링
export const SignupText = styled.p`
  text-align: center;
  color: #64748b;
  font-size: 0.95rem;
  font-weight: 500;

  a {
    color: #2563eb;
    font-weight: 600;
    margin-left: 4px;
    text-decoration: none;
    
    &:hover {
      color: #1d4ed8;
      text-decoration: underline;
    }
  }
`

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <>
      <Header />
      <PageContainer>
        <LoginSection>
          <TitleSection>
            <MainTitle>Trip Together!</MainTitle>
            <SubTitle>AI가 만드는 완벽한 단체 여행 계획</SubTitle>
          </TitleSection>

          <form>
            <InputWrapper>
              <InputGroup>
                <Label htmlFor="email">이메일</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="이메일을 입력해주세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="비밀번호를 입력해주세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </InputWrapper>

            <ButtonWrapper>
              <Button type="submit" variant="primary" size="full">
                로그인
              </Button>
            </ButtonWrapper>

            <SignupText>
              아직 계정이 없으신가요?<a href="/signup">회원가입</a>
            </SignupText>
          </form>
        </LoginSection>
      </PageContainer>
      <Footer />
    </>
  )
}