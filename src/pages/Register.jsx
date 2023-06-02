import React, {useState, useEffect} from 'react'


import { Button, Form, Input } from 'antd';
import Header from '../components/layout/Header';
import "./LoginRegister.scss"
import axios from 'axios';
import AlertRegister from '../components/modal/ModalRegister';
import LoginSocial from '../components/wigets/LoginRegister/LoginSocial';
import ModalRegister from '../components/modal/ModalRegister';
import Footer from '../components/layout/Footer';


function Register() {
    let pathname = window.location.pathname

    const [openModalRegister,setOpenModalRegister]=useState(false)
    const [title,setTitle]=useState('')
    
   

    const onFinish=(value)=>{
        setOpenModalRegister(true)
        const item={
            id: Date.now(), 
            username:value.username,
            email:value.email,
            password:value.password,
            image: "https://res.cloudinary.com/dhknvtaq2/image/upload/v1680766831/Bong-ro/666201_bllgb8.png",
            type:"email"
        }
        axios.post(`http://localhost:8080/auth/register`, item)
            .then(res => {
                setTitle(res.data.mess)
            })
            .catch(err => {
                console.log(err);
            })
        axios.post(`http://localhost:9000/adress`,
            {
               id: item.id,phone:"", ward:'', district:'', province:""
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err);
            })    
    }
    return (
        <>
            <Header pathName={pathname} />


            <div className='login'>
             
 
                <Form
                layout='vertical'
                onFinish={onFinish}>
                    <Form.Item name="email" label="Email"
                    rules={[
                        {required:true},
                        {type:'email'}
                    ]}>
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item name="username" label="Username"
                    rules={[
                        {required:true},
                        {min:6},
                        {whitespace:true}
                    ]}>
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item name="password" label="Password"
                    rules={[
                        {required:true},
                        {min:6},
                        {whitespace:true}
                    ]}>
                        <Input.Password type='password' />
                    </Form.Item>
                    <Form.Item name="confirmPassword" label="Confirm password"
                    rules={[
                        { required: true },
                        ({getFieldValue})=>({
                            validator(_,value){
                                if(!value || getFieldValue("password")===value){
                                    return Promise.resolve()
                                }
                                return Promise.reject('Confirm password doesn´t not match')
                            }
                        })
                    ]}>
                        <Input.Password type='password' />
                    </Form.Item>
                    <Form.Item >
                        <Button type='primary' htmlType='submit'>Register</Button>
                    </Form.Item>
                </Form>
                <div className='social-login'>
                    <p>--------Or--------</p>
                    <div className='social-list'>
                        <LoginSocial/>
                     
                    </div>
                </div>
            </div>;
            <Footer/>
            <ModalRegister title={title} openModalRegister={openModalRegister}/>
        </>
    )
}
export default Register;