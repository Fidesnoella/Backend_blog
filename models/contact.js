const { string } = require("joi");
const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const infoSchema = new Schema({
  full_name: {
    type: String,
    require: true,
    min: 4,
    max: 255
  },
 email : {
    type: String,
    require: true,
    min: 6,
    max: 255
  },
  phone : {
    type: String,
    require: true,
    min: 10
  },
  message :{
    type: String,
    require: true,
    min: 6,
    max: 255
  }

}, { timestamps: true});

const contactInfomation =  mongoose.model(`contactInfomation`, infoSchema)
module.exports =  contactInfomation;
