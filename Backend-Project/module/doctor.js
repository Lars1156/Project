const mongoose = require("mongoose");

const doctorShema = new mongoose.Schema({
  name: { type: String },
  phomeNumbber: { type: String },
  gender: { type: String },
  age: { type: Number},
  dateOfbirth: { type: String },
  email: { type: String },
  password: { type: String },
  address: { Type: String },
  spaciliation: { type: String },
});

const Docter = mongoose.model("doctor", doctorShema);
module.exports = Docter;
