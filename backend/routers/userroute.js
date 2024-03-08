const express = require("express");
const router =express.Router()
const {usersingup,userlogin,getuser ,get , deleteuser, updateuser}=require("../controllers/usercontroller")
 
router.post("/usersingup",usersingup);
router.post("/userlogin",userlogin)
router.get("/getuser",getuser)
router.get("/userget",get)
router.delete('/deleteuser/:userId',deleteuser)
router.put("/updateuser/:userId",updateuser )





module.exports =router;