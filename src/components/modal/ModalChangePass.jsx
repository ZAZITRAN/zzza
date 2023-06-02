import { Modal, Form,Button, Input } from 'antd';
import React,{useState,useEffect} from 'react'
import axios from "axios"

function ModalChangerPass(props) {
    
    const userInfo=JSON.parse(localStorage.getItem("userLogin"))
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(props.openModalChangePass);


    useEffect(()=>{setOpen(props.openModalChangePass)},[props.openModalChangePass])
   
    const handleOk = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 3000);
    };
    const handleCancel = () => {
        window.location.reload()
      setOpen(false);
    };
    const onFinish=(value)=>{
        axios.post(`http://localhost:8080/auth/change-pass`,
        {id:userInfo.id, password:value.password})
        .then(res=>{
            console.log(res.data);
            localStorage.setItem("userLogin",JSON.stringify({...userInfo,password:value.password}))
        })
        .catch(err=>{
            console.log(err);
        }
            )
    }
    return ( 
        <Modal
        open={open}
        title="Change password"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
         ""
        
        ]}
      >
        <Form
        onFinish={onFinish}>
            <Form.Item
            name="oldPass"
            rules={[
                {required:true},
                ({getFieldValue})=>({
                    validator(_,value){
                        if(!value || userInfo.password===value){
                            return Promise.resolve()
                        }
                        return Promise.reject('Old password doesn´t not match')
                    }
                })
                
            ]}>
                <Input.Password placeholder='Input old password'/>
            </Form.Item>
             <Form.Item
             name="newPass"
             rules={[
                 {required:true},
                 {min:6}
             ]}>
                <Input.Password placeholder='Input new password'/>
            </Form.Item>
            <Form.Item
            name="confirmPass"
            rules={[
                {required:true},
                ({getFieldValue})=>({
                    validator(_,value){
                        if(!value || getFieldValue("newPass")===value){
                            return Promise.resolve()
                        }
                        return Promise.reject('Confirm password doesn´t not match')
                    }
                })
            ]}>
                <Input.Password placeholder='Confirm new password'/>
            </Form.Item>
           
            <Form.Item>
          
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>Submit</Button>
            </Form.Item>
        </Form>
      </Modal> );
}

export default ModalChangerPass
