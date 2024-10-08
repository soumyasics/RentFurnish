import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import "./Return.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../Constants/Baseurl";
import { toast } from "react-toastify";

function TrackReturnPayment() {
    const { id } = useParams();
    console.log("id" + id);
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [form, setForm] = useState({
        cardholderName: "",
        cardNumber: "",
        ccv: "",
        expiryDate: ""
    });

    const [formErrors, setFormErrors] = useState({
        cardNumberError: "",
        ccvError: ""
    });

    useEffect(() => {
        axiosInstance.post(`/viewReturnByOrderId/${id}`)
            .then((res) => {
                console.log("Data:", res);
                setData(res.data.data[0]);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
        setFormErrors(prevErrors => ({ ...prevErrors, [`${name}Error`]: "" }));
    };

    const validateForm = () => {
        let valid = true;
        let errors = {};

        if (form.cardNumber.length !== 16) {
            errors.cardNumberError = "Card number must be 16 digits.";
            valid = false;
        }

        if (form.ccv.length !== 3) {
            errors.ccvError = "CCV must be at least 3 digits.";
            valid = false;
        }

        setFormErrors(errors);
        return valid;
    };

    const goback=()=>{
        navigate(-1)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axiosInstance.post(`/updatePaymentStatus/${id}`, {
                paymentStatus: true,
                paymentDate: new Date(),
                completionDate: new Date()
            });

            console.log("Payment", response.data);
            toast.success('Payment successfully processed');
            navigate(-1);
        } catch (error) {
            console.error("Error:", error);
            alert('Payment Failed');
        }
    };

    return (
        <div>
            <div className="track-delivery">
                <Link style={{ textDecoration: "none" }} onClick={goback}>
                    <h1 className="ri-arrow-left-line">Track Return Status</h1>
                </Link>
                <div className="trackdelivery-main_div">
                    <div className="status-bar">
                        <div className="status-item">
                            <FaCheckCircle size={50} className="icon_style_track" />
                            <p className="trackdelivery_track_status">Return Confirmed</p>
                            <p className="trackdelivery_date">
                                {data && new Date(data.confirmedDate).toLocaleDateString()}
                            </p>
                        </div>
                        <>
                            <div className="status-line"></div>
                            <div className="status-item">
                                <FaCheckCircle size={50} className="icon_style_track" />
                                <p className="trackdelivery_track_status">
                                    Inspection
                                </p>
                                <p className="trackdelivery_date">
                                    {data && new Date(data.inspectionDate).toLocaleDateString()}
                                </p>
                            </div>
                        </>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <h1 className="text-center mt-4">
                                <span className="pay_text_color">Total Amount : </span>
                                <span>{Math.abs(data?.finalAmount-data?.orderId?.amount).toFixed(2)} /-</span>
                            </h1>
                            <div className="d-flex justify-content-center mt-4">
                                <div className="payment_main_div">
                                    <p>Cardholder Name</p>
                                    <input
                                        type="text"
                                        name="cardholderName"
                                        value={form.cardholderName}
                                        onChange={handleChange}
                                        className="form-control controls mb-4"
                                        placeholder="Card holder name"
                                        required
                                    />

                                    <p>Card Number</p>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={form.cardNumber}
                                        onChange={handleChange}
                                        className="form-control controls pb-4"
                                        placeholder="Card Number"
                                        required
                                    />
                                    <p style={{ color: "red" }}>{formErrors.cardNumberError}</p>

                                    <div className="row mt-3">
                                        <div className="col-6">
                                            <p>CCV</p>
                                            <input
                                                type="text"
                                                name="ccv"
                                                value={form.ccv}
                                                onChange={handleChange}
                                                className="form-control controls mb-4"
                                                placeholder="CCV"
                                                required
                                            />
                                            <p style={{ color: "red" }}>{formErrors.ccvError}</p>
                                        </div>
                                        <div className="col-6">
                                            <p>Expiry Date</p>
                                            <input
                                                type="month"
                                                name="expiryDate"
                                                min={new Date().toISOString().slice(0, 7)}
                                                max="2050-12"
                                                value={form.expiryDate}
                                                onChange={handleChange}
                                                className="form-control controls mb-4"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-warning">
                                            &nbsp;&nbsp; Confirm &nbsp;&nbsp;
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrackReturnPayment;
