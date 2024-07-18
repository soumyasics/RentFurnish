import React, { useEffect, useState } from "react";
import "./ViewMyOrder.css";
import img from "../../../Assets/Bead2.png";
import axiosInstance from "../../Constants/Baseurl";
import { Link, useNavigate } from "react-router-dom";

function ViewMyOrder() {
  const id = localStorage.getItem("userid")
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const url = axiosInstance.defaults.url;


  useEffect(() => {
    if (id === null) {
      navigate("/")
    }
    else {
      axiosInstance.post(`viewOrdersByCustId/${id}`)
        .then((res) => {
          console.log(res);
          setData(res.data.data)
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [])



  return (
    <div className="container">
      <div className="user-vieworder-head">
        <Link to="/user-home" style={{ textDecoration: "none" }}><h1 className="ri-arrow-left-line">My Orders</h1></Link>
      </div>
      {data && data.length ? (
        data.map((a) => {
          return (

            <div className="col-12 pb-6">
              <div className="user-vieworder-boxmain">
                <div className="row">
                  <div className="col-8 user-vieworder-image">
                    <img src={`${url}/${a?.furnitureId?.image1?.filename}`} alt="image" />
                  </div>
                  <div className="col-4 user-vieworder-data">
                    <p className="user-order-p">{a?.furnitureId?.name} </p>
                    <h5>₹{a?.furnitureId?.rent}/Month</h5>
                    <h6 className="user-ordr-amnt">
                      <span>Deposit Amount :</span>{a?.amount}
                    </h6>
                    <h6 className="user-ordr-amnt">
                      <span>Days Required :</span>{a?.noOfDays}
                    </h6>

                    <h6 className="user-ordr-amnt">
                      <span>Quantity :</span>{a?.count}
                    </h6>
                    <h6 className="user-ordr-amnt">
                      <span>Dimention :</span>{a?.furnitureId?.dimension}
                    </h6>
                    {a?.completionDate ? (
                      <Link to={`/user-return/${a?._id}`} className="track_delivery_link">
                        <button type="button">Return</button>
                      </Link>
                    ) : (
                      <Link to={`/user-trackdelivery/${a?._id}`} className="track_delivery_link">
                        <button type="button">Track Delivery</button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

          );
        })
      ) : (
        <div style={{ color: "red", fontSize: "20px" }}>
          No Requests Available
        </div>
      )}

    </div>
  );
}

export default ViewMyOrder;
