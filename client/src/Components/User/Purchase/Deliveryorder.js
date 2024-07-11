import React, { useEffect, useState } from 'react'
import "../../User/Purchase/Deliveryorder.css";
import Vector from "../../../Assets/Vector.png";
import Bead_img1 from "../../../Assets/Bead.png";
import Bead_img2 from "../../../Assets/Bead2.png";
import Bead_img3 from "../../../Assets/Bead3.png";
import Bead_img4 from "../../../Assets/Bead4.png";
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../Constants/Baseurl';
function Deliveryorder() {
    const location = useLocation();
    const navigate=useNavigate()
    const { id, totalRent, count } = location.state;
    const [data,setData]=useState({})
    const [user,setUser]=useState({})
    const url = axiosInstance.defaults.url;
    const userid = localStorage.getItem("userid");


    console.log(totalRent);

    const navigatebck=(()=>{
        navigate(-1)
    })

    useEffect(()=>{
        axiosInstance.post(`viewFurnitureById/${id}`)
        .then((result)=>{
            console.log(result);
            setData(result.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })

        axiosInstance.post(`viewcustbyid/${userid}`)
        .then((res) => {
            console.log(res.data);
            setUser(res.data.data); 
        })
        .catch((err) => {
            console.log("Error fetching user data: ", err);
        });
    },[id,userid])

    return (
        <div>
            <div className="d-flex flex-row mt-5">
                <img className='ms-5 backimg' src={Vector} onClick={navigatebck}/>
                <div className="ms-2 p-2 bookorder">View details</div>
            </div>
            <div className='p-5'>
                <div className='row border rounded-3 p-3'>
                    <div className='col-sm-12 col-lg-6'>
                        <div className='col user-confirm-purchasemainimg'>
                            <img className='img-fluid' src={`${url}/${data?.image1?.filename}`} />
                        </div>
                        <div className='row mt-3 mb-5 user-confirm-purchasesubimg'>
                            <div className='col'><img className='img-fluid' src={`${url}/${data?.image2?.filename}`} /></div>
                            <div className='col'><img className='img-fluid' src={`${url}/${data?.image3?.filename}`} /></div>
                            <div className='col'><img className='img-fluid' src={`${url}/${data?.image4?.filename}`} /></div>
                        </div>
                    </div>
                    <div className='col-sm-12 col-lg-6 mt-4'>
                        <div className='row border p-4 rounded-3'>
                            <div className='col-sm-6 col-lg-6'>
                                <p className='text'>Furniture Details</p>
                                <div className='row'>
                                    <div className='col-sm-12 col-lg-12'>
                                        <div className='row'>
                                            <div className='col details_text'>
                                                <p>Furniture Name :</p>
                                            </div>
                                            <div className='col-6'>
                                                <p>{data?.name}</p>
                                            </div>
                                            <div className='col-6 details_text'>
                                                <p>Furniture Type :</p>
                                            </div>
                                            <div className='col-6'>
                                                <p>{data?.category}</p>
                                            </div>
                                            <div className='col-6 details_text'>
                                                <p>Quantity:</p>
                                            </div>
                                            <div className='col-6'>
                                                <p>{count}</p>
                                            </div>
                                            <div className='col-6 details_text'>
                                                <p>Price:</p>
                                            </div>
                                            <div className='col-6'>
                                                <p>{totalRent}/Month</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-6 col-lg-6 '>
                                <p className='text'>Customer Infromation</p>
                                <div className='row'>
                                <div className='col-sm-12 col-lg-12'>
                                        <div className='row '>
                                            <div className='col-6 details_text'>
                                                <p> Name :</p>
                                            </div>
                                            <div className='col-6'>
                                                <p>{user?.name} </p>
                                            </div>
                                            <div className='col-6 details_text'>
                                                <p>Email :</p>
                                            </div>
                                            <div className='col-sm-6 col-lg-6  '>
                                                <p>{user?.email}</p>
                                            </div>
                                            <div className='col-6 details_text'>
                                                <p>Phone Number:</p>
                                            </div>
                                            <div className='col-sm-6 '>
                                                <p>{user?.phone}</p>
                                            </div>
                                            <div className='col-6 details_text'>
                                                <p>Address:</p>
                                            </div>
                                            <div className='col-6 overflow-auto'>
                                                <p>{user?.address}</p>
                                            </div>
                                            <div className=''>
                                                <button className='change change_text'>Change</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-8'>
                                <p className='details_text'>Rental terms</p>
                                <p>{data?.condition}</p>
                                <div className='d-flex'>
                                <input class="form-check-input  active" type="checkbox" value="" id="flexCheckDefault"/>
                                <p className='ms-1 details_text'>Agree to terms and conditions</p>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div className="mx-auto p-2 mb-5" style={{width: '200px'}}>
                        <button className='book_nowbtn book_nowtext'> Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Deliveryorder