import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import styled from "styled-components";

const PageContainer = styled.div`
`;

export default function MainLayout() {
  return (
    <PageContainer>
      <Header />
      <Outlet />
    </PageContainer>
  )
}