import styled from "styled-components"
import {
  FaPlane,
  FaBed,
  FaUtensils,
  FaCamera,
  FaCoffee,
  FaLandmark,
  FaBus,
  FaWalking,
  FaSubway,
  FaTaxi,
} from "react-icons/fa"

const ItemWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`

const IconCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  flex-shrink: 0;
`

const Content = styled.div`
  flex: 1;
`

const Time = styled.div`
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 4px;
`

const Title = styled.div`
  color: #374151;
  margin-bottom: 8px;
`

const Detail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 0.875rem;
`

const DetailIcon = styled.span`
  display: flex;
  align-items: center;
`

const iconMap = {
  plane: FaPlane,
  bed: FaBed,
  utensils: FaUtensils,
  camera: FaCamera,
  coffee: FaCoffee,
  landmark: FaLandmark,
  bus: FaBus,
  walking: FaWalking,
  subway: FaSubway,
  taxi: FaTaxi,
}

const transportIconMap = {
  bus: FaBus,
  walking: FaWalking,
  subway: FaSubway,
  taxi: FaTaxi,
}

const ItineraryItem = ({ icon, time, title, detail, transportType }) => {
  const IconComponent = iconMap[icon] || FaPlane
  const TransportIcon = transportType ? transportIconMap[transportType] : null

  return (
    <ItemWrapper>
      <IconCircle>
        <IconComponent />
      </IconCircle>
      <Content>
        <Time>{time}</Time>
        <Title>{title}</Title>
        {detail && (
          <Detail>
            {TransportIcon && (
              <DetailIcon>
                <TransportIcon />
              </DetailIcon>
            )}
            {detail}
          </Detail>
        )}
      </Content>
    </ItemWrapper>
  )
}

export default ItineraryItem
