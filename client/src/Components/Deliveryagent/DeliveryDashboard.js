import React, { useEffect, useState } from 'react';
import Shopnav from '../Navbar/Shopnav';
import customer from "../../Assets/deliveryicon.png";
import delivery from "../../Assets/orders.png";
import { Link, useNavigate } from 'react-router-dom';
import "./Deliverydash.css"
import axiosInstance from '../Constants/Baseurl';
import { toast } from 'react-toastify';


function DeliveryDashboard() {

  const deliveryid=localStorage.getItem("deliveryid")
  console.log(deliveryid);
  const navigate=useNavigate()
  const [data,setData]=useState([])
  const [totaldel,setTotaldel]=useState([])
  const [alldel,setAlldel]=useState([])
  const url = axiosInstance.defaults.url;


  useEffect(()=>{
    if(deliveryid===null){
      navigate("/agentlogin")
    }

    axiosInstance.post(`viewMyOrdersByDeliveryAgentId/${deliveryid}`)
    .then((res)=>{
      console.log(res);
      setData(res.data.data)
      const sortedData = res.data.data.sort((a, b) => {
        const dateA = new Date(a.deliveryDate).setHours(0, 0, 0, 0);
        const dateB = new Date(b.deliveryDate).setHours(0, 0, 0, 0);
        return dateA - dateB;
      })
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  const completdel=((id)=>{
    axiosInstance.post(`updateCompletionOfDelivery/${id}`)
    .then((res)=>{
      console.log(res);
      if(res.data.status==200){
        toast.success("Delivery Completed Successfully")
        axiosInstance.post(`viewMyOrdersByDeliveryAgentId/${deliveryid}`)
        .then((res)=>{
          console.log(res);
          setData(res.data.data)
          const sortedData = res.data.data.sort((a, b) => {
            const dateA = new Date(a.deliveryDate).setHours(0, 0, 0, 0);
            const dateB = new Date(b.deliveryDate).setHours(0, 0, 0, 0);
            return dateA - dateB;
          })
        })
        .catch((err)=>{
          console.log(err);
        })
    
      }
      else{
        toast.err("Cannot Completed at this Moment")
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  })

  useEffect(()=>{
    axiosInstance.post(`viewDeliveryCountBtDeliveryId/${deliveryid}`)
    .then((res)=>{
      console.log(res);
      setTotaldel(res.data.data)
    })
    .catch((err)=>{
      console.log(err);
    })
    axiosInstance.post(`viewallDeliveryCountBtDeliveryId/${deliveryid}`)
    .then((res)=>{
      console.log(res);
      setAlldel(res.data.data)
    })
    .catch((err)=>{
      console.log(err);
    })

  },[])

  return (
    <div>
      <Shopnav />
      <div className="container" style={{padding:"20px"}}>
        <div className="row">
          <div className="col-12 col-md-4 mb-4 d-flex align-items-center boxmain3" style={{marginLeft:"30px"}}>
            <div className="boxinside1 me-3">
              <img
                src={delivery}
                alt="total orders"
                style={{
                  borderRadius: "20px",
                  padding: "5px",
                  width: "50px",
                  height: "50px"
                }}
              />
            </div>
            <div className="boxcontent">
              <h5>{alldel}</h5>
              <p>Total Orders</p>
            </div>
          </div>

          <div className="col-12 col-md-4 mb-4 d-flex align-items-center boxmain1">
            <div className="boxinside1 me-3">
              <div
                className="ri-user-line"
                style={{
                  padding: "5px",
                  color: "blue",
                  fontSize: "2rem",
                  paddingLeft: "15px"
                }}
              />
            </div>
            <div className="boxcontent">
              <h5>{totaldel}</h5>
              <p>Total Deliveries</p>
            </div>
          </div>

          <div className="col-12 col-md-4 mb-4 d-flex align-items-center boxmain2">
            <div className="boxinside1 me-2">
              <img
                src={customer}
                alt="pending deliveries"
                style={{
                  borderRadius: "20px",
                  padding: "5px",
                  width: "50px",
                  height: "50px"
                }}
              />
            </div>
            <div className="boxcontent">
              <h5>{data?.length}</h5>
              <p>Pending Deliveries</p>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='orderdetailsdel-main'>
            <h2>Pending Orders</h2>

            {data && data.length ? (
        data.slice(0,2).map((order) => {
          return (

            <div  className="back_ground ms-5 mb-2 mt-3 container">
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
                            <p>{order?.amount}</p>
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
                     
                        <div
                          className="row mt-5 col"
                          style={{ paddingLeft: "0px" }}
                        >
                          <div className="col del-delivdetails">
                           <h5>Delivery Date</h5>
                           <p>{new Date(order?.deliveryDate).toLocaleDateString()}</p>
                          </div>
                          <div className="col">
                          <button
                              className="Accept_bg Accept_text ri-checkbox-line"
                              type="button"
                              onClick={() => completdel(order._id)}
                            >
                              Complted
                            </button>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                      );
                    })
                  ) : (
                    <div className="viewcounsellor-lottiereqq">No orders found</div>
                  )}
            
                  {
                    data.length>=1?(
                   
            <div className='del-view-moredtn'>
           <Link to="/del-pending" style={{textDecoration:"none"}}> <button type='submit'>View All<span className='ri-arrow-right-line'/></button></Link>
            </div>
   
  ):(<></>)
}
          </div>

        </div>
      </div>
    </div>
  );
}

export default DeliveryDashboard;
