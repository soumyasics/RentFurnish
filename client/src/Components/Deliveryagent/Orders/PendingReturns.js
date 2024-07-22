import React, { useEffect, useState } from 'react';
import Shopnav from '../../Navbar/Shopnav';
import customer from "../../../Assets/deliveryicon.png";
import delivery from "../../../Assets/orders.png";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Constants/Baseurl';
import "./PendingOrder.css";
import { toast } from 'react-toastify';
import placeholderimg from '../../../Assets/addfurniture_sub.png';

function PendingReturns() {
    const deliveryid = localStorage.getItem("deliveryid");
    console.log(deliveryid);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [subImages, setSubImages] = useState([placeholderimg, placeholderimg, placeholderimg, placeholderimg, placeholderimg, placeholderimg]);
    const url = axiosInstance.defaults.url;

    useEffect(() => {
        if (deliveryid === null) {
            navigate("/agentlogin");
        }

        axiosInstance.post(`viewMyReturnsByDeliveryAgentId/${deliveryid}`)
            .then((res) => {
                console.log(res);
                setData(res.data.data);
                const sortedData = res.data.data.sort((a, b) => {
                    const dateA = new Date(a.deliveryDate).setHours(0, 0, 0, 0);
                    const dateB = new Date(b.deliveryDate).setHours(0, 0, 0, 0);
                    return dateA - dateB;
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [deliveryid, navigate]);

    const handleImageChange = (event, index) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newSubImages = [...subImages];
                newSubImages[index] = reader.result;
                setSubImages(newSubImages);
                // Update the data object if needed
                // setData({ ...data, [`image${index + 1}`]: file });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <Shopnav />
            <div className='container'>
                <div className='orderdetailsdel-main '>
                    {data && data.length ? (
                        data.map((order, orderIndex) => (
                            <div key={orderIndex} className="back_ground ms-5 mb-2 mt-3 container pending_return_">
                                <div className="col">
                                    <div className="row">
                                        <div className="col-4">
                                            <img
                                                className="mt-5 ms-3 img-fluid product_img1"
                                                src={`${url}/${order?.furnitureId?.image1?.filename}`}
                                                alt="Product"
                                            />
                                        </div>
                                        <div className="col-8">
                                            <div className="row">
                                                <div className="col mt-5">
                                                    <p className="Furniture_text">Furniture details</p>
                                                    <div className="row mt-4">
                                                        <div className="col Furniture_details_text">
                                                            <p>Furniture Type :</p>
                                                        </div>
                                                        <div className="col Furniture_details_text2">
                                                            <p>{order?.furnitureId?.category}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col Furniture_details_text">
                                                            <p>Quantity:</p>
                                                        </div>
                                                        <div className="col Furniture_details_text2">
                                                            <p>{order?.furnitureId?.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col Furniture_details_text">
                                                            <p>Dimension :</p>
                                                        </div>
                                                        <div className="col Furniture_details_text2">
                                                            <p>{order?.furnitureId?.dimension}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col Furniture_details_text">
                                                            <p>Price :</p>
                                                        </div>
                                                        <div className="col Furniture_details_text2">
                                                            <p>{order?.furnitureId?.rent}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col mt-5">
                                                    <p className="Customer_text">Customer information</p>
                                                    <div className="row mt-4">
                                                        <div className="col Furniture_details_text">
                                                            <p>Name:</p>
                                                        </div>
                                                        <div className="col Furniture_details_text2">
                                                            <p>{order?.name ? order.name : order?.customerId?.name}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col Furniture_details_text">
                                                            <p>Email:</p>
                                                        </div>
                                                        <div className="col Furniture_details_text2">
                                                            <p>{order?.email ? order.email : order?.customerId?.email}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col Furniture_details_text">
                                                            <p>Phone number :</p>
                                                        </div>
                                                        <div className="col Furniture_details_text2">
                                                            <p>{order?.contact ? order.contact : order?.customerId?.phone}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col Furniture_details_text">
                                                            <p>Address :</p>
                                                        </div>
                                                        <div className="col Furniture_details_text2">
                                                            <p>{order?.address ? order.address : order?.customerId?.address}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mt-3 ms-3'>
                                        <div className='col-6'>
                                            <p className="Customer_text">Photo Uploaded</p>
                                            <div className='row'>
                                                {subImages.map((image, index) => (
                                                    <div className='col-4 pt-4' key={index}>
                                                        <label htmlFor={`imageUpload${index}`} className="img-fluid">
                                                            <img
                                                                src={image}
                                                                alt={`Uploaded ${index}`}
                                                                className="img-fluid inspection_img_style_"
                                                                style={{ cursor: 'pointer' }}
                                                            />
                                                        </label>
                                                        <input
                                                            type="file"
                                                            id={`imageUpload${index}`}
                                                            style={{ display: 'none' }}
                                                            onChange={(e) => handleImageChange(e, index)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='col-6 ps-5 pt-2'>
                                            <p className="Customer_text">Product Details</p>
                                            <p>
                                                <label className="col mt-4 Furniture_details_text size_pending_return">Rent Date: </label>
                                                12/01/2024 - 01/06/2024
                                            </p>
                                            <p className="col Furniture_details_text size_pending_return">Product Condition: </p>
                                            <div className="radio-buttons">
                                                <label className="radio-container text-success">
                                                    Good
                                                    <input type="radio" name="status" value="good" />
                                                    <span className="checkmark mt-2"></span>
                                                </label>
                                                <label className="radio-container damaged text-danger">
                                                    Damaged
                                                    <input type="radio" name="status" value="damaged" />
                                                    <span className="checkmark mt-2"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-4">
                                        <button type="submit" className="btn btn-warning">
                                            &nbsp;&nbsp; Confirm &nbsp;&nbsp;
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="viewcounsellor-lottiereqq">No Pending Request found</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PendingReturns;
