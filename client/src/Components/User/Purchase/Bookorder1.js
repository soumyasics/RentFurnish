import React, { useEffect, useState } from 'react';
import "../../User/Purchase/Bookorder1.css";
import Vector from "../../../Assets/Vector.png";
import Likeimg from "../../../Assets/Likeimg.png";
import Group_img from "../../../Assets/Group 79.png";
import star_img from "../../../Assets/Star 14.png";
import star_ash from "../../../Assets/Star 10.png";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../Constants/Baseurl';
import { toast } from 'react-toastify';
import { IoStarSharp } from "react-icons/io5";

function Bookorder1() {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [totalRent, setTotalRent] = useState(0);
    const url = axiosInstance.defaults.url;
    const navigate = useNavigate();

    const navigateBackFn = () => {
        navigate(-1);
    };

    useEffect(() => {
        axiosInstance.post(`viewFurnitureById/${id}`)
            .then((result) => {
                console.log(result);
                setData(result.data.data);
                setTotalRent(result.data.data.rent);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const [count, setCount] = useState(1);

    const Add = () => {
        if (count < data.quantity) {
            setCount(count + 1);
            setTotalRent((count + 1) * data.rent);
        } else {
            toast.info(`Only ${data.quantity} products are available`);
        }
    };

    const Sub = () => {
        if (count > 1) { // Ensure the count does not go below 1
            setCount(count - 1);
            setTotalRent((count - 1) * data.rent);
        }
    };

    const [noOfDays, setNoOfDays] = useState('');

    const changeFn = (e) => {
        setNoOfDays(e.target.value);
    };

    const handleBookNow = (e) => {
        e.preventDefault();
        if (noOfDays === '') {
            toast.error("Please enter the number of days required.");
            return;
        }
        navigate('/user-confirmpurchase', {
            state: { id, totalRent, count, noOfDays }
        });
    };

    const [rating, setRating] = useState(0);

    const handleStarClick = (value) => {
        setRating(value);
    };


    return (
        <div>
            <div className="d-flex flex-row mt-5">
                <img className='ms-5 backimg' src={Vector} onClick={navigateBackFn} alt="Back" />
                <div className="ms-2 p-2 bookorder">View details</div>
            </div>
            <form onSubmit={handleBookNow}>
                <div className='row col-12 continer'>
                    <div className='col-md-6 img-fluid'>
                        <img className='img-fluid purchanse-mainimage' src={`${url}/${data?.image1?.filename}`} width="758px" height="390px" alt="Main Furniture" />
                        <div className="row book-imagedown">
                            <div className="col-sm-6 col-lg-4 p-2">
                                {data?.image2?.filename && (
                                    <img
                                        className="img-fluid"
                                        src={`${url}/${data.image2.filename}`}
                                        alt="Sub Furniture 2"
                                    />
                                )}
                            </div>
                            <div className="col-sm-6 col-lg-4 p-2">
                                {data?.image3?.filename && (
                                    <img
                                        className="img-fluid"
                                        src={`${url}/${data.image3.filename}`}
                                        alt="Sub Furniture 3"
                                    />
                                )}
                            </div>
                            <div className="col-sm-6 col-lg-4 p-2">
                                {data?.image4?.filename && (
                                    <img
                                        className="img-fluid"
                                        src={`${url}/${data.image4.filename}`}
                                        alt="Sub Furniture 4"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 continer ps-5'>
                        <p className='beadtext'>{data?.name}</p>
                        <div className="d-flex flex-row mb-3">
                            <div className="p-2 Avilabel_text">Available</div>
                            <div className="p-2">
                                <img src={Group_img} alt="Group" />
                            </div>
                        </div>
                        <div className=''>
                            <div className="d-flex mb-5">
                                <div>₹</div>
                                <div className="fw-bold">{totalRent}</div>
                                <div>/Month</div>
                            </div>
                        </div>
                        <div className='mb-5'>
                            <p className='Quantity_text'>Quantity</p>
                            <div className="d-flex mb-3">
                                <div className="p-2 quantity_btnLeft">
                                    <button type="button" onClick={Sub} className='btn btn-danger'><FaChevronCircleLeft /></button>
                                </div>
                                <div className="p-2 quantity_input col-2">
                                    <input type='text' className='form-control text-center' value={count} readOnly />
                                </div>
                                <div className="p-2 quantity_btnRight">
                                    <button type="button" onClick={Add} className='btn btn-success'><FaChevronCircleRight /></button>
                                </div>
                            </div>
                        </div>
                        <div className='mb-5'>
                            <p className='Quantity_text'>No Of Days Required</p>
                            <div className="d-flex mb-3">
                                <div className="p-2 quantity_input col-2">
                                    <input type='number' className='form-control text-center' min='1' name='noOfDays' value={noOfDays} onChange={changeFn} required />
                                </div>
                            </div>
                        </div>
                        <div className='mb-5'>
                            <p className='quantity_text'>Dimensions<p className='quantity_text2'>{data?.dimension}</p></p>
                        </div>
                        <div className=''>
                            <p className='Description_text mt-4'>Description</p>
                            <p className='content col-6'>{data?.description}</p>
                        </div>
                        <div className=''>
                            <button className='book book_text shadow-lg btn btn-warning' type='submit'>Book Now</button>
                        </div>
                    </div>
                </div>
            </form>
            <div className='row mt-5 mb-5'>
                <div className='col-md-6'>
                    <h1 className='Rating'>Ratings & Reviews</h1>
                    <div className='continer'>
                        <div className='col-12'>
                            <div className='cont mt-3 mb-3'>
                                <div className='continer'>
                                    <div className="d-flex mb-3">
                                        <div className="p-2"><img src={star_img} alt="Star" /></div>
                                        <div className="p-2"><img src={star_img} alt="Star" /></div>
                                        <div className="p-2"><img src={star_img} alt="Star" /></div>
                                        <div className="p-2"><img src={star_img} alt="Star" /></div>
                                        <div className="p-2"><img src={star_ash} alt="Star Ash" /></div>
                                        <div className="col-12 mt-2 ps-5">Good Product</div>
                                    </div>
                                    <div>
                                        <p>Good Product</p>
                                    </div>
                                    <div className="d-flex align-items-end ms-1">
                                        <p><MdOutlineVerifiedUser size={20} /></p>
                                        <p className='ms-2'>Verified purchase</p>
                                        <p className='ms-5'>. Feb,2024</p>
                                    </div>
                                </div>
                            </div>
                            {/* Repeat for other reviews */}
                        </div>
                    </div>
                </div>
                <div className='col-md-6 mx-auto p-2 text-center' style={{ width: '300px' }}>
                    <button className='rate_product_button' data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <p className='rate_product_heading'>Rate Product</p>
                    </button>
                    <div className=' col-12 rounded-4'>
                        {/* <p className='mt-4 rating_heading'>4.5</p>
                        <p className='star_rating'><img src={star_img} alt="Star" /></p> */}
                        <div className="d-flex justify-content-between">
                            <div className="p-2 "><img src={star_img} alt="Star" /></div>
                            <div className="p-2 "><img src={star_img} alt="Star" /></div>
                            <div className="p-2 "><img src={star_img} alt="Star" /></div>
                            <div className="p-2 "><img src={star_img} alt="Star" /></div>
                            <div className="p-2 "><img src={star_ash} alt="Star Ash" /></div>
                        </div>
                        <p>320 Reviews</p>
                        <p>234 <img src={Likeimg} alt="Like" /></p>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content modal_content_main">
                        <h5 className="text-center modal_font_color">Add Rating</h5>
                        <div className="rating-stars">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <i
                                    key={value}
                                    className={`fas fa-star ${value <= rating ? 'text-warning' : 'text-secondary'}`}
                                    onClick={() => handleStarClick(value)}
                                >
                                    <IoStarSharp />
                                </i>
                            ))}
                        </div>
                        <h5 className="text-center modal_font_color">Add Comments</h5>
                        <textarea className="form-control mb-3 modal_text_area" rows="3"></textarea>
                        <button type="button" className="submit-btn mx-auto d-block">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Bookorder1;
