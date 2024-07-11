import React, { useEffect, useState } from "react";
// import "./AdminViewCust.css";
import Adminnav from "../../Navbar/Adminnav";
import img from "../../../Assets/user.jpg";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../Constants/Baseurl";

function AdminViewDelivery() {
    const adminid = localStorage.getItem("adminid");
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const url = axiosInstance.defaults.url;
  
  
    useEffect(() => {
      if (adminid === null) {
        navigate("/");
      } else {
        axiosInstance
          .post(`viewallDeliveryAgents`)
          .then((res) => {
            console.log(res);
            setData(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, []);
  
  return (
    <div>
      <Adminnav />
      <div className="admin-view-custmain ">
        <div className="admin-view-custboxmain">
          <div className="admin-view-custheader">
            <Link to="/admindashboard" style={{ textDecoration: "none" }}>
              {" "}
              <h4 className="ri-arrow-left-line">View Delivery Agent</h4>
            </Link>
          </div>
          <div className="row">
            {data && data.length ? (
              data.map((a) => {
                return (
                  <div className="col-4 sm-2 lg-4 ">
                    <div className="admin-view-insidebox">
                      <div className="admin-view-imageprofile">
                        <img src={`${url}/${a?.image?.filename}`} />
                      </div>
                      <div className="row admin-viewcust-cnt">
                        {/* <div className='col-12'> */}
                        <div className="col-4 admin-viewcust-p">Name</div>
                        <div className="col-1">:</div>
                        <div className="col-7">{a?.name}</div>
                        <div className="col-4 admin-viewcust-p">Email</div>
                        <div className="col-1">:</div>
                        <div className="col-7">{a?.email}</div>
                        <div className="col-4 admin-viewcust-p">Phone</div>
                        <div className="col-1">:</div>
                        <div className="col-7">{a?.phone}</div>
                        <div className="col-4 admin-viewcust-p">Address</div>
                        <div className="col-1">:</div>
                        <div className="col-7 admin-viewcust-address">
                         {a?.address}
                        </div>
                        <div className="col-4 admin-viewcust-p">Liscence Number</div>
                        <div className="col-1">:</div>
                        <div className="col-7">{a?.licenceNumber}</div>
                        <div className="col-4 admin-viewcust-p">Vehicle Type</div>
                        <div className="col-1">:</div>
                        <div className="col-7">{a?.vehicleType}</div>
                        <div className="col-4 admin-viewcust-p">Vehicle Number</div>
                        <div className="col-1">:</div>
                        <div className="col-7">{a?.vehicleNumber}</div>
                        <div className="col-4 admin-viewcust-p">Area/Landmark</div>
                        <div className="col-1">:</div>
                        <div className="col-7">{a?.deliveryArea}</div>
                        <div className="col-4 admin-viewcust-p">District</div>
                        <div className="col-1">:</div>
                        <div className="col-7">{a?.deliveryDistrict}</div>

                        {/* </div> */}
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
        </div>
      </div>
    </div>
  )
}

export default AdminViewDelivery