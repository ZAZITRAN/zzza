import { Button, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
function ModalRegister(props) {
    let { openModalRegister, title } = props
    const [open, setOpen] = useState(openModalRegister)
    useEffect(() => {
        setOpen(openModalRegister)
    }, [openModalRegister])


    return (
        <Modal style={{ textAlign: 'center' }}
            open={open}
            closable={false}
            title="Arlet"
            footer={[
                <Button
                    key="link"
                    type={title === `Email already exist` ? `back` : `primary`}
                    href={title === `Email already exist` ? `/register` : `/login`}
                >
                    {title === `Email already exist` ? `Back to Register` : `Go to Login`}

                </Button>
            ]} >
            <p>{title}</p>
        </Modal>);
}

export default ModalRegister;