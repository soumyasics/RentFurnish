import React, { useEffect, useState } from "react";
import "./Adminviewshops.css";
import admin from "../../Assets/admin.jpg";
import axiosInstance from "../Constants/Baseurl";
import { Link } from "react-router-dom";
import Adminnav from "../Navbar/Adminnav";
import { toast } from "react-toastify";

function Adminviewshops() {
  const [shops, setShops] = useState([]);
  const url = axiosInstance.defaults.url;

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

  const deactivatefn = (id) => {
    axiosInstance
      .post(`deActivateShopById/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast.success("Deactivated");
          setShops((prevShops) =>
            prevShops.map((shop) =>
              shop._id === id ? { ...shop, isactive: false } : shop
            )
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const activatefn = (id) => {
    axiosInstance
      .post(`activateShopById/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast.success("Activated");
          setShops((prevShops) =>
            prevShops.map((shop) =>
              shop._id === id ? { ...shop, isactive: true } : shop
            )
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Adminnav />
      <div className="container viewshopsmain">
        <div className="row viewshopsmainhead">
          <Link to="/admindashboard" style={{ textDecoration: "none" }}>
            <p className="ri-arrow-left-line">All Shop Owners</p>
          </Link>
        </div>
        <div className="col-sm-12 col-lg-12 col-md-12 container">
          <div className="row">
            {shops && shops.length ? (
              shops.map((a) => {
                return (
                  <div className="col-sm-6 pb-3 viewshopsboxone" key={a._id}>
                    <div className="viewshopsimg">
                      <img
                        src={`${url}/${a?.image?.filename}`}
                        alt="shop"
                        width="250px"
                        height="250px"
                      />
                    </div>
                    <div className="col-12 text-center">
                      <div className="userprofiletable">
                        <table>
                          <tbody>
                            <tr>
                              <td id="td1">Shop Name</td>
                              <td id="td2">{a?.shopname}</td>
                            </tr>
                            <tr>
                              <td id="td1">Building Name</td>
                              <td id="td2">{a?.buildingname}</td>
                            </tr>
                            <tr>
                              <td id="td1">Email</td>
                              <td id="td2">{a?.email}</td>
                            </tr>
                            <tr>
                              <td id="td1">Phone</td>
                              <td id="td2">{a?.phone}</td>
                            </tr>
                            <tr>
                              <td id="td1">Address:</td>
                              <td id="td2">
                                {a?.street},<br />
                                {a?.city},<br />
                                {a?.state},<br />
                                {a?.pincode}
                              </td>
                            </tr>
                            <tr>
                              <td id="td1">Shop License</td>
                              <td id="td2">{a?.regno}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="admin-viewallshop-active">
                      {a?.isactive === true ? (
                        <button
                          type="button"
                          className="admin-viewallshop-btndeact"
                          onClick={() => deactivatefn(a?._id)}
                        >
                          Deactivate
                          <span className="ri-close-circle-line" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="admin-viewallshop-activate"
                          onClick={() => activatefn(a?._id)}
                        >
                          Activate
                          <span className="ri-check-double-line" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ color: "red", fontSize: "20px" }}>
                No Shops Available
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Adminviewshops;
