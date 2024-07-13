import React, { useEffect, useState } from "react";
import "./Viewallfurnitures.css";
import chair from "../../../Assets/userhome_viewfur.png";
import { FaArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../Constants/Baseurl";
import { toast } from "react-toastify";


function Viewallfurnituresuser() {
  const userid = localStorage.getItem("userid");
  console.log(userid);
  const navigate = useNavigate();
  const [wishlistStatus, setWishlistStatus] = useState({});
  const [data, setData] = useState([]);
  const [cart, setCart] = useState({
    custId: userid,
    furnitureId: ""
  });
  const url = axiosInstance.defaults.url;

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
        <Link to="/user-home" style={{ textDecoration: "none" }}>
          {" "}
          <h1 className="user_home_viewfur_heading ri-arrow-left-line">
            All Furnitures
          </h1>
        </Link>
        <div className="row user_home_eachcard_paddd">
          {data && data.length ? (
            data.map((a) => {
              return (
                <div
                  className="col-md-3 col-sm-6"
                  style={{ marginTop: "20px" }}
                  key={a._id}
                >
                  <div className="card wishlist-cardmain">
                    <img
                      src={`${url}/${a?.image1?.filename}`}
                      className="card-img-top"
                      alt="..."
                      width="290px"
                      height="275px"
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
                      <div className="card-body">
                        <h5 className="card-title">{a?.name}</h5>
                        <p className="card-text">
                          Available Quantity: {a?.quantity}
                        </p>
                        <p className="card-text">Rent</p>
                        <p className="card-text userhome_card_price">
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
        </div>
      </div>
    </div>
  );
}

export default Viewallfurnituresuser;
