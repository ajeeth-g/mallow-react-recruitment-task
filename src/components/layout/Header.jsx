import { LogoutOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../../features/auth/authSlice';

const { Header } = Layout;

export const AppHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!token) return null;

  const username = user?.name || 'Elon Musk';

  return (
    <StyledHeader>
      <LogoutButton onClick={handleLogout}>
        <Username>{username}</Username>
        <LogoutIconBox>
          <LogoutOutlined />
        </LogoutIconBox>
      </LogoutButton>
    </StyledHeader>
  );
};

const StyledHeader = styled(Header)`
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  background: #031926;
  padding: 0 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-height: 10vh;
  max-height: 10vh;
`;

const LogoutButton = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
`;

const Username = styled.span`
  color: #fff;
  font-weight: 600;
  font-size: 16px;
`;

const LogoutIconBox = styled.div`
  background-color: #ff4d4f;
  color: #fff;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
`;
