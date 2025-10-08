"use client"

import styled from "styled-components"

const CardWrapper = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`

const CardImage = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const CardContent = styled.div`
  padding: 20px;
`

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 8px 0;
`

const CardDate = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
`

const TravelCard = ({ title, date, image, onClick }) => {
  return (
    <CardWrapper onClick={onClick}>
      <CardImage image={image} />
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDate>{date}</CardDate>
      </CardContent>
    </CardWrapper>
  )
}

export default TravelCard
