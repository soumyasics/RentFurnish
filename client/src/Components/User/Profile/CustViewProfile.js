import React, { useEffect, useState } from 'react'
import Vectore from '../../../Assets/Vector.png';
// import Img from '../../../Assets/image 27.png';
import '../Profile/CustViewProfile.css'
import Img from "../../../Assets/user.jpg";
import axiosInstance from '../../Constants/Baseurl';

function CustViewProfile({handleClose}) {
  const [editMode, setEditMode] = useState(false);
  const [cust,setCust]=useState({})
  const [data,setData]=useState({
    
  })

  const id = localStorage.getItem("userid");
useEffect(()=>{
  axiosInstance.post(`viewcustbyid/${id}`)
  .then((result)=>{
    console.log(result);
    setCust(result.data.data)
  })
  .catch((err)=>{
    console.log(err);
  })
},[])
  return (
    <div>
      <div class="mx-auto mt-5 " style={{ width: '600px' }}>
        <div className='col-9  justify-content-center'>
          <div className='continer border bg-light rounded-4 shadow-lg p-3'>
            <div class="d-flex justify-content-start">
              <div className='row mt-2 p-3'>
                <div className='col'><a href='#'><img src={Vectore} onClick={handleClose}/></a></div>
                <div className='col'><p className='profile_text'>Profile</p></div>
              </div>
            </div>
            <img src={Img} class="rounded mx-auto d-block " alt="..." width="200px" height="200px"></img>  
            <div className='col ms-3 mb-3 mt-4'>
              <div className='row ms-4 mb-3'>
                <div className='col-4'><p className='profile_details_text'>Name:</p></div>
                {editMode?(
                  <div className='col-8'><input type="text" className='form-control' /></div>
                ):(
                  <div className='col-8'><p className='profile_dtails_text2'>{cust?.name}</p></div>
                )}
              </div>
              <div className='row ms-4 mb-3'>
                <div className='col-4'><p className='profile_details_text'>Gender:</p></div>
                {editMode ? (
                  <div className='col-8'><input type='text' className='form-control' /></div>
                ) : (
                  <div className='col-8'><p className='profile_dtails_text2'>{cust?.gender}</p> </div>
                )}

              </div>
              <div className='row ms-4 mb-3'>
                <div className='col-4'><p className='profile_details_text'>Email:</p></div>
                {editMode ?(
                  <div className='col-8'><input type='text' className='form-control'/></div>
                ):(
                  <div className='col-8'><p className='profile_dtails_text2'>{cust?.email}</p></div>
                )}
                
              </div>
              <div className='row ms-4 mb-3'>
                <div className='col-4'><p className='profile_details_text'>Phone :</p></div>
                {editMode?(
                  <div className='col-8'><input type='text' className='form-control'/></div>
                ):(
                  <div className='col-8'><p className='profile_dtails_text2'>{cust?.phone}</p></div>
                )}
                
              </div>
            </div>
            <div className='d-flex justify-content-center'>
              {
                editMode?(
                    <div className='d-flex'>
                                    <button className='Edit_profile_aftedt Edit_profile_text shadow-lg p-3 ' >Save</button>
                                    <button className='Edit_profile_aftedtcncl  shadow-lg p-3 ' onClick={() => setEditMode(false)}>Cancel</button>

                    </div>
                ):(
              
              <button className='Edit_profile_bg Edit_profile_text shadow-lg p-3 ' onClick={() => setEditMode(true)}>Edit Profile</button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustViewProfile