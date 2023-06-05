const mongoose = require ('mongoose')
const doctorSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    firstName:{
        type:String,
        required:[true,'first name is required']
    },
    lastName:{
        type:String,
        required:[true,'last name is required']
    },
    phone:{
        type:String,
        required:[true,'Phone number is required']
    },
    emial:{
        type:String,
        required:[true,'Email is required']
    },
    website:{
        type:String 
    },
    address:{
        type:String,
        required:[true,'Address is required']   
    },
    specialization:{
        type:String,
        required:[true,'Specialization is reuired']
    },
    experiance:{
        type:String,
        required:[true,'expericance is required']
    },
    feePerCunsaltaion:{
        type:Number,
        required:[true,'fee is required']
    },
    timing:{
        type:Object,
        required:[true,'Work timing is required']
    }
},{timestamps:true})


const doctorModel = mongoose.model('users',doctorSchema)
module.exports = doctorModel