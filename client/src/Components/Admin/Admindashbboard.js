import React, { useEffect, useState } from "react";
import "./Admindashboard.css";
import { prepareDataForValidation } from "formik";
import customer from "../../Assets/carbon_customer.png";
import delivery from "../../Assets/deliveryicon.png";
import admin from "../../Assets/admin.jpg";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Constants/Baseurl";
import { toast } from "react-toastify";
import Adminloginnav from "../Navbar/Adminloginnav";

function Admindashbboard() {
  const [shops, setShops] = useState([]);
  const url = axiosInstance.defaults.url;
  // console.log(url);

  useEffect(() => {
    axiosInstance
      .post(`viewallshops`)
      .then((res) => {
        console.log(res);
        setShops(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [request, setRequest] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`viewrequestsforadmin`)
      .then((res) => {
        console.log(res);
        setRequest(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


    //Approve Shops
    const acceptfn = ((id)=> {
      axiosInstance.post(`acceptshop/${id}`)
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            toast.success("Approved Successfully");
            axiosInstance.post(`viewrequestsforadmin`)
              .then((res) => {
                console.log(res);
                setRequest(res.data.msg); 
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
    
    //Reject Shops
    const deletefn = ((id)=> {
      axiosInstance.post(`deleteshop/${id}`)
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            toast.success("Rejected Successfully");
            axiosInstance.post(`viewrequestsforadmin`)
              .then((res) => {
                console.log(res);
                setRequest(res.data.msg); 
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  
  


  return (
    <>
    <Adminloginnav/>
      <div className="container mainclass">
        <div className="row">
          <div className="col-12 d-flex justify-content-center buttonmain">
            <div className="col-sm-3 col-md-3 col-lg-3 pb-3">
              <Link to="/admin-viewcust">
              <button type="submit" className="btn btn-primary btn-block">
                View Customer
              </button></Link>
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3 pb-3">
             <Link to="/admin-viewdelivery"> <button type="submit" className="btn btn-primary btn-block">
                View Delivery Agent
              </button></Link>
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3 pb-3">
              <button type="submit" className="btn btn-primary btn-block">
                View Complaints
              </button>
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3 pb-3">
              <button type="submit" className="btn btn-primary btn-block">
                View Transaction
              </button>
            </div>
          </div>
          <div className="col-12 d-flex boxmain">
        <Link to="/Viewshops" style={{textDecoration:"none"}}>
            <div className="col-sm-4 col-md-4 col-lg-4 d-flex pb-4 boxmain1 ">
              <div className="boxinside1 ">
                <div
                  className="ri-store-2-line"
                  style={{
                    padding: "5px",
                    color: "blue",
                    fontSize: "2rem",
                    paddingLeft: "15px",
                  }}
                />
              </div>
              <div className="boxcontent">
                <h5>{shops? shops.length:0}</h5>
                <p>Total Shop Owners</p>
              </div>
            </div>
            </Link>
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
                <p>Total Customers</p>
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
                <p>Total Delivery Agents</p>
              </div>
            </div>
          </div>
        </div>
        <div className="profileviewmain">
          <h3 className="text-center mb-4">View Request</h3>



          {request && request.length ? (
          request.slice().reverse().slice(0, 2).map((a) => {
            return (

          <div className="profile-view-box " >
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4 d-flex profilevieuser">
                <div className="col-6 col-sm-4 col-md-4 profilevieuser1">
                  <img src={`${url}/${a?.image?.filename}`} alt="admin" className="img-fluid" width="300px" height="200px"/>
                </div>
                <div className="col-8 col-sm-9 col-md-10 profilevieusernames">
                  <table>
                    <tbody>
                      <tr>
                        <td>Shop name:</td>
                        <td className="text-black">{a?.shopname}</td>
                      </tr>
                      <tr>
                        <td>Building name:</td>
                        <td className="text-black">{a?.buildingname}</td>
                      </tr>
                      <tr>
                        <td>Email:</td>
                        <td className="text-black">{a?.email}</td>
                      </tr>
                      <tr>
                        <td>Phone number:</td>
                        <td className="text-black">{a?.phone}</td>
                      </tr>
                      <tr>
                        <td>Address:</td>
                        <td className="text-black">{a?.street},{a?.city},{a?.state}
                              <br />
                              {a?.pincode}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-12 col-md-4 mt-3 profilemainbuttons d-flex justify-content-around ">
                  <button type="submit" className="ri-check-line button11 "
                                          onClick={() => acceptfn(a._id)}

                  >
                    Accept
                  </button>
                  <button type="submit" className="ri-close-line button12"
                                          onClick={() => deletefn(a._id)}
                                          >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>         
);
})
) : (
<div style={{color:"red",fontSize:"20px"}}>No Requests Available</div>
)}
        </div>

        {request?.length > 0 && request?.length >= 3 && (
      <div className="col-12 viewmorebtn text-end">
        <Link to="/shopreq">
          <button>
            View all<span className="ri-arrow-right-line"></span>{" "}
          </button>
        </Link> 
      </div>
    )}
      </div>
    </>
  );
}

export default Admindashbboard;
