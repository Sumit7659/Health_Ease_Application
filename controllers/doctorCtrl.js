const doctorModel=require ('../models/doctorModel')
const getDoctorInfoController=async(req,res)=>{
    try{
        const doctor=await doctorModel.findOne({userId:req.body.userId})
        res.status(200).send({
            success:true,
            message:'Doctor Data Fetch Success',
            data:doctor,
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in fetching Doctor details'
        })
    }
}

//update doc profile
const updateProfileController=async(req,res)=>{
    try{
        const doctor=await doctorModel.findOneAndUpdate({userId:res.body.userId},req.body)
        res.status(201).send({
            success:true,
            message:'Doctor profile Updated',
            data:doctor, 
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Doctor Profile update issue',
            error
        })
    }
}

module.exports={getDoctorInfoController,updateProfileController} 