import React, { useEffect, useState } from 'react';
import './Viewallfurnitures.css';
import { FaRegHeart } from 'react-icons/fa';
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../Constants/Baseurl';
import axiosMultipartInstance from '../../Constants/FormDataUrl';

function ViewLivingRoomFurniture() {
    const [furnitureData, setFurnitureData] = useState([]);
    const url = axiosInstance.defaults.url;
    const room = 'Living Room';

    useEffect(() => {
        axiosMultipartInstance.post(`/viewFurnitureswithRoomType/${room}`)
            .then(response => {
                setFurnitureData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <div>
            <h1 className='container pb-3 pt-3 room_type_heading'>
                <Link to="/user-home">
                    <FaArrowLeft className='contact_arrow' />
                </Link>
                Living Room
            </h1>
            <div className="furniture-grid container">
                {furnitureData.map((item) => (
                    <div key={item._id} className="furniture-item">
                        <img src={`${url}/${item?.image1?.filename}`} alt={item.name} className="furniture-image img-fluid" />
                        <Link to={`/user-purchesproduct/${item._id}`} style={{ textDecoration: "none" }}>
                            <div className="furniture-details">
                                <h3 className='viewfur_main_name'>{item.name}</h3>
                                <p className='viewfur_text_color_change'>Available Quantity: {item.quantity}</p>
                                <p className='viewfur_text_color_change'>Rent</p>
                                <p className='viewfur_amount_rent'> ₹{item.rent}/MO</p>
                            </div>
                            <button className="wishlist-button"><FaRegHeart /></button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ViewLivingRoomFurniture