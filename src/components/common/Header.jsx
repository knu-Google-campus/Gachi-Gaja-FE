import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import Inner from "../layout/Inner"
import { FaPlane } from "react-icons/fa"

// 헤더 래퍼
const HeaderWrapper = styled.header`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;

  svg {
    font-size: 1.8rem;
    color: #2563eb;
    transition: transform 0.3s ease;
  }

  &:hover {
    svg {
      transform: translateX(4px);
    }
  }

  &:active {
    transform: scale(0.98);
  }
`

const RightBox = styled.div`
  display: flex;
  gap: 12px;
`

const Header = ({ right }) => {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate("/travel-rooms")
  }

  return (
    <HeaderWrapper>
      <Inner flex="true">
        <Logo onClick={handleLogoClick}>
          <FaPlane />
          같이가자
        </Logo>
        <RightBox>{right}</RightBox>
      </Inner>
    </HeaderWrapper>
  )
}

export default Header
