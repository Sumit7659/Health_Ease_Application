const express= require("express");

const {
    loginController,
    registerController,
    authController,
    applyDoctorController,
    getAllNotificationController
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

//Apply Doctor ||POST
router.post('/apply-doctor',authmiddleware , applyDoctorController);

//Notification ||POST
router.post('/get-all-notification',authmiddleware , getAllNotificationController);
module.exports=router;