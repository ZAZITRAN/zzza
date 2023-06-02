import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getPetsbyId } from '../../../feature/reducer/petsReducer';
import { Breadcrumb } from 'antd';
import { numberWithCommas } from '../../../utils/NumberWithComat';
import "./PetsDetail.scss"
import { addPetToWhishlist } from '../../../feature/reducer/whishlistReducer';


function PetsDetail() {

    const { whishlist } = useSelector(state => state.whishlist)
    const userInfo = JSON.parse(localStorage.getItem("userLogin"))
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPetsbyId({ id: +id }))
    }, [])
    const { pet } = useSelector(state => state.pets)

    const handleAddToWhistlist = () => {
        if (userInfo === null) {
            alert("please Login first")
            window.location.href = "/login"
        } else {

            dispatch(addPetToWhishlist({ item: { ...pet, userId: userInfo.id }, whishlist: whishlist }))
        }


    }
   

    return (

        <div className='detail'>
            <Breadcrumb
                items={[
                    { title: <Link to="/pets/pets-list">Pets List</Link> },
                    { title: `PetsId : ${id}` }
                ]}
            />
            <div className='detail-info'>
                <div className='detail-info-image'>
                    <img src={pet.image} alt='' />
                </div>
                <div className='detail-info-info'>
                    <p className='type'>  Type: {pet.type}</p>
                    <p className='color'> Color: {pet.color}</p>
                    <p className='age'> Age: {pet.age} month</p>

                    <p className='price'>Price: {numberWithCommas(Number(pet.price))} VND</p>

                    <div className='detail-info-info-button'>
                        <p className='add-wl' onClick={handleAddToWhistlist}>
                            ❤️ Add to whistlist
                        </p>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PetsDetail;
