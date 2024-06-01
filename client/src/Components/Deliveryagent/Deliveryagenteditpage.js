import React, { useEffect, useState } from 'react'
import Shopnav from '../Navbar/Shopnav';
import Showdropdown from '../Shops/Shopdropdown';
import Deliverysidebar from './Deliverysidebar';
import axiosInstance from '../Constants/Baseurl';

function Deliveryagenteditpage() {
    
    const shopid=localStorage.getItem("shopid")
    console.log(shopid);
    const id="665ae966ff2ec64d330c69e7"
    const [errors, setErrors] = useState({});

    const[Data,setData]=useState({
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
        shopId:shopid
    })

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
    console.log(Data);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue;
        
        if (name === "phone") {
            newValue = handlePhoneNumberChange(value);
        } else if (name === "name" || name === "vehicleType") {
            newValue = value.replace(/[^a-zA-Z\s]/g, '');
        } else {
            newValue = value;
        }
        
        setData({ ...Data, [name]: newValue });
        
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: newValue.trim() === "" ? `${name.charAt(0).toUpperCase() + name.slice(1)} required` : null
        }));
    };

    const validateForm = () => {
        let formErrors = {};
    
        if (!Data.name) 
            formErrors.name = 'Name required';
        if (!Data.email) 
            formErrors.email = 'Email required';
        if (!Data.password) 
            formErrors.password = 'Password required';
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(Data.password))
            formErrors.password = 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character';
        if (!Data.phone) 
            formErrors.phone = 'Phone number required';
        else if (!/^\d{10}$/.test(Data.phone)) 
            formErrors.phone = 'Phone number must be exactly 10 digits';
        if (!Data.address) 
            formErrors.address = 'Address required';
        if (!Data.licenceNumber) 
            formErrors.licenceNumber = 'License number required';
        else if (!/^[A-Za-z0-9]{15}$/.test(Data.licenceNumber))
            formErrors.licenceNumber = 'License number must be exactly 15 characters, including both letters and numbers';
        if (!Data.vehicleType) 
            formErrors.vehicleType = 'Vehicle type required';
        if (!Data.vehicleNumber) 
            formErrors.vehicleNumber = 'Vehicle number required';
        else if (!/^[A-Z0-9]{6,10}$/.test(Data.vehicleNumber))
            formErrors.vehicleNumber = 'Vehicle number must be 6 to 10 characters long and consist of uppercase letters and digits';     
           if (!Data.deliveryArea) 
            formErrors.deliveryArea = 'Area name/Landmark required';
        if (!Data.deliveryDistrict) 
            formErrors.deliveryDistrict = 'District required';
    
        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        setErrors(formErrors);
        axiosInstance.post(`/updateDeliveryAgentprofile/${id}`,Data)
        .then((res)=>{
            console.log('working',res);
        if(res.data.status==200)
            console.log('working',res);
        })
    }

    useEffect(()=>{
        axiosInstance.post(`viewDeliveryAgentbyid/${id}`,Data)
        .then((res)=>{
            console.log(res);
            setData(res.data.data);
            console.log(res.data.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

  return (
    <div><Shopnav/><Showdropdown/>
        
            <div className="container mt-3 col-10">
                <div className='form-style'>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 first-div container-fluid">
                            <h3 className="section-title">Personal information</h3><br/>
                            <div className="mb-3">
                                <label className="form-label">Full name</label><span className="text-danger">*</span>
                                <input type="text" 
                                className="form-control controls" 
                                name="name" 
                                value={Data.name} 
                                onChange={handleChange}
                                placeholder={Data.name}/>
                                {errors.name && <span className='span-required'>{errors.name}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">E-mail</label><span className="text-danger">*</span>
                                <input type="email" 
                                className="form-control controls" 
                                name="email" 
                                value={Data.email} 
                                onChange={handleChange}
                                placeholder={Data.email} />
                                {errors.email && <span className='span-required'>{errors.email}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label><span className="text-danger">*</span>
                                <input type="password" 
                                className="form-control controls" 
                                name="password" value={Data.password} 
                                onChange={handleChange}
                                placeholder={Data.password} />
                                {errors.password && <span className='span-required'>{errors.password}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone number</label><span className="text-danger">*</span>
                                <input type="text"
                                 className="form-control controls" 
                                 name="phone" 
                                 maxLength={10} 
                                 value={Data.phone} 
                                 onRateChange={handleChange}
                                 placeholder={Data.phone} />
                                {errors.phone && <span className='span-required'>{errors.phone}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">License Number</label><span className="text-danger">*</span>
                                <input type="text" 
                                className="form-control controls" 
                                name="licenceNumber" 
                                value={Data.licenceNumber} 
                                onChange={handleChange}
                                placeholder={Data.licenceNumber} />
                                {errors.licenceNumber && <span className='span-required'>{errors.licenceNumber}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Address</label><span className="text-danger">*</span>
                                <textarea className="form-control address" 
                                name="address" 
                                rows={2} 
                                value={Data.address}
                                onChange={handleChange} 
                                placeholder={Data.address}></textarea>
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
                                value={Data.vehicleType} 
                                onChange={handleChange}
                                placeholder={Data.vehicleType} />
                                {errors.vehicleType && <span className='span-required'>{errors.vehicleType}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Vehicle number</label><span className="text-danger">*</span>
                                <input type="text" 
                                className="form-control controls" 
                                name="vehicleNumber" 
                                value={Data.vehicleNumber} 
                                onChange={handleChange}
                                placeholder={Data.vehicleNumber} />
                                {errors.vehicleNumber && <span className='span-required'>{errors.vehicleNumber}</span>}
                            </div><br/><br/><br/>
                            <h3 className="section-title mt-4">Delivery area section</h3><br/>
                            <div className="mb-3">
                                <label className="form-label">Area name / Landmark</label><span className="text-danger">*</span>
                                <input type="text" 
                                className="form-control controls" 
                                name="deliveryArea" 
                                value={Data.deliveryArea} 
                                onChange={handleChange}
                                placeholder={Data.deliveryArea} />
                                {errors.deliveryArea && <span className='span-required'>{errors.deliveryArea}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">District</label><span className="text-danger">*</span>
                                <select className="form-control controls" 
                                name="deliveryDistrict" 
                                value={Data.deliveryDistrict} 
                                onChange={handleChange}
                                >
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
  )
}

export default Deliveryagenteditpage;