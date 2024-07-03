import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Shopnav from '../Navbar/Shopnav';
import Showdropdown from './Shopdropdown';
import mainimg from '../../Assets/addfurniture_first.png';
import axiosMultipartInstance from '../Constants/FormDataUrl';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import axiosInstance from '../Constants/Baseurl';

function ViewFurniture() {
    const [furnitureList, setFurnitureList] = useState([]);
    const url = axiosInstance.defaults.url;

    useEffect(() => {
        axiosMultipartInstance.post('viewallFurniture')
            .then(response => {
                console.log(response);
                if (response.data.status === 200) {
                    setFurnitureList(response.data.data);
                } else {
                    console.log('No data obtained');
                }
            })
            .catch(error => {
                console.error('Error fetching furniture data:', error);
            });
    }, []);


    return (
        <div>
            <Shopnav />
            <Showdropdown />
            <div className='container viewfur_main_box'>
                {furnitureList && furnitureList.length ? (
                    furnitureList.map(furniture => (
                        <div className='furniture-box' key={furniture._id}>
                            <div className='row'>
                                <div className='col-md-4 col-sm-12'>
                                    <img 
                                        src={furniture.image1 ? `${url}/${furniture.image1.filename}` : mainimg} 
                                        className='img-fluid view_main_image_style' 
                                        alt='Furniture' 
                                        // onError={(e) => e.target.src = mainimg}
                                    />
                                </div>
                                <div className='col-md-5 col-sm-12 view_fur_rowpadding'>
                                    <div className='row m-2'>
                                        <div className='col-4 view_fur_main_head'>
                                            Furniture Name
                                        </div>
                                        <div className='col-1'>
                                            :
                                        </div>
                                        <div className='col-7'>
                                            {furniture.name}
                                        </div>
                                    </div>
                                    <div className='row m-2'>
                                        <div className='col-4 view_fur_main_head'>
                                            Price
                                        </div>
                                        <div className='col-1'>
                                            :
                                        </div>
                                        <div className='col-7'>
                                            ₹{furniture.condition} / Month
                                        </div>
                                    </div>
                                    <div className='row m-2'>
                                        <div className='col-4 view_fur_main_head'>
                                            Dimensions
                                        </div>
                                        <div className='col-1'>
                                            :
                                        </div>
                                        <div className='col-7'>
                                            {furniture.dimension}
                                        </div>
                                    </div>
                                    <div className='row m-2'>
                                        <div className='col-4 view_fur_main_head'>
                                            Room Category
                                        </div>
                                        <div className='col-1'>
                                            :
                                        </div>
                                        <div className='col-7'>
                                            {furniture.roomType}
                                        </div>
                                    </div>
                                    <div className='row m-2'>
                                        <div className='col-4 view_fur_main_head'>
                                            Furniture Category
                                        </div>
                                        <div className='col-1'>
                                            :
                                        </div>
                                        <div className='col-7'>
                                            {furniture.category}
                                        </div>
                                    </div>
                                    <div className='row m-2'>
                                        <div className='col-4 view_fur_main_head'>
                                            Description
                                        </div>
                                        <div className='col-1'>
                                            :
                                        </div>
                                        <div className='col-7'>
                                            {furniture.description}
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-3 col-sm-12 text-center view_fur_last_div'>
                                    Quantity <button className='btn btn-secondary'>{furniture.quantity}</button>
                                    <div className='row m-3'>
                                        <div className='col-6'>
                                            <button className='edit-button'> 
                                                <FaEdit /> Edit
                                            </button>
                                        </div>
                                        <div className='col-6'>
                                            <button className='delete-button'> 
                                                <RiDeleteBin2Fill /> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center">
                        <p>No furniture available.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ViewFurniture;
