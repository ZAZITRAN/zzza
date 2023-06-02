import React, { useEffect, useState } from 'react'
import { Button, Space, Table, Form, Modal, Input, Upload } from 'antd';
import { numberWithCommas } from '../../../utils/NumberWithComat';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';


const AdminProducts = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openmodalEdit, setOpenModalEdit] = useState(false)
    const [productEdit,setproductEdit]=useState({})

  const handleCancel = () => {
    setOpenModalAdd(false);
    setOpenModalEdit(false)
  };

  const completeEdit=(value)=>{
    console.log(value);
    console.log(productEdit);
    axios.put(`http://localhost:8000/products/${productEdit.id}`,
    { ...productEdit, price:value.price, sale: value.sale })
    .then(res=>{
        window.location.reload()

    })
  }

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
        axios.post (`http://localhost:8000/products`,{...value, image:image, purchases:0})
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
      title: 'Name',
      dataIndex:'name',
      key: 'name',

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
      title: 'Type',
      dataIndex: 'type',
      key: 'type',

    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Sale %',
      dataIndex: 'sale',
      key: 'sale',

    },
    {
      title: 'Purchases',
      dataIndex: 'purchases',
      key: 'purchases',
    },
    

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => editProducts(record)}> Edit </a>
          <a onClick={() => deleteProducts(record.id)}> Delete </a>
        </Space>
      ),
    },
  ];
  const [products, setProducts] = useState([])
 
  useEffect(() => {
    axios.get("http://localhost:8000/products")
      .then(res => {
        setProducts(res.data)
      })
      .catch(err => {
        console.log(err);
      })
      
    }, [])
  const handleOpenModalAdd = () => {
    setOpenModalAdd(true)
  }
  
  const deleteProducts = (id) => {
    axios.delete(`http://localhost:8000/products/${id}`)
    .then(res=>{
      window.location.reload()
      
    })
  }
  const editProducts=(record)=>{
      setOpenModalEdit(true)
      setproductEdit(record)
      console.log(productEdit);
  }
  return (
    <>
      <Button onClick={handleOpenModalAdd} >Add Products</Button>
      <Table

        scroll={{ y: 1500 }}
        columns={columns}
        dataSource={products.map(products => {
          return (
              {
                  key: products.id,
              name:products.name,
              id: products.id,
              type: products.type,
              
                
              sale: products.sale,
              purchases: products.purchases,
              price: numberWithCommas(products.price),
              
              image: products.image,


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
            name={"name"}
            label="Name"
            rules={[
              { required: true },

            ]}
          >
            <Input />
          </Form.Item>


          

          <Form.Item
            name={"type"}
            label="Type"
            rules={[
              { required: true },

            ]}
          >
            <Input  />
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
       

          <Form.Item
            name={"sale"}
            label="Sale (%)"
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


      <Modal
        open={openmodalEdit}
        title="Information Contact"

        onCancel={handleCancel}
        footer={[
          ""
        ]}
      >
        <Form
          layout='vertical'
          onFinish={completeEdit}
             initialValues={{
                    price:productEdit.price,
                    sale: productEdit.sale
                }}
          >
         
          <Form.Item
            name={"price"}
            label="Price"
            rules={[
              { required: true },

            ]}
          >
            <Input type="number" />
          </Form.Item>
       

          <Form.Item
            name={"sale"}
            label="Sale (%)"
            rules={[
              { required: true },

            ]}
          >
            <Input type="number" />
            </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType='submit'> Submit</Button>
          </Form.Item>


        </Form>


        
      </Modal>
    </>


  )
}
export default AdminProducts;
