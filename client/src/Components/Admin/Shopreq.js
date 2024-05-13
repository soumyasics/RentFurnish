import React, { useEffect, useState } from "react";
import "./Shopreq.css";
import admin from "../../Assets/admin.jpg";
import { Link } from "react-router-dom";
import axiosInstance from "../Constants/Baseurl";
import url from "../Constants/Baseurl";
import { toast } from "react-toastify";
import Adminnav from "../Navbar/Adminnav";

function Admindashbboard() {
  const [request, setRequest] = useState([]);
  const url = axiosInstance.defaults.url;
  // console.log(url);

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
    <Adminnav/>
    <div className="container mainclass">
      <div className="profileviewmain">
        <h3 className=" mb-4">
          <Link to="/admindashboard" style={{ textDecoration: "none" }}>
            <span className="ri-arrow-left-line"></span>
          </Link>
          View Request
        </h3>

        {request && request.length ? (
          request.map((a) => {
            return (
              <div className="profile-view-box">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 mb-4 d-flex profilevieuser">
                    <div className="col-4 col-sm-3 col-md-2 profilevieuser1">
                      <img
                        src={`${url}/${a?.image?.filename}`}
                        alt="admin"
                        className=""
                        width="200px"
                        height="150px"
                      />
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
                            <td className="text-black">
                              {a?.street},{a?.city},{a?.state}
                              <br />
                              {a?.pincode}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-12 col-md-4 mt-3 profilemainbuttons d-flex justify-content-around ">
                      <button
                        type="submit"
                        className="ri-check-line button11"
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

        {/* <div className="profile-view-box">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 mb-4 d-flex profilevieuser">
            <div className="col-4 col-sm-3 col-md-2 profilevieuser1">
              <img src={admin} alt="admin" className="img-fluid" />
            </div>
            <div className="col-8 col-sm-9 col-md-10 profilevieusernames">
              <table>
                <tbody>
                  <tr>
                    <td>Shop name:</td>
                    <td className="text-black">Abc Shop</td>
                  </tr>
                  <tr>
                    <td>Building name:</td>
                    <td className="text-black">Abc Shop</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td className="text-black">Abc@gmail.com</td>
                  </tr>
                  <tr>
                    <td>Phone number:</td>
                    <td className="text-black">Abc Shop</td>
                  </tr>
                  <tr>
                    <td>Address:</td>
                    <td className="text-black">Abc Shop</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-12 col-md-4 mt-3 profilemainbuttons d-flex justify-content-around ">
              <button type="submit" className="ri-check-line button11 ">
                Accept
              </button>
              <button type="submit" className="ri-close-line button12">
                Reject
              </button>
            </div>
          </div>
        </div>
        </div> */}
      </div>
    </div>
    </>
  );
}

export default Admindashbboard;
