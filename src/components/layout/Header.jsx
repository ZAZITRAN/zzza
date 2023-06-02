import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./Header.scss";
import { useSelector, useDispatch } from 'react-redux';
import { getPets } from "../../feature/reducer/petsReducer"
import { getWhishlist } from "../../feature/reducer/whishlistReducer"
import { getCart,   } from '../../feature/reducer/cartReducer';
import { useCookies } from 'react-cookie';
import ModalFirstLoginOfPage from '../modal/ModalFirstLoginOfPage';
import { getProducts } from '../../feature/reducer/productReducer';
import ModalUser from '../modal/ModalUserInfo';
import ModalChangerPass from '../modal/ModalChangePass';
import { totalPrice } from '../../utils/totalPrice';
import { Button, Modal } from 'antd';



const menuList = [
  { 
    key:"home",
    link: "/home",
    name: "HOME",
    color: "gray",
    borderBottom: "none",
    background: " none"
  },
  { 
    key:"pets",
    link: `/pets/pets-list`,
    name: "PETS",
    color: "gray",
    borderBottom: "none",
    background: " none"
  },
  { 
    key:"products",
    link: "/products/products-list/type=All",
    name: "PRODUCTS",
    color: "gray",
    borderBottom: "none",
    background: " none"
  },
  { 
    key:"about",
    link: "/about",
    name: "ABOUT ME",
    color: "gray",
    borderBottom: "none",
    background: " none"
  }
]

const rightnavMenu = [
  { 
    key:"register",
    link: "/register",
    name: "REGISTER",
    color: "gray",
    borderBottom: "none",
    background: " none"
  },
  { 
    key:"login",
    link: "/login",
    name: "LOGIN",
    color: "gray",
    borderBottom: "none",
    background: "white"
  }
]


