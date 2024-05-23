import React from "react";
import "../Shops/Shopsignin.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axiosInstance from "../Constants/Baseurl";
import { shopRegSchema } from "../Constants/Schema";

function Shopsignin() {

  const navigate=useNavigate()

  const onSubmit = (e) => {
    // e.preventDefault()
    const passwordRule =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    // if (values.contact.toString().length !== 10) {
    //   alert("Contact number must be a 10-digit number");
    //   return;
    // }
    // if (values.pincode.toString().length !== 6) {
    //   alert("Pincode must be a 6-digit number");
    //   return;
    // }

    // if (!passwordRule.test(values.password)) {
    //   alert("Password must meet the specified criteria");
    //   return;
    // }

    axiosInstance
      .post(`/registershop`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          alert("Registration Successful");
          navigate("/shoplogin")
          // localStorage.setItem("userid",res.data.data._id)
          // console.log(res.data.data._id);
        } else {
          alert(res.response.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.msg);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const { values, errors, touched, handleBlur, setFieldValue, handleChange } =
    useFormik({
      initialValues: {
        shopname: "",
        email: "",
        password: "",
        confirmpassword: '',
        buildingname: "",
        city: "",
        street: "",
        state: "",
        pincode: "",
        phone: "",
        regno: "",
        district: "",
        image: "",
      },
      validationSchema: shopRegSchema,
      onSubmit: onSubmit,
    });
  console.log(values);
  const handleImageChange = (event) => {
    setFieldValue("image", event.currentTarget.files[0]);
  };

  return (
    <div className="usersignin-main">
      <div className="container">
        <form onSubmit={handleSubmit} >
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
                    value={values.shopname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.shopname && touched.shopname && (
                    <p className="error">{errors.shopname}</p>
                  )}
                </div>
                {/* <div className="col-6 pb-3">
              <input type="text" placeholder="Lastname" />
            </div> */}
                <div className="col-12 pb-3">
                  <input
                    type="text"
                    placeholder="Reg no"
                    name="regno"
                    value={values.regno}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.regno && touched.regno && (
                    <p className="error">{errors.regno}</p>
                  )}
                </div>
                <div className="col-6 pb-3">
                  <label for="image">Upload Image</label>
                  <input
                    type="file"
                    placeholder=""
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    onBlur={handleBlur}
                    required
                  />
                </div>
                <div className="col-12 pb-3">
                  <Link
                    to="/shoplogin"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <p>Already Registered ? Login</p>
                  </Link>
                </div>
                <button
                  type="submit"
                  className="usersignup-regbtn"
                  style={{ marginLeft: "140px" }}
                >
                  Register Now !
                </button>
              </div>
              <div>
                <input type="checkbox" required /><span style={{color:"#0084E4"}}>Agree to terms and conditions</span>
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
                    value={values.buildingname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.buildingname && touched.buildingname && (
                    <p className="error">{errors.buildingname}</p>
                  )}
                </div>
                <div className="col-12 pb-3">
                  <input
                    type="text"
                    placeholder="Street"
                    style={{ width: "400px" }}
                    name="street"
                    value={values.street}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.street && touched.street && (
                    <p className="error">{errors.street}</p>
                  )}
                </div>
                <div className="col-6 pb-3">
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.city && touched.city && (
                    <p className="error">{errors.city}</p>
                  )}
                </div>
                <div className="col-6 pb-3">
                  <input
                    type="text"
                    placeholder="State"
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.state && touched.state && (
                    <p className="error">{errors.state}</p>
                  )}
                </div>
                <div className="col-6 pb-3">
                  <input
                    type="number"
                    placeholder="Pincode"
                    name="pincode"
                    value={values.pincode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.pincode && touched.pincode && (
                    <p className="error">{errors.pincode}</p>
                  )}
                </div>

                {/* <div className='col-12 pb-3 '>
              <select  style={{width:"190px"}}>
                <option>Nationality</option>
                <option>Indian</option>
                <option>America</option>
                <option>London</option>
                <option>Japan</option>
                <option>Uk</option>
                <option>Australia</option>
                <option>England</option>
              </select>
            </div> */}
                <div className="col-6 pb-3">
                  <input
                    type="number"
                    placeholder="Phone Number"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.phone && touched.phone && (
                    <p className="error">{errors.phone}</p>
                  )}
                </div>
                <div className="col-6 pb-3">
                  <input
                    type="email"
                    placeholder="Your Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.email && touched.email && (
                    <p className="error">{errors.email}</p>
                  )}
                </div>
                <div className="col-6">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.password && touched.password && (
                    <p className="error">{errors.password}</p>
                  )}
                </div>
                <div className="col-6">
                  <input type="password" placeholder="Confirm password" 
                  name="confirmpassword"
                  value={values.confirmpassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                   />
                     {errors.confirmpassword && touched.confirmpassword && (
                      <p className="error">{errors.confirmpassword}</p>
                    )}
                </div>
              </div>
              {/* <button type="submit" className="usersignup-regbtn">Register Now !</button> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Shopsignin;
