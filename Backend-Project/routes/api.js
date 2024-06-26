const express = require ('express');
const router =  express.Router();
const patientController = require('../controller/patientController');
const doctorController = require('../controller/doctorController');
const appointmentController = require('../controller/appointmentController');
// Patient Routes
router.post ('/patient/addPatient', patientController.addPatient);
router.get('/patient', patientController.getAllPashients);
router.post('/patient/loginPatient',patientController.loginPatient);

// Doctor Routes
router.post ('/docter/addDoctor', doctorController.addDoctor);
router.get('/doctor', doctorController.getAllDocters);
router.post('/doctor/loginDoctor',doctorController.loginDoctor);

// Appoinments Routes
router.post('/appointment/addAppointment', appointmentController.addApointment);
router.get('/appointment/getAllAppointment', appointmentController.getAllAppointment)
router.get('/appointment/getAppointmentByPatientId/', appointmentController.getAppointmentsByPatientId);
router.put('/appointment/updateAppointmentStatusByDoctor', appointmentController.updateAppointmentStatusByDoctor);
router.delete('appointment/deleteAppointmentByAppointmentId', appointmentController.deleteAppointmentByPatient)
module.exports = router;