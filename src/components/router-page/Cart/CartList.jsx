import React, {  useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Breadcrumb, ConfigProvider, List, Modal,Button } from 'antd';
import { numberWithCommas } from '../../../utils/NumberWithComat';
import cartReducer from '../../../feature/reducer/cartReducer';
import { increase, decrease, remove } from '../../../feature/reducer/cartReducer';


import "./CartList.scss"
import { increaseCartOnCookie, decreaseCartOnCookie, checkOrRemoveCheckItemCartOnCookie, removeCartOnCookie, checkOrRemoveCheckAllCartOnCookie } from '../../../utils/saveCartOnCookie';
import { useCookies } from 'react-cookie';
import { totalPrice } from '../../../utils/totalPrice';
import ModalFirstLoginOfFeature from '../../modal/ModalFirstLoginOfFeature';





const Checkbox = ({ id, type, name, handleClick, isChecked }) => {
    return (
        <input
            style={{ fontSize: "20px" }}
            id={id}
            name={name}
            type={type}
            onChange={handleClick}
            checked={isChecked}
        />
    );
};
function CartList() {


   const [openModalFirstLogin,setOpenModalFirstLogin]=useState(false)
   const [openModalCheckout,setOpenModalCheckout]=useState(false)
   let userInfo = JSON.parse(localStorage.getItem("userLogin"))
    const [cookie, setCookie]=useCookies([`cartCookie`])
  
    let { cart } = useSelector((state) => state.cart)
    
    let cartFromId =cart.filter(e=>e.userId===userInfo.id)
    const [loading,setLoading]=useState(false)
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setOpenModalCheckout(false);
        }, 3000);
      };
    const handleCancel = () => {
        window.location.reload()
      };


    let dispatch = useDispatch()

    const [isCheckAll, setIsCheckAll] = useState(false)

    const handleSelectAll = e => {
        if(userInfo!==null){

            let newCart = []
            if (isCheckAll === false) {
                setIsCheckAll(true)
                for (let i = 0; i < cartFromId.length; i++) {
                    newCart.push(
                        {
                            name: cartFromId[i].name,
                            quantity: cartFromId[i].quantity,
                            price: cartFromId[i].price,
                            image: cartFromId[i].image,
                            id: cartFromId[i].id,
                            isChecker: true
                        }
                    )
                }
            } else {
                setIsCheckAll(false)
                for (let i = 0; i < cartFromId.length; i++) {
                    newCart.push(
                        {
                            name: cartFromId[i].name,
                            quantity: cartFromId[i].quantity,
                            price: cartFromId[i].price,
                            image: cartFromId[i].image,
                            id: cartFromId[i].id,
                            isChecker: false
                        }
                    )
                }
            }
            dispatch(cartReducer.actions.checkAll(newCart))
        }else{
            
            if (isCheckAll===false) {
                setIsCheckAll(true)
                
                setCookie("cartCookie",checkOrRemoveCheckAllCartOnCookie(true, cookie.cartCookie), ) 
            }else{
                setIsCheckAll(false)
                setCookie("cartCookie",checkOrRemoveCheckAllCartOnCookie(false, cookie.cartCookie), ) 

            }
        }

    };

    const continueShopping=()=>{
        console.log(11);
        window.location.href="/products/products-list/type=All"
    }
    const handleClick = (item) => {
        if (userInfo === null) {
           setCookie("cartCookie", checkOrRemoveCheckItemCartOnCookie(item.id, item.isChecker, cookie.cartCookie))
        } else {
            let newCart = [...cartFromId]
            let findIndex = newCart.findIndex(index => index.id === item.id)
            if (newCart[findIndex].isChecker === true) {
                newCart[findIndex] = {
                    ...item, isChecker: false
                }
            } else {
                newCart[findIndex] = {
                    ...item, isChecker: true
                }
            }

            dispatch(cartReducer.actions.checkBox(newCart))
        }
    }
    
    const handleIncrease = (item) => {
       
        if (userInfo === null) {
            setCookie("cartCookie",increaseCartOnCookie(item.id, cookie.cartCookie),{path:`/`})
        } else {
            dispatch(increase({ item: item }))
        }
    }

    const handleDecrease = (item) => {
        if (userInfo === null) {
            setCookie("cartCookie", decreaseCartOnCookie(item.id, cookie.cartCookie),{path:`/`})
           
        } else {
            dispatch(decrease({ item: item }))
        }
    }
    const handleRemove = (id) => {
        if (userInfo === null) {
           
            setCookie("cartCookie",removeCartOnCookie(id,cookie.cartCookie),{path:'/'})
           
        } else {
            dispatch(remove(id))
        }
    }
    const handleCheckout=()=>{
        if (userInfo === null) {
            setOpenModalFirstLogin(true)
        } else {
            if (totalPrice(cartFromId)>0) {
                window.location.href="/cart/checkout"
            }else{
                setOpenModalCheckout(true)
            }
        }
    }

    return (

        <div className="cart">
            <ModalFirstLoginOfFeature openModalFirstLogin={openModalFirstLogin}/>
            <Breadcrumb
                items={[{ title: "Cart" }]} />
            <div className='cart-title'>
                <p>Cart</p>
            </div>
            <div className="cart-info">
                <div className="cart-list">
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#8c8c8c',
                            },
                        }}
                    >   
                       
                       {/*  <div className="select-all">
                            <Checkbox
                                type="checkbox"
                                name="selectAll"
                                id="selectAll"
                                handleClick={handleSelectAll}
                                isChecked={isCheckAll}
                            />
                            <p>Select All</p>
                        </div> */}


                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: (page) => {
                                    
                                },
                                pageSize: 3,
                            }}
                            dataSource={userInfo !== null ? cartFromId : cookie.cartCookie}

                            renderItem={(item, ) => (
                                <List.Item  >
                                    <div className="product-cart">
                                        <Checkbox
                                            key={item.id}
                                            type="checkbox"
                                            name={item.name}
                                            id={item.id}
                                            handleClick={() => handleClick(item)}
                                            isChecked={item.isChecker}

                                        />
                                        <div className="product-info">
                                            <div className="img-product">
                                                <img src={item.image} alt="" />
                                            </div>
                                            <div className="right-list">
                                                <div className="bill-product">
                                                    <p className="name">{item.name}</p>
                                                    <p className="price"> VND {numberWithCommas(item.price)}</p>
                                                    <div className="quantity">
                                                        <button onClick={() => handleDecrease(item)} disabled={item.quantity === 0 ? true : false} className="img-decrease">
                                                            <img src="https://res.cloudinary.com/dhknvtaq2/image/upload/v1681921027/Bong-ro/-_sfeq2q.png" alt="" />
                                                        </button>

                                                        <p>{item.quantity}</p>
                                                        <button onClick={() => handleIncrease(item)} className="img-increase">
                                                            <img src="https://res.cloudinary.com/dhknvtaq2/image/upload/v1681921039/Bong-ro/yoqqtq5awc2bufnhhjiv.png" alt="" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div onClick={() => { handleRemove(item.id) }} className="remove">
                                                    <img src="https://res.cloudinary.com/dhknvtaq2/image/upload/v1681921492/Bong-ro/pngwing.com_n7nnnm.png" alt="" />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </ConfigProvider>

                </div>
                <div className="pay-box">
                    <div className="summary-box">
                        <p className="summary">Check out</p>
                        <div className="total-box">
                            <p className="text">Total   </p>
                            <p className='price'> VND {userInfo === null ? numberWithCommas(Number(totalPrice(cookie.cartCookie))) : numberWithCommas(Number(totalPrice(cartFromId)))}</p>
                        </div>
                        <button onClick={handleCheckout}>Go To Check out</button>
                        <p onClick={continueShopping} className="continue">Continue Shopping</p>
                    </div>
                </div>
                <div className='pay-box-media'>
                    <div className="pay-center">
                        <div className='summary-box'>
                            <p className="summary">Go To Check out</p>
                            <div className="total-box">
                                <p className="text">Total</p>
                                <p className='price'> VND {userInfo === null ? numberWithCommas(Number(totalPrice(cookie.cartCookie))) : numberWithCommas(Number(totalPrice(cartFromId)))}</p>
                            </div>
                        </div>

                        <div className='pay-button'>
                            <button onClick={handleCheckout}>Go To Check out</button>
                            <p onClick={continueShopping} className="continue">Continue Shopping</p>
                        </div>
                    </div>

                </div>
            </div>
            <Modal
                open={openModalCheckout}
                closable={false}
                maskClosable={false}
                onCancel={handleCancel}
                onOk={handleOk}
                title="Alert"
                footer={[
                    <Button key="back" onClick={handleCancel} >Back</Button>,

                ]}
            >

                <p>You have not selected any products yet</p>
            </Modal>
        </div>
        
    );
}


export default CartList;