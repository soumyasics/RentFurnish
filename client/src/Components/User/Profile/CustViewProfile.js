import React, { useState } from 'react'
import Vectore from '../../../Assets/Vector.png';
import Img from '../../../Assets/image 27.png';
import '../Profile/CustViewProfile.css'

function CustViewProfile() {
  const [editMode, setEditMode] = useState(false);

  return (
    <div>
      <div class="mx-auto mt-5 " style={{ width: '600px' }}>
        <div className='col-9  justify-content-center'>
          <div className='continer border bg-light rounded-4 shadow-lg p-3'>
            <div class="d-flex justify-content-start">
              <div className='row mt-2 p-3'>
                <div className='col'><a href='#'><img src={Vectore} onClick={() => setEditMode(false)}/></a></div>
                <div className='col'><p className='profile_text'>Profile</p></div>
              </div>
            </div>
            <img src={Img} class="rounded mx-auto d-block" alt="..."></img>  
            <div className='col ms-3 mb-3 mt-4'>
              <div className='row ms-4 mb-3'>
                <div className='col'><p className='profile_details_text'>Name:</p></div>
                {editMode?(
                  <div className='col'><input type="text" className='form-control' /></div>
                ):(
                  <div className='col'><p className='profile_dtails_text2'>Sics</p></div>
                )}
              </div>
              <div className='row ms-4 mb-3'>
                <div className='col'><p className='profile_details_text'>Gender:</p></div>
                {editMode ? (
                  <div className='col'><input type='text' className='form-control' /></div>
                ) : (
                  <div className='col'><p className='profile_dtails_text2'>Male</p> </div>
                )}

              </div>
              <div className='row ms-4 mb-3'>
                <div className='col'><p className='profile_details_text'>Email:</p></div>
                {editMode ?(
                  <div className='col'><input type='text' className='form-control'/></div>
                ):(
                  <div className='col'><p className='profile_dtails_text2'>srics@gmail.com</p></div>
                )}
                
              </div>
              <div className='row ms-4 mb-3'>
                <div className='col'><p className='profile_details_text'>Phone Number:</p></div>
                {editMode?(
                  <div className='col'><input type='text' className='form-control'/></div>
                ):(
                  <div className='col'><p className='profile_dtails_text2'>1234567891</p></div>
                )}
                
              </div>
            </div>
            <div className='d-flex justify-content-center'>
              <button className='Edit_profile_bg Edit_profile_text shadow-lg p-3 ' onClick={() => setEditMode(true)}>Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustViewProfile