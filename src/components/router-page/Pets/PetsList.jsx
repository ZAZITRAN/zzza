import React, { useEffect, useState } from 'react'
import { Select, Button, Form, Row, Col, Breadcrumb } from 'antd';
import { useSelector,} from 'react-redux';
import queryString from 'query-string';
import "./PetsList.scss"

import CardItem from '../../wigets/CardItem/CardPets';
import { useSearchParams } from 'react-router-dom';
import ModalFirstLoginOfFeature from '../../modal/ModalFirstLoginOfFeature';

function PetsList() {
    let [searchParams, setSearchParams] = useSearchParams()
    const params = queryString.parse(window.location.search)
   
  

   
    let { pets } = useSelector((state) => state.pets)
    console.log(pets);
    const {whishlist}=useSelector(state=>state.whishlist)

    function filterPets(params) {
        const {type, color}=params
        let petsFiltered
        
        if (params.type===undefined) {
            petsFiltered = pets
        }else{
            if(type==="undefined"){
                if (color==="undefined") {
                    petsFiltered = pets
                }else{
                    petsFiltered = pets.filter(pet =>pet.color === color)
                }
    
            }else{
                if (color==="undefined") {
                    petsFiltered = pets.filter(pet =>pet.type === type)
    
                }else{
                petsFiltered = pets.filter(pet => pet.type === type && pet.color === color)
                }
            }
        }
        
        return petsFiltered
    }

    console.log(filterPets(params));

    let type = []
    let color = []
  

   


    const onFinish = (value) => {

        console.log(value);
        const { type, color } = value
        setSearchParams({ type: type, color: color })

    }
    for (let i = 0; i < pets?.length; i++) {
       
        color.push(pets[i].color)
        type.push(pets[i].type)
    }

   
    type = [...new Set(type)]
    color = [...new Set(color)]

    
    console.log(filterPets(params));
    const checkExist=(id)=>{
        let find=whishlist.findIndex(item=>item.petId===id)
        if (find===-1) {
            return false
        }else{
            return true
        }
    }

    function optionSelect(arr) {

        let newArr = []
        for (let i = 0; i < arr.length; i++) {
            newArr.push(
                {
                    label: arr[i],
                    value: arr[i]
                }
            )

        }
        return newArr
    }
    const convertUndefined=(x)=>{
        if(x==="undefined"){
            return undefined
        }else{
            return x
        }
    }

    return (
    
    <div className='pets-list'>
        
        <Breadcrumb className="pets-list-breadcrumb"
            items={[
               { title: "Pets List"}
            ]}
        />
        <div className='pets-list-search'>
            <Form className='pets-list-search-form'
            layout="inline"
                 initialValues={{
                    type:convertUndefined(params.type),
                    color:convertUndefined(params.color),
                }}
                onFinish={onFinish}>
                <Form.Item name="type" label="Type"  >
                    <Select
                        allowClear
                        style={{ width: "150px" }}
                        placeholder="Search by type"
                        options={optionSelect(type)}

                    />

                </Form.Item>

                <Form.Item name="color" label="Color" >
                    <Select
                        allowClear
                        style={{ width: "150px" }}
                        placeholder="Search by color"
                        options={optionSelect(color)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Search</Button>
                </Form.Item>
            </Form>
           
        </div>
        <div className='pets-list-item'>

            <Row className='pets-list-item-card'>

                {filterPets(params).length > 0 && filterPets(params).map((pet, i) => {
                    return (
                    
                        <Col
                            xxl={6} xl={6} lg={8} md={12} sm ={24}
                            key={pet.id}
                            >
                            <CardItem
                              
                                id={pet.id}
                                image={pet.image}
                                age={pet.age}
                                type={pet.type}
                                price={pet.price}                             
                            />
                        </Col>
                      
                    )

                })}

            </Row>

        </div>
        <ModalFirstLoginOfFeature o/>
    </div>);
}

export default PetsList;