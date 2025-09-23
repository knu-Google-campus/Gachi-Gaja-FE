import styled from "styled-components"
import Inner from "../layout/Inner"

const FooterContainer = styled.footer`
  background-color: #f8fafc;
  border-top: 1px solid #e2e8f0;
  padding: 40px 0;
  margin-top: auto;
`

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
`

const FooterText = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  margin: 0;
`

const FooterLinks = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
`

const FooterLink = styled.a`
  color: #64748b;
  text-decoration: none;
  font-size: 0.875rem;
  
  &:hover {
    color: #2563eb;
  }
`

const Footer = () => {
  return (
    <FooterContainer>
      <Inner>
        <FooterContent>
          <FooterLinks>
            <FooterLink href="#">서비스 소개</FooterLink>
            <FooterLink href="#">이용약관</FooterLink>
            <FooterLink href="#">개인정보처리방침</FooterLink>
            <FooterLink href="#">고객센터</FooterLink>
          </FooterLinks>
          <FooterText>© 2024 플랜투게더. 모든 권리 보유.</FooterText>
        </FooterContent>
      </Inner>
    </FooterContainer>
  )
}

export default Footer
