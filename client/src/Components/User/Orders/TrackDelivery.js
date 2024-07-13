import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { IoMdSend } from "react-icons/io";
import './TrackDelivery.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../Constants/Baseurl';
import axiosMultipartInstance from '../../Constants/FormDataUrl';
import { toast } from 'react-toastify';

function TrackDelivery() {
    const { id } = useParams();
    const userid = localStorage.getItem("userid");
    const shopid = localStorage.getItem("shopid");
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const url = axiosInstance.defaults.url;
    const [complaintText, setComplaintText] = useState('');

    console.log(id);
    console.log("uid", userid);
    console.log("sid", shopid);

    useEffect(() => {
        if (!id) {
            navigate("/");
        } else {
            axiosMultipartInstance.post(`viewOrderById/${id}`)
                .then((res) => {
                    console.log(res);
                    setData(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [id, navigate]);

    const handleComplaintSubmit = () => {
        if (!complaintText) {
            alert('Please enter a complaint.');
            return;
        }
    
        const complaintData = {shopId: shopid, userId: userid, complaint: complaintText, date: new Date()};
        axiosInstance.post('/createComplaint', complaintData)
            .then(res => {
                if (res.status === 200) {
                    toast.success('Complaint added successfully!');
                    setComplaintText('');
                } else {
                    toast.error('Failed to add complaint.');
                }
            })
            .catch(err => {
                console.error('Failed to add complaint:', err);
                toast.error('Failed to add complaint.');
            });
    };
    
    if (!data) {
        return <div>Loading...</div>;
    }
    

    return (
        <div className="track-delivery">
            <Link to="/user-viewmyorder" style={{ textDecoration: "none" }}>
                <h1 className="ri-arrow-left-line">Track Delivery</h1>
            </Link>
            <div className='trackdelivery-main_div'>
                <div className="status-bar">
                    <div className="status-item">
                        <FaCheckCircle size={50} className='icon_style_track' />
                        <p className='trackdelivery_track_status'>Order confirmed</p>
                        <p className='trackdelivery_date'>30/06/2024</p>
                    </div>
                    <div className="status-line"></div>
                    <div className="status-item">
                        <FaCheckCircle size={50} className='icon_style_track' />
                        <p className='trackdelivery_track_status'>Order is in transit!</p>
                        <p className='trackdelivery_date'>30/06/2024</p>
                    </div>
                    <div className="status-line"></div>
                    <div className="status-item">
                        <FaCheckCircle size={50} className='icon_style_track' />
                        <p className='trackdelivery_track_status'>Delivered</p>
                        <p className='trackdelivery_date'>30/06/2024</p>
                    </div>
                </div>

                <div className='row trackdelivery_main_row'>
                    <div className='col-md-7'>
                            <img 
                            src={`${url}/${data.furnitureId.image1.filename}`} 
                            className='img-fluid trackdelivery_img' 
                            alt={data.furnitureId.name} 
                            />
                        
                    </div>
                    <div className='col-md-5 mt-3'>
                        <p className='trackdelivery_itemname'>{data?.furnitureId?.name}</p>
                        <p className='trackdelivery_amount'>₹{data?.furnitureId?.rent}/<span className='trackdelivery_span'>Month</span></p>
                        <div className='row mt-3'>
                            <div className='col-6 trackdelivery_color'>Deposit Amount:</div>
                            <div className='col-6 text-black'> ₹{data.amount}/-</div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-6 trackdelivery_color'>Quantity:</div>
                            <div className='col-6 text-black'> {data?.furnitureId?.quantity}</div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-6 trackdelivery_color'>Dimensions:</div>
                            <div className='col-6 text-black'> {data?.furnitureId?.dimension}</div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-md-4">
                        <h4 className='trackdelivery_info mb-3'>Customer information</h4>
                        <div className='row mt-3'>
                            <div className='col-3 trackdelivery_subtext'>Name</div>
                            <div className='col-1'>:</div>
                            <div className='col-8'>{data?.customerId?.name}</div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-3 trackdelivery_subtext'>Email</div>
                            <div className='col-1'>:</div>
                            <div className='col-8'>{data?.customerId?.email}</div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-3 trackdelivery_subtext'>Phone</div>
                            <div className='col-1'>:</div>
                            <div className='col-8'>{data?.customerId?.phone}</div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-3 trackdelivery_subtext'>Address</div>
                            <div className='col-1'>:</div>
                            <div className='col-8'>{data?.customerId?.address}</div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h4 className='trackdelivery_info mb-3'>Delivery agent</h4>
                        <div className='row'>
                            <div className='col-5 trackdelivery_subtext'>Name</div>
                            <div className='col-1'>:</div>
                            <div className='col-6'>Ashok N K</div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-5 trackdelivery_subtext'>Vehicle type</div>
                            <div className='col-1'>:</div>
                            <div className='col-6'>Car</div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-5 trackdelivery_subtext'>Vehicle number</div>
                            <div className='col-1'>:</div>
                            <div className='col-6'>TN 75 B 4567</div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h4 className='trackdelivery_info mb-3'>Delivery information</h4>
                        <p className='text-justify'>Great news! Our team will reach out to finalize details within 2 days</p>
                    </div>
                </div>

                <h4 className='trackdelivery_info mt-5'>Register a Complaint</h4>
                <div className='complaint-box-container'>
                    <textarea
                        rows={5}
                        cols={100}
                        className='trackdelivery_textarea'
                        value={complaintText}
                        onChange={(e) => setComplaintText(e.target.value)}
                    ></textarea>
                    <button onClick={handleComplaintSubmit}>
                        <IoMdSend />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TrackDelivery;
