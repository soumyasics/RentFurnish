import React, { useEffect, useState } from 'react';
import Vectore from '../../../Assets/Vector.png';
import Img from '../../../Assets/user.jpg';
import axiosInstance from '../../Constants/Baseurl';
import '../Profile/CustViewProfile.css';

function CustViewProfile({ handleClose }) {
  const [editMode, setEditMode] = useState(false);
  const [cust, setCust] = useState({});
  const [data, setData] = useState({
    name: "",
    gender: "",
    phone: "",
    email: "",
    address: ""
  });
  const [errors, setErrors] = useState({});

  const id = localStorage.getItem("userid");

  useEffect(() => {
    axiosInstance.post(`viewcustbyid/${id}`)
      .then((result) => {
        setCust(result.data.data);
        setData(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!String(data.phone).match(/^[0-9]{10}$/)) {
      isValid = false;
      tempErrors["phone"] = "Phone number must be exactly 10 digits.";
    }

    setErrors(tempErrors);
    return isValid;
  };
  const handleSave = () => {
    if (validate()) {
      axiosInstance.post(`editcustbyid/${id}`, data)
        .then((result) => {
          console.log('Profile updated successfully', result);
          setCust(data);
          setEditMode(false);
        })
        .catch((err) => {
          console.log('Error updating profile', err);
        });
    }
  };

  return (
    <div>
      <div className="mx-auto mt-5" style={{ width: '600px' }}>
        <div className='col-9 justify-content-center'>
          <div className='container border bg-light rounded-4 shadow-lg p-3'>
            <div className="d-flex justify-content-start">
              <div className='row mt-2 p-3'>
                <div className='col'><a href='#'><img src={Vectore} onClick={handleClose} alt="Back" /></a></div>
                <div className='col'><p className='profile_text'>Profile</p></div>
              </div>
            </div>
            <img src={Img} className="rounded mx-auto d-block" alt="..." width="200px" height="200px"></img>
            <div className='col ms-3 mb-3 mt-4'>
              <div className='row ms-4 mb-3'>
                <div className='col-4'><p className='profile_details_text'>Name:</p></div>
                {editMode ? (
                  <div className='col-8'><input type="text" className='form-control' name="name" value={data.name} onChange={handleChange} /></div>
                ) : (
                  <div className='col-8'><p className='profile_details_text2'>{cust?.name}</p></div>
                )}
              </div>
              <div className='row ms-4 mb-3'>
                <div className='col-4'><p className='profile_details_text'>Gender:</p></div>
                {editMode ? (
                  <div className='col-8'>
                    <select className='form-control' name="gender" value={data.gender} onChange={handleChange}>
                      <option hidden>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                ) : (
                  <div className='col-8'><p className='profile_details_text2'>{cust?.gender}</p></div>
                )}
              </div>
              <div className='row ms-4 mb-3'>
                <div className='col-4'><p className='profile_details_text'>Email:</p></div>
                {editMode ? (
                  <div className='col-8'><input type='text' className='form-control' name="email" value={data.email} onChange={handleChange} /></div>
                ) : (
                  <div className='col-8'><p className='profile_details_text2'>{cust?.email}</p></div>
                )}
              </div>
              <div className='row ms-4 mb-3'>
                <div className='col-4'><p className='profile_details_text'>Phone :</p></div>
                {editMode ? (
                  <div className='col-8'>
                    <input type='text' className='form-control' name="phone" value={data.phone} onChange={handleChange} />
                    {errors.phone && <div className="text-danger">{errors.phone}</div>}
                  </div>
                ) : (
                  <div className='col-8'><p className='profile_details_text2'>{cust?.phone}</p></div>
                )}
              </div>
            </div>
            <div className='d-flex justify-content-center'>
              {editMode ? (
                <div className='d-flex'>
                  <button className='Edit_profile_aftedt Edit_profile_text shadow-lg p-3' onClick={handleSave}>Save</button>
                  <button className='Edit_profile_aftedtcncl shadow-lg p-3' onClick={() => setEditMode(false)}>Cancel</button>
                </div>
              ) : (
                <button className='Edit_profile_bg Edit_profile_text shadow-lg p-3' onClick={() => setEditMode(true)}>Edit Profile</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustViewProfile;
