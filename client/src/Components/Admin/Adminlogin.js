import React, { useState } from 'react'
import img from "../../Assets/admin.jpg"
import "../Admin/Adminlogin.css"

function Adminlogin() {
    const[admin,setadmin]=useState({email:"",password:""})

    let email="admin"
    let password="admin123"

    const changefn=((e)=>{
        setadmin({
            ...admin,[e.target.name]:e.target.value
        })
        console.log(admin);
    })
    const submitfn=((a)=>{
        a.preventDefault()
        if(email==admin.email){
            if(password==admin.password){
                alert("succesfully logined")
            }
            else{
                alert("please check password")
            }
        }
        else{
            alert("Invalid username")
        }
    })




    


  return (
    <div className='main-admin'>
        <div className='container'>
            <form onSubmit={submitfn}>
            <div className='row'>
                <div className='col-sm-6 col-md-6 col-lg-6 main-admin-head'>
                    <h4>Welcome Admin</h4>
                    <h3>Login</h3>
                    <div className='col-12 pb-3 main-input'>
                    <input type='text' placeholder='Enter email' name='email' value={admin.email} onChange={changefn}/>
                    </div>
                    <div className='col-12 pb-3'>
                    <input type='password' placeholder='Enter password' name='password' value={admin.password} onChange={changefn}/>
                    </div>
                    <div className='col-12 pb-3'>
                        <button type='submit'>Login</button>
                    </div>
                </div>
                <div className='col-sm-6 col-md-6 col-lg-6'>
                    <img src={img} alt='images' width="699px" height="650px"/>
                </div>
            </div>
            </form>
        </div>

    </div>
  )
}

export default Adminlogin