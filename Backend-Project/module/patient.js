const mongoose = require('mongoose');

const patientShema =  new mongoose.Schema({
    name:{type:String},
    phoneNumber:{type:String},
    gender:{type:String},
    age:{type: Number},
    dateOfbirth:{type:Date},
    bloodgroup:{type:String},
    email:{type:String},
    password:{type:String},
    address:{type: String}
});

const Patient =  mongoose.model('patient', patientShema);
module.exports = Patient;