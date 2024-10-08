import React, { useEffect, useState } from 'react'
import "./Shopdashboard.css"
import customer1 from "../../Assets/deliveryicon.png";
import delivery1 from "../../Assets/orders.png";
import "../Admin/Admindashboard.css"
import Shophomenav from '../Navbar/Shophomenav';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Shopnav from '../Navbar/Shopnav';
import Showdropdown from './Shopdropdown';
import axiosInstance from '../Constants/Baseurl';
import { toast } from 'react-toastify';

function Shopdashboard() {
  const navigate=useNavigate()
  const shopid=localStorage.getItem("shopid")
  console.log(shopid);
  const [cust,setCust]=useState([])
  const [deliverys,setDeliverys]=useState([])
  const [order,setOrder]=useState([])


  useEffect(()=>{
    if(shopid===null){
      navigate("/shoplogin")
    }
    axiosInstance
    .post(`viewallcust`)
    .then((res) => {
      console.log(res);
      setCust(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
    axiosInstance
    .post(`viewDeliveryAgentbyShopid/${shopid}`)
    .then((res) => {
      console.log(res);
      setDeliverys(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
    axiosInstance
    .post(`viewOrdersByShopId/${shopid}`)
    .then((res) => {
      console.log(res);
      setOrder(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });

  
  },[])
  //order functionlity
  const shopId = localStorage.getItem("shopid");
  const [data, setData] = useState([]);
  const url = axiosInstance.defaults.url;
  const [approvalStatus, setApprovalStatus] = useState({});
  const [delivery, setDelivery] = useState([]);
  const [selectedDeliveryAgent, setSelectedDeliveryAgent] = useState({});
  const [deliveryDate, setDeliveryDate] = useState({});

  useEffect(() => {
    axiosInstance
      .post(`viewPendingOrdersForDelivery/${shopId}`)
      .then((result) => {
        console.log(result);
        setData(result.data.data);
        const initialApprovalStatus = {};
        result.data.data.forEach((order) => {
          initialApprovalStatus[order._id] = false;
        });
        setApprovalStatus(initialApprovalStatus);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [shopId]);

  const handleApprove = (orderId) => {
    setApprovalStatus((prevStatus) => ({
      ...prevStatus,
      [orderId]: true,
    }));
  };

  const handleReject = (id) => {
    axiosInstance.post(`rejectOrdersId/${id}`)
    .then((res)=>{
      console.log(res);
      if(res.data.status==200){
        toast.info("Order Rejected")
        window.location.reload()
      }
      
    })
    .catch((err)=>{
      console.log(err);
      
    })
  };

  useEffect(() => {
    axiosInstance
      .post(`viewActiveDeliveryAgentbyShopid/${shopId}`)
      .then((result) => {
        console.log(result);
        setDelivery(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDeliveryAgentChange = (e, orderId) => {
    const { value } = e.target;
    setSelectedDeliveryAgent((prevState) => ({
      ...prevState,
      [orderId]: value,
    }));
  };

  const handleDeliveryDateChange = (e, orderId) => {
    const { value } = e.target;
    setDeliveryDate((prevState) => ({
      ...prevState,
      [orderId]: value,
    }));
  };

  const assigndelfn = (e, orderId) => {
    e.preventDefault();
    const deliveryAgentId = selectedDeliveryAgent[orderId];
    const date = deliveryDate[orderId];
    if (!deliveryAgentId || !date) {
      toast.warning("Please select a delivery agent and date before approving.");
      return;
    }
    axiosInstance
      .post(`assignDeliveryAgent/${orderId}`, {
        deliveryId:deliveryAgentId,
        deliveryDate: date,
      })
      .then((response) => {
        console.log("Delivery agent assigned:", response.data);
        if(response.data.status==200){
          toast.success("Delivery Agent Successfully Assigned")
          window.location.reload()
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    <div className='col-12'><Shopnav/><Showdropdown/>
          <div className="container mainclass " >
        <div className="row">
          {/* <div className="col-10 d-flex justify-content-center buttonmain">
          </div> */}
          <div className="col-10 d-flex boxmain" style={{marginLeft:"-40px"}}>
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
                <h5>{cust?.length}</h5>
                <p>Total Customers</p>
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4 pb-4  d-flex boxmain2">
              <div className="col-2 boxinside1">
                <img
                  src={customer1}
                  alt="customer"
                  style={{ borderRadius: "20px", paddingLeft: "8px" }}
                />
              </div>
              <div className="col-8 boxcontent">
                <h5>{deliverys?.length}</h5>
                <p>Total Delivery Agents</p>
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4 pb-4 d-flex boxmain3">
              <div className="col-2 boxinside1">
                <img
                  src={delivery1}
                  alt="customer"
                  style={{
                    borderRadius: "20px",
                    paddingLeft: "8px",
                    paddingTop: "5px",
                  }}
                />
              </div>
              <div className="col-8 boxcontent">
                <h5>{order?.length}</h5>
                <p>Total Orders</p>
              </div>
            </div>
          </div>
          {/* margin for gap between footer and inputbox */}
          {/* <div className='col-12' style={{margin:"100px"}}>
                
          </div> */}
          {data && data.length ? (
        data
        .slice(0,2)
        .reverse()
        .map((order) => {
          return (
            <div key={order._id} className="back_ground ms-5 mb-2 mt-3 container">
              <div className="col">
                <div className="row">
                  <div className="col">
                    <img
                      className="mt-5 ms-3 img-fluid product_img"
                      src={`${url}/${order?.furnitureId?.image1?.filename}`}
                      alt="Product"
                    />
                  </div>
                  <div className="col-8">
                    <div className="row">
                      <div className="col mt-5">
                        <p className="Furniture_text">Furniture details</p>
                        <div className="row mt-4">
                          <div className="col Furniture_details_text">
                            <p>Furniture Type :</p>
                          </div>
                          <div className="col Furniture_details_text2">
                            <p>{order?.furnitureId?.category}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col Furniture_details_text">
                            <p>Quantity:</p>
                          </div>
                          <div className="col Furniture_details_text2">
                            <p>{order?.count}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col Furniture_details_text">
                            <p>Dimension :</p>
                          </div>
                          <div className="col Furniture_details_text2">
                            <p>{order?.furnitureId?.dimension}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col Furniture_details_text">
                            <p>price :</p>
                          </div>
                          <div className="col Furniture_details_text2">
                            <p>{order?.amount?.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col mt-5">
                        <p className="Customer_text">Customer information</p>
                        <div className="row mt-4">
                          <div className="col Furniture_details_text">
                            <p>Name:</p>
                          </div>
                          <div className="col Furniture_details_text2">
                            <p>{order?.name?order.name:order?.customerId?.name}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col Furniture_details_text">
                            <p>Email:</p>
                          </div>
                          <div className="col Furniture_details_text2">
                            <p>{order?.email?order.email: order?.customerId?.email}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col Furniture_details_text">
                            <p>Phone number :</p>
                          </div>
                          <div className="col Furniture_details_text2">
                            <p>{order?.contact?order.contact: order?.customerId?.phone}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col Furniture_details_text">
                            <p>Address :</p>
                          </div>
                          <div className="col Furniture_details_text2">
                            <p>{order?.address?order.address:order?.customerId?.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {approvalStatus[order._id] ? (
                        <div className="assign-delv-main">
                          <div>
                            <h6>Assign Delivery Agent</h6>
                          </div>
                          <div>
                            <select
                              className="assign-del-select"
                              value={selectedDeliveryAgent[order._id] || ""}
                              onChange={(e) => handleDeliveryAgentChange(e, order._id)}
                            >
                              <option hidden>Email </option>
                              {delivery.length ? (
                                delivery.map((a) => {
                                  return (
                                    <option key={a._id} value={a?._id}>
                                      {a?.email}
                                    </option>
                                  );
                                })
                              ) : (
                                <option>No Delivery Agent available</option>
                              )}
                            </select>
                          </div>
                          <div>
                            <h6>Date</h6>
                          </div>
                          <div className="d-flex">
                            <input
                              type="date"
                              min={new Date().toISOString().split("T")[0]}
                              value={deliveryDate[order._id] || ""}
                              onChange={(e) => handleDeliveryDateChange(e, order._id)}
                            />
                            <button
                              type="button"
                              className="ri-checkbox-line"
                              onClick={(e) => assigndelfn(e, order._id)}
                            >
                              Assign
                            </button>
                          </div>
                          <div></div>
                        </div>
                      ) : (
                        <div
                          className="row mt-5 col"
                          style={{ paddingLeft: "100px" }}
                        >
                          <div className="col">
                            <button
                              className="Accept_bg Accept_text ri-checkbox-line"
                              type="button"
                              onClick={() => handleApprove(order._id)}
                            >
                              Approve
                            </button>
                          </div>
                          <div className="col">
                            <button
                              className="Reject_bg Reject_text ri-close-circle-line"
                              onClick={() => handleReject(order._id)}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="viewcounsellor-lottiereqq" style={{textAlign:"center"}}>No request found</div>
      )}
    {
      data?.length>=2?(
    <Link to="/view-vieworders">
      <div className='shop_dash_viewmorebtn'>
       <div> <button type='button'>View More <span className='ri-arrow-right-line'/></button></div>
      </div></Link>
      ):(<></>)}
        </div>
        </div>
</div>
    </>
  )
}

export default Shopdashboard