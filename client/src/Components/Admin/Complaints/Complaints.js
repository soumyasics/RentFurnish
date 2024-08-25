import React, { useEffect, useState } from 'react';
import '../Complaints/Complaints.css';
import Search from '../../../Assets/search-line.png';
import axiosInstance from '../../Constants/Baseurl';
import { Link } from 'react-router-dom';
import Adminloginnav from '../../Navbar/Adminloginnav';
import chair from '../../../Assets/comp.png';

function Complaints() {
  const [complaint, setComplaint] = useState([]);
  
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [id, setId] = useState(null);
  
  const url = axiosInstance.defaults.url;

  useEffect(() => {
    axiosInstance.post('viewAllcomplaints')
      .then((res) => {
        console.log(res);
        setComplaint(res.data.data);

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);  


  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);
  console.log("comp"+id)


  const getData = (id) => {
    setSelectedComplaint(null)
    axiosInstance.post(`viewcomplaintById/${id}`)
      .then((res) => {
        setSelectedComplaint(res.data.data);
        console.log("sel",res.data.data.complaint);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <Adminloginnav />
      <div className='viewcomplaints-head'>
        <Link to="/admindashboard" style={{ textDecoration: "none" }}>
          <h1 className='ri-arrow-left-line'>View Complaints</h1>
        </Link>
      </div>

      <div className='col-sm-11 d-flex justify-content-end mt-5 ms-5'>
        <div className='border col-sm-12 col-md-12 col-lg-12 ms-5 mt-5 rounded-2 shadow-lg'>
          <div className='table-responsive-md'>
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col"><p className='Complain_head_text'>SI No</p></th>
                  <th scope="col"><p className='Complain_head_text'>Customer Name</p></th>
                  <th scope="col"><p className='Complain_head_text'>Shop Name</p></th>
                  <th scope="col"><p className='Complain_head_text'>Furniture Name</p></th>
                  <th scope="col"><p className='Complain_head_text'>Complaint Description</p></th>
                  <th scope="col"><p className='Complain_head_text'>View Details</p></th>
                </tr>
              </thead>
              <tbody>
                {complaint && complaint.length ? (
                  complaint.slice().reverse().map((complaint, index) => (
                    <tr key={complaint._id}>
                      <th scope="row"><p className='Complain_body_number'>{index + 1}</p></th>
                      <td><p className='Complain_body_text'>{complaint?.userId?.name}</p></td>
                      <td><p className='Complain_body_text'>{complaint?.shopId?.shopname}</p></td>
                      <td><p className='Complain_body_text'>{complaint?.furnitureId?.name}</p></td>
                      <td><p className='Complain_body_text'>{complaint?.complaint}</p></td>
                      <td>
                        <button
                          className='Complain_body_btn Complain_body_btn_text'
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          onClick={() => (setId(complaint._id),getData(complaint._id))}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <div className="text-center">
                    <p>No Complaints available.</p>
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered complaint_modal_size">
          <div className="modal-content complaint_modal_main">
            <div className="modal-header">
              <button type="button" className="btn-close model_close_btn" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {selectedComplaint ? (
                <div className="complaint-details">
                  <div className="row">
                    <div className="col-4">
                      <img src={`${url}/${selectedComplaint?.furnitureId?.image1?.filename}`} alt="Chair" />
                    </div>
                    <div className="col-4 container">
                      <h5 className="modal_second_mainheading mb-4">Furniture details</h5>
                      <div className="row text-left m-2">
                        <div className="col-5 modal_subheading"><label>Furniture type</label></div>
                        <div className="col-2">:</div>
                        <div className="col-5 modal_subheading1">{selectedComplaint.furnitureId?.name}</div>
                      </div>
                      <div className="row text-left m-2">
                        <div className="col-5 modal_subheading"><label>Quantity</label></div>
                        <div className="col-2">:</div>
                        <div className="col-5 modal_subheading1">{selectedComplaint.furnitureId?.quantity}</div>
                      </div>
                      <div className="row text-left m-2">
                        <div className="col-5 modal_subheading"><label>Dimensions</label></div>
                        <div className="col-2">:</div>
                        <div className="col-5 modal_subheading1">{selectedComplaint.furnitureId?.dimension}</div>
                      </div>
                    </div>
                    <div className="col-4">
                      <h5 className="modal_second_mainheading">Customer information</h5>
                      <div className="row text-left m-2">
                        <div className="col-4 modal_subheading"><label>Name</label></div>
                        <div className="col-2">:</div>
                        <div className="col-6 modal_subheading1">{selectedComplaint.userId?.name}</div>
                      </div>
                      <div className="row text-left m-2">
                        <div className="col-4 modal_subheading"><label>Phone number</label></div>
                        <div className="col-2">:</div>
                        <div className="col-6 modal_subheading1">{selectedComplaint.userId?.phone}</div>
                      </div>
                      <div className="row text-left m-2">
                        <div className="col-4 modal_subheading"><label>Address</label></div>
                        <div className="col-2">:</div>
                        <div className="col-6 modal_subheading1">{selectedComplaint.userId?.address}</div>
                      </div>
                      <div className="row text-left m-2">
                        <div className="col-4 modal_subheading"><label>Pincode</label></div>
                        <div className="col-2">:</div>
                        <div className="col-6 modal_subheading1">{selectedComplaint.shopId?.pincode}</div>
                      </div>
                    </div>
                    <div className="modal_second_mainheading">
                      <p>Shop Name : {selectedComplaint.shopId?.shopname}</p>
                      {/* <p>Delivered on {formatDate(selectedComplaint.date)}</p> */}
                    </div>
                  </div>
                  <div>
                    <h5 className="modal_second_mainheading float-start">Registered Complaints</h5>
                    <textarea className="float-start form-control p-4 modal_textarea" readOnly>
                      {selectedComplaint?.complaint}
                    </textarea>
                  </div>
                </div>
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Complaints;
