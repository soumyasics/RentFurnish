import React, { useEffect, useState } from "react";
import "./Shopeditprofile.css";
import Adminnav from "../Navbar/Adminnav";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Constants/Baseurl";
import { toast } from "react-toastify";
import Shopnav from "../Navbar/Shopnav";

function Shopeditprofile() {
  const navigate=useNavigate()
  const shopid=localStorage.getItem("shopid")
  console.log(shopid);

  if(shopid===null){
    navigate("/shoplogin")
  }
  const[shop,setShop]=useState({})
  const [updatedShop, setUpdatedShop] = useState({
    shopname: "",
    buildingname: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    regno: "",
    image:""
  });

  const handleInputChange = (e) => {
    if (e.target.type === 'file') {
        const file = e.target.files[0];
        setUpdatedShop({ ...updatedShop, [e.target.name]: file });
    } else {
        setUpdatedShop({ ...updatedShop, [e.target.name]: e.target.value });
    }
};
console.log(updatedShop);



  useEffect(()=>{
    axiosInstance.post(`/viewshopbyid/${shopid}`)
    .then((res)=>{
      console.log(res);
      setShop(res.data.data);
      setUpdatedShop(res.data.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(updatedShop);
    if (Object.keys(validationErrors).length === 0) {
    axiosInstance
      .post(`/updateprofileshop/${shopid}`, updatedShop, {
        headers: {
          "Content-Type": "multipart/form-data",
        },})
      .then((res) => {
        console.log(res);
        if(res.data.status==200){
          toast.success("Updated Successfully")
          navigate("/shopdashboard")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  else {
    setErrors(validationErrors);
  }
  
}
const validateForm = (formData) => {
  let errors = {};

  if (!formData.phone || formData.phone.length !== 10) {
    errors.phone = "Phone number must be 10 digits";
  }

  if (!formData.regno || formData.regno.length < 6) {
    errors.regno = "Registration number must be at least 6 characters";
  }

  if (!formData.pincode || formData.pincode.length !== 6) {
    errors.pincode = "Pincode  must be at least 6 characters";
  }

  if (!formData.shopname || formData.shopname.length < 2) {
    errors.shopname = "Shopname  must have at least 2 characters";
  }
  if (!formData.buildingname || formData.buildingname.length < 2) {
    errors.buildingname = "Buildingname  must have at least 2 characters";
  }
  if (!formData.email || formData.email.length < 2) {
    errors.email = "Email  must have at least 2 characters";
  }
  if (!formData.street || formData.street.length < 2) {
    errors.street = "street  must have at least 2 characters";
  }
  if (!formData.city || formData.city.length < 2) {
    errors.city = "city  must have at least 2 characters";
  }
  if (!formData.state || formData.state.length < 2) {
    errors.state = "state  must have at least 2 characters";
  }





  return errors;
};

  return (
    <>
    <Shopnav/>
      <div className="container">
        <div className="row">
          <div className="col-12 shopeditprofilemain">
          <Link to="/shopdashboard" style={{textDecoration:"none"}}>  <p className="ri-arrow-left-line">Edit Profile</p></Link>
          </div>
          <div className="col-sm-12 col-lg-12 col-md-12">
          <form onSubmit={handleSubmit}>

            <div className="row shopeditprofileinp">
            <div className="col-sm-6 pb-3 shopeditprofileimputs">
                <p>Owner Name</p>
                <input type="text" placeholder="Owner Name" className="inputsshopedit" name="shopname"
                    value={updatedShop.shopname}
                    onChange={handleInputChange}
                    />
                    {errors.shopname && <div className="error">{errors.shopname}</div>}

            </div>
            <div className="col-sm-6 pb-3 ">
                <p>Building Name</p>
                <input type="text" placeholder="Building Name" className="inputsshopedit"  name="buildingname"
                    value={updatedShop.buildingname}
                    onChange={handleInputChange}/>
                    {errors.buildingname && <div className="error">{errors.buildingname}</div>}
            </div>
            <div className="col-sm-6 pb-3 shopeditprofileimputs">
                <p>Email</p>
                <input type="email" placeholder="Email" className="inputsshopedit"  name="email"
                    value={updatedShop.email}
                    onChange={handleInputChange}/>
                    {errors.email && <div className="error">{errors.email}</div>}

            </div>
            <div className="col-sm-6 pb-3 ">
                <p>Phone</p>
                <input type="number" placeholder="Phone" className="inputsshopedit"  name="phone"
                    value={updatedShop.phone}
                    onChange={handleInputChange}/>
                    {errors.phone && <div className="error">{errors.phone}</div>}
            </div><div className="col-sm-6 pb-3 shopeditprofileimputs">
                <p>Street </p>
                <input type="text" placeholder="Street" className="inputsshopedit"  name="street"
                    value={updatedShop.street}
                    onChange={handleInputChange}/>
                                        {errors.street && <div className="error">{errors.street}</div>}

            </div>
            <div className="col-sm-6 pb-3 ">
                <p>City</p>
                <input type="text" placeholder="City" className="inputsshopedit"  name="city"
                    value={updatedShop.city}
                    onChange={handleInputChange}/>
                                        {errors.city && <div className="error">{errors.city}</div>}

            </div>
            <div className="col-sm-6 pb-3 ">
                <p>State</p>
                <input type="text" placeholder="State" className="inputsshopedit"  name="state"
                    value={updatedShop.state}
                    onChange={handleInputChange}/>
                                        {errors.state && <div className="error">{errors.state}</div>}

            </div>
            <div className="col-sm-6 pb-3 ">
                <p>Pincode</p>
                <input type="number" placeholder="Pincode" className="inputsshopedit"  name="pincode"
                    value={updatedShop.pincode}
                    onChange={handleInputChange}/>
                    {errors.pincode && <div className="error">{errors.pincode}</div>}

            </div>
            <div className="col-sm-6 pb-3 ">
                <p>Regno</p>
                <input type="number" placeholder="Reg no" className="inputsshopedit"  name="regno"
                    value={updatedShop.regno}
                    onChange={handleInputChange}/>
                    {errors.regno && <div className="error">{errors.regno}</div>}
            </div>
            <div className="col-sm-6 pb-3 ">
                <p>Edit Image</p>
                <input type="file"  className="inputsshopedit" name="image"
                onChange={handleInputChange}
                />
            </div>
            <div className="col-sm-12 pb-6 inputshopeditbtn text-center">
                <button type="submit">Confirm</button>
            </div>

            </div>
            </form>

          </div>
        </div>
      </div>
    </>
  );
}

export default Shopeditprofile;
