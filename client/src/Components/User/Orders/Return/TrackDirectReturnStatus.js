import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import "./Return.css";
import axiosInstance from '../../../Constants/Baseurl';
import img from '../../../../Assets/bed_image_forrent.png';

function TrackDirectReturnStatus() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const url = axiosInstance.defaults.url;

    useEffect(() => {
        axiosInstance.post(`/viewReturnByFurniturerId/${id}`)
            .then((res) => {
                setData(res.data.data[0]);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);

    return (
        <div>
            <div className="track-delivery">
                <Link to="/user-viewmyorder" style={{ textDecoration: "none" }}>
                    <h1 className="ri-arrow-left-line">Track Return Status</h1>
                </Link>
                <div className="trackdelivery-main_div">


                    {data?.returnStatus === "Pending" ? (
                        <>
                            <div className="status-bar">
                                <div className="status-item">
                                    <FaCheckCircle size={50} className="icon_style_track" />
                                    <p className="trackdelivery_track_status">Return Pending</p>
                                    <p className="trackdelivery_date">
                                        {data ? new Date(data?.returnDate).toLocaleDateString() : ""}
                                    </p>
                                </div>
                            </div>

                        </>
                    ) : (
                        <div>
                            <div className="status-bar">
                                <div className="status-item">
                                    <FaCheckCircle size={50} className="icon_style_track" />
                                    <p className="trackdelivery_track_status">Return Pending</p>
                                    <p className="trackdelivery_date">
                                        {data ? new Date(data?.returnDate).toLocaleDateString() : ""}
                                    </p>
                                </div>
                                <div className="status-line"></div>
                                <div className="status-item">
                                    <FaCheckCircle size={50} className="icon_style_track" />
                                    <p className="trackdelivery_track_status">Inspection</p>
                                    <p className="trackdelivery_date">
                                        {/* {new Date(data.inspectionDate).toLocaleDateString()} */}
                                    </p>
                                </div>
                                <div className="status-line"></div>
                                <div className="status-item">
                                    <FaCheckCircle size={50} className="icon_style_track" />
                                    <p className="trackdelivery_track_status">Payment</p>
                                    <p className="trackdelivery_date">
                                        {/* {new Date(data.paymentDate).toLocaleDateString()} */}
                                    </p>
                                </div>
                                <div className="status-line"></div>
                                <div className="status-item">
                                    <FaCheckCircle size={50} className="icon_style_track" />
                                    <p className="trackdelivery_track_status">Returned</p>
                                    <p className="trackdelivery_date">
                                        {/* {new Date(data.returnDate).toLocaleDateString()} */}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}


                    <div className="row trackdelivery_main_row">
                        <div className="col-md-7">
                            <img
                                src={`${url}/${data?.furnitureId?.image1.filename}`}
                                className="img-fluid trackdelivery_img"
                            />
                        </div>
                        <div className="col-md-5 mt-3">
                            <p className="trackdelivery_itemname">
                                {data?.furnitureId?.name}
                            </p>
                            <p className="trackdelivery_amount">
                                ₹{data?.furnitureId?.rent}/-
                                <span className="trackdelivery_span">Month</span>
                            </p>
                            <div className="row mt-3">
                                <div className="col-6 trackdelivery_color">Deposit Amount:</div>
                                <div className="col-6 text-black">
                                    ₹{data?.orderId?.amount}/-
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-6 trackdelivery_color">Quantity:</div>
                                <div className="col-6 text-black">
                                    {data?.orderId?.count}
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-6 trackdelivery_color">Rent Date:</div>
                                <div className="col-6 text-black">
                                    {data ? new Date(data?.orderId?.orderDate).toLocaleDateString() : ""} - {data ? new Date(data?.orderId?.completionDate).toLocaleDateString() : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrackDirectReturnStatus