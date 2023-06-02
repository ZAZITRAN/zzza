import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { numberWithCommas } from '../../../utils/NumberWithComat';
import "./ProductDetail.scss"
import { addProductToWhishlist } from '../../../feature/reducer/whishlistReducer';
import { getProductsbyId } from '../../../feature/reducer/productReducer';
import { useCookies } from 'react-cookie';
import { saveCartOnCookie } from '../../../utils/saveCartOnCookie';
import { addToCart } from '../../../feature/reducer/cartReducer';


function ProductsDetail() {
    const [cookie, setCookie,] = useCookies([`cartCookie`])
    const {cart}=useSelector(state=>state.cart)

    const { whishlist } = useSelector(state => state.whishlist)
    const userInfo = JSON.parse(localStorage.getItem("userLogin"))
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductsbyId({ id: +id }))
    }, [])
    const { product } = useSelector(state => state.products)
    console.log(product);
    const { products } = useSelector(state => state.products)
    let index=products?.findIndex(product=>product.id===+id)
    console.log(index);
    console.log(products);
    const handleAddToWhistlist = () => {
        if (userInfo === null) {
            alert("please Login first")
            window.location.href = "/login"
        } else {

            dispatch(addProductToWhishlist({ item: { ...products[index], userId: userInfo.id }, whishlist: whishlist }))
        }


    }
   
    const handleAddToCart = () => {
        if (userInfo === null) {
            let item = {
                ...products[index],
                quantity: 1,
                productId: id,
                isChecker: true
            }
            setCookie("cartCookie", saveCartOnCookie(item, cookie), { path: "/" })
        } else {
            let item = {
                ...products[index],
                quantity: 1,
                userId: userInfo.id,
                productId: id,
                isChecker: true
            }
           
            dispatch(addToCart(
                { item: item, cart: cart.filter(e=>e.userId===userInfo.id) }
            ))
        }

    }
    return (

        <div className='detail'>
            <Breadcrumb
                items={[
                    { title: <Link to="/products/pets-list">Pets List</Link> },
                    { title: `Product Id : ${id}` }
                ]}
            />
            {index===-1
            ? <p>Can not find products</p>
            :    
            <div className='detail-info'>
                <div className='detail-info-image'>
                    <img src={products[index]?.image} alt='' />
                </div>
                <div className='detail-info-info'>
                    <p className='name'>  {products[index]?.name}</p>
                    <p className='type'> Type: {products[index]?.type}</p>
                    {products[index].sale===0 
                ? <p className='not-sale'>{numberWithCommas(Number(products[index]?.price))}</p>
                : <div className='on-sale'>
                    <p className='new-price'>{numberWithCommas(Number(products[index]?.price-products[index]?.price*products[index]?.sale/100).toFixed(0))}</p>
                    <p className='old-price'>{numberWithCommas(Number(products[index]?.price))}</p>
                    <p className='sale'> {products[index]?.sale}%</p>

                    </div>}
                   

                    <div className='detail-info-info-button'>
                        <p className='add-wl' onClick={handleAddToWhistlist}>
                            ❤️ Add to whistlist
                        </p>
                        <p className='add-cart' onClick={handleAddToCart}>
                                🛒 Add to cart
                        </p>
                        
                    </div>
                </div>
            </div>
             }
        </div>
    );
}
export default ProductsDetail;
