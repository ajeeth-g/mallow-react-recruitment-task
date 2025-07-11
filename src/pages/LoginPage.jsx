import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Alert, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginUser } from '../features/auth/authThunks';
import { useEffect } from 'react';
import { clearError } from '../features/auth/authSlice';
import { Button } from '../components/ui/Button';
import styled from 'styled-components';

const LoginPage = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { token, isLoading, error } = useSelector((state) => state.auth);
  const from = location.state?.from?.pathname || '/users';

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, navigate, from]);

  const onSubmit = async (values) => {
    dispatch(loginUser(values));
  };

  return (
    <Container>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          email: 'eve.holt@reqres.in',
          password: 'cityslicka',
          remember: true,
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Invalid email format' },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="eve.holt@reqres.in"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            size="large"
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            btntype="primary"
            htmlType="submit"
            loading={isLoading}
            disabled={isLoading}
            block
            size="large"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;
