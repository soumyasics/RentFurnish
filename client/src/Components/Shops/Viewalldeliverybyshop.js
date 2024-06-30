import React, { useEffect, useState } from "react";
import Shopnav from "../Navbar/Shopnav";
import Shopdashboard from "./Shopdashboard";
import Showdropdown from "./Shopdropdown";
import "./Viewalldeliverybyshop.css";
import adminimg from "../../Assets/3699591.jpg";
import tick from "../../Assets/tickgreen.png";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Constants/Baseurl";
import datalottie from "../../Assets/nodatalottie.json"
import Lottie from "lottie-react"


function Viewalldeliverybyshop() {

    const shopid=localStorage.getItem("shopid")
    console.log(shopid);
    const navigate=useNavigate()
    const [delivery,setDelivery]=useState([])
    const url = axiosInstance.defaults.url;


    useEffect(()=>{
        if(shopid==null){
            navigate("/shoplogin")
        }
        else{
          axiosInstance.post(`viewDeliveryAgentbyShopid/${shopid}`)
          .then((res)=>{
            console.log(res);
            setDelivery(res.data.data)
          })
          .catch((err)=>{
            console.log(err);
          })
        }
      },[])


      const toggleActivation = (id, isActive) => {
        const endpoint = isActive ? `deleteDeliveryAgentById/${id}` : `activateDeliveryAgentById/${id}`;
        axiosInstance.post(endpoint)
          .then((res) => {
            console.log(res);
            setDelivery((prevDelivery) =>
              prevDelivery.map((agent) =>
                agent._id === id ? { ...agent, isActive: !agent.isActive } : agent
              )
            );
          })
          .catch((err) => {
            console.log(err);
          });
      };

      
      const [isActive, setIsActive] = useState(true);

      const toggleButton = () => {
      };



      
  return (
    <div className="col-12">
      <Shopnav />
      <Showdropdown />
      <div className="container">
        <div className="row ">

        {delivery && delivery.length ? (
          delivery.map((a) => {
            return (

          <div className="col-6 viewdelshopmainbox">
            <div className="col text-center">
              <div className="">
                <img
                  src={`${url}/${a?.image?.filename}`}
                  // src={adminimg}
                  alt="Profile image"
                  width="150px"
                  height="150px"
                  style={{ borderRadius: "50%" }}
                />
              </div>
            </div>
            <div className="col text-center">
              <div className="userprofiletable">
                <table>
                  <tbody>
                    <tr>
                      <td id="td1">Name</td>
                      <td id="td2">
                        <span style={{ color: "blue" }}>:</span>{a?.name}
                      </td>
                    </tr>
                    <tr>
                      <td id="td1">Email</td>
                      <td id="td2">
                        <span style={{ color: "blue" }}>:</span>{a?.email}
                      </td>
                    </tr>
                    <tr>
                      <td id="td1">Phone number</td>
                      <td id="td2">
                        <span style={{ color: "blue" }}>:</span>{a?.phone}
                      </td>
                    </tr>
                    <tr>
                      <td id="td1">Address</td>
                      <td id="td2">
                        <span style={{ color: "blue" }}>:</span>
                        {a?.address}
                      </td>
                    </tr>
                    <tr>
                      <td id="td1">Liscence number:</td>
                      <td id="td2">
                        <span style={{ color: "blue" }}>:</span>
                        {a?.licenceNumber}</td>
                    </tr>
                    <tr>
                      <td id="td1">Vehicle type</td>
                      <td id="td2">
                        <span style={{ color: "blue" }}>:</span>{a?.vehicleType}
                      </td>
                    </tr>
                    <tr>
                      <td id="td1">Vehicle number</td>
                      <td id="td2">
                        <span style={{ color: "blue" }}>:</span>{a?.vehicleNumber}
                      </td>
                    </tr>
                    <tr>
                      <td id="td1">Area name/Landmark</td>
                      <td id="td2">
                        <span style={{ color: "blue" }}>:</span>{a?.deliveryArea}
                      </td>
                    </tr>
                    <tr>
                      <td id="td1">District</td>
                      <td id="td2">
                        <span style={{ color: "blue" }}>:</span>{a?.deliveryDistrict}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-12 d-flex">
              <div className="col-6 viewdelshopbtnone">
              <Link to={`/edit-deliveryagentbyshop/${a?._id}`} style={{textDecoration:"none"}}>  <button type="submit" className="viewdelshopbtnoneedit" >
                  Edit
                </button></Link>
              </div>
              <div className="col-6">
                {/* <button className=" active-btnrf">
                  Active{" "}
                  <i className="">
                    <img src={tick} />
                  </i>
                </button>{" "}
                <div class="form-check form-switch ">
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
  <label class="form-check-label" for="flexSwitchCheckChecked">Checked switch checkbox input</label>
</div> */}
 <button
                        style={{ width: "160px", height: "50px" }}
                        className={`toggle-button ${a.isActive ? 'active' : 'inactive'}`}
                        onClick={() => toggleActivation(a._id, a.isActive)}
                      >
                        <span className="icon">
                          {a.isActive ? (
                            <span className="check"><img src={tick} alt="tick" /></span>
                          ) : (
                            <span className="cross">&#10005;</span>
                          )}
                        </span>
                        <span className="label">{a.isActive ? 'Active' : 'Inactive'}</span>
                      </button>                         </div>
            </div>
          </div>


);
})
) : (
<div className="viewalldelbyshop-lottie">
  <Lottie animationData={datalottie} />
  </div>
)}



        </div>
      </div>
    </div>
  );
}

export default Viewalldeliverybyshop;
