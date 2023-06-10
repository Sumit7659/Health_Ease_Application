import React from 'react'
import Layout from './../components/Layout'
import {Col, Form, Row,Input, TimePicker,message} from 'antd'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import axios from 'axios'

const ApplyDoctor = () => {
const {user}=useSelector(state=>state.user) 
  const dispatch= useDispatch()
  const navigate = useNavigate()
  const handleFinish=async(values)=>{
    try{
      dispatch(showLoading())
      const res= await axios.post('/api/v1/user/apply-doctor',{...values,userId:user._id},{headers:{
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

  return (
    <Layout>
      <h1 className='text-center'>Apply Doctor</h1>
      <Form layout='vertical' onFinish={handleFinish} className='m-3'>
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
          <Col xs={24} md={24} lg={8}><button className='btn btn-primary form-btn' type='submit'>Submit</button></Col>
      </Row>
      </Form>
    </Layout>
  )
}

export default ApplyDoctor
