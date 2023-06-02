import React from 'react'
import Header from '../components/layout/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/Footer';

function Products() {
    const pathname=window.location.pathname
    return ( <>
    <Header pathName={pathname}/>
    <Outlet/>
    <Footer/>
    </> );
}

export default Products;