"use client"

import styled from "styled-components"
import Button from "../components/common/Button"
import Header from "../components/common/Header"
import Footer from "../components/common/Footer"
import { useState } from "react"

import { PageContainer, LoginSection as SignupSection, TitleSection, MainTitle, 
  SubTitle, InputWrapper, InputGroup, Label, Input, 
  ButtonWrapper, SignupText as LoginText} from "./LoginPage"

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
    
  return (
    <>
      <Header />
      <PageContainer>
        <SignupSection>
          <TitleSection>
            <MainTitle>회원가입</MainTitle>
          </TitleSection>
                    
          <form>
            <InputWrapper>
              <InputGroup>
                <Label htmlFor="name">이름</Label>
                <Input 
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="email">이메일</Label>
                <Input 
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="password">비밀번호</Label>
                <Input 
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
                <Input 
                  type="password"
                  id="passwordConfirm"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </InputGroup>
            </InputWrapper>

            <ButtonWrapper>
              <Button type="submit" variant="primary" size="full">
                가입하기
              </Button>
            </ButtonWrapper>

            <LoginText>
              이미 계정이 있으신가요?<a href="/login">로그인</a>
            </LoginText>
          </form>
        </SignupSection>
      </PageContainer>
      <Footer />
    </>
  )
}