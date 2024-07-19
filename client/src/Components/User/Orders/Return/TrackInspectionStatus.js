import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import "./Return.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import img from '../../../../Assets/bed_image_forrent.png'

function TrackInspectionStatus() {
    return (
        <div>
            <div className="track-delivery">
                <Link to="" style={{ textDecoration: "none" }}>
                    <h1 className="ri-arrow-left-line">Track Delivery</h1>
                </Link>
                <div className="trackdelivery-main_div">
                    <div className="status-bar">
                        <div className="status-item">
                            <FaCheckCircle size={50} className="icon_style_track" />
                            <p className="trackdelivery_track_status">Return Pending</p>
                            <p className="trackdelivery_date">
                                {/* {new Date(data?.orderDate).toLocaleDateString()} */}
                            </p>
                        </div>
                        {/* {data?.deliveryDate ? ( */}
                        <>
                            <div className="status-line"></div>
                            <div className="status-item">
                                <FaCheckCircle size={50} className="icon_style_track" />
                                <p className="trackdelivery_track_status">
                                    Inspection
                                </p>
                                <p className="trackdelivery_date">
                                    {/* {new Date(data?.deliveryDate).toLocaleDateString()} */}
                                </p>
                            </div>
                        </>
                        {/* ) : ( */}
                        <div></div>
                        {/* )} */}
                        {/* {data?.completionDate ? ( */}
                        <>
                            <div className="status-line"></div>
                            <div className="status-item">
                                <FaCheckCircle size={50} className="icon_style_track" />
                                <p className="trackdelivery_track_status">Payment</p>
                                <p className="trackdelivery_date">
                                    {/* {new Date(data?.completionDate).toLocaleDateString()} */}
                                </p>
                            </div>
                        </>
                        {/* ) : ( */}
                        <>
                            <div className="status-line"></div>
                            <div className="status-item">
                                <FaCheckCircle size={50} className="icon_style_track" />
                                <p className="trackdelivery_track_status">Returned</p>
                                <p className="trackdelivery_date">
                                    {/* {new Date(data?.completionDate).toLocaleDateString()} */}
                                </p>
                            </div>
                        </>
                        {/* )} */}
                    </div>

                    <div className="row trackdelivery_main_row">
                        <div className="col-md-7">
                            <img
                                // src={`${url}/${data.furnitureId.image1.filename}`}
                                className="img-fluid trackdelivery_img"
                                src={img}
                            // alt={data.furnitureId.name}
                            />
                        </div>
                        <div className="col-md-5 mt-3">
                            <p className="trackdelivery_itemname">
                                {/* {data?.furnitureId?.name} */}Double Bed Alpha 6x5
                            </p>
                            <p className="trackdelivery_amount">
                                {/* ₹{data?.furnitureId?.rent}/ */}10000/-
                                <span className="trackdelivery_span">Month</span>
                            </p>
                            <div className="row mt-3">
                                <div className="col-6 trackdelivery_color">Deposit Amount:</div>
                                <div className="col-6 text-black">
                                    {/* ₹{data.amount}/- */}
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-6 trackdelivery_color">Quantity:</div>
                                <div className="col-6 text-black">
                                    {/* {data?.count} */}
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-6 trackdelivery_color">
                                    Rent Date :
                                </div>
                                <div className="col-6 text-black">
                                    {/* {data?.noOfDays} */}
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-6 trackdelivery_color">
                                    Total Amount :
                                </div>
                                <div className="col-6 text-black">
                                    {/* {data?.noOfDays} */}
                                </div>
                            </div>
                            <div className="text-center m-4">
                                <Link>
                                    <button type="submit" className="btn btn-warning">
                                        &nbsp;&nbsp; Pay Now &nbsp;&nbsp;
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-md-4">
                            <h4 className="trackdelivery_info mb-3">Customer information</h4>
                            <div className="row mt-3">
                                <div className="col-3 trackdelivery_subtext">Name</div>
                                <div className="col-1">:</div>
                                <div className="col-8">
                                    {/* {data?.name ? data.name : data?.customerId?.name} */}
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-3 trackdelivery_subtext">Email</div>
                                <div className="col-1">:</div>
                                <div className="col-8">
                                    {/* {data?.email ? data.email : data?.customerId?.email} */}
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-3 trackdelivery_subtext">Phone</div>
                                <div className="col-1">:</div>
                                <div className="col-8">
                                    {/* {data?.contact ? data.contact : data?.customerId?.phone} */}
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-3 trackdelivery_subtext">Address</div>
                                <div className="col-1">:</div>
                                <div className="col-8">
                                    {/* {data?.address ? data.address : data?.customerId?.address} */}
                                </div>
                            </div>
                        </div>
                        {/* {data?.deliveryId ? ( */}
                        <>
                            <div className="col-md-4">
                                <h4 className="trackdelivery_info mb-3">Delivery agent</h4>
                                <div className="row">
                                    <div className="col-5 trackdelivery_subtext">Name</div>
                                    <div className="col-1">:</div>
                                    <div className="col-6">
                                        {/* {data?.deliveryId?.name} */}
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-5 trackdelivery_subtext">
                                        Vehicle type
                                    </div>
                                    <div className="col-1">:</div>
                                    <div className="col-6">
                                        {/* {data?.deliveryId?.vehicleType} */}
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-5 trackdelivery_subtext">
                                        Vehicle number
                                    </div>
                                    <div className="col-1">:</div>
                                    <div className="col-6">
                                        {/* {data?.deliveryId?.vehicleNumber} */}
                                    </div>
                                </div>
                            </div>

                        </>
                        {/* ) : ( */}
                        <div></div>
                        {/* )} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrackInspectionStatus