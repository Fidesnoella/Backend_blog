const contactInfo = require(`../models/contact`);
const mongoose = require(`mongoose`);
const {contactValidation} = require(`../middlewares/contact`)

const contactInfoController = async (req, res) =>{

     //  Validate data 
     const{error} = contactValidation(req.body);
if (error) return res.status(400).send(error.details[0].message);

  const {full_name, email,phone, message} = req.body;
  try {
      const newInfo = new contactInfo ({
          full_name,
          email,
          phone,
          message
      })
     const saveInfo = await newInfo.save()
     res.status(201).json({message:`Thank you for your feedback`, saveInfo});
  } catch(err){
res.status(500).json({message:err});
  }
}

const getcontactInfos = async (req, res) =>{
  try {
      const allInformation = await contactInfo.find()
      res.status(200).json({message: `All contactInformation`, allInformation});
  }catch(err){
res.status(500).json({message: err})
  }
}

const getcontactInfo = async (req, res) =>{
  const{_id} = req.params
  try {
      const contactInfos = await contactInfo.findById({_id})
      if(!contactInfos) return res.status(404).json({message: `ContactInformation not found`})

      res.status(200).json({contactInfos});
  }catch(err){
res.status(500).json({message: err})
  }
}

const updateContactInfo = async (req, res) =>{
      //  Validate data 
      const{error} = contactValidation(req.body);
if (error) return res.status(400).send(error.details[0].message);

  const {full_name, email, phone, message} = req.body;
  try{
    const{_id} = req.params
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({err: `Invalid id`})
  
    const updatedContactInfo = await contactInfo.updateOne({_id}, {$set: {full_name, email, phone, message}}, {new:true})
    res.status(200).json({message: `ContactInformation updated successfully`, updatedContactInfo})
  
  }catch (error){
    res.status(500).json({message: error})
  }
}

const deleteContactInfo = async (req, res) =>{
  const{_id} = req.params
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({err: `Invalid id`})

  try{
  const deletedContactInfo = await contactInfo.deleteOne({_id})
  res.status(200).json({message: `ContactInformation Deleted successfully`, deletedContactInfo})
  }catch(error){
    res.status(500).json({message: error})
  }
}

module.exports = {
  contactInfoController,
  getcontactInfos,
  getcontactInfo,
  updateContactInfo,
  deleteContactInfo
}