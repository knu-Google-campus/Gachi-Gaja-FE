import styled from "styled-components"
import ProfileImage from "../components/common/ProfileImage"
import Button from "../components/common/Button"
import { FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaPlane, FaMoneyBillWave, FaBed, FaClock } from "react-icons/fa"
import { MdGroups } from "react-icons/md"
import { useHeaderConfig } from "../context/HeaderContext"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f9fafb;
  display: flex;
  flex-direction: column;
`

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 12px;
  text-align: center;
`

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 48px;
  text-align: center;
`

const FormCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 48px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 600px;
`

const FormGroup = styled.div`
  margin-bottom: 16px;
  position: relative;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  background: #fafafa;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #2563eb;
    background: white;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &:hover {
    border-color: #d1d5db;
  }
`

const IconWrapper = styled.div`
  color: #9ca3af;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
`

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #1f2937;
  outline: none;

  &::placeholder {
    color: #9ca3af;
  }
`

const Select = styled.select`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #1f2937;
  outline: none;
  cursor: pointer;

  &::placeholder {
    color: #9ca3af;
  }
`

const ButtonWrapper = styled.div`
  margin-top: 40px;
`

const BudgetWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex: 1;
`

const BudgetInput = styled(Input)`
  flex: 1;
  min-width: 0;
`

const CurrencySelect = styled.select`
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #1f2937;
  outline: none;
  cursor: pointer;
  padding-right: 8px;
  min-width: 80px;
`

export default function CreateTripPage() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [deadline, setDeadline] = useState("")
  const navigate = useNavigate();
  const { setRightContent } = useHeaderConfig();
    useEffect(() => {
      setRightContent(<ProfileImage />);
    }, [setRightContent]);

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("여행 생성 폼 제출")
    navigate("/trip-room/1");

  }

  const handleProfileClick = () => {
    console.log("프로필 클릭")
  }

  return (
    <PageContainer>

      <ContentWrapper>
        <Title>새로운 여행 만들기</Title>
        <Subtitle>다음 여행을 시작해보세요.</Subtitle>

        <FormCard>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <InputWrapper>
                <IconWrapper>
                  <MdGroups />
                </IconWrapper>
                <Input type="text" placeholder="여행 이름" required />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <InputWrapper>
                <IconWrapper>
                  <FaUsers />
                </IconWrapper>
                <Input type="text" placeholder="누구와 가는지" required />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <InputWrapper>
                <IconWrapper>
                  <FaMapMarkerAlt />
                </IconWrapper>
                <Input type="text" placeholder="목적지" required />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <InputWrapper>
                <IconWrapper>
                  <FaCalendarAlt />
                </IconWrapper>
                <Input
                  type={startDate ? "date" : "text"}
                  placeholder="여행 시작일"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => !e.target.value && (e.target.type = "text")}
                  required
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <InputWrapper>
                <IconWrapper>
                  <FaCalendarAlt />
                </IconWrapper>
                <Input
                  type={endDate ? "date" : "text"}
                  placeholder="여행 종료일"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => !e.target.value && (e.target.type = "text")}
                  required
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <InputWrapper>
                <IconWrapper>
                  <FaPlane />
                </IconWrapper>
                <Input type="text" placeholder="교통 수단" required />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <InputWrapper>
                <IconWrapper>
                  <FaMoneyBillWave />
                </IconWrapper>
                <BudgetWrapper>
                  <BudgetInput type="number" placeholder="1인당 경비" required />
                  <CurrencySelect defaultValue="KRW">
                    <option value="KRW">₩ 원</option>
                    <option value="USD">$ 달러</option>
                    <option value="EUR">€ 유로</option>
                    <option value="JPY">¥ 엔</option>
                    <option value="CNY">¥ 위안</option>
                  </CurrencySelect>
                </BudgetWrapper>
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <InputWrapper>
                <IconWrapper>
                  <FaBed />
                </IconWrapper>
                <Select required defaultValue="">
                  <option value="" disabled>
                    숙소 타입
                  </option>
                  <option value="single">단독 숙소</option>
                  <option value="multiple">여러 숙소</option>
                </Select>
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <InputWrapper>
                <IconWrapper>
                  <FaClock />
                </IconWrapper>
                <Input
                  type={deadline ? "date" : "text"}
                  placeholder="의견 수집 마감일"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => !e.target.value && (e.target.type = "text")}
                  required
                />
              </InputWrapper>
            </FormGroup>

            <ButtonWrapper>
              <Button type="submit" size="full" onClick={() => navigate("/trip-room/1")}> 
                여행 만들기
              </Button>
            </ButtonWrapper>
          </form>
        </FormCard>
      </ContentWrapper>
    </PageContainer>
  )
}
