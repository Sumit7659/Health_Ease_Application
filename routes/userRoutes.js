const express= require("express");

const {
    loginController,
    registerController,
    authController,
    applyDoctorController,
    getAllNotificationController,
    deleteAllNotificationController,
    getallDoctorsCtrl,
    bookAppointmentController,
    bookingAvailabilityController,
    userAppointmentsContoller
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

//Notification delete ||POST
router.post('/delete-all-notification',authmiddleware , deleteAllNotificationController);

//GET all Doc
router.get('/getAllDoctors',authmiddleware,getallDoctorsCtrl)

//Book Appointment
router.post('/book-appointment',authmiddleware,bookAppointmentController)

//Booking Aval 
router.post('/booking-availbility',authmiddleware,bookingAvailabilityController)


//Appointments list
router.get('/user-appointment',authmiddleware,userAppointmentsContoller)

module.exports=router;