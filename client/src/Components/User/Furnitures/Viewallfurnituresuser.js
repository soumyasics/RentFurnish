import React, { useEffect, useState } from "react";
import "./Viewallfurnitures.css";
import chair from "../../../Assets/userhome_viewfur.png";
import { FaArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../Constants/Baseurl";

function Viewallfurnituresuser() {
  const userid = localStorage.getItem("userid");
  console.log(userid);
  const navigate = useNavigate();
  const [wishlistStatus, setwishlistStatus] = useState(false);
  const [data, setData] = useState([]);
  const url = axiosInstance.defaults.url;


  const handleHeartClick = () => {
    // setIsHeartFilled(!isHeartFilled);
    setwishlistStatus(true);
  };

  useEffect(() => {
    if (userid === null) {
      navigate("/");
    } else {
      axiosInstance
        .post(`viewFurnitureswithQuantityGtZero`)
        .then((result) => {
          console.log(result);
          setData(result.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="user_home_viewfur">
      <div className="container">
       <Link to="/user-home" style={{textDecoration:"none"}}> <h1 className="user_home_viewfur_heading ri-arrow-left-line">
          All Furnitures
        </h1></Link>
        <div className="row user_home_eachcard_paddd">
          {data && data.length ? (
            data.map((a) => {
              return (
                <div className="col-md-3 col-sm-6">
                    <Link to={`/user-purchesproduct/${a._id}`} style={{textDecoration:"none"}}>
                  <div class="card wishlist-cardmain">
                    <img
                      src={`${url}/${a?.image1?.filename}`}
                      class="card-img-top"
                      alt="..."
                      width="290px"
                      height="275px"
                    />

                    <div class="card-body">
                      <h5 class="card-title">{a?.name}</h5>
                      <p class="card-text">Available Quantity : {a?.quantity}</p>
                      <p class="card-text">Rent</p>
                      <p class="card-text userhome_card_price">₹ {a?.rent}/MO</p>
                      <button
                        className=" bg_icon mx-2 heart-button "
                        onClick={handleHeartClick}
                      >
                        <i
                          className={`ri-heart-add-fill ${
                            wishlistStatus == true
                              ? "text-danger"
                              : "text-light"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div></Link>
                </div>
              );
            })
          ) : (
            <div className="viewcounsellor-lottiereqq">No request found</div>
          )}

          {/* <div className='col-md-3 col-sm-6'>
                    <div class="card">
                        <img src={chair} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Single seat sofa</h5>
                            <p class="card-text">Rent</p>
                            <p class="card-text userhome_card_price">₹499/MO</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 col-sm-6'>
                    <div class="card">
                        <img src={chair} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Single seat sofa</h5>
                            <p class="card-text">Rent</p>
                            <p class="card-text userhome_card_price">₹499/MO</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 col-sm-6'>
                    <div class="card">
                        <img src={chair} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Single seat sofa</h5>
                            <p class="card-text">Rent</p>
                            <p class="card-text userhome_card_price">₹499/MO</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row user_home_eachcard_paddd'>
                <div className='col-md-3 col-sm-6'>
                    <div class="card">
                        <img src={chair} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Single seat sofa</h5>
                            <p class="card-text">Rent</p>
                            <p class="card-text userhome_card_price">₹499/MO</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 col-sm-6'>
                    <div class="card">
                        <img src={chair} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Single seat sofa</h5>
                            <p class="card-text">Rent</p>
                            <p class="card-text userhome_card_price">₹499/MO</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 col-sm-6'>
                    <div class="card">
                        <img src={chair} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Single seat sofa</h5>
                            <p class="card-text">Rent</p>
                            <p class="card-text userhome_card_price">₹499/MO</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 col-sm-6'>
                    <div class="card">
                        <img src={chair} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Single seat sofa</h5>
                            <p class="card-text">Rent</p>
                            <p class="card-text userhome_card_price">₹499/MO</p>
                        </div>
                    </div>
                </div> */}
        </div>
        {/* <div className='userhome_viewfur_viewall_butt'>
                <button className='userhome_fur_seccol_btn'>View All <FaArrowRight /></button>
            </div> */}
      </div>
    </div>
  );
}

export default Viewallfurnituresuser;
