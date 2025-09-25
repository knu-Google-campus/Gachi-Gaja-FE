import styled from "styled-components";

const Inner = styled.div`
  width: 100%;
  max-width: 1200px; // 최대 너비 제한
  margin: 0 auto;    // 좌우 중앙 정렬
  padding: 0 20px;   // 작은 여백

  ${({ flex }) =>
    flex &&
    `
    display: flex;
    justify-content: space-between;
    align-items: center;
  `}
`;

export default Inner;
