import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import icon from "../../../../Assets/payment.jpg";
import axiosInstance from "../../../Constants/Baseurl";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import Changeaddress from "../ChangeAddress/Changeaddress";

function UserPayment() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [user, setUser] = useState({});
  const userid = localStorage.getItem("userid");
  const [price,setPrice]=useState({})
  const [form, setForm] = useState({
    servicedate: "",
    name: "",
    number: "",
    cdnumber: "",
    month: "",
    year: "",
  });

  const [formData, setFormData] = useState({
    number: "",
    cdnumber: "",
    numberError: "",
    cdnumberError: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .post(`viewcustbyid/${userid}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log("Error fetching user data: ", err);
      });
  }, [userid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      numberError: "",
      cdnumberError: "",
    });
  };

  const changefn = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitfn = (a) => {
    a.preventDefault();
    if (formData.number.length !== 16) {
      setFormData({ ...formData, numberError: "Card number must be 16 digits." });
      return;
    }
    if (formData.cdnumber.length < 3) {
      setFormData({ ...formData, cdnumberError: "CVV must be at least 3 digits." });
      return;
    }

    axiosInstance
      .post(`updateOrderPayment/${id}`, form)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast.success("Payment successfully processed");
          navigate("/user-home")
        } else {
          alert("Error in booking");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleProfileImageClick = () => {
    setShowProfileModal(true);
  };

  const handleProfileModalClose = () => {
    setShowProfileModal(false);
  };


  useEffect(()=>{
    axiosInstance.post(`viewOrderById/${id}`)
    .then((result)=>{
        console.log(result);
        setPrice(result.data.data)
    })
    .catch((err)=>{
        console.log(err);
    })
  },[])

 const navbckfn=(()=>{
  navigate(-1)
  })

  return (
    <div>
      <div className="container-xxl py-5">
        <div className="container ">
        <Link onClick={navbckfn} style={{textDecoration:"none"}}>  <div className="ri-arrow-left-line payment-backbtn"/></Link>
          <div className="row g-5 ">
            <div className="col-lg-6" style={{ marginTop: "7rem" }}>
              <form
                className="mt-4"
                onSubmit={submitfn}
                required
                title="Please fill the form"
              >
                {/* <div className="row">
                  <div className="col-md-4">Choose a Date</div>
                  <div className="col-md-8">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Your Name"
                      min={new Date().toISOString().split("T")[0]}
                      style={{ marginBottom: "20px" }}
                      name="servicedate"
                      value={form.servicedate}
                      onChange={changefn}
                      required
                      title="please fill"
                    />
                  </div>
                </div> */}

                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="cardHolderName"
                        placeholder="Your Name"
                        name="name"
                        value={form.name}
                        onChange={changefn}
                        required
                      />
                      <label htmlFor="name">Card Holder Name</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="cardNo"
                        placeholder="Card Number"
                        name="number"
                        value={form.number}
                        onChange={(e) => {
                          handleInputChange(e);
                          changefn(e);
                        }}
                        required
                      />
                      <p style={{ color: "red" }}>{formData.numberError}</p>
                      <label htmlFor="cardNo">Card Number</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="cvv"
                        placeholder="CVV"
                        required
                        name="cdnumber"
                        value={form.cdnumber}
                        onChange={(e) => {
                          handleInputChange(e);
                          changefn(e);
                        }}
                      />
                      <p style={{ color: "red" }}>{formData.cdnumberError}</p>
                      <label htmlFor="cvv">CVV</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-4">
                            <label htmlFor="expiry">Expiry</label>
                          </div>
                          <div className="col-4">
                            <label htmlFor="month">Month</label>
                            <select
                              className="form-control"
                              name="month"
                              id="month"
                              value={form.month}
                              onChange={changefn}
                              required
                            >
                              <option value="">Month</option>
                              {[
                                "January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"
                              ].map((month, index) => (
                                <option key={index} value={month}>{month}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-4">
                            <label htmlFor="year">Year</label>
                            <select
                              className="form-control"
                              name="year"
                              id="year"
                              value={form.year}
                              onChange={changefn}
                              required
                            >
                              <option value="">Year</option>
                              {Array.from({ length: 22 }, (_, i) => 2024 + i).map((year) => (
                                <option key={year} value={year}>{year}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <button className="btn btn-success" type="submit">
                      Book Now
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="col-lg-6" style={{ marginTop: "5rem" }}>
              <div className="d-flex justify-content-center">
                <div className="payment_page_icon">
                  <img
                    src={icon}
                    alt="secure_payment_icon"
                    width="350px"
                    height="350px"
                  />
                </div>
              </div>

              <h1 className="mb-4">
                Total Amount -{" "}
                <span style={{ color: "#00b074" }}>₹{price?.amount}</span>
              </h1>
            </div>
          </div>

          <div className="col-12">
            <div className="col-6">
              <p className="text">Delivery Information</p>
              <div className="row">
                <div className="col-sm-6 col-lg-6">
                  <div className="row">
                    <div className="col-6 details_text">
                      <p>Name :</p>
                    </div>
                    <div className="col-6">
                      <p>{user?.name}</p>
                    </div>
                    <div className="col-6 details_text">
                      <p>Email :</p>
                    </div>
                    <div className="col-sm-6 col-lg-6">
                      <p>{user?.email}</p>
                    </div>
                    <div className="col-6 details_text">
                      <p>Phone Number:</p>
                    </div>
                    <div className="col-sm-6">
                      <p>{user?.phone}</p>
                    </div>
                    <div className="col-6 details_text">
                      <p>Address:</p>
                    </div>
                    <div className="col-6 overflow-auto">
                      <p>{user?.address}</p>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="change change_text"
                        onClick={handleProfileImageClick}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal show={showProfileModal} onHide={handleProfileModalClose}>
          <Modal.Body>
            <Changeaddress onClose={handleProfileModalClose} orderId={id}/>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default UserPayment;
