
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, DatePicker } from 'antd';
import '../css/pregister.css'
const { Option } = Select;

function PatientRegister() {
  
  const navigate = useNavigate();
   
  const onFinish = async (values) => {
    if (values.dateOfbirth) {
      values.dateOfbirth = values.dateOfbirth.format('YYYY-MM-DD');
    }
  const payload = {
    name : values.name,
    phoneNumber : values.phoneNumber,
    age : values.age,
    gender :values.gender,
    dateOfBirth : values.dateOfBirth, 
    email:values.email,
    password : values.password,
    bloodgroup : values.bloodgroup,
    address : values.address
  }
    try {
      const response = await axios.post('http://localhost:5000/api/patient/addPatient', payload)
      alert('Patient registered successfully');
      localStorage.setItem("token", response.data.token);
      navigate('/patient/loginPatient');
    } catch (error) {
      console.log('Registration failed', error);
    }
  };

  return (
    <div className="patient-registration">
      <h2>Patient Registration</h2>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your full name' }]}
        >
          <Input placeholder="Enter Your Full Name" />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[{ required: true, message: 'Please enter your phone number' }]}
        >
          <Input placeholder="Enter Your Phone Number" />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: 'Please enter your age' }]}
        >
          <Input type="number" placeholder="Enter age" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please enter your email' }]}
        >
          <Input type="email" placeholder="Enter email" />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please select your gender' }]}
        >
          <Select placeholder="Select your gender">
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Date of Birth"
          name="dateOfBirth"
          rules={[{ required: true, message: 'Please enter your date of birth' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password placeholder="Enter your Password" />
        </Form.Item>
        <Form.Item
          label="Blood Group"
          name="bloodgroup"
          rules={[{ required: true, message: 'Please select your blood group' }]}
        >
          <Select placeholder="Select your blood group">
            <Option value="AB-">AB-</Option>
            <Option value="A+">A+</Option>
            <Option value="O+">O+</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please enter your address' }]}
        >
          <Input placeholder="Enter the Address" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="btn-login" >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PatientRegister;
