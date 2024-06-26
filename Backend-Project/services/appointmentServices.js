const mongoose = require('mongoose');
const Appointment = require('../module/appointments');

async function addAppointment(appointemnt){
    console.log('appointment Services',appointemnt);
    try {
        const appointemntDetails = {
            doctorId: appointemnt.doctorId,
            patientId: appointemnt.patientId,
            appointmentDateTime: appointemnt.appointmentDateTime,
            status:appointemnt.status
        };
        console.log("appointemntDetails  ==" ,appointemntDetails);
        const newAppointment = new Appointment(appointemntDetails);
        const result = await newAppointment.save();
        console.log(result,"result");
        return{ status: 200, task:result};  
    } catch (error) {
        throw{status:500, message:'internal server error'};
    }
}
async function getAllAppointments(){
    try {
        const appointment = await Appointment.find({},{__v:0});
        return appointment
    } catch (error) {
        throw{ status:500, message:'internal server error'};
    }
}

async function getAppointmentsByPatientId(PatientId){
    try {
        console.log(PatientId);
        const appointment = await Appointment.find({patientId:PatientId},{__v:0});
        return appointment;
    } catch (error) {
       throw{status:500 , message: 'Internal server error'};      
    }
}

async function getAllAppointmentsByQuery(query){
    try {
        const appointments = await Appointment.find(query ,{_id:0,__v:0});
        return{status:200 , task:appointments};
    } catch (error) {
        throw {status:500 , message:'Internal server error'};
    }
}

async function updateAppointmentStatusByDoctor(appointmentID){
    try{
        const updateDoc = await Appointment.findByIdAndDelete(
            appointmentID,
            {status},
            {new: ture}
        );
        return updateDoc;
    }catch(error){
        throw error;
    }
}

async function deleteAppointmentByPatient(appointmentID){
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(appointmentID);
        return deletedAppointment;
    } catch (error) {
        throw new Error('Eorror delectin the appointemnt');
    }
}

module. exports ={
    addAppointment,
    getAllAppointments,
    getAppointmentsByPatientId,
    getAllAppointmentsByQuery,
    updateAppointmentStatusByDoctor,
    deleteAppointmentByPatient
}