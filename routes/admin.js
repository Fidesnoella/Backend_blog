const express = require(`express`);
const { verify } = require("jsonwebtoken");
const adminController = require(`../controlers/admin`);
const { asyncHandler } = require("../middlewares/auth");
const router = express.Router();


router.post(`/signup`, asyncHandler(adminController.adminController));

router.post(`/login`, asyncHandler(adminController.adminloginController));


module.exports = router;
