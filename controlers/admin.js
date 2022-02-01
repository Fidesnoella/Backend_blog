const Admin = require(`../models/admin`);
const mongoose = require(`mongoose`);
const jwt = require(`jsonwebtoken`);
const bcrypt = require(`bcrypt`);
const { object } = require("joi");
const { use } = require("chai");


const adminController = async (req, res, next) => {
  
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create new user
  const admin = new Admin({
    full_name: req.body.full_name,
    email: req.body.email,
    password: hashedPassword,
  });

  const savedAdmin = await admin.save();
  let { password, ...AdminInfo } = savedAdmin._doc;
  res.status(201).json({ message: `created`,AdminInfo });
};


// Login
const adminloginController = async (req, res) => {

  // check admin  before login
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) return res.status(400).send(`Email is not found`);

  // password is correct
  const validPass = await bcrypt.compare(req.body.password, admin.password);
  if (!validPass)
    return res.status(400).json({ message: "Invalid credentilas" });

  //  create and assign token
  const token = jwt.sign({ _id: admin._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).json({ token });
};

module.exports = {
  adminController,
  adminloginController
};
