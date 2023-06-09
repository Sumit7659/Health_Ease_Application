import axios from 'axios'
import Layout from '../../components/Layout'
import React, { useEffect, useState } from 'react'
import { useParams,useNavigate  } from 'react-router-dom'
import {Col, Form, Row,Input,message,TimePicker} from 'antd'
import {useDispatch,useSelector} from 'react-redux'
import { hideLoading, showLoading } from '../../redux/features/alertSlice'
import moment from 'moment'

const Profile = () => {
    const {user}=useSelector(state=>state.user)
    const [doctor,setDoctor]=useState(null)
    const params=useParams()
    const dispatch= useDispatch()
    const navigate = useNavigate()

    //update doc
    const handleFinish=async(values)=>{
        try{
          dispatch(showLoading())
          const res= await axios.post('/api/v1/doctor/updateProfile',
          {...values,userId:user._id,
          timings:[
            moment(values.timings[0]).format('HH:mm'),
            moment(values.timings[1]).format('HH:mm')
          ]},
          {headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}` 
          }})
          dispatch(hideLoading())
          if(res.data.success){
            message.success(res.data.message)
            navigate('/')
          }
          else{
            message.error(res.data.success)
          }
        }catch(error){
          dispatch(hideLoading())
          console.log(error)
          message.error('Something went Wrong')
        }
        
      }
    //getDoctorDetails
    const getDoctorInfo=async()=>{
        try{
            const res= await axios.post('/api/v1/doctor/getDoctorInfo',
            {userId:params.id},
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                setDoctor(res.data.data)
            }
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getDoctorInfo();
        // eslint-disable-next-line
    },[])
  return (
    <Layout>
      <h1>Manage Profile</h1>
      {doctor && (
        <Form layout='vertical' onFinish={handleFinish} className='m-3' initialValues={{
          ...doctor,timings:[moment(doctor.timings[0],'HH:mm'),moment(doctor.timings[0],'HH:mm')]
        }}>
        <h4>Personal Details:</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label='First name' name='firstName' required rules={[{required:true}]}>
              <Input type='text' placeholder='Your Name'/> 
            </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
            <Form.Item label='Last name' name='lastName' required rules={[{required:true}]}>
              <Input type='text' placeholder='Your Last Name'/> 
            </Form.Item>
            </Col>
            
            <Col xs={24} md={24} lg={8}>
            <Form.Item label='Phone ' name='phone' required rules={[{required:true}]}>
              <Input type='text' placeholder='Your Phone Number'/> 
            </Form.Item>
            </Col>
            
            <Col xs={24} md={24} lg={8}>
            <Form.Item label='Email' name='email' required rules={[{required:true}]}>
              <Input type='text' placeholder='Your Email'/> 
            </Form.Item>
            </Col>
            
            <Col xs={24} md={24} lg={8}>
            <Form.Item label='Website' name='website' >
              <Input type='text' placeholder='Your Website'/> 
            </Form.Item>
            </Col>
            
            <Col xs={24} md={24} lg={8}>
            <Form.Item label='Address' name='address' required rules={[{required:true}]}>
              <Input type='text' placeholder='Your Address'/> 
            </Form.Item>
            </Col>
        </Row>
  
        <h4>Professional Details:</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label='Specialization' name='specialization' required rules={[{required:true}]}>
              <Input type='text' placeholder='Your Specialization'/> 
            </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
            <Form.Item label='Experiance' name='experiance' required rules={[{required:true}]}>
              <Input type='text' placeholder='Your Experiance'/> 
            </Form.Item>
            </Col>
            
            <Col xs={24} md={24} lg={8}>
            <Form.Item label='Fee Per Cunsaltation' name='feePerCunsaltation' required rules={[{required:true}]}>
              <Input type='text' placeholder='Your Fee'/> 
            </Form.Item>
            </Col>
            
            <Col xs={24} md={24} lg={8}>
            <Form.Item label='Timing' name='timings' required rules={[{required:true}]}>
              <TimePicker.RangePicker format='HH:mm'/>
            </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}></Col>
            <Col xs={24} md={24} lg={8}><button className='btn btn-primary form-btn' type='submit'>Update</button></Col>
        </Row>
        </Form>
      )}
    </Layout>
  )
}

export default Profile
