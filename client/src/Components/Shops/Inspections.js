import React, { useState, useEffect } from 'react';
import Shopnav from '../Navbar/Shopnav';
import Showdropdown from './Shopdropdown';
import placeholderimg from '../../Assets/addfurniture_sub.png';
import './Inspections.css';
import axiosInstance from '../Constants/Baseurl';
import { toast } from 'react-toastify';

function Inspections() {
  const [inspections, setInspections] = useState([]);
  const shopId = localStorage.getItem("shopid");
  const [fineAmount, setFineAmount] = useState('');
  const [finalAmount, setFinalAmount] = useState('');

  useEffect(() => {
    axiosInstance.post(`/viewInspectionByShopId/${shopId}`)
      .then((result) => {
        setInspections(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [shopId]);

  const handleUpdate = (id, returnId) => {
    axiosInstance.post(`/editInspectionById/${id}`, {
      fineAmount,
      finalAmount,
      returnId
    })
      .then((res) => {
        if (res.data.status === 200) {
          axiosInstance.post(`/updateInspectionStatus/${returnId}`, {
            inspectionStatus: "Confirmed",
            fineAmount,
            finalAmount
          })
            .then((response) => {
              if (response.data.status === 200) {
                toast.success("Submitted successfully");
                window.location.reload();
                axiosInstance.post(`/viewInspectionByShopId/${shopId}`)
                  .then((result) => {
                    setInspections(result.data.data);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                console.log("Failed to update inspection status");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          toast.error("Failed to update inspection");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error updating inspection");
      });
  };

  const calculateRentDays = (deliveryDate, returnDate) => {
    const start = new Date(deliveryDate);
    const end = new Date(returnDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleFineAmountChange = (e) => {
    setFineAmount(e.target.value);
    const fineAmt = parseFloat(e.target.value) || 0;
    inspections.forEach((order) => {
      const deviatedAmt = parseFloat(order?.returnId?.deviatedAmt) || 0;
      const totalRentAmount = parseFloat(order?.returnId?.totalRentAmount) || 0;
      const calculatedAmount = Math.abs(deviatedAmt + fineAmt);
      const depositAmnt = parseFloat(order?.orderId?.amount) || 0;

      if (deviatedAmt < 0) {
        setFinalAmount(totalRentAmount + fineAmt);
      } else {
        setFinalAmount(totalRentAmount + fineAmt - depositAmnt);
      }
    });
  };

  return (
    <div>
      <Shopnav />
      <Showdropdown />
      {inspections?.length ? (
        inspections.map((order) => {
          const deviatedAmt = parseFloat(order?.returnId?.deviatedAmt) || 0;
          const fineAmt = parseFloat(fineAmount) || 0;
          const calculatedAmount = Math.abs(deviatedAmt + fineAmt);

          return (
            <div key={order._id} className="inspection_back_ground ms-5 mb-2 mt-3 container">
              <div>
                <div className="row">
                  <div className="col">
                    <img
                      className="mt-5 ms-3 img-fluid product_img"
                      src={`${axiosInstance.defaults.url}/${order?.furnitureId?.image1?.filename}`}
                      alt="Product"
                    />
                  </div>
                  <div className="col-8">
                    <div className="row">
                      <div className="col mt-5">
                        <p className="Furniture_text">Furniture details</p>
                        <div className="row mt-4">
                          <div className="col Furniture_details_text">
                            <p>Furniture Type :</p>
                          </div>
                          <div className="col Furniture_details_text2">
                            <p>{order?.furnitureId?.category}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col Furniture_details_text">
                            <p>Quantity:</p>
                          </div>
                          <div className="col Furniture_details_text2">
                            <p>{order?.orderId?.count}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col Furniture_details_text">
                            <p>Dimension :</p>
                          </div>
                          <div className="col Furniture_details_text2">
                            <p>{order.furnitureId?.dimension}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col mt-5">
                        <p className="Customer_text">Customer information</p>
                        <div className="row mt-4">
                          <div className="col Furniture_details_text">
                            <p>Name:</p>
                          </div>
                          <div className="col Furniture_details_text2">
                            <p>{order.customerId?.name}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col Furniture_details_text">
                            <p>Email:</p>
                          </div>
                          <div className="col Furniture_details_text2">
                            <p>{order.customerId?.email}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col Furniture_details_text">
                            <p>Phone number :</p>
                          </div>
                          <div className="col Furniture_details_text2">
                            <p>{order.customerId?.phone}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col Furniture_details_text">
                            <p>Address :</p>
                          </div>
                          <div className="col Furniture_details_text2">
                            <p>{order.customerId?.address}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <textarea className='form-control p-3 mt-4' readOnly>
                          {order.prodCondition}
                        </textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row m-5'>
                  <div className='col-6'>
                    <p className="Customer_text">Photo Uploaded</p>
                    <div className='row'>
                      <div className='col-4'>
                        <img src={order?.image1?.filename ? `${axiosInstance.defaults.url}/${order?.image1?.filename}` : placeholderimg} className='img-fluid inspection_radius_img'></img>
                      </div>
                      <div className='col-4'>
                        <img src={order?.image2?.filename ? `${axiosInstance.defaults.url}/${order?.image2?.filename}` : placeholderimg} className='img-fluid inspection_radius_img'></img>
                      </div>
                      <div className='col-4'>
                        <img src={order?.image3?.filename ? `${axiosInstance.defaults.url}/${order?.image3?.filename}` : placeholderimg} className='img-fluid inspection_radius_img'></img>
                      </div>
                    </div>
                    <div className='row mt-4'>
                      <div className='col-4'>
                        <img src={order?.image4?.filename ? `${axiosInstance.defaults.url}/${order?.image4?.filename}` : placeholderimg} className='img-fluid inspection_radius_img'></img>
                      </div>
                      <div className='col-4'>
                        <img src={order?.image5?.filename ? `${axiosInstance.defaults.url}/${order?.image5?.filename}` : placeholderimg} className='img-fluid inspection_radius_img'></img>
                      </div>
                      <div className='col-4'>
                        <img src={order?.image6?.filename ? `${axiosInstance.defaults.url}/${order?.image6?.filename}` : placeholderimg} className='img-fluid inspection_radius_img'></img>
                      </div>
                    </div>
                  </div>
                  <div className='col-6'>
                    <p className="Customer_text pb-3">Add Fine</p>
                    <div className='row'>
                      <div className='col-6'>
                        <p className="inspection_fine_text">Rent Date </p>
                        <p>{new Date(order?.orderId?.deliveryDate).toLocaleDateString()} - {new Date(order?.returnId?.returnDate).toLocaleDateString()}</p>
                      </div>
                      <div className='col-6'>
                        <p className="inspection_fine_text">Total Days of Rent </p>
                        <p>{calculateRentDays(order?.orderId?.deliveryDate, order?.returnId?.returnDate)}</p>
                      </div>

                      <div className='col-6'>
                        <p className="inspection_fine_text">Total Rent Amount </p>
                        <input
                          type='text'
                          className='form-control form-control-lg'
                          value={order?.returnId?.totalRentAmount}
                          readOnly
                        />
                      </div>
                      <div className='col-6'>
                        <p className="inspection_fine_text">Fine Amount </p>
                        <input
                          type='text'
                          className='form-control form-control-lg'
                          value={fineAmount}
                          onChange={handleFineAmountChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='row mt-3'>
                      <div className='col-6'>
                        <p className="inspection_fine_text">Deposit Amount </p>
                        <input
                          type='text'
                          className='form-control form-control-lg'
                          value={order?.orderId?.amount}
                          readOnly
                        />
                      </div>
                      <div className='col-6'>
                        {order?.returnId?.deviatedAmt < 0 ? (
                          <p className="inspection_fine_text">Shop Payable Amount</p>
                        ) : (
                          <p className="inspection_fine_text">Customer Payable Amount</p>
                        )}
                        <input
                          type='text'
                          className='form-control form-control-lg'
                          value={calculatedAmount}
                          readOnly
                        />
                      </div>
                      <div className='col-6'>
                        <p className="inspection_fine_text">Final Amount </p>
                        <input
                          type='text'
                          className='form-control form-control-lg'
                          value={finalAmount}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center m-4">
                  <button type="submit" className="btn btn-warning" onClick={() => handleUpdate(order._id, order.returnId._id)}>
                    &nbsp;&nbsp; Confirm &nbsp;&nbsp;
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h1 className='ps-5 pt-5'>No inspections available</h1>
      )}
    </div>
  );
}

export default Inspections;