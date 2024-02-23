import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { updateUserDetails } from '../store/userDetails/userDetailsSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storedUserDetails = localStorage.getItem('userDetails');
  useEffect(() => {
    if (storedUserDetails) {
      const parsedData = JSON.parse(storedUserDetails);
      dispatch(updateUserDetails(parsedData));
      navigate('/home');
    }
  }, [storedUserDetails, dispatch, navigate]);

  const onFinish = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    const response = await apiInstance.post('/login', data);

    if (response && response.data && response.data.ok) {
      Cookies.set('authToken', response.data.data.token, {
        expires: 7,
      });
      dispatch(
        updateUserDetails({
          email: response.data.data.email,
          username: response.data.data.username,
          id: response.data.data.id,
        })
      );

      localStorage.setItem(
        'userDetails',
        JSON.stringify({
          email: response.data.data.email,
          username: response.data.data.username,
          id: response.data.data.id,
        })
      );

      navigate('/home');
    } else {
      navigate('/register');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Login</h1>
      <Form
        name='login'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ width: '300px', margin: 'auto' }}
      >
        <Form.Item
          name='email'
          rules={[{ required: true, message: 'Please enter your email!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder='Email' />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder='Password' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
