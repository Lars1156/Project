const doctorService = require('../services/doctorServices');
const Doctor = require('../module/doctor');
const addDoctor = async (req,res)=>{
    console.log( "***Doctor is Successfully Addded****", req.body);
    try {
        const result = await doctorService.addDoctor(req.body);
        res.status(result.status).send(result.task ||{message: result.message});
        console.log("***AddedDoctor****", result);
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });   
        
    }
};

const getAllDocters = async (req, res) =>{
    console.log("***Docter added details****" , req.body);
    try {
        const result = await doctorService.getAllDocters(req.body);
        res.status(200).send(result);
        console.log("*****Added Docter details***" , result);
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });        
    }
};

// DocterLogin
const loginDoctor = async(req,res)=>{
    const doctorData = req.body
    console.log("***To get Doctor Login Deatils***" , req.body);
    try {
         const userEmail = await Doctor.findOne({email: doctorData.email});
         if(!userEmail){
            res.status(userEmail.status).send({message:userEmail.message});
         }else{
            const password = await Doctor.findOne({password :doctorData.password});
            if(!password){
                res.status(500).send({message:"Invailed password"});
            }else{
                res.status(200).send({message:"password successfully entered"});
            }
         }
        
    } catch (error) {
         res.status(500).send ({message :"invalid password"});    
    }
};

module.exports = {
    addDoctor,
    getAllDocters,
    loginDoctor
}