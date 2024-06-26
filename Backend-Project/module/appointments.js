const mongoose = require('mongoose');

const appointmentsSchema  = new mongoose.Schema({
    patientId:{type: mongoose.Schema.Types.ObjectId , ref:"patient", required: true},
    doctorId:{type:mongoose.Schema.Types.ObjectId, ref:'doctor',required:true},
    appointmentDateTime: { type: Date, required: true },
    status: { type: String, enum: ["Pending", "Confirmed", "Cancelled"], default: "Pending" }
});
const Appointment = mongoose.model('Appointment', appointmentsSchema);

module.exports = Appointment;