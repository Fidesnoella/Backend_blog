const { string } = require("joi");
const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;


const adminSchema = new Schema({
  full_name: {
    type: String,
    require: true,
    min: 4,
  },
 email : {
    type: String,
    require:true,
    unique:true,
    lowercase:true,
  },
  password :{
    type: String,
    require: true,
    minlength: 6
  },

}, { timestamps: true});


const Admin =  mongoose.model(`Admin`, adminSchema)
module.exports =  Admin;
