const express= require("express");

const {
    loginController,
    registerController,
    authController,
}=require("../controllers/userCtrl");
const authmiddleware = require("../middlewares/authmiddleware");
//router object
const router=express.Router();

//router
//LOGIN ||POST
router.post("/login",loginController);

//REGISTER||POST
router.post("/register",registerController);

//Auth ||POST
router.post('/getUserData',authmiddleware , authController);
module.exports=router;