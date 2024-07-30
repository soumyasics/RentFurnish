import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './Return.css';
import img from '../../../../Assets/comp.png';
import axiosMultipartInstance from '../../../Constants/FormDataUrl';
import axiosInstance from '../../../Constants/Baseurl';
import { toast } from 'react-toastify';

function ReturnDetails() {
    const { id } = useParams();
    const [data, setData] = useState({});
    const url = axiosInstance.defaults.url;
    const userid = localStorage.getItem("userid");
    const navigate = useNavigate();

    useEffect(() => {
        axiosMultipartInstance
            .post(`viewOrderById/${id}`)
            .then((res) => {
                console.log(res);
                setData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const handleReturn = () => {
        const returnData = {
            orderId: id,
            customerId: data.customerId._id,
            furnitureId: data.furnitureId._id,
            shopId: data.shopId, 
            returnAmount: data.totalAmount, 
        };

        axiosInstance.post('/addreturn', returnData)
            .then((res) => {
                if (res.data.status === 200) {
                    console.log(res)
                    localStorage.setItem("returnId",res.data.id);
                    console.log(res.data.id);
                    navigate(`/user-trackreturnstatus/${userid}`);
                } else {
                    console.error(res.data.error);
                }
            })
            .catch((error) => {
                console.error(error);
                alert('Server error');
            });

            axiosInstance.post(`/updateReturnStatus/${id}`)
            .then((res) => {
                if (res.data.status === 200) {
                    console.log(res)
                } else {
                    console.error(res.data.error);
                }
            })
            .catch((error) => {
                console.error(error);
                alert('Server error');
            });
    };

    return (
        <div className='container pt-4'>
            <Link to='/user-viewmyorder' style={{ textDecoration: "none" }}>
                <h1 className="ri-arrow-left-line">Return Details</h1>
            </Link>
            <div className='row return_details_main_div'>
                <div className='col-4'>
                    <img src={`${url}/${data?.furnitureId?.image1.filename}`}  className='img-fluid return_details_image' />
                </div>
                <div className='col-8'>
                    <div className='row return_details_subdiv'>
                        <div className='col-6'>
                            <h4 className='return_maintext_color'>Furniture Details</h4>
                            <div className='row pt-2'>
                                <div className='col-5 return_subtext_color'>Furniture Name</div>
                                <div className='col-2'>:</div>
                                <div className='col-5'>{data?.furnitureId?.name}</div>
                            </div>
                            <div className='row pt-2'>
                                <div className='col-5 return_subtext_color'>Furniture Type</div>
                                <div className='col-2'>:</div>
                                <div className='col-5'>{data?.furnitureId?.category}</div>
                            </div>
                            <div className='row pt-2'>
                                <div className='col-5 return_subtext_color'>Quantity</div>
                                <div className='col-2'>:</div>
                                <div className='col-5'>{data?.furnitureId?.quantity}</div>
                            </div>
                            <div className='row pt-2'>
                                <div className='col-5 return_subtext_color'>Price</div>
                                <div className='col-2'>:</div>
                                <div className='col-5'>₹{data?.furnitureId?.rent}/Month</div>
                            </div>
                        </div>
                        <div className='col-6'>
                            <h4 className='return_maintext_color'>Customer Information</h4>
                            <div className='row pt-2'>
                                <div className='col-5 return_subtext_color'> Name</div>
                                <div className='col-2'>:</div>
                                <div className='col-5'>{data.name}</div>
                            </div>
                            <div className='row pt-2'>
                                <div className='col-5 return_subtext_color'>Email</div>
                                <div className='col-2'>:</div>
                                <div className='col-5'> {data.email}</div>
                            </div>
                            <div className='row pt-2'>
                                <div className='col-5 return_subtext_color'>Phone No</div>
                                <div className='col-2'>:</div>
                                <div className='col-5'>{data?.customerId?.phone}</div>
                            </div>
                            <div className='row pt-2'>
                                <div className='col-5 return_subtext_color'>Address</div>
                                <div className='col-2'>:</div>
                                <div className='col-5'>{data.address}</div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center m-4">
                        <button type="button" className="btn btn-warning" onClick={handleReturn}>
                            &nbsp;&nbsp; Return Now &nbsp;&nbsp;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReturnDetails;