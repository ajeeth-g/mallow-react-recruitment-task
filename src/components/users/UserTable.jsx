import { Avatar, message, Modal, Space, Table, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteExistingUser } from '../../features/users/usersThunks';
import { Button } from '../ui/Button';

const { Text } = Typography;

export const UserTable = ({ users, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = (user) => {
    Modal.confirm({
      title: 'Delete User',
      content: 'Are you sure you want to delete this user?',
      onOk: async () => {
        try {
          await dispatch(deleteExistingUser(user.id));
          message.success('User deleted successfully');
        } catch (error) {
          message.error('Deletion failed');
        }
      },
    });
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 100,
      render: (avatar) => (
        <Avatar src={avatar} size={48} style={{ backgroundColor: '#f0f2f5' }} />
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => (
        <Text copyable style={{ color: '#1890ff' }}>
          {email}
        </Text>
      ),
      width: 250,
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      sorter: (a, b) => a.first_name.localeCompare(b.first_name),
      width: 150,
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
      sorter: (a, b) => a.last_name.localeCompare(b.last_name),
      width: 150,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 180,
      render: (_, record) => (
        <Space>
          <Button
            btntype="primary"
            htmlType="submit"
            onClick={() => onEdit(record)}
            block
            size="medium"
          >
            Edit
          </Button>
          <Button
            btntype="danger"
            htmlType="submit"
            onClick={() => handleDelete(record)}
            block
            size="medium"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey="id"
      pagination={false}
      scroll={{ x: 'max-content' }}
      bordered
      size="middle"
    />
  );
};
