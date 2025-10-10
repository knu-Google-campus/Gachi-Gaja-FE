import styled from "styled-components"
import ProfileImage from "../components/common/ProfileImage"
import Button from "../components/common/Button"
import Inner from "../components/layout/Inner"
import { useState } from "react"
import { FaUmbrellaBeach, FaHiking, FaTree, FaLandmark, FaGlassMartiniAlt, FaUtensils } from "react-icons/fa"

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

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
  text-align: left;
`

const InputWrapper = styled.div`
  margin-bottom: 32px;
`

const PromptInner = styled(Inner)`
  max-width: 768px;
`

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 16px 20px;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  background: #ffffff;
  font-size: 1rem;
  color: #1f2937;
  outline: none;
  resize: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  
  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`

const TagGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`

const travelStyles = ["Relaxation", "Activities", "Nature", "Culture", "Nightlife", "Foodie"]
const travelIcons = { 
  "Relaxtion" : <FaUmbrellaBeach />, "Activities" : <FaHiking />, 
  "Nature" : <FaTree />, "Culture" : <FaLandmark />, 
  "Nightlife" : <FaGlassMartiniAlt />, "Foodie" : <FaUtensils />,
 }

export default function Prompt () {
  const [promptText, setPromptText] = useState("")

  return (
    <>
      <PageContainer>
        <ContentWrapper>
          <PromptInner>
            <Title>당신의 의견을 들려주세요</Title>
            <Subtitle>이번 여행에서 반영됐으면 하는 의견을 적어주세요</Subtitle>

            <form>
              <InputWrapper>
                <TextArea 
                  placeholder="e.g., A week-long trip to the coast with my family. We want to relax on the beach, visit local markets, and try seafood restaurants. We prefer to travel by car and stay in a villa with a pool."
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                />
              </InputWrapper>

              <InputWrapper>
                <SectionTitle>Or, Select your travel style! (선택사항)</SectionTitle>
                <TagGrid>
                  
                </TagGrid>
              </InputWrapper>
              
            </form>
          </PromptInner>
          
        </ContentWrapper>
      </PageContainer>
    </>
  )
}