import React, { useState, } from 'react'
import Header from '../components/layout/Header';
import { useDispatch, useSelector } from 'react-redux';

import "./Whishlist.scss"
import { Col, Row } from 'antd';
import CartProduct from '../components/wigets/CardItem/CardProduct';
import CardItem from '../components/wigets/CardItem/CardPets';
import Footer from '../components/layout/Footer';



function Whishlist() {
    const userInfo = JSON.parse(localStorage.getItem("userLogin"));
    if(userInfo===null){
        alert("Please Login first")
        window.location.href="/login"
    }
    let pathname = window.location.pathname
    const [petsOrProducts, setPetsOrProducts] = useState('pets')
    const {whishlist} = useSelector((state) => state.whishlist)
    const {pets}=useSelector(state=>state.pets)
    const {cart}=useSelector(state=>state.cart)

    
    let dispatch = useDispatch()

   /*  const handleAddToCart=(id)=>{
        let findIndex=pets.findIndex(pet=>pet.id===id)
        const data={...pets[findIndex], id:Date.now(), userId:userInfo.id}
        dispatch(addToCart({
            item:data,
            cart:cart
        }))
    }
    const handleRemove = (id) => {
        dispatch(removeWhishlist(id))
    } */
    const changeToProducts = () => {
        setPetsOrProducts(`products`)
    }
    const changeToPets = () => {
        setPetsOrProducts(`pets`)
    }
    const changeToAll = () => {
        setPetsOrProducts(`all`)
    }
    const filterClassWhishlist= (x)=>{
        
        let filter=whishlist.filter(e=>e.class===x)
        return filter
    }

    return (
        <>
            <Header pathName={pathname} />
          
            <div className='whishlist'>
            <div className="whishlist-tab">           
                    <p onClick={changeToPets} style={petsOrProducts==="pets" ? {borderBottom: `1px solid grey`}:{borderBottom:"none"}} className='whishlist-tab-pets'>PETS</p>
                    <p onClick={changeToProducts} style= {petsOrProducts==="products" ? {borderBottom: `1px solid grey`}:{borderBottom:"none"}} className='whishlist-tab-products'>PRODUCTS</p>
                </div>
            </div>
            {petsOrProducts===`products`
            ?
            <Row>
            {filterClassWhishlist("products").length > 0 && filterClassWhishlist("products").map((product, i) => {
                return (

                    <Col className='products-list-item-card-col'
                        xxl={6} xl={6} lg={8} md={12} sm={24}
                        key={product.id}
                    >
                        <CartProduct
                           pathname={pathname}
                            id={product.id}
                            image={product.image}
                            name={product.name}
                            sale={product.sale}
                            price={product.price}
                        />
                    </Col>

                )

            })}
            </Row>
            :
            <Row className='pets-list-item-card'>

            {filterClassWhishlist("pets").length > 0 && filterClassWhishlist("pets").map((pet, i) => {
                return (

                    <Col
                        xxl={6} xl={6} lg={8} md={12} sm={24}
                        key={i}
                    >
                        <CardItem
                           pathname={pathname}
                            id={pet.id}
                            image={pet.image}
                            age={pet.age}
                            type={pet.type}
                            price={pet.price}
                        />
                    </Col>

                )

            })}

        </Row>
            }
           <Footer/>
        </>
    );
}

export default Whishlist;