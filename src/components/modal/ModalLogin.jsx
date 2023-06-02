import { Modal, Button, } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCart, syncCart } from '../../feature/reducer/cartReducer';
import { useCookies } from 'react-cookie';

function ModalLogin(props) {
  const userInfo = JSON.parse(localStorage.getItem(`userLogin`))
  const { cart } = useSelector(state => state.cart)
  const [cookie, setCookie, removeCookie] = useCookies([`cartCookie`])
  const { cartCookie } = cookie
 
  const dispatch = useDispatch()
  const { title, openModalLogin } = props
  const [open, setOpen] = useState(openModalLogin)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setOpen(openModalLogin)
  }, [openModalLogin])
  useEffect(() => {

    dispatch(getCart())

  }, [])

  const handleOk = () => {
    const cartUser = cart.filter(item => item.userId === userInfo.id)
    setLoading(true);
    dispatch(syncCart({ userId: userInfo.id, cart: cartUser, cartCookie: cartCookie }))
    removeCookie(`cartCookie`)
    window.location.href = '/'
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      closable={false}
      maskClosable={false}
      onCancel={handleCancel}
      onOk={handleOk}
      title="Alert"
      footer={[
        <Button /* href={title==="Login Success" ? "/home" : ""} */ key={title === "Login Success" ? "back" : "link"} type='primary' onClick={title === "Login Success" ? handleOk : handleCancel} >{title === "Login Success" ? `Go To Home` : "Back"} </Button>
      ]}
    >
      <p>{title}</p>
    </Modal>);
}

export default ModalLogin;