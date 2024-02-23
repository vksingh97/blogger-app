import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const RegistrationPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log('Received values:', values);

    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    const response = await apiInstance.post('/register', data);
    if (response && response.data && response.data.ok) {
      navigate('/login');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Registration</h1>
      <Form
        name='registration'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ width: '300px', margin: 'auto' }}
      >
        <Form.Item
          name='username'
          rules={[{ required: true, message: 'Please enter your username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder='Username' />
        </Form.Item>
        <Form.Item
          name='email'
          rules={[{ required: true, message: 'Please enter your email!' }]}
        >
          <Input prefix={<MailOutlined />} placeholder='Email' />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder='Password' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrationPage;
