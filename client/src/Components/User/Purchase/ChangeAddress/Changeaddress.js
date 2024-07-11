import React, { useState } from 'react'
import "./ChangeAddress.css"
import axiosInstance from '../../../Constants/Baseurl';
import { toast } from 'react-toastify';

function Changeaddress({onClose,orderId}) {
    console.log(orderId);

    const [address,setAddress]=useState({
        name:"",
        email:"",
        address:"",
        contact:""
    })
    const [errors, setErrors] = useState({
        contact: ""
    });

    const changefn=((e)=>{
        
        const { name, value } = e.target;

        // Validate phone number
        if (name === "contact") {
            if (!/^\d{10}$/.test(value)) {
                setErrors({ ...errors, contact: "Phone number must be 10 digits" });
            } else {
                setErrors({ ...errors, contact: "" });
            }
        }

        setAddress({
            ...address, [name]: value
        });
    })

    const changeaddressfn=((a)=>{
        a.preventDefault()
        axiosInstance.post(`addAddressByOrderId/${orderId}`,address)
        .then((res)=>{
            console.log(res);
            if(res.data.status==200){
                toast.success("Address Changed Successfully")
            }
            else{
                toast.error("Something Went Wrong")
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    })
  return (
    <div className='user-orderchangeaddress'>
        <div className='user-orderchangadd-main'>
            <h5>Change Address</h5>
            <form onSubmit={changeaddressfn}>

            <div className='row user-orderchangadd-content'>
                <div className='col-12'>
                <p>Name</p>
                </div>
                <div className='col-12'>
                <input type='text' placeholder='Name' name='name' value={address.name} onChange={changefn} required/>
                </div>
                <div className='col-12'>
                <p>Email</p>
                </div>
                <div className='col-12'>
                <input type='email' placeholder='Email' name='email' value={address.email} onChange={changefn} required/>
                </div>
                <div className='col-12'>
                <p>Phone</p>
                </div>
                <div className='col-12'>
                <input type='number' placeholder='Number' name='contact' value={address.contact} onChange={changefn} required/>
                {errors.contact && <p className='error'>{errors.contact}</p>}
                </div>
                <div className='col-12'>
                <p>Address</p>
                </div>
                <div className='col-12'>
                <textarea  placeholder='Address' name='address' value={address.address} onChange={changefn} required/>
                </div>
                <div className='col-6 user-orderchangadd-edit'>
                <button type='submit'className='ri-checkbox-line'>Edit</button>
                </div>
                <div className='col-6 user-orderchangadd-cancel'>
                <button type='button' className='ri-close-circle-line' onClick={onClose}>Cancel</button>
                </div>


            </div>                </form>

        </div>
    </div>
  )
}

export default Changeaddress