import React, { useEffect, useState } from "react";
import "./Viewallfurnitures.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../Constants/Baseurl";
import { toast } from "react-toastify";

function Viewallfurnituresuser() {
  const userid = localStorage.getItem("userid");
  const navigate = useNavigate();
  const [wishlistStatus, setWishlistStatus] = useState({});
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const url = axiosInstance.defaults.url;
  const [searchInput, setSearchInput] = useState('');


  useEffect(() => {
    if (userid === null) {
      navigate("/");
    } else {
      // Fetch all furnitures with quantity > 0
      axiosInstance
        .post("viewFurnitureswithQuantityGtZero")
        .then((result) => {
          setData(result.data.data);
        })
        .catch((err) => {
          console.log(err);
        });

      // Fetch user's cart data
      axiosInstance
        .post(`/viewCartBycustId/${userid}`)
        .then((res) => {
          if (res.data.status === 200) {
            const cartItems = res.data.data;
            const initialWishlistStatus = {};
            cartItems.forEach((item) => {
              initialWishlistStatus[item.furnitureId._id] = true;
            });
            setWishlistStatus(initialWishlistStatus);
            setCart(cartItems);
          } else {
            console.log("Failed to fetch cart data");
          }
        })
        .catch(() => {
          console.log("Failed to fetch cart data");
        });
    }
  }, [userid, navigate]);

  // Add to cart functionality
  const handleHeartClick = (furnitureId) => {
    const updatedStatus = !wishlistStatus[furnitureId];
    setWishlistStatus((prevStatus) => ({
      ...prevStatus,
      [furnitureId]: updatedStatus
    }));

    if (updatedStatus) {
      addtocartfn(furnitureId);
    } else {
      removeFromCartfn(furnitureId);
    }
  };

  const addtocartfn = (furnitureId) => {
    axiosInstance
      .post("addCart", {
        custId: userid,
        furnitureId: furnitureId
      })
      .then((response) => {
        if (response.data.status === 200) {
          toast.success(response.data.message);
          // Add the new item to the cart state
          setCart((prevCart) => [...prevCart, { _id: response.data.data._id, furnitureId: { _id: furnitureId } }]);
        } else {
          toast.warn(response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error adding to cart:", err);
      });
  };

  const removeFromCartfn = (furnitureId) => {
    const cartItem = cart.find((item) => item.furnitureId._id === furnitureId);
    if (cartItem) {
      axiosInstance
        .post(`deleteCartById/${cartItem._id}`)
        .then((response) => {
          if (response.data.status === 200) {
            toast.success(response.data.message);
            // Remove the item from the cart state
            setCart((prevCart) => prevCart.filter((item) => item._id !== cartItem._id));
          } else {
            toast.warn(response.data.message);
          }
        })
        .catch((err) => {
          console.error("Error removing from cart:", err);
        });
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    axiosInstance.post(`searchFurnitureByName/${value}`)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        // alert(err.response.data.message);
      });
  };

  return (
    <div className="user_home_viewfur">
      <div className="container">
        <Link to="/user-home" style={{ textDecoration: "none" }}>
          <h1 className="user_home_viewfur_heading ri-arrow-left-line">
            All Furnitures
          </h1>
        </Link>
        <div className="search-box-div">
        <div className="search-box">
          <input type="text" placeholder="Search here..."
            value={searchInput}
            onChange={handleSearch}

          />
          <i className="ri-search-line search-icon"></i>
        </div>
        </div>
        <div className="row user_home_eachcard_paddd">
          {data && data.length ? (
            data.map((a) => (
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
                      className={`ri-heart-add-fill ${wishlistStatus[a._id] ? "text-danger" : "text-light"
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
            ))
          ) : (
            <div className="viewcounsellor-lottiereqq">No request found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Viewallfurnituresuser;
