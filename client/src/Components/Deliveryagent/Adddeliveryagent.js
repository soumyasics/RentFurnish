import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Adddeliveryagent.css';

const Adddeliveryagent = () => {
    const [Data, setData] = useState({
        fullname: '',
        email: '',
        password: '',
        phonenumber: '',
        address: '',
        liscencenumber: '',
        vehicletype: '',
        vehiclenumber: '',
        areaname: '',
        district: ''
    });

    const [errors, setErrors] = useState({});

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue;
    
        if (name === "phonenumber") {
            newValue = handlePhoneNumberChange(value);
        } else if (name === "fullname" || name === "vehicletype") {
            newValue = value.replace(/[^a-zA-Z\s]/g, '');
        } else {
            newValue = value;
        }
    
        setData({ ...Data, [name]: newValue });
        setErrors(validateForm()); 
    };
    

    const validateForm = () => {
        let formErrors = {};

        if (!Data.fullname) 
            formErrors.fullname = 'Name required';
        if (!Data.email) 
            formErrors.email = 'Email required';
        if (!Data.password) 
            formErrors.password = 'Password required';
        if (!Data.password)
            formErrors.password = 'Password required';
        if (!Data.phonenumber) 
            formErrors.phonenumber = 'Phone number required';
        if (!Data.address) 
            formErrors.address = 'Address required';
        if (!Data.liscencenumber) 
            formErrors.liscencenumber = 'Liscence number required';
        if (!Data.vehicletype) 
            formErrors.vehicletype = 'Vehicle type required';
        if (!Data.vehiclenumber) 
            formErrors.vehiclenumber = 'Vehicle number required';
        if (!Data.areaname) 
            formErrors.areaname = 'Area name/Landmark required';
        if (!Data.district) formErrors.district = 'District required';

        return formErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();

        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            console.log('Details submitted: ', Data);
        }
    };

    return (
        <div>
            <div className="container mt-5">
                <div className="d-flex align-items-center mb-4">
                    <h2 className="back-arrow me-auto">
                        <i className="ri-arrow-left-line"></i>
                    </h2>
                    <h2 className="title flex-grow-1 text-center">Add delivery agent</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <h3 className="section-title">Personal information</h3>
                            <div className="mb-3">
                                <label className="form-label">Full name</label><span className="text-danger">*</span>
                                <input type="text" className="form-control controls" name="fullname" value={Data.fullname} onChange={handleChange} placeholder="Full Name" />
                                {errors.fullname && <span className='span-required'>{errors.fullname}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">E-mail</label><span className="text-danger">*</span>
                                <input type="email" className="form-control controls" name="email" value={Data.email} onChange={handleChange} placeholder="Email" />
                                {errors.email && <span className='span-required'>{errors.email}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label><span className="text-danger">*</span>
                                <input type="password" className="form-control controls" name="password" value={Data.password} onChange={handleChange} placeholder="Password" />
                                {errors.password && <span className='span-required'>{errors.password}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone number</label><span className="text-danger">*</span>
                                <input type="text" className="form-control controls" name="phonenumber" maxLength={10} value={Data.phonenumber} onChange={handleChange} placeholder="Phone Number" />
                                {errors.phonenumber && <span className='span-required'>{errors.phonenumber}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label address">Address</label><span className="text-danger">*</span>
                                <textarea className="form-control" name="address" rows={4} value={Data.address} onChange={handleChange} placeholder="Address"></textarea>
                                {errors.address && <span className='span-required'>{errors.address}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Liscence Number</label><span className="text-danger">*</span>
                                <input type="text" className="form-control controls" name="liscencenumber" value={Data.liscencenumber} onChange={handleChange} placeholder="Liscence Number" />
                                {errors.liscencenumber && <span className='span-required'>{errors.liscencenumber}</span>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h3 className="section-title">Vehicle information</h3>
                            <div className="mb-3">
                                <label className="form-label">Vehicle type</label><span className="text-danger">*</span>
                                <input type="text" className="form-control controls" name="vehicletype" value={Data.vehicletype} onChange={handleChange} placeholder="Vehicle type" />
                                {errors.vehicletype && <span className='span-required'>{errors.vehicletype}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Vehicle number</label><span className="text-danger">*</span>
                                <input type="text" className="form-control controls" name="vehiclenumber" value={Data.vehiclenumber} onChange={handleChange} placeholder="Vehicle Number" />
                                {errors.vehiclenumber && <span className='span-required'>{errors.vehiclenumber}</span>}
                            </div>
                            <h3 className="section-title mt-4">Delivery area section</h3>
                            <div className="mb-3">
                                <label className="form-label">Area name / Landmark</label><span className="text-danger">*</span>
                                <input type="text" className="form-control controls" name="areaname" value={Data.areaname} onChange={handleChange} placeholder="Area name / Landmark" />
                                {errors.areaname && <span className='span-required'>{errors.areaname}</span>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">District</label><span className="text-danger">*</span>
                                <select className="form-control controls" name="district" value={Data.district} onChange={handleChange}>
                                    <option className='option-district'>Select District</option>
                                    {districts.map((district, index) => (
                                        <option key={index} value={district}>{district}</option>
                                    ))}
                                </select>
                                {errors.district && <span className='span-required'>{errors.district}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <button type="submit" className="btn btn-warning">&nbsp;&nbsp; Confirm &nbsp;&nbsp;</button>
                    </div>
                </form>
            </div><br/><br/>
        </div>
    );
};

export default Adddeliveryagent;