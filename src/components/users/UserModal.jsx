import { Button, Form, Input, message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  createNewUser,
  updateExistingUser,
} from '../../features/users/usersThunks';

export const UserModal = ({ visible, onClose, user }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isEditMode = !!user;
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        avatar: user.avatar,
      });
    } else {
      form.resetFields();
    }
  }, [user, form, visible]);

  const handleSubmit = async () => {
    try {
      setConfirmLoading(true);
      const values = await form.validateFields();

      if (isEditMode) {
        await dispatch(updateExistingUser({ id: user.id, userData: values }));
        message.success('User updated successfully');
      } else {
        await dispatch(createNewUser(values));
        message.success('User created successfully');
      }

      onClose();
    } catch (error) {
      message.error(`Operation failed: ${error.message}`);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      title={isEditMode ? 'Edit User' : 'Create User'}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          loading={confirmLoading}
        >
          {isEditMode ? 'Update' : 'Create'}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="first_name"
          label="First Name"
          rules={[{ required: true, message: 'Please input first name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[{ required: true, message: 'Please input last name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input email!' },
            { type: 'email', message: 'Invalid email format' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="avatar"
          label="Profile Image Link"
          rules={[
            { required: true, message: 'Please input profile image link!' },
            { type: 'url', message: 'Invalid URL format' },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
