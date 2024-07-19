import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import "./Return.css";
import { Link, useNavigate, useParams } from "react-router-dom";

function TrackReturnPayment() {
    return (
        <div>
            <div className="track-delivery">
                <Link to="" style={{ textDecoration: "none" }}>
                    <h1 className="ri-arrow-left-line">Track Return Status</h1>
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
                    <div>
                        <h1 className="text-center mt-4"><span className="pay_text_color">Total Amount : </span><span>10000/-</span></h1>
                        <div className="d-flex justify-content-center mt-4">
                            <div className="payment_main_div">
                                <p>Cardholder Name</p>
                                <input
                                    type="text"
                                    className="form-control controls mb-4"
                                    placeholder="Card holder name"
                                />
                                <p>Card Number</p>
                                <input
                                    type="text"
                                    className="form-control controls pb-4"
                                    placeholder="Card Number"
                                />
                                <div className="row mt-3">
                                    <div className="col-6">
                                    <p>CCV</p>
                                <input
                                    type="text"
                                    className="form-control controls mb-4"
                                    placeholder="CCV"
                                />
                                    </div>
                                    <div className="col-6">
                                    <p>Expairy Date</p>
                                <input
                                    type="date"
                                    className="form-control controls mb-4"
                                    placeholder="Card holder name"
                                />
                                    </div>
                                </div>
                                <div className="text-center">
                                <Link>
                                    <button type="submit" className="btn btn-warning">
                                        &nbsp;&nbsp; Confirm &nbsp;&nbsp;
                                    </button>
                                </Link>
                            </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TrackReturnPayment