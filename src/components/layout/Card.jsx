import styled from "styled-components";

// 카드 레이아웃을 감싸는 div
const CardWrapper = styled.div`
    width: 100%;
    background-color: #ffffff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border: 1px solid #e2e8f0;
`;

// 레이아웃 내부 소제목
const Title = styled.h2`
    font-size: 1.25rem;
    font-weight: 700;
    color: #000;
    margin-top: 0;
    margin-bottom: 8px;
`;

// 레이아웃 내부 내용
const Content = styled.p`
    font-size: 1rem;
    color: #64748b;
    margin-top: 0;
    margin-bottom: 24px;
`;

// 세로로 flex 부여하여 정렬
const Flexible = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Card = ({ title, content, children }) => {
    return (
        <CardWrapper>
            {title && <Title>{title}</Title>}
            {content && <Content>{content}</Content>}
            <Flexible>
                {children}
            </Flexible>
        </CardWrapper>
    );
};

export default Card;