const mongoose = require('mongoose');
const Doctor = require('../module/doctor');

async function addDoctor (doctor){
    console.log("*****Doctor services is addd****",doctor);
   try {
    const doctorDetails ={
        name: doctor.name,
        phoneNumber: doctor.phoneNumber,
        gender: doctor.gender,
        age: doctor.age,
        dateOfbirth:doctor.dateOfbirth,
        email : doctor.email,
        password: doctor.password,
        address: doctor.address,
        spaciliation: doctor.spaciliation
    }
    console.log(doctorDetails);
    const newDoctor = new Doctor(doctorDetails)
    const result = await newDoctor.save();
    return{ status: 200 , task: result}
   } catch (error) {
     throw {status : 500 , message :'internal server issue'}
   }
}

async function getAllDocters(){
    try {
        const docter = await Doctor.find({}, {__v:0});
        return docter;
    } catch (error) {
        throw { status: 500 , message :'internal server issues'}
    }
}

module.exports={
    addDoctor,
    getAllDocters
}