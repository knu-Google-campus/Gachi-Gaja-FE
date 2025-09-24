"use client"
import styled from "styled-components"
import Button from "../components/common/Button"
import Header from "../components/common/Header"
import Footer from "../components/common/Footer"
import Inner from "../components/layout/Inner"
import { useState } from "react"

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`

const LoginSection = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`

const TitleSection = styled.div`
  margin-bottom: 32px;
`

const MainTitle = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: #1f2937;
  margin: 0;
`

const SubTitle = styled.p`
  font-size: 1rem;
  color: #334155;
  margin-top: 8px;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
  text-align: left;
`

const Label = styled.label`
  font-weight: 600;
  color: #1f2937;
`

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export default function Login() {
    // 이메일, 비밀번호 저장
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // 로그인 정보 전달 기능 구현 예정

    return (
        <>
            <Header />
            <PageContainer>
                <LoginSection>
                    {/* Inner를 사용하면 전체적인 너비가 줄어들어 
                    약간 어색해보이는 것 같음. 
                    안쓰는 쪽의 디자인도 괜찮은듯 함.*/}
                    <Inner>
                        <TitleSection>
                            <MainTitle>Trip Together!</MainTitle>
                            <SubTitle>AI 여행 계획 서비스, 플랜투게더</SubTitle>
                        </TitleSection>

                        <form>
                            <InputWrapper>
                                <div>
                                    <Label htmlFor="email">이메일</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        value={ email }
                                        onChange={(e) => setEmail(e.target.value)}
                                    />                                
                                </div>
                                <div>
                                    <Label htmlFor="password">비밀번호</Label>
                                    <Input
                                        type="password"
                                        id="password"
                                        value={ password }
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </InputWrapper>

                            <ButtonContainer>
                                <Button type="submit" variant="primary" size="full">
                                    로그인
                                </Button>
                                {/* 회원가입 버튼이 로그인 버튼이랑 같은 디자인이라 
                                어색해 보일수도 있다고 생각함. 의견 필요 */}
                                <Button type="button" variant="primary" size="full">
                                    회원가입
                                </Button>
                            </ButtonContainer>
                        </form>
                    </Inner>
                </LoginSection>
            </PageContainer>        
            <Footer />
        </>
    );
}