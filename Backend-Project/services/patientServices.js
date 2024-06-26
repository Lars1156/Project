const mongoose= require('mongoose');
const Patient = require('../module/patient');

 async function addPatient (patient){
    console.log("****** patient in service.addPatirnt",patient);
    try {
        const petientDetails = {
            name: patient.name,
            phoneNumber:patient.phoneNumber,
            gender: patient.gender,
            age:patient.age,
            dateOfbirth:patient.dateOfbirth,
            bloodgroup:patient.bloodgroup,
            email:patient.email,
            password: patient.password,
            address: patient.address
        };
        console.log("paishent details of Module******",petientDetails);
        const newPatient = new Patient(petientDetails);
        const result = await newPatient.save();
        console.log("This is the result*****8",result);
        return { status:200 , task: result};
    } catch (error) {
        throw{ status: 500, message: 'internal server error'}
    }
 }
async function getAllPatients(){
    console.log("***** Get All Patients Deatils******",getAllPatients);
    try {
        const patient = await Patient.find({},{__v:0});
        return patient;
    } catch (error) {
        throw{ status: 500, message: 'internal server error'}
        
    }
}

 module.exports =  {
    addPatient,
    getAllPatients
 };