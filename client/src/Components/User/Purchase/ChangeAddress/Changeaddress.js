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
    const changefn=((e)=>{
        setAddress({
            ...address,[e.target.name]:e.target.value
        })
    })

    const changeaddressfn=(()=>{
        axiosInstance.post(`addAddressByOrderId/${orderId}`,address)
        .then((res)=>{
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
            <div className='row user-orderchangadd-content'>
                <div className='col-12'>
                <p>Name</p>
                </div>
                <div className='col-12'>
                <input type='text' placeholder='Name' name='name' value={address.name} onChange={changefn}/>
                </div>
                <div className='col-12'>
                <p>Email</p>
                </div>
                <div className='col-12'>
                <input type='email' placeholder='Email'/>
                </div>
                <div className='col-12'>
                <p>Phone</p>
                </div>
                <div className='col-12'>
                <input type='number' placeholder='Number'/>
                </div>
                <div className='col-12'>
                <p>Address</p>
                </div>
                <div className='col-12'>
                <textarea  placeholder='Address'/>
                </div>
                <div className='col-6 user-orderchangadd-edit'>
                <button type='submit'className='ri-checkbox-line'>Edit</button>
                </div>
                <div className='col-6 user-orderchangadd-cancel'>
                <button type='button' className='ri-close-circle-line' onClick={onClose}>Cancel</button>
                </div>



            </div>
        </div>
    </div>
  )
}

export default Changeaddress