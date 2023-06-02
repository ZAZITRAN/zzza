import React, { useEffect, useState } from 'react'
import { Button, Space, Table, Form, Modal, Input, Upload } from 'antd';
import { useSelector } from 'react-redux';
import { numberWithCommas } from '../../../utils/NumberWithComat';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';
import queryString from 'query-string';

const AdminPets = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openmodalEdit, setOpenModalEdit] = useState(false)

  const handleCancel = () => {
    setOpenModalAdd(false);
    setOpenModalEdit(false)
  };

  const completeAdd = (value) => {
    console.log(value.image.file.originFileObj)
      ;
    axios.post(`http://localhost:2020`,
      { file: value.image.file.originFileObj },
      {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res=>{
        console.log(res.data);
      const image=res.data.mess
        axios.post (`http://localhost:8000/pets`,{...value, image:image})
        .then(res=>{
          window.location.reload()
        })
      })
      .catch(err=>{
        console.log(err);
      })
}

    

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',

    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',

    },

    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) => {
        return (<img style={{ height: `50px` }} src={record.image} />)
      }
    },
    {
      title: 'Spec',
      dataIndex: 'spec',
      key: 'spec',

    },
    {
      title: 'Age (month)',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',

    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Price (VND)',
      dataIndex: 'price',
      key: 'price',
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          
          <a onClick={() => deletePet(record.id)}> Delete </a>
        </Space>
      ),
    },
  ];
  const [pets, setPets] = useState([])
 
  useEffect(() => {
    axios.get("http://localhost:8000/pets")
      .then(res => {
        setPets(res.data)
      })
      .catch(err => {
        console.log(err);
      })

  }, [])
  const handleOpenModalAdd = () => {
    setOpenModalAdd(true)
  }
  
  const deletePet = (id) => {
    axios.delete(`http://localhost:8000/pets/${id}`)
    .then(res=>{
      window.location.reload()
      
    })
  }
  return (
    <>
      <Button onClick={handleOpenModalAdd} >Add Pets</Button>
      <Table

        scroll={{ y: 1500 }}
        columns={columns}
        dataSource={pets.map(pet => {
          return (
            {
              key: pet.id,
              id: pet.id,
              type: pet.type,
              age: pet.age,
              spec: pet.spec,
              size: pet.size,
              color: pet.color,
              price: numberWithCommas(pet.price),
              image: pet.image,


            }
          )
        })} />

      <Modal
        open={openModalAdd}
        title="Information Contact"

        onCancel={handleCancel}
        footer={[
          ""
        ]}
      >
        <Form
          layout='vertical'
          onFinish={completeAdd}>

          <Form.Item
            name={"type"}
            label="Type"
            rules={[
              { required: true },

            ]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            name={"spec"}
            label="Spec"
            rules={[
              { required: true },

            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={"size"}
            label="Size"
            rules={[
              { required: true },

            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name={"age"}
            label="Age (month)"
            rules={[
              { required: true },

            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name={"color"}
            label="Color"
            rules={[
              { required: true },

            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={"price"}
            label="Price"
            rules={[
              { required: true },

            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Upload" name="image"  
          rules={[
            { required: true }
          ]} >
          <Upload listType="picture" maxCount={1}>
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >

              </div>
            </div>
          </Upload>
        </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType='submit'> Submit</Button>
          </Form.Item>


        </Form>
      </Modal>
    </>


  )
}
export default AdminPets;