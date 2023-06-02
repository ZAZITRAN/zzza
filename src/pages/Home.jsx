import React, { useState } from 'react'
import Header from '../components/layout/Header';
import { useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import CardItem from '../components/wigets/CardItem/CardPets';
import CartProduct from '../components/wigets/CardItem/CardProduct';
import { quickSortPurchasess } from '../utils/quickSort';

import { Swiper, SwiperSlide } from "swiper/react";



// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper";
import "./Home.scss"
import Footer from '../components/layout/Footer';

function Home() {
    const [petsOrProducts, setPetsOrProducts] = useState('pets')
    let pathname = window.location.pathname
    const { pets } = useSelector(state => state.pets)
        console.log(pets);
    const { products } = useSelector(state => state.products)

    const spliceArr = (array) => {
        const result = []
        for (let index = array.length - 4; index < array.length; index++) {
            result.push({ ...array[index] })

        }
        return result
    }
    console.log(spliceArr(pets));
    const changeToProducts = () => {
        setPetsOrProducts(`products`)
    }
    const changeToPets = () => {
        setPetsOrProducts(`pets`)
    }
    return (<>
        <Header pathName={pathname} />
        <div className='home'>

            <div className='newest'>
                <div className="newest-text"> NEWEST</div>
                <div className="newest-tab">
                    <p onClick={changeToPets} style={petsOrProducts==="pets" ? {borderBottom: `1px solid grey`}:{borderBottom:"none"}} className='newest-tab-pets'>PETS</p>
                    <p onClick={changeToProducts} style= {petsOrProducts==="products" ? {borderBottom: `1px solid grey`}:{borderBottom:"none"}} className='newest-tab-products'>PRODUCTS</p>
                </div>
                {petsOrProducts === `products`
                    ?
                    <Row>
                        {spliceArr(products).length > 0 && spliceArr(products).map((product, i) => {
                            return (

                                <Col className='products-list-item-card-col'
                                    xxl={6} xl={6} lg={8} md={12} sm={24}
                                    key={product.id}
                                >
                                    <CartProduct

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

                        {spliceArr(pets).length > 0 && spliceArr(pets).map((pet, i) => {
                            return (

                                <Col
                                    xxl={6} xl={6} lg={8} md={12} sm={24}
                                    key={i}
                                >
                                    <CardItem

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
            </div>
            <div className='sale'>
                <div className='sale-text'>SALE</div>
                <>
                    <Swiper
                            
                        slidesPerView={1}
                        spaceBetween={50}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}

                        breakpoints={{
                            480: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1020: {
                                slidesPerView: 3,
                                spaceBetween: 15,
                            },
                            1441: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                        }}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"

                    >
                        {products.filter(product => product.sale !== 0).length > 0 && products.filter(product => product.sale !== 0).map(product => {
                            return (

                                <SwiperSlide key={product.id}>

                                    <CartProduct

                                        id={product.id}
                                        image={product.image}
                                        name={product.name}
                                        sale={product.sale}
                                        price={product.price}
                                    />
                                </SwiperSlide>


                            )
                        })}
                    </Swiper>
                </>

            </div>
        </div>
    <Footer/>
    </>
    );
}

export default Home;