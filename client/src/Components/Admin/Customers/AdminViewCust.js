import React, { useEffect, useState } from "react";
import "./AdminViewCust.css";
import Adminnav from "../../Navbar/Adminnav";
import img from "../../../Assets/user.jpg";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../Constants/Baseurl";

function AdminViewCust() {
  const adminid = localStorage.getItem("adminid");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
      fetchAllRescueMembers();
  }, []);

  useEffect(() => {
    if (adminid === null) {
      navigate("/");
    } 
  }, [adminid, navigate]);

  const fetchAllRescueMembers = () => {
    axiosInstance.post(`viewallcust`)
        .then((res) => {
            console.log(res);
            setData(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim() === '') {
      fetchAllRescueMembers();
    } else {
      axiosInstance.post(`searchUserByName/${value}`)
          .then((res) => {
              console.log(res);
              setData(res.data.data);
          })
          .catch((err) => {
              console.log(err);
              alert(err.response.data.message);
          });
    }
  };

  return (
    <div>
      <Adminnav />
      <div className="admin-view-custmain ">
        <div className="admin-view-custboxmain">
          <div className="d-flex justify-content-between align-items-center admin-view-header">
            <div className="admin-view-custheader">
              <Link to="/admindashboard" style={{ textDecoration: "none" }}>
                <h4 className="ri-arrow-left-line">View Customer</h4>
              </Link>
            </div>
            <div className="search-box">
              <input
                type="text"
                placeholder="Search here..."
                value={searchInput}
                onChange={handleSearch}
              />
              <i className="ri-search-line search-icon"></i>
            </div>
          </div>
          <div className="row">
            {data && data.length ? (
              data.map((a) => (
                <div className="col-4 sm-2 lg-4 " key={a._id}>
                  <div className="admin-view-insidebox">
                    <div className="admin-view-imageprofile">
                      <img src={img} alt="User" />
                    </div>
                    <div className="row admin-viewcust-cnt">
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
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: "red", fontSize: "20px" }}>
                No Requests Available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminViewCust;
