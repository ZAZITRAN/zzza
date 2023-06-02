import React from 'react'
import { Button, Modal } from 'antd';
import { useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import {

  Form,
  Input,
 
  Select,

  TreeSelect,
  Upload,
} from 'antd';

const settingUpload={
    width:`100px`,
    height:`100px`,
    borderRadius:`50%`,
    
}
const ModalUser = (props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
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
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal with customized footer
      </Button>
      <Modal
        open={true}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Submit
          </Button>,
          
        ]}
      > 
        <Form>
        
                <Form.Item style={{position:`relative`}} label="Upload" valuePropName="fileImage" >
                  <Upload style={settingUpload} listType="picture-card">
                    <div>
                      <PlusOutlined />
                      <div
                        style={{
                          marginTop: 8,
                        }}
                      >
                        Upload
                      </div>
                    </div>
                  </Upload>
        <Form.Item label="Input">
        <Input />
        </Form.Item>

        
        </Form.Item>
       
      </Form>
      </Modal>
    </>
  );
};
export default ModalUser;