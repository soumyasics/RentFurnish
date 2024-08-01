import React, { useEffect, useState } from 'react';
import Shopnav from '../../Navbar/Shopnav';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../Constants/Baseurl';
import "./PendingOrder.css";
import placeholderimg from '../../../Assets/addfurniture_sub.png';
import axiosMultipartInstance from '../../Constants/FormDataUrl';
import { toast } from 'react-toastify';

function PendingReturns() {
    const deliveryid = localStorage.getItem("deliveryid");
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [subImages, setSubImages] = useState([]);
    const [productConditions, setProductConditions] = useState([]);
    const url = axiosInstance.defaults.url;
    console.log("did" + deliveryid)

    useEffect(() => {
        if (deliveryid === null) {
            navigate("/agentlogin");
        }

        axiosInstance.post(`viewMyReturnsByDeliveryAgentId/${deliveryid}`)
            .then((res) => {
                console.log(res,"view return");
                const fetchedData = res.data.data;
                setData(fetchedData);
                const initialSubImages = fetchedData.map(() => [placeholderimg, placeholderimg, placeholderimg, placeholderimg, placeholderimg, placeholderimg]);
                setSubImages(initialSubImages);
                const initialProductConditions = fetchedData.map(() => 'good');
                setProductConditions(initialProductConditions);
                fetchedData.sort((a, b) => {
                    const dateA = new Date(a.deliveryDate).setHours(0, 0, 0, 0);
                    const dateB = new Date(b.deliveryDate).setHours(0, 0, 0, 0);
                    return dateA - dateB;
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [deliveryid, navigate]);

    const handleImageChange = (event, orderIndex, imageIndex) => {
        const file = event.target.files[0];
        if (file) {
            const newSubImages = [...subImages];
            newSubImages[orderIndex][imageIndex] = URL.createObjectURL(file);
            setSubImages(newSubImages);
        }
    };

    const handleConditionChange = (orderIndex, condition) => {
        const newProductConditions = [...productConditions];
        newProductConditions[orderIndex] = condition;
        setProductConditions(newProductConditions);
    };

    const handleSubmit = (event, orderIndex) => {
        event.preventDefault();
        const order = data[orderIndex];
        const formData = new FormData();
        formData.append('returnId', order?._id);
        formData.append('customerId', order?.customerId?._id);
        formData.append('furnitureId', order?.furnitureId?._id);
        formData.append('shopId', order?.shopId?._id);
        formData.append('deliveryId', deliveryid);
        formData.append('orderId', order?.orderId?._id);
        formData.append('prodCondition', productConditions[orderIndex]);

        const inputElements = document.querySelectorAll(`#form-${orderIndex} input[type="file"]`);
        inputElements.forEach((input, index) => {
            if (input.files.length > 0) {
                formData.append(`image${index + 1}`, input.files[0]);
            }
        });

        axiosMultipartInstance.post('/addInspection', formData)
            .then((res) => {
                console.log(res);
                if (res.data.status === 200) {
                    toast.success('Inspection submitted successfully!');
                    // window.location.reload();
                } else {
                    toast.error('Failed to submit inspection.');
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error('Error.');
            });

        axiosMultipartInstance.post(`/updateInspectionStatusByOrderId/${order?.orderId?._id}`)
            .then((res) => {
                // console.log("bid",order?._id);
                console.log("res", res)
                if (res.data.status === 200) {
                    console.log('Updated successfully!');
                    window.location.reload()
                } else {
                    console.log('Failed to submit inspection.');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <Shopnav />
            <div className='container'>
                <div className='orderdetailsdel-main'>
                    {data && data.length ? (
                        data.map((order, orderIndex) => (
                            <div key={orderIndex} className="back_ground ms-5 mb-2 mt-3 container pending_return_">
                                <form id={`form-${orderIndex}`} onSubmit={(e) => handleSubmit(e, orderIndex)}>
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
                                                                <p>{order?.orderId?.count}</p>
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
                                                                <p>{order?.customerId?.name}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col Furniture_details_text">
                                                                <p>Address :</p>
                                                            </div>
                                                            <div className="col Furniture_details_text2">
                                                                <p>{order?.customerId?.address}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col Furniture_details_text">
                                                                <p>Phone :</p>
                                                            </div>
                                                            <div className="col Furniture_details_text2">
                                                                <p>{order?.customerId?.phone}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col Furniture_details_text">
                                                                <p>Email :</p>
                                                            </div>
                                                            <div className="col Furniture_details_text2">
                                                                <p>{order?.customerId?.email}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-4">
                                                <div className="col-6">
                                                    <label htmlFor={`imageUpload${orderIndex}-0`} className="Customer_text mb-3">Upload Photos</label>
                                                    <div className="row">
                                                        {subImages[orderIndex].map((img, imageIndex) => (
                                                            <div className="col-4 mb-2" key={imageIndex}>
                                                                <label htmlFor={`imageUpload${orderIndex}-${imageIndex}`}>
                                                                    <img
                                                                        src={img}
                                                                        className="img-fluid inspection_img_style_"
                                                                    />
                                                                </label>
                                                                <input
                                                                    type="file"
                                                                    id={`imageUpload${orderIndex}-${imageIndex}`}
                                                                    style={{ display: 'none' }}
                                                                    onChange={(e) => handleImageChange(e, orderIndex, imageIndex)}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className='col-6'>
                                                    <p className="Customer_text">Product Details</p>
                                                    <p>
                                                        <label className="col mt-4 Furniture_details_text size_pending_return">Rent Date: </label>
                                                        {/* {order?.orderId?.completionDate} */}
                                                        {order ? new Date(order?.orderId?.completionDate).toLocaleDateString() : ""} - {order ? new Date(order?.returnDate).toLocaleDateString() : ""}
 
                                                        {/* <p>{order?.customerId?.email}</p> */}

                                                    </p>
                                                    <p className="col Furniture_details_text size_pending_return">Product Condition: </p>
                                                    <div className="radio-buttons">
                                                        <label className="radio-container text-success">
                                                            Good
                                                            <input type="radio" name={`status${orderIndex}`} value="good"
                                                                checked={productConditions[orderIndex] === 'good'}
                                                                onChange={(e) => handleConditionChange(orderIndex, e.target.value)} />
                                                            <span className="checkmark mt-2"></span>
                                                        </label>
                                                        <label className="radio-container damaged text-danger">
                                                            Damaged
                                                            <input type="radio" name={`status${orderIndex}`} value="damaged"
                                                                checked={productConditions[orderIndex] === 'damaged'}
                                                                onChange={(e) => handleConditionChange(orderIndex, e.target.value)} />
                                                            <span className="checkmark mt-2"></span>
                                                        </label>
                                                    </div>
                                                    <div className="text-center mt-5 pt-3">
                                                        <button type="submit" className="btn btn-warning">
                                                            &nbsp;&nbsp; Confirm &nbsp;&nbsp;
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        ))
                    ) : (
                        <h1 className='ps-4 pt-5'>No Inspections available</h1>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PendingReturns;
