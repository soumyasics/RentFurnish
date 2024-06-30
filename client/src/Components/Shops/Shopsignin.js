import React, { useState } from "react";
import "../Shops/Shopsignin.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Constants/Baseurl";

function Shopsignin() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    shopname: "",
    regno: "",
    image: null,
    buildingname: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    if (name === "password") {
      validatePassword(value);
    }
  };

  const handleImageChange = (e) => {
    setFormValues({ ...formValues, image: e.target.files[0] });
  };

  const validatePassword = (password) => {
    let errors = { ...formErrors };

    if (password.length <= 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/\d/.test(password)) {
      errors.password = "Password must contain at least one number";
    } else {
      delete errors.password;
    }

    setFormErrors(errors);
  };

  const validate = () => {
    let errors = {};

    if (!formValues.shopname) {
      errors.shopname = "Shop name is required";
    }
    if (!formValues.regno || formValues.regno.length < 6 || formValues.regno < 0) {
      errors.regno = "Reg no must be at least 6 positive number";
    }
    if (!formValues.buildingname) {
      errors.buildingname = "Building name is required";
    }
    if (!formValues.street) {
      errors.street = "Street is required";
    }
    if (!formValues.city) {
      errors.city = "City is required";
    }
    if (!formValues.state) {
      errors.state = "State is required";
    }
    if (!formValues.pincode || formValues.pincode.length !== 6 || formValues.pincode < 0) {
      errors.pincode = "Pincode must be 6 positive number";
    }
    if (!formValues.phone || formValues.phone.length !== 10 || formValues.phone < 0) {
      errors.phone = "Contact must be 10 positive number";
    }
    if (!formValues.email) {
      errors.email = "Email is required";
    }
    if (!formValues.password || formValues.password.length !== 8) {
      errors.password = "Password must be 8 character";
    } else {
      validatePassword(formValues.password);
    }
    if (formValues.password !== formValues.confirmpassword) {
      errors.confirmpassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validatePassword(formValues.password);
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("shopname", formValues.shopname);
    formData.append("regno", formValues.regno);
    formData.append("image", formValues.image);
    formData.append("buildingname", formValues.buildingname);
    formData.append("street", formValues.street);
    formData.append("city", formValues.city);
    formData.append("state", formValues.state);
    formData.append("pincode", formValues.pincode);
    formData.append("phone", formValues.phone);
    formData.append("email", formValues.email);
    formData.append("password", formValues.password);

    try {
      await axiosInstance.post("/registershop", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Registration successful!");
      navigate("/shoplogin");
    } catch (error) {
      alert("Error registering shop: " + error.response?.data?.msg || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="usersignin-main">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 usersignin-main-box1 border">
              <h4>General Information</h4>
              <div className="row usersignin-input">
                <div className="col-12 pb-3">
                  <input
                    type="text"
                    placeholder="Shopname"
                    style={{ width: "400px" }}
                    name="shopname"
                    value={formValues.shopname}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.shopname && (
                    <p className="error">{formErrors.shopname}</p>
                  )}
                </div>
                <div className="col-12 pb-3">
                  <input
                    type="text"
                    placeholder="Reg no"
                    name="regno"
                    value={formValues.regno}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.regno && (
                    <p className="error">{formErrors.regno}</p>
                  )}
                </div>
                <div className="col-6 pb-3">
                  <label htmlFor="image">Upload Image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    required
                  />
                </div>
                <div className="col-12 pb-3">
                  <Link
                    to="/shoplogin"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <p>Already Registered? Login</p>
                  </Link>
                </div>
                <div>
                  <input type="checkbox" required /><span style={{color:"#0084E4"}}>Agree to terms and conditions</span>
                </div>
                <button
                  type="submit"
                  className="usersignup-regbtn"
                  style={{ marginLeft: "140px" }}
                  disabled={isSubmitting}
                >
                  Register Now!
                </button>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 usersignin-main-box2">
              <h4>Contact Details</h4>
              <div className="row usersignin-inputs">
                <div className="col-12 pb-3">
                  <input
                    type="text"
                    placeholder="Buildingname"
                    style={{ width: "400px" }}
                    name="buildingname"
                    value={formValues.buildingname}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.buildingname && (
                    <p className="error">{formErrors.buildingname}</p>
                  )}
                </div>
                <div className="col-12 pb-3">
                  <input
                    type="text"
                    placeholder="Street"
                    style={{ width: "400px" }}
                    name="street"
                    value={formValues.street}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.street && (
                    <p className="error">{formErrors.street}</p>
                  )}
                </div>
                <div className="col-6 pb-3">
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={formValues.city}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.city && (
                    <p className="error">{formErrors.city}</p>
                  )}
                </div>
                <div className="col-6 pb-3">
                  <input
                    type="text"
                    placeholder="State"
                    name="state"
                    value={formValues.state}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.state && (
                    <p className="error">{formErrors.state}</p>
                  )}
                </div>
                <div className="col-6 pb-3">
                  <input
                    type="number"
                    placeholder="Pincode"
                    name="pincode"
                    value={formValues.pincode}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.pincode && (
                    <p className="error">{formErrors.pincode}</p>
                  )}
                </div>
                <div className="col-6 pb-3">
                  <input
                    type="number"
                    placeholder="Phone Number"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.phone && (
                    <p className="error">{formErrors.phone}</p>
                  )}
                </div>
                <div className="col-6 pb-3">
                  <input
                    type="email"
                    placeholder="Your Email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.email && (
                    <p className="error">{formErrors.email}</p>
                  )}
                </div>
                <div className="col-6">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.password && (
                    <p className="error">{formErrors.password}</p>
                  )}
                </div>
                <div className="col-6">
                  <input
                    type="password"
                    placeholder="Confirm password"
                    name="confirmpassword"
                    value={formValues.confirmpassword}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.confirmpassword && (
                    <p className="error">{formErrors.confirmpassword}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Shopsignin;
