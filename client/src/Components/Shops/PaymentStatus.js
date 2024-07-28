import React, { useEffect, useState } from 'react'
import Shopnav from '../Navbar/Shopnav'
import Showdropdown from './Shopdropdown'
import axiosInstance from '../Constants/Baseurl';
import { FaCheckCircle } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";

function PaymentStatus() {
    const shopId = localStorage.getItem("shopid");
    const [transation, setTransation] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [id, setId] = useState(null);
    const url = axiosInstance.defaults.url;

    useEffect(() => {
        axiosInstance.post(`viewReturnByShopId/${shopId}`)
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
                                                <th scope="col"><p className='Complain_head_text'>Rent Date</p></th>
                                                <th scope="col"><p className='Complain_head_text'>Total Price</p></th>
                                                <th scope="col"><p className='Complain_head_text'>Fine Amount</p></th>
                                                <th scope="col"><p className='Complain_head_text'>Payment Status</p></th>
                                                <th scope="col"><p className='Complain_head_text'>Deposit Status</p></th>
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
                                                        <td><p className='Complain_body_text'>{formatDate(item?.orderId?.deliveryDate)} - {formatDate(item?.returnDate)}</p></td>
                                                        <td><p className='Complain_body_text'>{item?.orderId?.amount}</p></td>
                                                        <td><p className='Complain_body_text'>{item?.fineAmount === null ? (
                                                            <p>-</p>
                                                        ) : (
                                                            <p>{item?.fineAmount}</p>
                                                        )}</p></td>
                                                        <td><p className='Complain_body_text'>
                                                            {item?.paymentStatus === true ? (
                                                                <p className='text-success'>Received  <FaCheckCircle /></p>
                                                            ) : (
                                                                <p className='text-danger'>Pending  <FaQuestionCircle /></p>
                                                            )}
                                                        </p></td>
                                                        <td><p className='Complain_body_text'>
                                                            {item?.fineAmount === null && item?.paymentStatus === false ? (
                                                                <button type="button" class="btn btn-info">Return</button>

                                                            ) : item?.completionDate ? (
                                                                <p className='text-success'>Returned  <FaCheckCircle /></p>
                                                            ) : (
                                                                <p className='text-danger'>Pending  <FaQuestionCircle /></p>
                                                            )}
                                                        </p></td>
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