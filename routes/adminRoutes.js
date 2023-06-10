const express =require('express')
const router=express.Router()
const authmiddleware = require("../middlewares/authmiddleware");
const { getAllUsersController, getAllDoctorsController,changeAccountStatusController } = require('../controllers/adminCtrls');


// Get Method ||User
router.get('/getAllUsers',authmiddleware,getAllUsersController)

// Get Method ||Doctor
router.get('/getAllDoctors',authmiddleware,getAllDoctorsController)

//POst Account Status
router.post('/changeAccountStatus',authmiddleware,changeAccountStatusController)

module.exports=router