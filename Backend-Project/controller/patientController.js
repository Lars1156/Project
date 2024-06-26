const patientServices = require('../services/patientServices');
const Patient = require('../module/patient');
const addPatient = async(req, res) =>{
    console.log(req.body);
    try {
        const result = await patientServices.addPatient(req.body);
        res.status(result.status).send(result.task ||{message: result.message});

    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });   
    }
};

const getAllPashients = async(req,res)=>{
    try {
        const result = await patientServices.getAllPatients();
        res.status(200).send(result);    
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });    
    }
};

// patient Login 
const loginPatient = async (req,res)=>{
  const patientData = req.body
  try {
    const userEmail= await Patient.findOne({email: patientData.email});
     if(!userEmail){
        res.status(userEmail.status).send({message: userEmail.message});
     }else{
        const password = await Patient.findOne({password: patientData.password});
        if(!password){
            res.status(500).send({message:"Invailed password"});
        }else{
            res.status(200).send({message:"successfull"});
        }
     }
  } catch (error) {
    res.status(500).send ({message :"invalid password"});
  }
}

module.exports = {
    addPatient,
    getAllPashients,
    loginPatient
}
