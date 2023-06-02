import { Form, Input, Modal } from 'antd';
import React, {useState, useEffect} from 'react'
import { Outlet,useNavigate } from 'react-router-dom';
import { Layout, Menu, Anchor } from 'antd';

import "./Admin.scss"
import { Footer } from 'antd/es/layout/layout';
import { useDispatch } from 'react-redux';
import { getPets } from '../feature/reducer/petsReducer';
import { getProducts } from '../feature/reducer/productReducer';





const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    /* getItem('users', 'users'), */
    getItem("pets", 'pets'),

    getItem('products', 'products',),
    getItem('bills', 'bills', ),
    
];

function Admin() {
    let adminLogin=JSON.parse(sessionStorage.getItem(`admin`))
    console.log(typeof window.location.pathname);
    const Arr= window.location.pathname.split("/")
    console.log(Arr);
    let defaulKey=Arr[Arr.length-1]
    console.log(defaulKey);
    
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getPets())
        dispatch(getProducts())
    })

    const navigate=useNavigate()
    return (<div className="admin">
   {/*  <Modal
        open={adminLogin===null ? true:false}  >
        <Form >

            <Form.Item name="pass" label="password"
            rules={[{required:true}]}
            >
                <Input.Password  />
            </Form.Item>

        </Form>
    </Modal> */}
    <Header style={{ padding: 0, height: '100px', textAlign:"center" }} >
        <p style={{color:"white", fontSize:"30px", lineHeight:"100px"}}>ADMIN PAGE</p>
    </Header>
    <Layout className='layout'>
                <Sider breakpoint="lg" collapsedWidth="0">
                    <div className="logo" />
                    
                    <Menu
                   
                  defaultSelectedKeys={[defaulKey]} 
                        mode="inline"
                        theme="dark"
                        onClick={({key})=>{
                           
                            navigate(key)
                        }}
                        items={items}
                    />
                </Sider>
                <Layout>
                    <Content style={{ margin: '34px 38px 0px', padding: '59px', }}>
                        
                        <div style={{ minHeight: 360, background: '#f5f5f5', borderRadius: '30px' }}>
                          
                                <Outlet/>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        
    </div> );
}

export default Admin;