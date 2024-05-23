import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Adddeliveryagent.css';
import logo from '../../Assets/logo1.png'

const Adddeliveryagent = () => {
    const [Data, setData] = useState({
        fullname: '',
        email: '',
        phonenumber: '',
        address: '',
        liscencenumber:'',
        vehicletype: '',
        vehiclenumber: '',
        areaname: '',
        pincode: ''
    });

    const handleChange = (e) => {
        console.log(Data)
        setData({...Data,[e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Details submitted: ', Data);
    };

    return (
        <div>
            <div className='header'>
                <img src={logo}></img><br/>
                <h4 className='h1-header'>RENTAL FURNITURE</h4>
                <p>Rent a Furniture Online Today!</p>
            </div>
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
                            <label className="form-label">Full name</label>
                            <input type="text" className="form-control controls" name="fullname" value={Data.fullname} onChange={handleChange} placeholder="Full Name" required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">E-mail</label>
                            <input type="email" className="form-control controls" name="email" value={Data.email} onChange={handleChange} placeholder="Email" required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone number</label>
                            <input type="text" className="form-control controls" name="phonenumber" value={Data.phonenumber} onChange={handleChange} placeholder="Phone Number" required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label address">Address</label>
                            <textarea className="form-control" name="address" rows={4} value={Data.address} onChange={handleChange} placeholder="Address"required></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone number</label>
                            <input type="text" className="form-control controls" name="liscencenumber" value={Data.liscencenumber} onChange={handleChange} placeholder="Liscence Number" required/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h3 className="section-title">Vehicle information</h3>
                        <div className="mb-3">
                            <label  className="form-label">Vehicle type</label>
                            <input type="text" className="form-control controls" name="vehicletype" value={Data.vehicletype} onChange={handleChange} placeholder="Vehicle type" required/>
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Vehicle number</label>
                            <input type="text" className="form-control controls" name="vehiclenumber" value={Data.vehiclenumber} onChange={handleChange} placeholder="Vehicle Number" required/>
                        </div>
                        <h3 className="section-title mt-4">Delivery area section</h3>
                        <div className="mb-3">
                            <label className="form-label">Area name / Landmark</label>
                            <input type="text" className="form-control controls" name="areaname" rows='4' value={Data.areaname} onChange={handleChange} placeholder="Area name / Landmark" required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Pincode</label>
                            <input type="text" className="form-control controls" name="pincode" value={Data.pincode} onChange={handleChange} placeholder="Pincode" required/>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <button type="submit" className="btn btn-warning">&nbsp;&nbsp; Confirm &nbsp;&nbsp;</button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Adddeliveryagent;
