import React, { useEffect, useState } from "react";
import chair from "../../../Assets/userhome_viewfur.png";
import { FaArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../Constants/Baseurl";
import { toast } from "react-toastify";


function User_ViewAllFur() {
  const userid = localStorage.getItem("userid");
  console.log(userid);
  const navigate = useNavigate();
  // const [wishlistStatus, setwishlistStatus] = useState(false);
  const [data, setData] = useState([]);
  const url = axiosInstance.defaults.url;
  const [wishlistStatus, setWishlistStatus] = useState({});
  const [cart, setCart] = useState({
    custId: userid,
    furnitureId: ""
  });

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
  }, [userid, navigate]);
  // Add to cart functionality
  const handleHeartClick = (furnitureId) => {
    setWishlistStatus((prevStatus) => ({
      ...prevStatus,
      [furnitureId]: !prevStatus[furnitureId]
    }));
    addtocartfn(furnitureId);
  };

  const addtocartfn = (furnitureId) => {
    axiosInstance
      .post(`addCart`, {
        custId: userid,
        furnitureId: furnitureId
      })
      .then((response) => {
        console.log("Item added to cart:", response.data);
        if(response.data.status==200){
          toast.success(response.data.message)
        }
        else{
          toast.warn(response.data.message)
   
        }
      })
      .catch((err) => {
        console.error("Error adding to cart:", err);
      });
  };

  return (
    <div className="user_home_viewfur">
      <div className="container">
        <h1 className="user_home_viewfur_heading">You May Like these...</h1>
        <div className="row user_home_eachcard_paddd">
          {data && data.length ? (
            data.slice(0, 8).map((a) => {
              return (
                <div className="col-md-3 col-sm-6"                   style={{ marginTop: "20px" }}
>
                    <div class="card" >
                      <img
                        src={`${url}/${a?.image1?.filename}`}
                        width="290px"
                        height="275px"
                        class="card-img-top"
                        alt="..."
                      />
                                          <button
                      className="bg_icon mx-2 heart-button"
                      onClick={() => handleHeartClick(a._id)}
                    >
                      <i
                        className={`ri-heart-add-fill ${
                          wishlistStatus[a._id] ? "text-danger" : "text-light"
                        }`}
                      ></i>
                    </button>

                  <Link
                    to={`/user-purchesproduct/${a._id}`}
                    style={{ textDecoration: "none" }}
                  >

                      <div class="card-body">
                        <h5 class="card-title">Single seat sofa</h5>
                        <p class="card-text">Rent</p>
                        <p class="card-text userhome_card_price">
                          ₹ {a?.rent}/MO
                        </p>
                      </div>
                      </Link>

                    </div>
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
        <Link to="/user-viewallfurniture">
          <div className="userhome_viewfur_viewall_butt">
            <button className="userhome_fur_seccol_btn">
              View All <FaArrowRight />
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default User_ViewAllFur;
