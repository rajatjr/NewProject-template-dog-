const express = require("express");
const router =express.Router()

const { adminsingup,adminlogin }=require('../controllers/admincontroller')
router.post("/adminsingup",adminsingup)
router.post("/adminlogin",adminlogin)




module.exports =router;
