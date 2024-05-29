import React, { useEffect } from "react";
import Shopnav from "../Navbar/Shopnav";
import Shopdashboard from "./Shopdashboard";
import Showdropdown from "./Shopdropdown";
import "./Viewalldeliverybyshop.css";
import adminimg from "../../Assets/admin.jpg";
import tick from "../../Assets/tickgreen.png";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Constants/Baseurl";

function Viewalldeliverybyshop() {

    const shopid=localStorage.getItem("shopid")
    console.log(shopid);
    const navigate=useNavigate()

    useEffect(()=>{
        if(shopid==null){
            navigate("/shoplogin")
        }
        else{
          axiosInstance.post(`viewshopbyid/${shopid}`)
          .then((res)=>{
            console.log(res);
          })
          .catch((err)=>{
            console.log(err);
          })
        }
      },[])
    

  return (
    <div className="col-12">
      <Shopnav />
      <Showdropdown />
      <div className="container">
        <div className="row ">




          <div className="col-6 viewdelshopmainbox">
            <div className="col text-center">
              <div className="">
                <img
                  src={adminimg}
                  // src={admin1}
                  alt="Profile image"
                  width="150px"
                  height="150px"
                  style={{ borderRadius: "50%" }}
                />
                <h4>Shopname</h4>
              </div>
            </div>
            <div className="col text-center">
              <div className="userprofiletable">
                <table>
                  <tbody>
                    <tr>
                      <td id="td1">Name</td>
                      <td id="td2">
                        <span style={{ color: "blue" }}>:</span>shopnamecvk fd
                        hjfv ef
                      </td>
                    </tr>
                    <tr>
                      <td id="td1">Email</td>
                      <td id="td2">
                        <span style={{ color: "blue" }}>:</span>jdnede
                      </td>
                    </tr>
                    <tr>
                      <td id="td1">Phone number</td>
                      <td id="td2">
                        <span style={{ color: "blue" }}>:</span>abs@gmai.omx
                      </td>
                    </tr>
                    <tr>
                      <td id="td1">Address</td>
                      <td id="td2">
                        <span style={{ color: "blue" }}>:</span>
                        489ru49r4hebfebfbbvhsdbvhd
                      </td>
                    </tr>
                    <tr>
                      <td id="td1">Liscence number:</td>
                      <td id="td2">
                        <span style={{ color: "blue" }}>:</span>
                        ejhdbedcddvfvfbvf vkjdfv
                      </td>
                    </tr>
                    <tr>
                      <td id="td1">Vehicle type</td>
                      <td id="td2">
                        <span style={{ color: "blue" }}>:</span>dhcbhfvhf
                      </td>
                    </tr>
                    <tr>
                      <td id="td1">Vehicle number</td>
                      <td id="td2">
                        <span style={{ color: "blue" }}>:</span>dhcbhfvhf
                      </td>
                    </tr>
                    <tr>
                      <td id="td1">Area name/Landmark</td>
                      <td id="td2">
                        <span style={{ color: "blue" }}>:</span>dhcbhfvhf
                      </td>
                    </tr>
                    <tr>
                      <td id="td1">District</td>
                      <td id="td2">
                        <span style={{ color: "blue" }}>:</span>dhcbhfvhf
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-12 d-flex">
              <div className="col-6 viewdelshopbtnone">
                <button type="submit" className="viewdelshopbtnoneedit">
                  Edit
                </button>
              </div>
              <div className="col-6">
                <button className=" active-btnrf">
                  Active{" "}
                  <i className="">
                    <img src={tick} />
                  </i>
                </button>{" "}
              </div>
            </div>
          </div>





        </div>
      </div>
    </div>
  );
}

export default Viewalldeliverybyshop;
