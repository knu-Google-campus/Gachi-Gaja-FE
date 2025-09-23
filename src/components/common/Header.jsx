import styled from "styled-components"
import Inner from "../layout/Inner"
import { FaPlane } from "react-icons/fa"

// 배경 색상 추가
const HeaderWrapper = styled.header`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #ffffff; 
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`

const RightBox = styled.div`
  display: flex;
  gap: 12px;
`

const Header = ({ right }) => {
  return (
    <HeaderWrapper>
      <Inner flex="true">
        <Logo>
          <FaPlane />
          플랜투게더
        </Logo>
        <RightBox>{right}</RightBox>
      </Inner>
    </HeaderWrapper>
  )
}

export default Header
