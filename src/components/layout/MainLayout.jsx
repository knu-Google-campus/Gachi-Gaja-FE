import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import styled from "styled-components";
import { HeaderConfigProvider, useHeaderConfig } from "../../context/HeaderContext";

const PageContainer = styled.div`
`;

const LayoutContent = () => {
  const {rightContent} = useHeaderConfig();

  return (
    <PageContainer>
      <Header right={rightContent} />
      <Outlet />
    </PageContainer>
  )
}

export default function MainLayout() {
  return (
    <HeaderConfigProvider>
      <LayoutContent />
    </HeaderConfigProvider>
  )
}