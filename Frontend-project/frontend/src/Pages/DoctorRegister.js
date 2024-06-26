import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, DatePicker } from 'antd';
import '../css/dregister.css'

const { Option } = Select;

function DoctorRegister() {
  const navigate = useNavigate();

  const onFinish = async (values) => {

  const payload = {
   name: values.name,
   phoneNumber : values.phoneNumber,
   age: values.age,
   gender : values.gender,
   dateOfBirth : values.dateOfBirth,
   email : values.email,
   password: values.password,
   address: values.address,
   spacilization : values.spacilization
  };
    try {
      const response = await axios.post('http://localhost:5000/api/docter/addDoctor', payload);
      localStorage.setItem('token', JSON.stringify(response.data));
      alert('Registration Successfully');
      navigate('/doctor-login');
    } catch (error) {
      console.log('Registration failed: ', error);
    }
  };

  return (
    <div className="doctor-registration">
      <h2>Doctor Registration</h2>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your full name' }]}
        >
          <Input placeholder="Enter Full Name" />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[{ required: true, message: 'Please enter your phone number' }]}
        >
          <Input placeholder="Enter Phone Number" />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: 'Please enter your age' }]}
        >
          <Input type="number" placeholder="Enter Age" />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please select your gender' }]}
        >
          <Select placeholder="Select">
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Date of Birth"
          name="dateOfBirth"
          rules={[{ required: true, message: 'Please select your birth date' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
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
          <Input.Password placeholder="Enter Your Password" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please enter your address' }]}
        >
          <Input placeholder="Enter Your Address" />
        </Form.Item>
        <Form.Item
          label="Specialization"
          name="specialization"
          rules={[{ required: true, message: 'Please enter your specialization' }]}
        >
          <Input placeholder="Enter your specialization" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="btn-login">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default DoctorRegister;
