const User = require("../models/usermodel"); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Sign Up Users

exports.usersingup = async (req, res) => {
  const { firstname,lastname, email,password, address,phonenumber,confirmpassword } = req.body;
      console.log("req.body",req.body)
  if (password !== confirmpassword) {
    return res.status(400).json({ msg: "Password and Confirm Password do not match" });
  }

  try {

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10); // Salt factor of 10

    // Create a new user document in MongoDB
    const createUser = await User.create({
      firstname:firstname,
      lastname:lastname,
      phonenumber:phonenumber,
      email:email,
      address:address,
      password:hashPassword,
      confirmpassword:confirmpassword,
 
    });

    res.json({ success: true, msg: "User Registered Successfully", createUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};



// Login Users

exports.userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email in MongoDB
    const user = await User.findOne({ email });

    if (user) {
      if (!user.isActive) {
        res.status(401).json({ success: false, msg: "User is inactive. Cannot login." });
      } else {
        const cmpPwd = await bcrypt.compare(password, user.password);

        if (cmpPwd) {
          const token = jwt.sign({ user }, "secretkey");
          res.status(200).json({ success: true, token });
        } else {
          res.status(401).json({ success: false, msg: "Invalid password" });
        }
      }
    } else {
      res.status(401).json({ success: false, msg: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Server error", error: error.message });
  }
};



exports.getuser = async (req, res)=>{
 const getuser = await User.find();
 if(getuser){
    return res.status(200).json({success :true , msg :"all user" ,getuser:getuser})
 }else
 {
    return res.status(400).json({success :false , msg :"user not found"})

 }
};


// API to get a user by ID

exports.get = async (req, res) => {
  try {
    const _id = req.query._id;
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ success: false, msg: 'User not found' });
    }

    return res.status(200).json({ success: true, msg: 'User found', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: 'Server error' });
  }
};



exports.deleteuser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Check if the user exists in the database
    const user = await User.findByIdAndRemove(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the user from the database


    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Update a user by ID

exports.updateuser=async (req, res) => {
 const userId = req.params.userId;

   const {firstname,lastname,email,phonenumber,address} = req.body;


  try {
    
     const updatedUser = await User.findByIdAndUpdate({_id:userId}, {
      firstname:firstname,
      lastname:lastname,
      email:email,
      phonenumber:phonenumber,
     }, { new: true });

     if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
     }
     updatedUser.save()
     res.status(200).json({ message: 'User updated successfully', user: updatedUser });
   } catch (error) {
    console.error(error);
     res.status(500).json({ message: 'Server error' });
   }
};







