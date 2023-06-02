import React,{useState} from 'react'
import Header from '../components/layout/Header';

import { Outlet, Routes, Route } from 'react-router-dom';
import Footer from '../components/layout/Footer';


function Cart() {
    

  
    const pathname = window.location.pathname 
    if(pathname==="/cart"){

        window.location.href="/cart/cart-list"
       
    }

    
  
    return (
        <>
        
            <Header  pathName={pathname} />
            
           
                <Outlet
                
                />
                
            <Footer/>

        </>);
}

export default Cart;