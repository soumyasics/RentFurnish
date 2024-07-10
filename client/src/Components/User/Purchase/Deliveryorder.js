import React from 'react'
import "../../User/Purchase/Deliveryorder.css";
import Vector from "../../../Assets/Vector.png";
import Bead_img1 from "../../../Assets/Bead.png";
import Bead_img2 from "../../../Assets/Bead2.png";
import Bead_img3 from "../../../Assets/Bead3.png";
import Bead_img4 from "../../../Assets/Bead4.png";
function Deliveryorder() {
    return (
        <div>
            <div className="d-flex flex-row mt-5">
                <img className='ms-5 backimg' src={Vector} />
                <div className="ms-2 p-2 bookorder">View details</div>
            </div>
            <div className='p-5'>
                <div className='row border rounded-3 p-3'>
                    <div className='col-sm-12 col-lg-6'>
                        <div className='col'>
                            <img className='img-fluid' src={Bead_img1} />
                        </div>
                        <div className='row mt-3 mb-5'>
                            <div className='col'><img className='img-fluid' src={Bead_img2} /></div>
                            <div className='col'><img className='img-fluid' src={Bead_img3} /></div>
                            <div className='col'><img className='img-fluid' src={Bead_img4} /></div>
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
                                                <p>Double Bead</p>
                                            </div>
                                            <div className='col-6 details_text'>
                                                <p>Furniture Type :</p>
                                            </div>
                                            <div className='col-6'>
                                                <p>Coat</p>
                                            </div>
                                            <div className='col-6 details_text'>
                                                <p>Quantity:</p>
                                            </div>
                                            <div className='col-6'>
                                                <p>1</p>
                                            </div>
                                            <div className='col-6 details_text'>
                                                <p>Price:</p>
                                            </div>
                                            <div className='col-6'>
                                                <p>499/Month</p>
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
                                                <p>Double </p>
                                            </div>
                                            <div className='col-6 details_text'>
                                                <p>Email :</p>
                                            </div>
                                            <div className='col-sm-6 col-lg-6  '>
                                                <p>abiabinesh483@.com</p>
                                            </div>
                                            <div className='col-6 details_text'>
                                                <p>Phone Number:</p>
                                            </div>
                                            <div className='col-sm-6 '>
                                                <p>1234567891</p>
                                            </div>
                                            <div className='col-6 details_text'>
                                                <p>Address:</p>
                                            </div>
                                            <div className='col-6 overflow-auto'>
                                                <p>KanyaKumari,Marthandam</p>
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
                                <p>The length of your tenancy is 1 year. Monthly rent amount should pay correctly before due date</p>
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