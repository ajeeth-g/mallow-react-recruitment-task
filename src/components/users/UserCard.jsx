import { DeleteFilled, EditOutlined } from '@ant-design/icons';
import { Avatar, Card, Tooltip, Typography } from 'antd';
import styled from 'styled-components';

const { Text } = Typography;

export const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <UserCardContainer>
      <Card
        variant="borderless"
        styles={{
          body: {
            padding: '16px',
            textAlign: 'center',
            backgroundColor: '#fff',
          },
        }}
        cover={
          <div
            style={{
              height: 160,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f0f2f5',
            }}
          >
            <Avatar
              src={user.avatar}
              size={100}
              style={{ border: '2px solid #fff' }}
            />
          </div>
        }
      >
        <Text
          strong
          style={{ display: 'block', fontSize: '16px', marginBottom: '4px' }}
        >
          {user.first_name} {user.last_name}
        </Text>
        <Text type="secondary" style={{ display: 'block' }}>
          {user.email}
        </Text>
      </Card>

      <Overlay className="overlay">
        <Tooltip title="Edit">
          <CircleButton type="edit" onClick={() => onEdit(user)}>
            <EditOutlined />
          </CircleButton>
        </Tooltip>
        <Tooltip title="Delete">
          <CircleButton type="delete" onClick={() => onDelete(user)}>
            <DeleteFilled />
          </CircleButton>
        </Tooltip>
      </Overlay>
    </UserCardContainer>
  );
};

const UserCardContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover .overlay {
    opacity: 1;
    pointer-events: auto;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  opacity: 0;
  z-index: 10;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
`;

const CircleButton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  font-size: 18px;
  background-color: ${(props) =>
    props.type === 'edit' ? 'rgb(112, 73, 228)' : 'rgb(243, 0, 41)'};
`;
