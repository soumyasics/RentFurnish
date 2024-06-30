import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Adddeliveryagent.css';
import Shopnav from '../Navbar/Shopnav';
import Showdropdown from '../Shops/Shopdropdown';
import { toast } from 'react-toastify';
import profile from '../../Assets/delivery-profile-placeholder.png'
import axiosMultipartInstance from '../Constants/FormDataUrl';
import { Navigate, useNavigate } from 'react-router-dom';

const Adddeliveryagent = () => {
    const navigate=useNavigate()
    const shopid=localStorage.getItem("shopid")
    console.log(shopid);
  
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        licenceNumber: '',
        vehicleType: '',
        vehicleNumber: '',
        deliveryArea: '',
        deliveryDistrict: '',
        image:'',
        shopId:shopid
    });

    const [profileImage,setProfileImage]=useState(null)

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setProfileImage(URL.createObjectURL(file));
        setFormData((prevData) => ({
            ...prevData,
            image: file,
        }));
    };
    

    const districts = [
        'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod',
        'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad',
        'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'
    ];

    const handlePhoneNumberChange = (value) => {
        let newValue = value.replace(/\D/g, '');
        if (newValue.length > 10) {
            newValue = newValue.slice(0, 10);
        }
        return newValue;
    };
console.log(formData);
const handleChange = (e) => {
    const { name, value, files } = e.target;
    let newValue;

    if (files) {
        const file = files[0];
        setFormData((prevData) => ({
            ...prevData,
            [name]: file,
        }));
    } else {
        if (name === "phone") {
            newValue = handlePhoneNumberChange(value);
        } else if (name === "name" || name === "vehicleType") {
            newValue = value.replace(/[^a-zA-Z\s]/g, '');
        } else {
            newValue = value;
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: newValue.trim() === "" ? `${name.charAt(0).toUpperCase() + name.slice(1)} required` : null
        }));
    }
};



    
    const validateForm = () => {
        let formErrors = {};
    
        if (!formData.name) 
            formErrors.name = 'Name required';
        if (!formData.email) 
            formErrors.email = 'Email required';
        if (!formData.password) 
            formErrors.password = 'Password required';
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password))
            formErrors.password = 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character';
        if (!formData.phone) 
            formErrors.phone = 'Phone number required';
        else if (!/^\d{10}$/.test(formData.phone)) 
            formErrors.phone = 'Phone number must be exactly 10 digits';
        if (!formData.address) 
            formErrors.address = 'Address required';
        if (!formData.licenceNumber) 
            formErrors.licenceNumber = 'License number required';
        else if (!/^[A-Za-z0-9]{15}$/.test(formData.licenceNumber))
            formErrors.licenceNumber = 'License number must be exactly 15 characters, including both letters and numbers';
        if (!formData.vehicleType) 
            formErrors.vehicleType = 'Vehicle type required';
        if (!formData.vehicleNumber) 
            formErrors.vehicleNumber = 'Vehicle number required';
        else if (!/^[A-Z0-9]{6,10}$/.test(formData.vehicleNumber))
            formErrors.vehicleNumber = 'Vehicle number must be 6 to 10 characters long and consist of uppercase letters and digits';     
           if (!formData.deliveryArea) 
            formErrors.deliveryArea = 'Area name/Landmark required';
        if (!formData.deliveryDistrict) 
            formErrors.deliveryDistrict = 'District required';
        if (!formData.image) formErrors.image = 'Image is required';
        return formErrors;
    };

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            try {
                const formDataToSend = new FormData();
                for (const key in formData) {
                    formDataToSend.append(key, formData[key]);
                }

                const result = await axiosMultipartInstance.post('/addDeliveryAgent', formDataToSend);
                if (result.data.status === 200) {
                    toast.success("Registration Successful");
                    // window.location.reload();
                    // Navigate("/shop-dashboard")
                } else if (result.data.status === 409) {
                    const msg = result.data.msg;
                    let specificErrors = {};

                    if (msg.includes("Licence Number")) {
                        specificErrors.licenceNumber = msg;
                    } else if (msg.includes("Vehicle Number")) {
                        specificErrors.vehicleNumber = msg;
                    } else if (msg.includes("Phone Number")) {
                        specificErrors.phone = msg;
                    } else if (msg.includes("E-Mail Id")) {
                        specificErrors.email = msg;
                    } else {
                        specificErrors.form = msg;
                    }
                    setErrors(specificErrors);
                } else {
                    setErrors({ form: "Data not inserted. Please try again later." });
                }
            } catch (err) {
                console.error("Error", err);
                setErrors({ form: "An unexpected error occurred. Please try again later." });
            }
        }
    };

    return (
        <div><Shopnav/><Showdropdown/>
            <div className="container mt-3 col-10">
                <div className='form-style'>
                <form onSubmit={handleSubmit} >
                    <div className="row">
                            <div className='delivery-profile'>
                                {profileImage ? (
                                <img src={profileImage} alt="profile" className="rounded-circle" width="200" height='200' />
                                ) : (
                                <img src={profile} width="200" height='200'></img>
                                )}<br/>
                                <input
                                    type="file"
                                    id='fileUpload'
                                    name='image'
                                    style={{ display: 'none' }}
                                    onChange={handleImageUpload}
                                    className={errors.image ? 'is-invalid' : ''}
                                />

                                <label htmlFor='fileUpload'>
                                <h3 className="profile-text">Add Profile Image<span className="text-danger">*</span></h3>
                                </label>
                            </div>
                        <div className="col-md-6 first-div container-fluid">
                            <h3 className="section-title">Personal information</h3><br/>
                            <div className="mb-3">
                                <label className="form-label">Full name</label><span className="text-danger">*</span>
                                <input type="text" 
                                className="form-control controls" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                placeholder="Full Name" />
                                {errors.name && <span className='span-required'>{errors.name}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">E-mail</label><span className="text-danger">*</span>
                                <input type="email" 
                                className="form-control controls" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                placeholder="Email" />
                                {errors.email && <span className='span-required'>{errors.email}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label><span className="text-danger">*</span>
                                <input type="password" 
                                className="form-control controls" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                placeholder="Password" />
                                {errors.password && <span className='span-required'>{errors.password}</span>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Phone number</label><span className="text-danger">*</span>
                                <input type="text"
                                 className="form-control controls" 
                                 name="phone" 
                                 maxLength={10} 
                                 value={formData.phone} 
                                 onChange={handleChange} 
                                 placeholder="Phone Number" />
                                {errors.phone && <span className='span-required'>{errors.phone}</span>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">License Number</label><span className="text-danger">*</span>
                                <input type="text" 
                                className="form-control controls" 
                                name="licenceNumber" 
                                value={formData.licenceNumber} 
                                onChange={handleChange} 
                                placeholder="Licence Number" />
                                {errors.licenceNumber && <span className='span-required'>{errors.licenceNumber}</span>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Address</label><span className="text-danger">*</span>
                                <textarea className="form-control address" 
                                name="address" 
                                rows={2} 
                                value={formData.address} 
                                onChange={handleChange} 
                                placeholder="Address"></textarea>
                                {errors.address && <span className='span-required'>{errors.address}</span>}
                            </div>
                        </div>

                        <div className="col-md-6 second-div container-fluid">
                            <h3 className="section-title">Vehicle information</h3><br/>
                            
                            <div className="mb-3">
                                <label className="form-label">Vehicle type</label><span className="text-danger">*</span>
                                <input type="text" 
                                className="form-control controls" 
                                name="vehicleType" 
                                value={formData.vehicleType} 
                                onChange={handleChange} 
                                placeholder="Vehicle type" />
                                {errors.vehicleType && <span className='span-required'>{errors.vehicleType}</span>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Vehicle number</label><span className="text-danger">*</span>
                                <input type="text" 
                                className="form-control controls" 
                                name="vehicleNumber" 
                                value={formData.vehicleNumber} 
                                onChange={handleChange} 
                                placeholder="Vehicle Number" />
                                {errors.vehicleNumber && <span className='span-required'>{errors.vehicleNumber}</span>}
                            </div><br/><br/><br/>

                            <h3 className="section-title mb-3">Delivery area section</h3>
                            <div className="mb-3">
                                <label className="form-label">Area name / Landmark</label><span className="text-danger">*</span>
                                <input type="text" 
                                className="form-control controls" 
                                name="deliveryArea"
                                value={formData.deliveryArea} 
                                onChange={handleChange} 
                                placeholder="Area name / Landmark" />
                                {errors.deliveryArea && <span className='span-required'>{errors.deliveryArea}</span>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">District</label><span className="text-danger">*</span>
                                <select className="form-control controls" 
                                name="deliveryDistrict" 
                                value={formData.deliveryDistrict} 
                                onChange={handleChange}>
                                    <option className='option-district'>Select District</option>
                                    {districts.map((district, index) => (
                                        <option key={index} value={district}>{district}</option>
                                    ))}
                                </select>
                                {errors.deliveryDistrict && <span className='span-required'>{errors.deliveryDistrict}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-4">
                        <button type="submit" 
                        className="btn btn-warning">
                            &nbsp;&nbsp; Confirm &nbsp;&nbsp;
                        </button>
                    </div>
                </form>
                </div>
            </div><br />
        </div>
    );
};

export default Adddeliveryagent;
