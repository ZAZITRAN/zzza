import React, { useState } from 'react'
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton, GithubLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import { Button, Form, Input } from 'antd';

import "./LoginRegister.scss"
import Header from '../components/layout/Header';

import axios from 'axios';
import LoginSocial from '../components/wigets/LoginRegister/LoginSocial';
import ModalLogin from '../components/modal/ModalLogin';
import { useDispatch, useSelector } from 'react-redux';
import { syncCart } from '../feature/reducer/cartReducer';
import { useCookies } from 'react-cookie';
import Footer from '../components/layout/Footer';




function Login() {
    let pathname = window.location.pathname
    const [title, setTitle] = useState("")
    const [openModalLogin, setOpenModalLogin] = useState(false)
 
    const {cart}=useSelector(state=>state.cart)
    const cookie=useCookies([`cartLocal`])
    const cartCookie=cookie[0].cartCookie;
const dispatch=useDispatch()

    const onFinish = (value) => {


        setOpenModalLogin(true)
        axios.post(`http://localhost:8080/auth/login`, value)
            .then(res => {
                setTitle(res.data.mess)
                if (res.data.mess === "Login Success") {
                    localStorage.setItem("userLogin", JSON.stringify(
                        {
                            ...res.data.data
                        }))
                        dispatch(syncCart({userId:res.data.data.id, cart:cart, cartCookie:cartCookie }))
                    setTitle("Login Success")

                } else {
                    setTitle("Email or Password doesn´t match")
                }
                
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
                    onFinish={onFinish}
                >
                    <Form.Item name="email" label="Email">
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item name="password" label="Password">
                        <Input.Password type='password' />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>Login</Button>
                    </Form.Item>
                </Form>
                <div className='social-login'>
                    <p>-------Or------- </p>
                    <div className='social-list'>
                        <LoginSocial />
                        {/*   <FacebookLoginButton className='social-btn'/>
                        <GoogleLoginButton className='social-btn'/>
                        <GithubLoginButton className='social-btn'/> */}
                    </div>
                </div>
            </div>;
            <Footer/>
            <ModalLogin title={title} openModalLogin={openModalLogin} />
        </>
    )

}

export default Login;