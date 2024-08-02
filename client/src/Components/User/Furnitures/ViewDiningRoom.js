import React, { useEffect, useState } from 'react';
import './Viewallfurnitures.css';
import { FaRegHeart } from 'react-icons/fa';
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../Constants/Baseurl';
import axiosMultipartInstance from '../../Constants/FormDataUrl';
import { toast } from 'react-toastify';


function ViewDiningRoom() {
  const userid = localStorage.getItem("userid");
  const [furnitureData, setFurnitureData] = useState([]);
  const url = axiosInstance.defaults.url;
  const room = 'Dining Room';
  const [wishlistStatus, setWishlistStatus] = useState({});
  const [cart, setCart] = useState([]);
  const [searchInput, setSearchInput] = useState('');


  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
  
    if (value.trim() === '') {
      axiosMultipartInstance.post(`/viewFurnitureswithRoomType/${room}`)
        .then(response => {
          setFurnitureData(response.data.data || []);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          toast.error('An error occurred while fetching data.');
        });
    } else {
      axiosInstance.post(`searchFurnitureByRoomType/${value}`, { roomType: room })
        .then((res) => {
          if (res.data.status === 200) {
            console.log(res);
            setFurnitureData(res.data.data);
          } else {
            setFurnitureData([]);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };


  useEffect(() => {
    axiosMultipartInstance.post(`/viewFurnitureswithRoomType/${room}`)
      .then(response => {
        setFurnitureData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
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

  }, []);
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

  return (
    <div>
      <h1 className='container pb-3 pt-3 room_type_heading'>
        <Link to="/user-home">
          <FaArrowLeft className='contact_arrow' />
        </Link>
        Dining Room
      </h1>
      <div className='search-box-div1 pb-4'>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search here..."
          value={searchInput}
          onChange={handleSearch}
        />
        <i className="ri-search-line search-icon"></i>
      </div>
      </div>
      <div className="furniture-grid container">
        {
          furnitureData&&furnitureData.length?(
        furnitureData.map((item) => (
          <div key={item._id} className="furniture-item">
            <img src={`${url}/${item?.image1?.filename}`} alt={item.name} className="furniture-image img-fluid" />
            <button
              className="bg_icon mx-2 heart-button"
              onClick={() => handleHeartClick(item._id)}
            >
              <i
                className={`ri-heart-add-fill ${wishlistStatus[item._id] ? "text-danger" : "text-light"
                  }`}
              ></i>
            </button>

            <Link to={`/user-purchesproduct/${item._id}`} style={{ textDecoration: "none" }}>
              <div className="furniture-details">
                <h3 className='viewfur_main_name'>{item.name}</h3>
                <p className='viewfur_text_color_change'>Available Quantity: {item.quantity}</p>
                <p className='viewfur_text_color_change'>Rent</p>
                <p className='viewfur_amount_rent'> ₹{item.rent}/MO</p>
              </div>
            </Link>
            {/* <button className="wishlist-button"><FaRegHeart /></button> */}
          </div>
        ))):(
          <h5>No Furniture Available</h5>
        )}
      </div>
    </div>
  )
}

export default ViewDiningRoom