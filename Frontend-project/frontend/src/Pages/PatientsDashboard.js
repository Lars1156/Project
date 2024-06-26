import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Table, message , Modal, Space, DatePicker, Select} from 'antd';
import { LogoutOutlined,UserOutlined} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import moment from "moment";
import { Content } from 'antd/es/layout/layout';

const { Header } = Layout;
const {Option} = Select

const PatientsDashboard = () => {
const [appointment , setAppointment] = useState([]);
const [docters, setDocters]= useState([]);
const [docterId, setDocterId] = useState(null);
const [date ,setDateTime] = useState(null);
const[modelVisble , setModelVisble] = useState(null);

const navigate = useNavigate()
const userName = useLocation().state?.user || "Geuest";
const userId = useLocation().state?.id;
useEffect(()=>{
    fetchAppointment();
    fetchDocter();
},[userId]);

//fetching Appointment from the database

const fetchAppointment  =() =>{
  axios.get(`http://localhost:5000/api/appointment/getAppointmentByPatientId/?patientId=${userId}`).then((response)=>{
    const sortedAppointments = response.data.sort((a,b)=> new Date(a.appointmentDateTime)- new Date(b.appointmentDateTime));
    setAppointment(sortedAppointments);
  }).catch((error)=>{
    console.error("Error fetching Appintemnt", error);
  })
};

// fetching docters from the http://localhost:5000/api/doctordatabase
const fetchDocter = () =>{
  axios.get(`http://localhost:5000/api/doctor`).then((response)=>{
    setDocters(response.data);
  }).catch((error)=>{
    console.error("Fecting docters error", error);
  });
};

  const handleLogout = () => {
    message.success('You have Logout successfully');
    navigate('/patient-login');
  };

  const hadleDateTimeChanged = (date) =>{
    setDateTime(date);
  }
  const handleBookAppointment = () => {
    if(!setDocterId || !setDateTime){
      message.error('please select the docter and time of appointment');
      return;
    }
    const payload = {
      docterId : setDocterId,
      patientId : userId,
      datetime : setDateTime.format('YYYY-MM-DD HH:mm:ss'),
      status:"Pending",
    };
     axios.post(`http://localhost:5000/api/appointment/addAppointment`, payload).then((response)=>{
         message.success("Appointment added successfully");
         setModelVisble(false);
         fetchAppointment();
     }).catch((error)=>{
       console.error("Error to Adding Appointment", error);
     });
    }
  const handleDeleteAppoinment = (appoitmentId) =>{
   axios.delete(`http://localhost:5000/api/appointment/deleteAppointment/${appoitmentId}`).then(()=>{
    message.success("Appointment deleted successfully");
    fetchAppointment();
   });
  };

   const getDocterbyNameId = (docterId) =>{
      const docter = docters.find((doc)=> doc._id === docterId);
      return docter ? docter.name :"unknown";
   }
  const columns = [
     {
       title :"SRNo",
       dataIndex: "srNo",
       key:"srNo",
       render:(text , record , index)=>index+1,
     },
    {
      title: 'Docter Name',
      dataIndex: 'docterId',
      key: 'docterId',
      render:(docterId)=>getDocterbyNameId(docterId),
    },
    {
      title: 'DateTime',
      dataIndex: 'datetime',
      key: 'datetime',
      render:(datetime)=>moment(datetime).format("YYYY-MM-DDTHH:mm:ss"),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title:"Action",
      dataIndex:"action",
      render:(text , record)=>{
        <Button type='link' onClick={()=>{
          handleDeleteAppoinment(record._id);
        }}>
          Delete
        </Button>
      }
    }
  ];

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key={userName} icon ={<UserOutlined/>}>
          {userName}
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}  style={{marginLeft:"200px"}}>
            Logout
          </Menu.Item>
          <Button type="primary" onClick={()=>setModelVisble(true)} style={{marginTop:"20px",marginLeft:"1000px"}}>
            New Appointment
          </Button>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px", marginTop: 16 }}>
      <div className="site-layout-content">
          {/* <Button type="primary" onClick={()=>setModelVisble(true)}>
            New Appointment
          </Button> */}
          <Modal
            title="New Appointment"
            visible={modelVisble}
            onCancel={() => setModelVisble(false)}
            footer={[
              <Button key="back" onClick={() => setModelVisble(false)}>
                Close
              </Button>,
              <Button key="submit" type="primary" onClick={handleBookAppointment}>
                Create Appointment
              </Button>,
            ]}
          >
            <Space direction="vertical">
              <Select
                placeholder="Select Doctor"
                style={{ width: "100%" }}
                onChange={(value) => setDocterId(value)}
                value={docterId}
              >
                {docters.map((doctor) => (
                  <Option key={doctor._id} value={doctor._id}>
                    {doctor.name}
                  </Option>
                ))}
              </Select>
              <DatePicker showTime onChange={hadleDateTimeChanged} placeholder="Select Date and Time" />
            </Space>
          </Modal>
      </div>
      <h2>Your Appointment</h2>
      <Table dataSource={appointment} columns={columns} style={{marginLeft:"200px"}} rowKey='_id' pagination={false}></Table>
      </Content>
    </Layout>
  );
};

export default PatientsDashboard;
