import React, { useState } from "react";
import "../User/Usersignup.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Constants/Baseurl";

function Usersignup() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    gender: "",
    password: "",
    confirmpassword: "",
    email: "",
    address: "",
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

  const validatePassword = (password) => {
    let errors = { ...formErrors };

    if (password.length < 8) {
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validate = () => {
    let errors = {};

    if (!formValues.name) {
      errors.name = "Name is required";
    }
    if (!formValues.phone || formValues.phone.length !== 10) {
      errors.phone = "Phone number must be 10 digits";
    }
    if (!formValues.gender) {
      errors.gender = "Gender is required";
    }
    if (!formValues.email || !validateEmail(formValues.email)) {
      errors.email = "Valid email is required";
    }
    if (!formValues.password) {
      errors.password = "Password is required";
    } else {
      validatePassword(formValues.password);
    }
    if (formValues.password !== formValues.confirmpassword) {
      errors.confirmpassword = "Passwords do not match";
    }
    if (!formValues.address) {
      errors.address = "Address is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await axiosInstance.post("/userregister", formValues);
      alert("Registration successful!");
      navigate("/userlogin");
    } catch (error) {
      alert("Error registering user: " + (error.response?.data?.msg || error.msg));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="usersignin-mainsignup">
      <div className="container">
        <div className="usersignin-mainsignupsignup">Sign up</div>
        <form onSubmit={handleSubmit}>
          <div className="col-12 col-lg-12 usersignin-formmain ">
            <div className="row">
              <div className="col-6 pb-3 usersignin-mainsignupinputs">
                <p>Name</p>
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  required
                />
                {formErrors.name && <p className="error">{formErrors.name}</p>}
              </div>
              <div className="col-6 pb-3 usersignin-mainsignupinputs2nd">
                <p>Phone Number</p>
                <input
                  type="number"
                  name="phone"
                  value={formValues.phone}
                  onChange={handleChange}
                  required
                />
                {formErrors.phone && <p className="error">{formErrors.phone}</p>}
              </div>
              <div className="col-6 pb-3 usersignin-mainsignupinputsradio">
                <label htmlFor="gender" className="pb-3">
                  Gender:{" "}
                </label>
                <label htmlFor="male"> &nbsp;Male &nbsp;</label>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                  required
                />
                <label htmlFor="female">&nbsp;Female&nbsp;</label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                  required
                />
                {formErrors.gender && <p className="error">{formErrors.gender}</p>}
              </div>
              <div className="col-6 pb-3 usersignin-mainsignupinputs2nd">
                <p>Password</p>
                <input
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  required
                />
                {formErrors.password && <p className="error">{formErrors.password}</p>}
              </div>
              <div className="col-6 pb-3 usersignin-mainsignupinputs">
                <p>Email</p>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  required
                />
                {formErrors.email && <p className="error">{formErrors.email}</p>}
              </div>
              <div className="col-6 pb-3 usersignin-mainsignupinputs2nd">
                <p>Confirm Password</p>
                <input
                  type="password"
                  name="confirmpassword"
                  value={formValues.confirmpassword}
                  onChange={handleChange}
                  required
                />
                {formErrors.confirmpassword && <p className="error">{formErrors.confirmpassword}</p>}
              </div>
              <div className="col-6 pb-3 usersignin-mainsignupinputs">
                <p>Address</p>
                <textarea
                  name="address"
                  value={formValues.address}
                  onChange={handleChange}
                  required
                />
                {formErrors.address && <p className="error">{formErrors.address}</p>}
              </div>
              <div className="col-6 pb-3 usersignin-mainsignupinputspara">
                <p> </p>
                <input type="checkbox" required /> &nbsp; Agree to terms and conditions.
              </div>
              <div className="col-12 usersignin-buttons">
                <button type="submit" disabled={isSubmitting}>Sign Up</button>
              </div>
              <div className="usersignin-accounts">
                <p>Already have an account ? <Link to="/userlogin"><span>Login</span></Link></p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Usersignup;
