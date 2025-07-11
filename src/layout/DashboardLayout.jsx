import styled from 'styled-components';
import { Layout } from 'antd';
import { AppHeader } from '../components/layout/Header';

const { Content } = Layout;

export default function DashboardLayout({ children }) {
  return (
    <StyledLayout>
      <AppHeader />
      <StyledContent>{children}</StyledContent>
    </StyledLayout>
  );
}

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledContent = styled(Content)`
  margin: 24px;
  background: #fff;
  padding: 24px;
  height: calc(100vh - 108px);
  overflow: hidden;

  @media (max-width: 576px) {
    margin: 12px;
    padding: 16px;
  }
`;
