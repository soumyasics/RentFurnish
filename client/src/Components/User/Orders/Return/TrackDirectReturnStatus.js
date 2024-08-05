import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import "./Return.css";
import axiosInstance from '../../../Constants/Baseurl';
import img from '../../../../Assets/bed_image_forrent.png';

function TrackDirectReturnStatus() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [inspectionData, setInspectionData] = useState(null);
    const url = axiosInstance.defaults.url;
    console.log("id" + id)
    useEffect(() => {
        axiosInstance.post(`/viewReturnByOrderId/${id}`)
            .then((res) => {
                console.log("Data:", res)
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
                                            {data ? new Date(data?.orderId?.completionDate).toLocaleDateString() : ""} - {data ? new Date(data?.returnDate).toLocaleDateString() : ""}
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-6 trackdelivery_color">Total Rent Amount:</div>
                                        <div className="col-6 text-black">
                                            {data?.totalRentAmount.toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="row mt-5 alert_msg_box">
                                        {/* <div className="col-6 trackdelivery_color">Deviated Amount:</div>
                                        <div className="col-6 text-black">
                                            {data?.deviatedAmt}
                                        </div> */}
                                        <div className="track_return_status_alert">
                                            <h5>Your return request has been submitted successfully. The final amount will be confirmed after the inspection is completed.</h5>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </>
                    ) :  data?.returnStatus === "Confirmed" && data?.inspectionStatus === "Confirmed" && data.paymentStatus === true ? (
                        <div>
                            <div className="status-bar">
                                <div className="status-item">
                                    <FaCheckCircle size={50} className="icon_style_track" />
                                    <p className="trackdelivery_track_status">Return Confirmed</p>
                                    <p className="trackdelivery_date">
                                        {new Date(data?.confirmedDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="status-line"></div>
                                <div className="status-item">
                                    <FaCheckCircle size={50} className="icon_style_track" />
                                    <p className="trackdelivery_track_status">
                                        Inspection
                                    </p>
                                    <p className="trackdelivery_date">
                                        {new Date(data?.inspectionDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="status-line"></div>
                                <div className="status-item">
                                    <FaCheckCircle size={50} className="icon_style_track" />
                                    <p className="trackdelivery_track_status">
                                        Payment
                                    </p>
                                    <p className="trackdelivery_date">
                                        {new Date(data?.paymentDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="status-line"></div>
                                <div className="status-item">
                                    <FaCheckCircle size={50} className="icon_style_track" />
                                    <p className="trackdelivery_track_status">
                                        Returned
                                    </p>
                                    <p className="trackdelivery_date">
                                        {new Date(data?.completionDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="row trackdelivery_main_row">
                                <div className="col-md-7">
                                    <img
                                        src={`${url}/${data?.furnitureId?.image1.filename}`}
                                        className="img-fluid trackdelivery_img"
                                        alt={data.furnitureId.name}
                                    />
                                </div>
                                <div className="col-md-5 mt-3">
                                    <p className="trackdelivery_itemname">
                                        {data?.furnitureId?.name}
                                    </p>
                                    <p className="trackdelivery_amount">
                                        ₹{data?.furnitureId?.rent}/
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
                                        <div className="col-6 trackdelivery_color">
                                            Rent Date
                                        </div>
                                        <div className="col-6 text-black">
                                            {data ? new Date(data?.orderId?.orderDate).toLocaleDateString() : ""} - {data ? new Date(data?.returnDate).toLocaleDateString() : ""}
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-6 trackdelivery_color">Fine Amount:</div>
                                        <div className="col-6 text-black">
                                            ₹ {data?.fineAmount}/-
                                        </div>
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
                                            {data?.customerId?.name}
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3 trackdelivery_subtext">Email</div>
                                        <div className="col-1">:</div>
                                        <div className="col-8">
                                            {data?.customerId?.email}
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3 trackdelivery_subtext">Phone</div>
                                        <div className="col-1">:</div>
                                        <div className="col-8">
                                            {data?.customerId?.phone}
                                        </div>
                                    </div>
                                    {/* <div className="row mt-3">
                                        <div className="col-3 trackdelivery_subtext">Address</div>
                                        <div className="col-1">:</div>
                                        <div className="col-8">
                                            {data?.customerId?.address}
                                        </div>
                                    </div> */}
                                </div>
                                {data?.deliveryId ? (
                                    <>
                                        <div className="col-md-4">
                                            <h4 className="trackdelivery_info mb-3">Delivery agent</h4>
                                            <div className="row">
                                                <div className="col-5 trackdelivery_subtext">Name</div>
                                                <div className="col-1">:</div>
                                                <div className="col-6">
                                                    {data?.deliveryId?.name}
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-5 trackdelivery_subtext">
                                                    Vehicle type
                                                </div>
                                                <div className="col-1">:</div>
                                                <div className="col-6">
                                                    {data?.deliveryId?.vehicleType}
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-5 trackdelivery_subtext">
                                                    Vehicle number
                                                </div>
                                                <div className="col-1">:</div>
                                                <div className="col-6">
                                                    {data?.deliveryId?.vehicleNumber}
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="col-md-4">
                                            <h4 className="trackdelivery_info mb-3">
                                                Delivery information
                                            </h4>
                                            <p className="text-justify">
                                                Our team will reach out to finalize details within 2 days
                                            </p>
                                        </div> */}
                                    </>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        </div>
                    ) : data?.returnStatus === "Confirmed" && data?.inspectionStatus === "Confirmed" && data?.deviatedAmt > 0 ? (
                        <div>
                            <div className="status-bar">
                                <div className="status-item">
                                    <FaCheckCircle size={50} className="icon_style_track" />
                                    <p className="trackdelivery_track_status">Return Confirmed</p>
                                    <p className="trackdelivery_date">
                                        {new Date(data?.confirmedDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="status-line"></div>
                                <div className="status-item">
                                    <FaCheckCircle size={50} className="icon_style_track" />
                                    <p className="trackdelivery_track_status">
                                        Inspection
                                    </p>
                                    <p className="trackdelivery_date">
                                        {new Date(data?.inspectionDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="row trackdelivery_main_row">
                                <div className="col-md-7">
                                    <img
                                        src={`${url}/${data?.furnitureId?.image1.filename}`}
                                        className="img-fluid trackdelivery_img"
                                        alt={data.furnitureId.name}
                                    />
                                </div>
                                <div className="col-md-5 mt-3">
                                    <p className="trackdelivery_itemname">
                                        {data?.furnitureId?.name}
                                    </p>
                                    <p className="trackdelivery_amount">
                                        ₹{data?.furnitureId?.rent}/
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
                                        <div className="col-6 trackdelivery_color">
                                            Rent Date
                                        </div>
                                        <div className="col-6 text-black">
                                            {data ? new Date(data?.orderId?.orderDate).toLocaleDateString() : ""} - {data ? new Date(data?.orderId?.completionDate).toLocaleDateString() : ""}
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-6 trackdelivery_color">Total Amount:</div>
                                        <div className="col-6 text-black">
                                            ₹ {data?.finalAmount}/-
                                        </div>
                                    </div>
                                    <div className="text-center mt-4 mb-4">
                                        <Link to={`/user-returnpayment/${data?.orderId?._id}`}>
                                            <button type="button" className="btn btn-warning">
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
                                            {data?.customerId?.name}
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3 trackdelivery_subtext">Email</div>
                                        <div className="col-1">:</div>
                                        <div className="col-8">
                                            {data?.customerId?.email}
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3 trackdelivery_subtext">Phone</div>
                                        <div className="col-1">:</div>
                                        <div className="col-8">
                                            {data?.customerId?.phone}
                                        </div>
                                    </div>
                                    {/* <div className="row mt-3">
                                        <div className="col-3 trackdelivery_subtext">Address</div>
                                        <div className="col-1">:</div>
                                        <div className="col-8">
                                            {data?.customerId?.address}
                                        </div>
                                    </div> */}
                                </div>
                                {data?.deliveryId ? (
                                    <>
                                        <div className="col-md-4">
                                            <h4 className="trackdelivery_info mb-3">Delivery agent</h4>
                                            <div className="row">
                                                <div className="col-5 trackdelivery_subtext">Name</div>
                                                <div className="col-1">:</div>
                                                <div className="col-6">
                                                    {data?.deliveryId?.name}
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-5 trackdelivery_subtext">
                                                    Vehicle type
                                                </div>
                                                <div className="col-1">:</div>
                                                <div className="col-6">
                                                    {data?.deliveryId?.vehicleType}
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-5 trackdelivery_subtext">
                                                    Vehicle number
                                                </div>
                                                <div className="col-1">:</div>
                                                <div className="col-6">
                                                    {data?.deliveryId?.vehicleNumber}
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="col-md-4">
                                            <h4 className="trackdelivery_info mb-3">
                                                Delivery information
                                            </h4>
                                            <p className="text-justify">
                                                Our team will reach out to finalize details within 2 days
                                            </p>
                                        </div> */}
                                    </>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        </div>
                    ) : data?.returnStatus === "Confirmed" && data?.inspectionStatus === "Confirmed" && data?.deviatedAmt < 0 ? (
                        <div>
                            <div className="status-bar">
                                <div className="status-item">
                                    <FaCheckCircle size={50} className="icon_style_track" />
                                    <p className="trackdelivery_track_status">Return Confirmed</p>
                                    <p className="trackdelivery_date">
                                        {new Date(data?.confirmedDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="status-line"></div>
                                <div className="status-item">
                                    <FaCheckCircle size={50} className="icon_style_track" />
                                    <p className="trackdelivery_track_status">
                                        Inspection
                                    </p>
                                    <p className="trackdelivery_date">
                                        {new Date(data?.inspectionDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="row trackdelivery_main_row">
                                <div className="col-md-7">
                                    <img
                                        src={`${url}/${data?.furnitureId?.image1.filename}`}
                                        className="img-fluid trackdelivery_img"
                                        alt={data.furnitureId.name}
                                    />
                                </div>
                                <div className="col-md-5 mt-3">
                                    <p className="trackdelivery_itemname">
                                        {data?.furnitureId?.name}
                                    </p>
                                    <p className="trackdelivery_amount">
                                        ₹{data?.furnitureId?.rent}/
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
                                        <div className="col-6 trackdelivery_color">
                                            Rent Date
                                        </div>
                                        <div className="col-6 text-black">
                                            {data ? new Date(data?.orderId?.orderDate).toLocaleDateString() : ""} - {data ? new Date(data?.orderId?.completionDate).toLocaleDateString() : ""}
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-6 trackdelivery_color">Total Amount:</div>
                                        <div className="col-6 text-black">
                                            ₹ {data?.finalAmount}/-
                                        </div>
                                        <p style={{color:"red"}}>The Balance Amount will be credited shortly</p>
                                    </div>
                                    {/* <div className="text-center mt-4 mb-4">
                                        <Link to={`/user-returnpayment/${data?.orderId?._id}`}>
                                            <button type="button" className="btn btn-warning">
                                                &nbsp;&nbsp; Pay Now &nbsp;&nbsp;
                                            </button>
                                        </Link>

                                    </div> */}
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col-md-4">
                                    <h4 className="trackdelivery_info mb-3">Customer information</h4>
                                    <div className="row mt-3">
                                        <div className="col-3 trackdelivery_subtext">Name</div>
                                        <div className="col-1">:</div>
                                        <div className="col-8">
                                            {data?.customerId?.name}
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3 trackdelivery_subtext">Email</div>
                                        <div className="col-1">:</div>
                                        <div className="col-8">
                                            {data?.customerId?.email}
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3 trackdelivery_subtext">Phone</div>
                                        <div className="col-1">:</div>
                                        <div className="col-8">
                                            {data?.customerId?.phone}
                                        </div>
                                    </div>
                                    {/* <div className="row mt-3">
                                        <div className="col-3 trackdelivery_subtext">Address</div>
                                        <div className="col-1">:</div>
                                        <div className="col-8">
                                            {data?.customerId?.address}
                                        </div>
                                    </div> */}
                                </div>
                                {data?.deliveryId ? (
                                    <>
                                        <div className="col-md-4">
                                            <h4 className="trackdelivery_info mb-3">Delivery agent</h4>
                                            <div className="row">
                                                <div className="col-5 trackdelivery_subtext">Name</div>
                                                <div className="col-1">:</div>
                                                <div className="col-6">
                                                    {data?.deliveryId?.name}
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-5 trackdelivery_subtext">
                                                    Vehicle type
                                                </div>
                                                <div className="col-1">:</div>
                                                <div className="col-6">
                                                    {data?.deliveryId?.vehicleType}
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-5 trackdelivery_subtext">
                                                    Vehicle number
                                                </div>
                                                <div className="col-1">:</div>
                                                <div className="col-6">
                                                    {data?.deliveryId?.vehicleNumber}
                                                </div>
                                            </div>
                                        </div>
                                       
                                    </>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        </div>
                    ) : data?.returnStatus === "Confirmed" ? (
                        <div>
                            <div className="status-bar">
                                <div className="status-item">
                                    <FaCheckCircle size={50} className="icon_style_track" />
                                    <p className="trackdelivery_track_status">Return Confirmed</p>
                                    <p className="trackdelivery_date">
                                        {new Date(data?.confirmedDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="row trackdelivery_main_row">
                                <div className="col-md-7">
                                    <img
                                        src={`${url}/${data?.furnitureId?.image1.filename}`}
                                        className="img-fluid trackdelivery_img"
                                        alt={data.furnitureId.name}
                                    />
                                </div>
                                <div className="col-md-5 mt-3">
                                    <p className="trackdelivery_itemname">
                                        {data?.furnitureId?.name}
                                    </p>
                                    <p className="trackdelivery_amount">
                                        ₹{data?.furnitureId?.rent}/
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
                                        <div className="col-6 trackdelivery_color">
                                            Rent Date
                                        </div>
                                        <div className="col-6 text-black">
                                            {data ? new Date(data?.orderId?.orderDate).toLocaleDateString() : ""} - {data ? new Date(data?.orderId?.completionDate).toLocaleDateString() : ""}
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-6 trackdelivery_color">Total Rent Amount:</div>
                                        <div className="col-6 text-black">
                                            {data?.totalRentAmount.toFixed(2)}
                                        </div>
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
                                            {data?.customerId?.name}
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3 trackdelivery_subtext">Email</div>
                                        <div className="col-1">:</div>
                                        <div className="col-8">
                                            {data?.customerId?.email}
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-3 trackdelivery_subtext">Phone</div>
                                        <div className="col-1">:</div>
                                        <div className="col-8">
                                            {data?.customerId?.phone}
                                        </div>
                                    </div>
                                    {/* <div className="row mt-3">
                                        <div className="col-3 trackdelivery_subtext">Address</div>
                                        <div className="col-1">:</div>
                                        <div className="col-8">
                                            {data?.customerId?.address}
                                        </div>
                                    </div> */}
                                </div>
                                {data?.deliveryId ? (
                                    <>
                                        <div className="col-md-4">
                                            <h4 className="trackdelivery_info mb-3">Delivery agent</h4>
                                            <div className="row">
                                                <div className="col-5 trackdelivery_subtext">Name</div>
                                                <div className="col-1">:</div>
                                                <div className="col-6">
                                                    {data?.deliveryId?.name}
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-5 trackdelivery_subtext">
                                                    Vehicle type
                                                </div>
                                                <div className="col-1">:</div>
                                                <div className="col-6">
                                                    {data?.deliveryId?.vehicleType}
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-5 trackdelivery_subtext">
                                                    Vehicle number
                                                </div>
                                                <div className="col-1">:</div>
                                                <div className="col-6">
                                                    {data?.deliveryId?.vehicleNumber}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <h4 className="trackdelivery_info mb-3">
                                                Delivery information
                                            </h4>
                                            <p className="text-justify">
                                                Our team will reach out to finalize details within 2 days
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="status-bar">
                                <div className="status-item">
                                    <FaCheckCircle size={50} className="icon_style_track" />
                                    <p className="trackdelivery_track_status">Return Pending</p>
                                    <p className="trackdelivery_date">
                                        {new Date(data?.confirmedDate).toLocaleDateString()}
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TrackDirectReturnStatus