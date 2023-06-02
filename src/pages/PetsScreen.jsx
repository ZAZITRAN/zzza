import React, { useEffect, useState } from 'react'
import Header from '../components/layout/Header';


import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/Footer';

function PetsScreen() {
    
    const pathname = window.location.pathname 
    if (pathname==="/pets"){
        window.location.href="/pets/pets-list"
    }
    return (
        <>
            <Header pathName={pathname} />
        <Outlet/>
        <Footer/>
        </>);
}

export default PetsScreen;