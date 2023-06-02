import React,{useState} from 'react'


import { Card, } from 'antd';
import { numberWithCommas } from '../../../utils/NumberWithComat';
import "./Card.scss"
import { useDispatch, useSelector } from 'react-redux';
import { addProductToWhishlist, removeWhishlist } from '../../../feature/reducer/whishlistReducer';
import { addToCart } from '../../../feature/reducer/cartReducer';
import { saveCartOnCookie,  } from '../../../utils/saveCartOnCookie';
import { useCookies } from 'react-cookie';
import ModalFirstLoginOfFeature from '../../modal/ModalFirstLoginOfFeature';

function CartProduct(props) {
    const userInfo = JSON.parse(localStorage.getItem("userLogin"))
    const { id, image, price, name, sale, pathname } = props
    const {cart}=useSelector(state=>state.cart)
    const { products } = useSelector(state => state.products)
    const { whishlist } = useSelector(state => state.whishlist)
    const [openModalFirstLogin, setOpenModalFirstLogin] = useState(false)
    const findIndex = whishlist.findIndex(item => item.productId === id&&item.userId===userInfo.id)
    
    const { pets } = useSelector(state => state.pets)
    const [cookie, setCookie,] = useCookies([`cartCookie`])
    
    

    const dispatch = useDispatch()

    const handleAddToCart = () => {
        if (userInfo === null) {
            let item = {
                ...props,
                quantity: 1,
                productId: id,
                isChecker: true
            }
            setCookie("cartCookie", saveCartOnCookie(item, cookie), { path: "/" })
        } else {
            let item = {
                ...props,
                quantity: 1,
                userId: userInfo.id,
                productId: id,
                isChecker: true
            }
            console.log(item);
            dispatch(addToCart(
                { item: item, cart: cart.filter(e=>e.userId===userInfo.id) }
            ))
        }

    }

    const handleChangeHeart = (id) => {
        console.log(id);
        if (userInfo === null) {
            setOpenModalFirstLogin(true)
        } else {
            if (findIndex === -1) {
                const find = products.findIndex(product => product.id === id)

                dispatch(addProductToWhishlist({ item: products[find], userId: userInfo.id, whishlist: whishlist }))
            } else {
                const whishlistId = whishlist[findIndex].id
                dispatch(removeWhishlist(whishlistId))
            }
        }
    }
    const goToDetail = () => {
        window.location.href = `/products/products-detail/${id}`
    }

    return (
        < >
        
            <Card
                className='card'
                cover={
                    <img
                        onClick={goToDetail}
                        alt=""
                        src={image}
                    />
                }
                actions={[
                    <p onClick={handleAddToCart} style={{fontSize:`20px`}}> 🛒 Add to cart</p>
                ]}
            >
                <h3 onClick={goToDetail}>{name}</h3>
                {sale===0 
                ? <p className='not-sale'>{numberWithCommas(Number(price))}</p>
                : <div className='on-sale'>
                    <p className='new-price'>{numberWithCommas(Number(price-price*sale/100).toFixed(0))}</p>
                    <p className='old-price'>{numberWithCommas(Number(price))}</p>
                    </div>}
                
                {pathname!=="/whishlist" 
                ?
                <div onClick={() => handleChangeHeart(id)} className='whishlist'>
                    <p className='whishlist-icon' >{findIndex === -1 ? `🖤` : `❤️`}</p>
                    <div className='whishlist-hover'>
                        <p>{findIndex === -1 ? `Add To Whishlist` : `Remove From Whishlist`}</p>
                    </div>
                </div>
                :
                <div onClick={() => removeWhishlist(id)} className='whishlist'>
                <p className='whishlist-icon' >🗑️</p>
                <div className='whishlist-hover'>
                    <p>Remove From Whishlist</p>
                </div>
            </div>
            }
                {sale!==0 
                ?   <div className='sale-box'>
                        <p>{sale}%</p>
                    </div>
                : ``}
            </Card>
            <ModalFirstLoginOfFeature  openModalFirstLogin={openModalFirstLogin}/>

        </>)

}

export default CartProduct;