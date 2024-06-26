const mongoose = require('mongoose');
 async function connection(uri){
    return await mongoose.connect(uri)
 }
 module.exports = {connection}