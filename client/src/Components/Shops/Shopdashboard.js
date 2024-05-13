import React from 'react'
import "./Shopdashboard.css"
import customer from "../../Assets/deliveryicon.png";
import delivery from "../../Assets/orders.png";
import "../Admin/Admindashboard.css"
import Shophomenav from '../Navbar/Shophomenav';
import { useNavigate } from 'react-router-dom';

function Shopdashboard() {
  const navigate=useNavigate()
  const shopid=localStorage.getItem("shopid")
  console.log(shopid);

  if(shopid===null){
    navigate("/shoplogin")
  }

  return (
    <>
    <Shophomenav/>
          <div className="container mainclass">
        <div className="row">
          <div className="col-12 d-flex justify-content-center buttonmain">
            <div className="col-sm-3 col-md-3 col-lg-3 pb-3">
              <button type="submit" className="btn btn-primary btn-block">
                Delivery Agent
              </button>
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3 pb-3">
              <button type="submit" className="btn btn-primary btn-block">
                View Return Requests
              </button>
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3 pb-3">
              <button type="submit" className="btn btn-primary btn-block">
                Fine Calculation
              </button>
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3 pb-3">
              <button type="submit" className="btn btn-primary btn-block">
                View Complaints
              </button>
            </div>
          </div>
          <div className="col-12 d-flex boxmain">
            <div className="col-sm-4 col-md-4 col-lg-4 d-flex pb-4 boxmain1 ">
              <div className="boxinside1 ">
                <div
                  className="ri-user-line"
                  style={{
                    padding: "5px",
                    color: "blue",
                    fontSize: "2rem",
                    paddingLeft: "15px",
                  }}
                />
              </div>
              <div className="boxcontent">
                <h5>12</h5>
                <p>Total Customers</p>
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4 pb-4  d-flex boxmain2">
              <div className="col-2 boxinside1">
                <img
                  src={customer}
                  alt="customer"
                  style={{ borderRadius: "20px", paddingLeft: "8px" }}
                />
              </div>
              <div className="col-8 boxcontent">
                <h5>10</h5>
                <p>Total Delivery Agents</p>
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4 pb-4 d-flex boxmain3">
              <div className="col-2 boxinside1">
                <img
                  src={delivery}
                  alt="customer"
                  style={{
                    borderRadius: "20px",
                    paddingLeft: "8px",
                    paddingTop: "5px",
                  }}
                />
              </div>
              <div className="col-8 boxcontent">
                <h5>10</h5>
                <p>Total Orders</p>
              </div>
            </div>
          </div>
        </div>
</div>
    </>
  )
}

export default Shopdashboard