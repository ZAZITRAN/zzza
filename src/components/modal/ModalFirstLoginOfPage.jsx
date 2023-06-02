import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react'

function ModalFirstLoginOfPage(props) {
    const {openModalFirstLogin}=props;
    const [open, setOpen] = useState(openModalFirstLogin);
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
        setOpen(openModalFirstLogin)
    },[openModalFirstLogin])

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setOpen(false);
        }, 3000);
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
        
        <Button loading={loading} key="link" href='/login' type='primary'>Go to Login</Button>
    ]}
    >
    
            <p>You must login first</p>
    </Modal> );
}

export default ModalFirstLoginOfPage;