function Header(props) {

  let dispatch = useDispatch()
  const userInfo = JSON.parse(localStorage.getItem("userLogin"));
  let { pathName } = props
  let pathNameList = pathName.split("/")

  const { whishlist } = useSelector(state => state.whishlist)
  const[ cookie,setCookie] =useCookies([`cartCookie`]) 
  const {cartCookie}=cookie
  const { cart} = useSelector(state => state.cart)
  
  const [openModalFirstLogin,setOpenModalFirstLogin]=useState(false)
  const [openModalCheckout,setOpenModalCheckout]=useState(false)
 
 

  
  
  useEffect(() => {
    if (userInfo !== null) {
      
      if(pathNameList[2]==="checkout") {
        if(cart.length>0 && totalPrice(cart.filter(e=>e.userId===userInfo.id))===0){
              setOpenModalCheckout(true)
        }
      }
    }else{
      if(pathNameList[2]==="checkout" || pathNameList[1]==="whishlist"){
          setOpenModalFirstLogin(true)
      }
    }
  
  }, [cart])

  function filterPathName(x) {
    for (let i = 0; i < x.length; i++) {
      if (x[i].key === pathNameList[1]) {
        x[i].color = "black"

        x[i].background = "rgba(240, 240, 240, 0.8)"
      } else {
        x[i].color = "black"

        x[i].background = "none"
      }
    
    } 
  }
  filterPathName(menuList)
  filterPathName(rightnavMenu)

   
  const [openModalChangePass, setOpenModalChangePass] = useState(false)
  const [menuDisplay, setMenuDisplay] = useState("none")
  const [openUserBox, setOpenUserBox] = useState("none")
  const [backgroundUser, setBackgroundUser] = useState("none")
  const [bgcIcon,setBgcIcon]=useState(`none`)
  console.log(bgcIcon);

  const handleOpenUserBox = () => {
    if(backgroundUser==="none"){
      setBackgroundUser("rgba(240, 240, 240, 0.8)")
      setOpenUserBox("flex")
    }else{
      setBackgroundUser("none")
      setOpenUserBox("none")
    }
  }
  const logout = () => {

    localStorage.removeItem("userLogin")
    window.location.reload()
  }

  const showMenuBar = () => {
    if (menuDisplay === "none") {
      setMenuDisplay("flex")
      setBgcIcon(`rgb(242, 236, 236)`)
    } else {
      setMenuDisplay("none")
      setBgcIcon(`none`)

    }
  }
  const handleChangePass = () => {
    setOpenModalChangePass(true)
  }
  const goToWhishlist=()=>{
    window.location.href='/whishlist'
    
  }
  const handleCancel=()=>{
    window.location.href='/products/products-list/type=All'
  }
  return (
    <div className='header'>
      <div className='navbar'>
        <div className='icon-bar'/* style={{backgroundColor:`${bgcIcon}`}} */ onClick={showMenuBar} >
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Hamburger_icon.svg" alt="" />
        </div>


        <div className="logo">
          <Link to="/home">
            <img src="https://res.cloudinary.com/dhknvtaq2/image/upload/v1682482580/pet/Untitled_logo_18_free-file_cffetd.png" alt="" />
          </Link>
        </div>

        <div className='left-nav' >
          <div className="left-nav-media" style={{ display: `${menuDisplay}` }} >
            {menuList.map((item, i) => {
              return (

                <Link key={i} to={item.link} style={{ color: `${item.color}` }}> {item.name}</Link>
              )
            })}
          </div>
          <div className="left-nav-nomedia" >
            {menuList.map((item, i) => {
              return (
                <div className='menu' key={i} style={{ borderBottom: `${item.borderBottom}`, backgroundColor: `${item.background}` }}>
                  <Link key={i} to={item.link} style={{ color: `${item.color}` }}> {item.name}</Link>
                </div>
              )
            })}
          </div>
          {userInfo === null ?
            <div className="rightnav-not-user">
              <div className='cart' style={pathNameList[1] === `cart` ? { backgroundColor: "rgba(240, 240, 240, 0.8)" } : { backgroundColor: `none` }}>
                <Link to="/cart" className='cart-icon'>🛒</Link>
                {cartCookie  ?
                  <div className='cart-number'>
                    <p>{cartCookie.length}</p>
                  </div>
                  : ``}
              </div>
              {rightnavMenu.map((item, i) => {
                return (
                  <div className='menu' key={i} style={{ borderBottom: `${item.borderBottom}`, backgroundColor: `${item.background}` }}>
                    <Link to={item.link} style={{ color: `${item.color}`, borderBottom: `${item.borderBottom}` }}> {item.name} </Link>
                  </div>)
              })}
            </div>
            : <div className="rightnav-user">
              <div className='user-info'>
                <div className='cart' style={pathNameList[1] === `cart` ? { backgroundColor: "rgba(240, 240, 240, 0.8)" } : { backgroundColor: `none` }}>
                  <Link to="/cart" className='cart-icon'>🛒</Link>
                  <div className='cart-number'>
                    <p>{cart.filter(e=>e.userId===userInfo.id).length}</p>
                  </div>
                </div>

                <div className='img' /* style={{ backgroundColor: `${backgroundUser}` }} */ >
                  <img className='user-icon'
                    src={userInfo.image } alt="" />
                </div>


                <div /* style={{ backgroundColor: `${backgroundUser}` }} */ onClick={handleOpenUserBox} className='username'>
                  <p >{userInfo.username}</p>

                </div>
              </div>

              <ul style={{ display: `${openUserBox}`, zIndex: 1000 }} className='user-box'>
                {userInfo.type==="email" ? <p onClick={handleChangePass}>Change password</p> :''}
                <p onClick={goToWhishlist}> Whislist ({whishlist.length}) </p>
                <p onClick={logout}>Logout</p>
              </ul>
            </div>
          }
        </div>
      </div>
          <ModalFirstLoginOfPage openModalFirstLogin={openModalFirstLogin} />
          <ModalChangerPass openModalChangePass={openModalChangePass}/>
          <Modal
                open={openModalCheckout}
                closable={false}
                maskClosable={false}
                onCancel={handleCancel}
                
                title="Alert"
                footer={[
                    <Button key="back" onClick={handleCancel} >Back</Button>,

                ]}
            >

                <p>You have not selected any products yet</p>
            </Modal>
    </div>);
}
export default Header;