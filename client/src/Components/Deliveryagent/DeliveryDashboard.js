import React, { useEffect } from 'react';
import Shopnav from '../Navbar/Shopnav';
import customer from "../../Assets/deliveryicon.png";
import delivery from "../../Assets/orders.png";
import { useNavigate } from 'react-router-dom';

function DeliveryDashboard() {

  const deliveryid=localStorage.getItem("deliveryid")
  console.log(deliveryid);
  const navigate=useNavigate()

  useEffect(()=>{
    if(deliveryid===null){
      navigate("/agentlogin")
    }
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
              <h5>10</h5>
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
              <h5>12</h5>
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
              <h5>10</h5>
              <p>Pending Deliveries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryDashboard;
