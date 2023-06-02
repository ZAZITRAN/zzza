import React, { useEffect, useState } from 'react'
import { Select, Button, Form, Row, Col, Breadcrumb, Input } from 'antd';
import { useSelector,} from 'react-redux';
import queryString from 'query-string';
import "./ProductsList.scss"


import { useParams} from 'react-router-dom';
import ModalFirstLoginOfFeature from '../../modal/ModalFirstLoginOfFeature';
import CartProduct from '../../wigets/CardItem/CardProduct';

function ProductsList() {
    let { products } = useSelector((state) => state.products)
    const [openModalFirstLogin, setOpenModalFirstLogin] = useState(false)
    const {params}=useParams()
    const newParams=queryString.parse(params)
    
    const filterProducts=(params)=>{
        if(newParams.search){
            const searchResult=[]
            console.log(newParams.search);
            for (let i = 0; i< products.length; i++) {
                if(products[i].name.toLowerCase().includes(newParams.search.toLowerCase())){
                    searchResult.push({...products[i]})
                }
            }
            return searchResult
        }
        if (newParams.type==="All") {
               return products 
        }else{
              return products.filter(product=>product.type==newParams.type)    
            
        }
       
        
    }
    

    const filterType =(products)=>{
        let filter=[]
        for (let i = 0; i < products.length; i++) {
            filter.push(products[i].type)
            
        }
        return [ ...new Set(filter)]
        
    }
    
    const handleClickAll=()=>{
        window.location.href="/products/products-list/type=All"
    }
    const handleClickType =(type)=>{
        window.location.href=`/products/products-list/type=${type}`
    }

  

   
    const {whishlist}=useSelector(state=>state.whishlist)
 
    const onSearch=(value)=>{
        window.location.href=`/products/products-list/search=${value}`
      
    }   

    return (
    
    <div className='products-list'>
        
        <Breadcrumb className="products-list-breadcrumb"
            items={[
               { title: "Products List"}
            ]}
        />
        <div className='products-list-search'>
                <Input.Search                
                    type='text'
                    placeholder='Search by name'
                    allowClear
                    onSearch={onSearch}
                    defaultValue={newParams.search ? newParams.search: ''}
                />
         
           
        </div>
        <div className="products-list-type">
                <p onClick={handleClickAll} style={newParams.type===`All` ? {borderBottom: `1px solid black`} :{borderBottom: `none`}}>All</p>
                { filterType(products)?.map((item,i)=>{
                    return(
                        <p key={i} className='' onClick={()=>handleClickType(item)} style={newParams.type===item ? {borderBottom: `1px solid black`} :{borderBottom: `none`}}> {item}</p>
                    )
                })}
        </div>
        <div className='products-list-item'>

            <Row className='products-list-item-card'>

                {filterProducts(newParams).length > 0 && filterProducts(newParams).map((product, i) => {
                    return (
                    
                        <Col className='products-list-item-card-col'
                            xxl={6} xl={6} lg={8} md={12} sm ={24}
                            key={product.id}
                            >
                            <CartProduct
                              
                                id={product.id}
                                image={product.image}
                                name={product.name}
                                sale={product.sale}
                                price={product.price}                             
                            />
                        </Col>
                      
                    )

                })}

            </Row>

        </div>
       
    </div>);
}

export default ProductsList;