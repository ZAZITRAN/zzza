import { Breadcrumb, Button, Form, Input, Modal, Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, } from 'react-router-dom';
import { numberWithCommas } from '../../../utils/NumberWithComat';
import { totalPrice } from '../../../utils/totalPrice';
import "./Checkout.scss"

function Checkout() {
    let userInfo = JSON.parse(localStorage.getItem("userLogin"))
    const [dataAdress, setDataAdress] = useState([])
    const [userAdress, setUserAdress] = useState([])
    const [districtsList, setDistrictsList] = useState([])
    const [wardList, setWardList] = useState([])
    const [openModalInfo, setOpenModalInfo] = useState(false)
  const [openModalCheckout,setOpenModalCheckout]=useState(false)
  const { cart } = useSelector(state => state.cart)
    const cartFromId = cart.filter(e => e.userId === userInfo.id)

    
    const [loading, setLoading] = useState(false);

   


    const handleCancel = () => {
        setOpenModalInfo(false);
    };


    const isVietnamesePhoneNumberValid = (number) => {
        return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(number);
    }

    useEffect(() => {
        axios.get("https://provinces.open-api.vn/api/?depth=3")
            .then(res => {
                setDataAdress(res.data)
            })
            .catch(err => {
                console.log(err);
            })
        if (userInfo !== null) {

            axios.get(`http://localhost:9000/adress/${userInfo.id}`)
                .then(res => {
                    setUserAdress(res.data)
                })
                .catch(err => {
                    console.log(err);
                })
        }


    }, [])


    const handleProvinceChange = (value) => {
        let findIndex = dataAdress.findIndex(item => item.name === value)
        setDistrictsList(dataAdress[findIndex].districts)
    }

    const handleDistrictChange = (value) => {
        let findIndex = districtsList.findIndex(item => item.name === value)
        setWardList(districtsList[findIndex].wards)
    }


    const completeCheckout = () => {
       if(userAdress===""){
            setOpenModalCheckout(true)
       }else{
           const date = new Date()
           let day = date.getDate();
           let month = date.getMonth() + 1;
           let year = date.getFullYear()
           let hour =date.getHours()
           let minute=date.getMinutes()
           let dateInfo= `${day}/${month}/${year}`
           let time=`${hour}h${minute}`
    
        axios.post(`http://localhost:9000/bill`, { ...userAdress, id:Date.now(), day:dateInfo ,time:time, userId:userInfo.id, cart: cartFromId, total: totalPrice(cartFromId)})
        .catch(err=>{
            console.log(err);
        })
       }
       for (let i = 0; i < cartFromId.length; i++) {
            axios.delete(`http://localhost:9000/cart/${cartFromId[i].id}`)
            .catch(err=>{
                console.log(err);
            })
            axios.put(`http://localhost:8000/products/${cartFromId.productId}`, 
               {...cartFromId[i], purchases:cartFromId[i].purchases+1} )
            .catch(err=>{
                console.log(err);
            })
       }
    

       window.location.href='/cart/cart-list'
    }
    const openModal = () => {
        setOpenModalInfo(true)
    }
    
    const completeUpdate = (value) => {
        axios.put(`http://localhost:9000/adress/${userInfo.id}`, { ...value, id: userInfo.id, username: userInfo.name, status: "uncheck" })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
            window.location.href="/cart/checkout"
    }
    const handleCancelCheckout=()=>{
        setOpenModalCheckout(false)
    }
    return (
        <div className='checkout'>
            <Modal
                open={openModalInfo}
                title="Information Contact"

                onCancel={handleCancel}
                footer={[
                    ""
                ]}
            >
                <Form
                    layout='vertical'
                    onFinish={completeUpdate}>
                    <p>Phone</p>
                    <Form.Item
                        name={"phone"}
                        rules={[
                            { required: true },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || isVietnamesePhoneNumberValid(value) === true) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject('This phone number is not valid')
                                }
                            })
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="province"
                        label={`Province`}
                        rules={[
                            { required: true }
                        ]}>
                        <Select
                            onChange={handleProvinceChange}
                            options={dataAdress.map((data, i) => ({
                                label: data.name,
                                value: data.name,
                                key: i
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        name="district"
                        label={`District`}
                        rules={[
                            { required: true }
                        ]}>
                        <Select
                            onChange={handleDistrictChange}
                            options={districtsList?.map(data => ({
                                label: data.name,
                                value: data.name
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        name="ward"
                        label={`Ward `}
                        rules={[
                            { required: true }
                        ]}>
                        <Select
                            options={wardList?.map(data => ({
                                label: data.name,
                                value: data.name
                            }))}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType='submit'> Submit</Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Breadcrumb
                items={[
                    { title: <Link to="/cart/cart-list"> Cart Lisrt</Link> },
                    { title: "Check out" }
                ]}
            />
            <div className='checkout-info'>
                <div className='checkout-info-left'>

                    <div className='adress-box'>
                        {userAdress.phone !== ""
                            ? <>
                                <p className='contact-title'>Information contact</p>
                                <div className='contact'>
                                    <span className='phone' >Phone :<span className='phone-info'>{userAdress.phone}</span></span> <br />
                                    <span className='adress' >Adress:<span className='adress-info'>{userAdress.ward},{userAdress.district},{userAdress.province}</span>  </span>
                                </div>
                                <Button onClick={openModal}>Edit</Button>
                            </>
                            : <>
                                <p>You have not update information contact</p>
                                <Button onClick={openModal}>Update </Button>
                            </>
                         
                        }
                    </div>
                </div>
                <div className='checkout-info-right'>
                    <div className='bill-box'>
                        <p className='bill'>Bill</p>
                        <div  className='bill-info'>
                            {cartFromId.map((item,i) => {
                                return (
                                    <div  key={item.name} className='bill-info-item'>
                                        <p  className='bill-info-item-name'>{item.name}</p>
                                        <div      className='bill-info-item-box'>
                                            <p className='bill-info-item-box-price'>{numberWithCommas(item.price)}</p>
                                            <p className='bill-info-item-box-quantity'>{item.quantity}</p>
                                            <p className='bill-info-item-box-total'>{numberWithCommas(item.quantity * item.price)}</p>
                                        </div>
                                    </div>

                                )
                            })}
                        </div>
                        <div className='total'>
                            <p className='total-text'>Total</p>
                            <p className='total-number'>{numberWithCommas(totalPrice(cartFromId))}</p>
                        </div>
                        <Button onClick={completeCheckout } type='primary'>Checkout</Button>
                    </div>
                </div>
            </div>
            <Modal
        open={openModalCheckout}
        title="Alert"
        
        onCancel={handleCancelCheckout}
        footer={[
          <Button key="back" onClick={handleCancelCheckout}>
            Return
          </Button>,
        
        ]}
      >
        <p>You must update information contact</p>
        
      </Modal>
    
        </div>
    );
}

export default Checkout;
