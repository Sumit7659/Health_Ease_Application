const express =require ('express')
const { getDoctorInfoController, 
    updateProfileController, 
    getDoctorByIdController, 
    doctorAppointmentController,
    updateStatusController} = require('../controllers/doctorCtrl')
const authmiddleware = require('../middlewares/authmiddleware')
const router=express.Router()


// POST Single DOC info
router.post('/getDoctorInfo',authmiddleware,getDoctorInfoController)

//POST update profile
router.post('/updateProfile',authmiddleware,updateProfileController)

// Post GET single doc info
router.post('/getDoctorById',authmiddleware,getDoctorByIdController)


//GET Appointments
router.get('/doctor-appointments',authmiddleware,doctorAppointmentController)

//POST Update status
router.post('/update-status',authmiddleware,updateStatusController)

module.exports=router