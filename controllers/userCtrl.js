const userModel =require("../models/userModels")
const bcrypt=require("bcryptjs")
const jwt = require("jsonwebtoken")
const doctorModel=require('../models/doctorModel')
//register Callback
const registerController =async(req,res)=>{
    try{
        const exisitingUser=await userModel.findOne({email:req.body.email})
        if(exisitingUser){
            return res.status(200).send({message:'User alredy Exist',success:false})
        }
        const password=req.body.password
        const salt = await bcrypt.genSalt(10) 
        const hashedPassword=await bcrypt.hash(password,salt) 
        req.body.password=hashedPassword
        const newUser=new userModel(req.body) 
        await newUser.save()
        res.status(201).send({message:'Register Successfully',success:true})
    } catch(error){
        console.log(error)
        res.status(500).send({success:false,message:`Register Controller ${error.message}`})
    }
}


//login callback
const loginController =async(req,res)=>{
    try{
        const user =await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(200).send({message:'User not found',success:false})
        }
        const isMatch= await bcrypt.compare(req.body.password, user.password) 
        if(!isMatch){
            return res.status(200).send({message:"Invalid Email or Password", success:false}) 
        }
        const token =jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'}) 
        res.status(200).send({message:'Login Success',success:true,token})

    }catch(error){
        console.log(error)
        res.status(500).send({message:`Error in Login CTRL ${error.message}`})
    }
};

const authController=async(req,res)=>{
    try{
        const user= await userModel.findById({_id:req.body.userId})
        user.password= undefined
        if(!user){
            return res.status(200).send({message:'User not found',success:false})
        }
        else{
            res.status(200).send({success:true,data:user})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({message:'auth error',success:false,error})
    }
}

//Apply doctor Ctrl
const applyDoctorController=async(req,res)=>{
    try{
        const newDoctor = await doctorModel({...req.body,status:'pending'})
        await newDoctor.save()
        const adminUser=await userModel.findOne({isAdmin:true})
        const notification = adminUser.notification
        notification.push({
            type:'apply-doctor-request',
            message:`${newDoctor.firstName} ${newDoctor.lastName} Has applied for a doctor Account`,
            data:{
                doctorId: newDoctor._id,
                name:newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath:'/admin/doctors'  
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id, {notification})
        res.status(201).send({success:true,message:'Doctor account applied Successfuly'
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({success:false,error,message:'Error while applying for Doctor'})
    }
}

module.exports={loginController,registerController,authController,applyDoctorController}