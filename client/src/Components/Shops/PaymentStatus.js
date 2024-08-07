import React, { useEffect, useState } from 'react'
import Shopnav from '../Navbar/Shopnav'
import Showdropdown from './Shopdropdown'
import axiosInstance from '../Constants/Baseurl';
import { FaCheckCircle } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

function PaymentStatus() {
    const shopId = localStorage.getItem("shopid");
    const [transation, setTransation] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [id, setId] = useState(null);
    const url = axiosInstance.defaults.url;

    useEffect(() => {
        axiosInstance.post(`viewAllInspectionByShopId/${shopId}`)
            .then((res) => {
                console.log(res)
                setTransation(res.data.data);
            })
            .catch((err) => {
                console.error('Error fetching reviews:', err);
            });
    }, [shopId]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div>
            <Shopnav />
            <Showdropdown />
            <div className='container'>
                <div className='viewcomplaints-head'>
                    {transation.length === 0 ? (
                        <h1> No Transations available </h1>
                    ) : (
                        <div className='col-sm-11 d-flex justify-content-end ms-5'>

                            <div className='border col-sm-12 col-md-12 col-lg-12 ms-5 mt-5 rounded-2 shadow-lg'>

                                <div className='table-responsive-md'>

                                    <table className="table table-borderless">
                                        <thead>
                                            <tr>
                                                <th scope="col"><p className='Complain_head_text'>SI No</p></th>
                                                <th scope="col"><p className='Complain_head_text'>Furniture Name</p></th>
                                                <th scope="col"><p className='Complain_head_text'>Customer Name</p></th>
                                                {/* <th scope="col"><p className='Complain_head_text'>Rent Date</p></th> */}
                                                <th scope="col"><p className='Complain_head_text'>Total Price</p></th>
                                                <th scope="col"><p className='Complain_head_text'>Fine Amount</p></th>
                                                {/* <th scope="col"><p className='Complain_head_text'>Payment Status</p></th> */}
                                                {/* <th scope="col"><p className='Complain_head_text'>Deposit Status</p></th> */}
                                            </tr>
                                        </thead>

                                        {transation.length === 0 ? (
                                            <h1> No Transations available </h1>
                                        ) : (

                                            transation.map((item, index) => (
                                                <tbody>
                                                    <tr key={item._id}>
                                                        <th scope="row"><p className='Complain_body_text'>{index + 1}</p></th>
                                                        <td><p className='Complain_body_text'>{item?.furnitureId?.name}</p></td>
                                                        <td><p className='Complain_body_text'>{item?.customerId?.name}</p></td>
                                                        {/* <td><p className='Complain_body_text'>{formatDate(item?.orderId?.deliveryDate)} - {formatDate(item?.returnDate)}</p></td> */}
                                                        <td><p className='Complain_body_text'>{Math.abs(item?.orderId?.amount?.toFixed(2))}</p></td>
                                                        <td><p className='Complain_body_text'>{item?.finalAmount === null ? (
                                                            <p>-</p>
                                                        ) : (
                                                            <p>{Math.abs(item?.finalAmount)?.toFixed(2)}</p>
                                                        )}</p></td>
                                                        {/* <td><p className='Complain_body_text'>
                                                            {item?.returnId?.completionDate ? (
                                                                <p className='text-success'>Returned  <FaCheckCircle /></p>
                                                            ) : item?.returnId?.deviatedAmt < 0
                                                                ? (
                                                                    <Link to={`/shop-returnpayment/${item?.orderId?._id}`}>
                                                                        <button type="button" class="btn btn-info">Return</button>
                                                                    </Link>

                                                                ) : (
                                                                    <p className='text-danger'>Pending  <FaQuestionCircle /></p>
                                                                )}
                                                        </p></td> */}
                                                    </tr>
                                                </tbody>
                                            ))

                                        )}

                                    </table>

                                </div>

                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PaymentStatus