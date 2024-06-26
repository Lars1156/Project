const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const routeAPI = require('./routes/api');
const port = 5000;

const app = express();

dotenv.config();

const {connection} = require('./config/db');

// connections 
connection('mongodb://127.0.0.1:27017/admin').then(()=>{
    console.log("Database connection successfully");
}).catch((err)=>{
    console.log("Ecrror database .conntection failed");
    console.log(err);
});

// conntection between frontend to backend
corsOption = {
    origin:'http://localhost:3000',
    optionSuccessfulStatus: 200
}

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(express.json());

app.use('/api', routeAPI)

app.listen (port, ()=>{
    console.log(`Server is listing on port ${port}`);
});
