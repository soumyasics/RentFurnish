import React, { useEffect, useState } from 'react'
import "../../User/Purchase/Bookorder1.css";
import Vector from "../../../Assets/Vector.png";
import Likeimg from "../../../Assets/Likeimg.png";
import Bead_img1 from "../../../Assets/Bead.png";
import Bead_img2 from "../../../Assets/Bead2.png";
import Bead_img3 from "../../../Assets/Bead3.png";
import Bead_img4 from "../../../Assets/Bead4.png";
import Group_img from "../../../Assets/Group 79.png";
import LeftArrow_img from "../../../Assets/LeftArrow.png";
import RightArrow_img from "../../../Assets/Right_Arrow.png";
import star_img from "../../../Assets/Star 14.png";
import star_ash from "../../../Assets/Star 10.png";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../Constants/Baseurl';
import { toast } from 'react-toastify';

function Bookorder1() {
    const {id}=useParams()
    const [data,setData]=useState({})
    const [totalRent, setTotalRent] = useState(0);
    const url = axiosInstance.defaults.url;
    const navigate=useNavigate()

    const naigatebckfn=(()=>{
        navigate(-1)
    })


    useEffect(()=>{
        axiosInstance.post(`viewFurnitureById/${id}`)
        .then((result)=>{
            console.log(result);
            setData(result.data.data)
            setTotalRent(result.data.data.rent);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])


    const[count,setcount]=useState(0)
    
    const Add = () => {
        if (count < data.quantity) {
            setcount(count + 1);
            setTotalRent((count + 1) * data.rent);
        } else {
            toast.info(`Only ${data.quantity} products are available`);
        }
    };
        const Sub=()=>{
            if (count > 0) {
                setcount(count - 1);
                setTotalRent((count - 1) * data.rent);
            }
    }

    const handleBookNow = () => {
        navigate('/user-confirmpurchase', {
            state: { id, totalRent, count }
        });
    };

    return (
        <div>

            <div className="d-flex flex-row mt-5">
                <img className='ms-5 backimg' src={Vector} onClick={naigatebckfn}/>
                <div className="ms-2 p-2 bookorder">View details</div>
            </div>

            <div className='row col-12  continer'>
                <div className='col-6 img-fluid'>
                    {/* <img src={Likeimg} style={{ paddingLeft: '600px' }} /> */}
                    <img className='img-fluid purchanse-mainimage' src={`${url}/${data?.image1?.filename}`} width="758px" height="390px"/>
                    <div class="row book-imagedown">
                        <div className="col-sm-6 col-lg-4 p-2">
                            <img src={`${url}/${data?.image2?.filename}`} />
                        </div>
                        <div className="col-sm-6 col-lg-4 p-2">
                            <img src={`${url}/${data?.image3?.filename}`} />
                        </div>
                        <div className="col-sm-6 col-lg-4 p-2">
                            <img src={`${url}/${data?.image4?.filename}`} />
                        </div>
                    </div>
                </div>
                <div className='col-6 continer ps-5'>
                    <p className='beadtext'>{data?.name}</p>
                    <div className="d-flex flex-row mb-3">
                        <div className="p-2 Avilabel_text">Avilable</div>
                        <div className="p-2">
                            <img src={Group_img} />
                        </div>
                    </div>
                    <div className=''>
                        <div class="d-flex mb-5">
                            <div className="">₹</div>
                            <div className="fw-bold">{totalRent}</div>
                            <div className="">/Month</div>
                        </div>
                    </div>
                    <div className='mb-5'>
                        <p className='Quantity_text'>Quantity</p>
                        <div class="d-flex mb-3 ">
                            <div class="p-2  quantity_btnLeft">
                            <button onClick={Sub} className='btn btn-danger'><FaChevronCircleLeft /></button>
                            </div>
                            <div class="p-2  quantity_input col-2">
                                <input type='text' className='form-control text-center' value={count}/>
                            </div>
                            <div class="p-2 quantity_btnRight">
                            <button onClick={Add} class='btn btn-success'><FaChevronCircleRight /></button>
                            
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
                        <button className='book book_text shadow-lg btn btn-warning' onClick={handleBookNow}>Book Now</button>
                    </div>
                </div>
            </div>


            <div className='row'>
                <div className='col-6'>
                    <p className='Rating'>Ratings & Reviews</p>
                    <div className='continer'>
                        <div className='col-12'>
                            <div className='cont mt-3'>
                                <div className='continer'>
                                    <div className="d-flex mb-3">
                                        <div className="p-2"><img src={star_img} /></div>
                                        <div className="p-2"><img src={star_img} /></div>
                                        <div className="p-2"><img src={star_img} /></div>
                                        <div className="p-2"><img src={star_img} /></div>
                                        <div className="p-2"><img src={star_ash} /></div>
                                        <div className="col-12 mt-2 ps-5">Good Product </div>
                                    </div>
                                    <div className='mt-5 mb-5'>
                                        <p>Good Product</p>
                                    </div>
                                    <div class="d-flex align-items-end ms-4">
                                        <p><MdOutlineVerifiedUser /></p>
                                        <p className=''>Verifyed purches</p>
                                        <p className='ms-5'>. Feb,2024</p>
                                    </div>
                                </div>
                            </div>
                            <div className='cont mt-3'>
                                <div className='continer'>
                                    <div className="d-flex mb-3">
                                        <div className="p-2"><img src={star_img} /></div>
                                        <div className="p-2"><img src={star_img} /></div>
                                        <div className="p-2"><img src={star_img} /></div>
                                        <div className="p-2"><img src={star_img} /></div>
                                        <div className="p-2"><img src={star_ash} /></div>
                                        <div className="col-12 mt-2 ps-5">Good Product </div>
                                    </div>
                                    <div className='mt-5 mb-5'>
                                        <p>Good Product</p>
                                    </div>
                                    <div className="d-flex align-items-end ms-4">
                                        <p><MdOutlineVerifiedUser /></p>
                                        <p className=''>Verifyed purches</p>
                                        <p className='ms-5'>. Feb,2024</p>
                                    </div>
                                </div>
                            </div>
                            <div className='cont mt-3 mb-5'>
                                <div className='continer'>
                                    <div className="d-flex mb-3">
                                        <div className="p-2"><img src={star_img} /></div>
                                        <div className="p-2"><img src={star_img} /></div>
                                        <div className="p-2"><img src={star_img} /></div>
                                        <div className="p-2"><img src={star_img} /></div>
                                        <div className="p-2"><img src={star_ash} /></div>
                                        <div className="col-12 mt-2 ps-5">Good Product </div>
                                    </div>
                                    <div className='mt-5 mb-5'>
                                        <p>Good Product</p>
                                    </div>
                                    <div className="d-flex align-items-end ms-4">
                                        <p><MdOutlineVerifiedUser /></p>
                                        <p className=''>Verifyed purches</p>
                                        <p className='ms-5'>. Feb,2024</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-6 mx-auto p-2 text-center' style={{ width: '300px' }}>
                    <div className='border col-12  rounded-4'>
                        <p className='Rate_product'>Rate Product</p>
                    </div>
                    <div className='mt-5 Good_product'>
                        <p>Goog product</p>
                    </div>
                    <div className=" d-flex mx-auto p-2" style={{ width: '200px' }}>
                        <div class="p-2"><img src={star_img} /></div>
                        <div class="p-2"><img src={star_img} /></div>
                        <div class="p-2"><img src={star_img} /></div>
                        <div class="p-2"><img src={star_img} /></div>
                        <div class="p-2"><img src={star_ash} /></div>
                    </div>
                    <div className='review'>
                        <p>123 and 45 reviews</p>
                    </div>
                    <hr className='mt-5 bold'></hr>
                    <div className=''>
                        <div className='col-12'>
                            <div className='row'>
                                <div className='col'>
                                    <p>5</p>
                                </div>
                                <div className='col'>
                                    <img src={star_img} />
                                </div>
                                <div className='col-6 mt-2'>
                                    <div class="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                        <div class="progress-bar text-bg-success" style={{ width: '75%' }}></div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <p>6</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <p>5</p>
                                </div>
                                <div className='col'>
                                    <img src={star_img} />
                                </div>
                                <div className='col-6 mt-2'>
                                    <div class="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                        <div class="progress-bar text-bg-success" style={{ width: '75%' }}></div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <p>6</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <p>5</p>
                                </div>
                                <div className='col'>
                                    <img src={star_img} />
                                </div>
                                <div className='col-6 mt-2'>
                                    <div class="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                        <div class="progress-bar text-bg-success" style={{ width: '75%' }}></div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <p>6</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <p>5</p>
                                </div>
                                <div className='col'>
                                    <img src={star_img} />
                                </div>
                                <div className='col-6 mt-2'>
                                    <div class="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                        <div class="progress-bar text-bg-success" style={{ width: '75%' }}></div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <p>6</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <p>5</p>
                                </div>
                                <div className='col'>
                                    <img src={star_img} />
                                </div>
                                <div className='col-6 mt-2'>
                                    <div class="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                        <div class="progress-bar text-bg-success" style={{ width: '75%' }}></div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <p>6</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Bookorder1