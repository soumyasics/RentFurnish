import React, { useEffect, useState } from 'react';
import axiosInstance from '../Constants/Baseurl';
import './Complaintsshop/Shopviewcomplaint.css'
import Shopnav from '../Navbar/Shopnav';
import Showdropdown from './Shopdropdown';
import { GrStatusGood } from "react-icons/gr";
import StarRating from './StarRating';

function ShopViewReview() {
    const shopId = localStorage.getItem("shopid");
    const [review, setReview] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [id, setId] = useState(null);
    const url = axiosInstance.defaults.url;

    useEffect(() => {
        axiosInstance.post(`viewAllreviewsByShopId/${shopId}`)
            .then((res) => {
                console.log(res)
                setReview(res.data.data);
            })
            .catch((err) => {
                console.error('Error fetching reviews:', err);
            });
    }, [shopId]);

    useEffect(() => {
        if (id) {
            getData(id);
        }
    }, [id]);

    const getData = (id) => {
        setSelectedComplaint(null);
        axiosInstance.post(`viewReviewById/${id}`)
            .then((res) => {
                console.log(res)
                setSelectedComplaint(res.data.data);
            })
            .catch((err) => {
                console.error('Error', err);
                setSelectedComplaint(null);
            });
    };

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
                    <div className='col-sm-11 d-flex justify-content-end mt-5 ms-5'>
                        <div className='border col-sm-12 col-md-12 col-lg-12 ms-5 mt-5 rounded-2 shadow-lg'>
                            <div className='table-responsive-md'>
                                <table className="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col"><p className='Complain_head_text'>SI No</p></th>
                                            <th scope="col"><p className='Complain_head_text'>Furniture Name</p></th>
                                            <th scope="col"><p className='Complain_head_text'>Customer Name</p></th>
                                            <th scope="col"><p className='Complain_head_text'>Date</p></th>
                                            <th scope="col"><p className='Complain_head_text'>View Details</p></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {review.length ? (
                                            review.map((item, index) => (
                                                <tr key={item._id}>
                                                    <th scope="row"><p className='Complain_body_text'>{index + 1}</p></th>
                                                    <td><p className='Complain_body_text'>{item?.furnitureId?.name}</p></td>
                                                    <td><p className='Complain_body_text'>{item?.customerId?.name}</p></td>
                                                    <td><p className='Complain_body_text'>{formatDate(item?.date)}</p></td>
                                                    <td>
                                                        <button
                                                            className='Complain_body_btn Complain_body_btn_text'
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#staticBackdrop"
                                                            onClick={() => setId(item._id)}
                                                        >
                                                            View Details
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">
                                                    <p>No Reviews available.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered complaint_modal_size">
                    <div className="modal-content complaint_modal_main">
                        <div className="modal-header">
                            <button type="button" className="btn-close model_close_btn" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {selectedComplaint ? (
                                <div className="complaint-details">
                                    <div className="row">
                                        <div className="col-4">
                                            <img src={`${url}/${selectedComplaint?.furnitureId?.image1?.filename || 'default-image.jpg'}`} alt="Furniture" />
                                        </div>
                                        <div className="col-4 container">
                                            <h5 className="modal_second_mainheading mb-4">Furniture details</h5>
                                            <div className="row text-left m-2">
                                                <div className="col-5 modal_subheading"><label>Furniture type</label></div>
                                                <div className="col-2">:</div>
                                                <div className="col-5 modal_subheading1">{selectedComplaint?.furnitureId?.name || 'N/A'}</div>
                                            </div>
                                            <div className="row text-left m-2">
                                                <div className="col-5 modal_subheading"><label>Quantity</label></div>
                                                <div className="col-2">:</div>
                                                <div className="col-5 modal_subheading1">{selectedComplaint?.furnitureId?.quantity || 'N/A'}</div>
                                            </div>
                                            <div className="row text-left m-2">
                                                <div className="col-5 modal_subheading"><label>Dimensions</label></div>
                                                <div className="col-2">:</div>
                                                <div className="col-5 modal_subheading1">{selectedComplaint?.furnitureId?.dimension || 'N/A'}</div>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <h5 className="modal_second_mainheading">Customer information</h5>
                                            <div className="row text-left m-2">
                                                <div className="col-4 modal_subheading"><label>Name</label></div>
                                                <div className="col-2">:</div>
                                                <div className="col-6 modal_subheading1">{selectedComplaint?.customerId?.name || 'N/A'}</div>
                                            </div>
                                            <div className="row text-left m-2">
                                                <div className="col-4 modal_subheading"><label>Phone number</label></div>
                                                <div className="col-2">:</div>
                                                <div className="col-6 modal_subheading1">{selectedComplaint?.customerId?.phone || 'N/A'}</div>
                                            </div>
                                            <div className="row text-left m-2">
                                                <div className="col-4 modal_subheading"><label>Address</label></div>
                                                <div className="col-2">:</div>
                                                <div className="col-6 modal_subheading1">{selectedComplaint?.customerId?.address || 'N/A'}</div>
                                            </div>
                                        </div>
                                        <div className="modal_second_mainheading">
                                            <p>Delivered on {formatDate(selectedComplaint?.date) || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div>

                                        <div className='review_feedback_div'>

                                            {/* {selectedComplaint?.furnitureId?.rating} */}
                                            <StarRating key={selectedComplaint?._id} rating={selectedComplaint?.furnitureId.rating} />
                                            <h3 className='pt-3'>{selectedComplaint?.review}</h3>
                                            <h5 className='pt-3'><GrStatusGood /> Verified Purchase | {selectedComplaint?.date.slice(0, 10)}</h5>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>Loading...</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopViewReview;
