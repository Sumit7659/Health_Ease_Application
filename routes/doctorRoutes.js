const express =require ('express')
const authMiddleware=require('../middlewares/authmiddleware')
const { getDoctorInfoController, updateProfileController } = require('../controllers/doctorCtrl')
const router=express.Router()


// POST Single DOC info
router.post('/getDoctorInfo',authMiddleware,getDoctorInfoController)

//POST update profile
router.post('/updateProfile',authMiddleware,updateProfileController)

module.exports=router