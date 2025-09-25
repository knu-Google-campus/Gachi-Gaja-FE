"use client"

import styled from "styled-components"
import { FaUser } from "react-icons/fa"

const ProfileImageWrapper = styled.div`
  width: ${({ size }) => (size === "small" ? "36px" : "40px")};
  height: ${({ size }) => (size === "small" ? "36px" : "40px")};
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  border: 2px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #d1d5db;
    transform: scale(1.05);
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const DefaultIcon = styled(FaUser)`
  color: #9ca3af;
  font-size: ${({ size }) => (size === "small" ? "18px" : "20px")};
`

const ProfileImage = ({ src, size = "medium" }) => {
  return (
    <ProfileImageWrapper size={size}>
      {src ? <Image src={src || "/placeholder.svg"} /> : <DefaultIcon size={size} />}
    </ProfileImageWrapper>
  )
}

export default ProfileImage
