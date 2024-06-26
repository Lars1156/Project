const mongoose= require('mongoose');
const appointmentServices = require('../services/appointmentServices');
const Appointment = require('../module/appointments');

const addApointment = async(req, res)=>{
    console.log("**appointemnt Controller**", req.body);
    try {
        const result = await appointmentServices.addAppointment(req.body);
        console.log(result,"appoint controller");
        res.status(result.status).send(result.task || { message: result.message});
        // res.status(200).send({message: result.message});
        console.log("**sevices data appointment booked***", result);
    } catch (error) {
        res.status(500).send({message: "Intenal server Erorr"});
    } 
}

const getAllAppointment  = async(req,res)=>{
    try {
        const result = await appointmentServices.getAllAppointments(req.body);
        console.log('*** result of getallAppointment',result);
        res.status(result.status).send(result.task || { message: result.message});

        // res.status(200).send({message:result.message});
    } catch (error) {
       res.status(500).send({message:"Internal Server Error"}); 
    }
};
// Get Appointment ByID

const getAppointmentsByPatientId = async(req,res)=>{
    console.log("***Get All Apoointment by PatientID***", req.query);
    try{
        const {patientId} = req.query;
        const result  = await appointmentServices.getAppointmentsByPatientId(patientId);
        // res.status(result.status).send(result.task || {message: result.message});
        res.status(200).send(result);
    }catch(error){
        res.status(500).send({message:"Internal server error"});
    }
};
const getAppointmentsByQuery = async (req, res) => {
    try {
      const result = await appointmentServices.getAppointmentsByQuery(req.query);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({ message: 'Internal server error' });
    }
  };

  const updateAppointmentStatusByDoctor = async (req, res) => {
    console.log("* params the data is update *", req.body);
    try {
        const { id, status } = req.body;
        
        if (!['Pending', "Confirmed", 'Rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        // Find the appointment by ID
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Update the status
        appointment.status = status;
        console.log(appointment)
        // Save the updated document
        await appointment.save();
        
        // Respond with the updated appointment
        res.status(200).json(appointment);
    } catch (error) {
        console.error('Error updating appointment', error);

        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).json({ message: "Validation error", details: error.errors });
        } else if (error instanceof mongoose.Error.CastError) {
            res.status(400).json({ message: "Invalid ID format", details: error.message });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

const deleteAppointmentByPatient = async(req,res) =>{
    try {
        const appointmentId = req.params.id;
        const deletedAppointment = await appointmentServices.deleteAppointmentByPatient(appointmentId);

        if(!deletedAppointment){
            return res.status(404). json({message: 'Appointment not Found'});
        }
        res.status(200).json({message:"Appointment is deleted"});
    } catch (error) {
        console.error('Error deleting appointment:' , error);
        res.status(500).json({message:"Error deleting the appointment", error});
        res.status(500).json({message: "Server error , appointemnt can't be deleted"});
    }
};

module.exports={
    addApointment,
    getAllAppointment,
    getAppointmentsByPatientId,
    updateAppointmentStatusByDoctor,
    getAppointmentsByQuery,
    deleteAppointmentByPatient
}