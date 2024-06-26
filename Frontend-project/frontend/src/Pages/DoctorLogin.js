import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import '../css/dlogin.css';

function DoctorLogin() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const payload ={
      email: values.email,
      password: values.password
    }
    try {
      const response = await axios.post('http://localhost:5000/api/doctor/loginDoctor', payload);
      localStorage.setItem('token', response.data.token);
      navigate('/doctor-dashboard');
    } catch (error) {
      console.log('Login failed', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Doctor Login</h2>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your email address' }]}
          >
            <Input type="email" placeholder="Enter email address" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input type="password" placeholder="Enter password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="btn-login">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default DoctorLogin;
