import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../../Constants/Baseurl';
import { toast } from 'react-toastify';


function ViewCart() {
    const userid = localStorage.getItem("userid");
    const [data,setData]=useState([])
    const url = axiosInstance.defaults.url;
    const [wishlistStatus, setwishlistStatus] = useState(true);

    useEffect(()=>{
        axiosInstance.post(`viewCartBycustId/${userid}`)
        .then((res)=>{
            console.log(res);
            setData(res.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const handleHeartClick = () => {
        // setIsHeartFilled(!isHeartFilled);
        setwishlistStatus(true);
      };

      const removecartfn=((id)=>{
        axiosInstance.post(`deleteCartById/${id}`)
        .then((res)=>{
            console.log(res);
            if(res.data.status==200){
                toast.success("Item Removed Successfully")
            }
            setData(data.filter(user => user._id !== id));
        })
        .catch((err)=>{
            console.log(err);
        })
      })


  return (
    <div className="user_home_viewfur">
      <div className="container">
        <Link to="/user-home" style={{ textDecoration: "none" }}>
          {" "}
          <h1 className="user_home_viewfur_heading ri-arrow-left-line">
            Wishlist
          </h1>
        </Link>
        <div className="row user_home_eachcard_paddd">
          {data && data.length ? (
            data.map((a) => {
              return (
                <div
                  className="col-md-3 col-sm-6"
                  style={{ marginTop: "20px" }}
                //   key={a._id}
                >
                  <div className="card wishlist-cardmain">
                    <img
                      src={`${url}/${a?.furnitureId?.image1?.filename}`}
                      className="card-img-top"
                      alt="..."
                      width="290px"
                      height="275px"
                    />
                      <button
                        className=" bg_icon mx-2 heart-button "
                        onClick={()=>removecartfn(a._id)}
                        // onClick={handleHeartClick}
                      >
                        <i
                          className={`ri-heart-add-fill ${
                            wishlistStatus == true
                              ? "text-danger"
                              : "text-light"
                          }`}
                        ></i>
                      </button>
                  

                     <Link
                      to={`/user-purchesproduct/${a?.furnitureId?._id}`}
                      style={{ textDecoration: "none" }}
                    > 
                      <div className="card-body">
                        <h5 className="card-title">{a?.furnitureId?.name}</h5>
                        <p className="card-text">
                          Available Quantity: {a?.furnitureId?.quantity}
                        </p>
                        <p className="card-text">Rent</p>
                        <p className="card-text userhome_card_price">
                          ₹ {a?.furnitureId?.rent}/MO
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
  )
}

export default ViewCart