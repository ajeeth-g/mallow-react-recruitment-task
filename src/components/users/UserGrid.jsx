import { Col, Row } from 'antd';
import { UserCard } from './UserCard';

export const UserGrid = ({ users, onEdit, onDelete }) => {
  return (
    <Row gutter={[16, 16]}>
      {users.map((user) => (
        <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
          <UserCard user={user} onEdit={onEdit} onDelete={onDelete} />
        </Col>
      ))}
    </Row>
  );
};
