import React, {useEffect, useState} from 'react';
import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import ModalLogin from '../../modal/ModalLogin';
import axios from "axios"

function LoginSocial() {
    const {cart}=useSelector(state=>state.cart)
    
    const cookie=useCookies("cartCookie");
    const cartCookie=cookie[0].cartCookie
    
    const dispatch=useDispatch()
    const [openModalLogin,setOpenModalLogin]=useState(false)
    const [title,setTitle]=useState("")
    const [userAdress,setUserAdress]=useState([])

    useEffect(()=>{
        axios.get("http://localhost:9000/adress")
        .then(res=>{
            setUserAdress(res.data)
        })
        .catch(err=>{
            console.log(err);
        })
    },[])

    return (
    <>
         <LoginSocialFacebook
                    appId='1875329839511996'
                    onResolve={(response) => {
                        console.log("fb",response);
                       const data={
                        id: response.data.id,
                        username: response.data.name,
                        image: response.data.picture.data.url,
                        type:"social"
                       }
                       localStorage.setItem("userLogin", JSON.stringify(data))
                      /*  dispatch(syncCart({cartCookie:cartCookie, cart:cart, userId:data.id })) */
                      
                       setTitle("Login Success")
                       setOpenModalLogin(true)
                       let findIndex=userAdress.findIndex(e=>e.id===data.id)
                       if(findIndex===-1){
                        axios.post("http://localhost:9000/adress",{id:data.id, adress:"", phone:"" })
                        .then(res=>{
                           
                        })
                        .catch(err=>{
                            console.log(err);
                        })
                       }
                    }}
                    onReject={(error) => {
                        console.log(error);
                    }}
                >
                    <FacebookLoginButton />
                </LoginSocialFacebook>

                <LoginSocialGoogle
                    client_id='917600885255-esm9ddl7erqo604lo1h5uuvdqamulqpt.apps.googleusercontent.com'
                    onResolve={(response) => {
                        console.log("gg->",response);
                        const data={
                           id:response.data.sub,
                            username: response.data.name,
                            image: response.data.picture,
                            type:"social"
                           }
                           localStorage.setItem("userLogin", JSON.stringify(data))
                           setTitle("Login Success")
                           setOpenModalLogin(true)

                           let findIndex=userAdress.findIndex(e=>e.id===data.id)
                           if(findIndex===-1){
                            axios.post("http://localhost:9000/adress",{ id: data.id,phone:"", ward:'', district:'', province:"" })
                            .then(res=>{
                               
                            })
                            .catch(err=>{
                                console.log(err);
                            })
                           }
                    }}
                    onReject={(error) => {
                        console.log(error);
                    }}
                >
                    <GoogleLoginButton/>
                </LoginSocialGoogle>
            <ModalLogin cart={cart} title={title} openModalLogin={openModalLogin} />
    </>  );
}

export default LoginSocial;