import React, { useState } from 'react'


import { Card, } from 'antd';
import { numberWithCommas } from '../../../utils/NumberWithComat';
import "./Card.scss"
import { useDispatch, useSelector } from 'react-redux';
import { addPetToWhishlist, removeWhishlist } from '../../../feature/reducer/whishlistReducer';
import { useCookies } from 'react-cookie';
import ModalFirstLoginOfFeature from '../../modal/ModalFirstLoginOfFeature';

function CardItem(props) {
  const userInfo = JSON.parse(localStorage.getItem("userLogin"))
  const { id, image, age, type, price, pathname } = props
  const { whishlist } = useSelector(state => state.whishlist)
  
  
  const { pets } = useSelector(state => state.pets)
  
  const [cookie, setCookie,] = useCookies([`cartCookie`])
  const [openModalFirstLogin, setOpenModalFirstLogin] = useState(false)
  
  const dispatch = useDispatch()
  let findIndex
  if (userInfo !== null) {
    findIndex = whishlist.findIndex(item => item.petId === id && item.userId === userInfo.id)
    
  }
  
  const handleChangeHeart = (id) => {
    if (userInfo === null) {
      setOpenModalFirstLogin(true)
    } else {
      if (findIndex === -1) {
        const find = pets.findIndex(pet => pet.id === id)

        dispatch(addPetToWhishlist({ item: pets[find], userId: userInfo.id, whishlist: whishlist }))
      } else {
        const whishlistId = whishlist[findIndex].id
        dispatch(removeWhishlist(whishlistId))
      }
    }
  }
  const handleRemoveWhishlist = (id) => {
    
    
    dispatch(removeWhishlist(id))
  }
  const goToDetail = () => {
    window.location.href = `/pets/pets-detail/${id}`
  }

  return (
    < >
      <Card
        className='card'
        cover={
          <img
            onClick={goToDetail}
            alt=""
            src={image}
          />
        }

      >
        <h3 onClick={goToDetail}>{type}</h3>
        <p > {age} month</p>
        <p>{numberWithCommas(Number(price))}</p>
        <p className='contact' > Contact us directly </p>

        {pathname !== "/whishlist"
          ?
          <div onClick={() => handleChangeHeart(id)} className='whishlist'>
            <p className='whishlist-icon' >{findIndex === -1||userInfo===null ? `🖤` : `❤️`}</p>
            <div className='whishlist-hover'>
              <p>{findIndex === -1 ? `Add To Whishlist` : `Remove From Whishlist`}</p>
            </div>
          </div>
          :
          <div onClick={() => handleRemoveWhishlist(id)} className='whishlist'>
            <p className='whishlist-icon' >🗑️</p>
            <div className='whishlist-hover'>
              <p>Remove From Whishlist</p>
            </div>
          </div>}

      </Card>
      <ModalFirstLoginOfFeature openModalFirstLogin={openModalFirstLogin} />
    </>)

}

export default CardItem;