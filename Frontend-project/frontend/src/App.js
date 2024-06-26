import React from 'react';
import { Routes,Route, } from 'react-router-dom';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PatientLogin from './Pages/PatientLogin';
import PatientRegister from './Pages/PatientRegister';
import DoctorLogin from './Pages/DoctorLogin';
import DoctorRegister from './Pages/DoctorRegister';
import PatientDashboard from './Pages/PatientsDashboard';
import DoctersDashboard from './Pages/DoctersDashboard';


function App() {
  return (
    // <BrowserRouter>
      <div className="App">
        <Navbar />
          <Routes>
            <Route path='/patient-login' element={<PatientLogin/>}/>
            <Route path='/patient-register' element={<PatientRegister/>}/>
            <Route path='/patient-dashboard'element={<PatientDashboard/>}/>
            <Route path='/doctor-login' element={<DoctorLogin/>}/>
            <Route path='/doctor-dashboard' element={<DoctersDashboard/>}/>
            <Route path='/doctor-registration' element ={<DoctorRegister/>}/>
          </Routes>
      </div>
    // </BrowserRouter>
  );
}

export default App;
