import React, { useEffect, useState } from 'react';
import Showdropdown from './Shopdropdown';
import Shopnav from '../Navbar/Shopnav';
import img from '../../Assets/comp.png';
import axiosInstance from '../Constants/Baseurl';
import axiosMultipartInstance from '../Constants/FormDataUrl';
import { toast } from 'react-toastify';

function ReturnRequest() {
  const [data, setData] = useState([]);
  const url = axiosInstance.defaults.url;
  const shopId = localStorage.getItem("shopid");
  const [selectedDeliveryAgent, setSelectedDeliveryAgent] = useState({});
  const [deliveryDate, setDeliveryDate] = useState({});
  const [returnStatus, setReturnStatus] = useState({});
  const [delivery, setDelivery] = useState([]);


  useEffect(() => {
    axiosInstance.post(`/viewPendingReturnByShopId/${shopId}`)
      .then(response => {
        if (response.data.status === 200) {
          setData(response.data.data);
        } else {
          console.log('No data obtained');
        }
      })
      .catch(error => {
        console.error('Error fetching furniture data:', error);
      });
  }, []);
  
  useEffect(() => {
  },[])
  const handleApprove = (returnId) => {
    setReturnStatus((prevStatus) => ({
      ...prevStatus,
      [returnId]: true,
    }));
  };

  const handleReject = (returnId) => {

  };

  useEffect(() => {
    axiosInstance
      .post(`viewActiveDeliveryAgentbyShopid/${shopId}`)
      .then((result) => {
        console.log(result);
        setDelivery(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [shopId]);

  const handleDeliveryAgentChange = (e, returnId) => {
    const { value } = e.target;
    setSelectedDeliveryAgent((prevState) => ({
      ...prevState,
      [returnId]: value,
    }));
  };

  const handleDeliveryDateChange = (e, returnId) => {
    const { value } = e.target;
    setDeliveryDate((prevState) => ({
      ...prevState,
      [returnId]: value,
    }));
  };

  const assigndelfn = (e, returnId) => {
    e.preventDefault();
    const deliveryAgentId = selectedDeliveryAgent[returnId];
    const date = deliveryDate[returnId];
    if (!deliveryAgentId || !date) {
      toast.warning("Please select a delivery agent and date before approving.");
      return;
    }
    axiosInstance
      .post(`assignreturnDeliveryAgent/${returnId}`, {
        deliveryId: deliveryAgentId,
        deliveryDate: date,
      })
      .then((response) => {
        console.log("Delivery agent assigned:", response);
        if(response.data.status === 200) {
          toast.success("Delivery Agent Successfully Assigned");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Shopnav />
      <Showdropdown />
      {console.log(data.length)}
      {data.length > 0 ? (
        data.map((furniture) => (
          
          <div key={furniture._id} className="back_ground ms-5 mb-2 mt-3 container">
            <div className="col">
              <div className="row">
                <div className="col">
                  {console.log(furniture.returnStatus)}
                  <img
                    className="mt-5 ms-3 img-fluid product_img"
                    src={`${url}/${furniture?.furnitureId?.image1?.filename}`}

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
                          {furniture?.furnitureId?.category}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col Furniture_details_text">
                          <p>Quantity:</p>
                        </div>
                        <div className="col Furniture_details_text2">
                          {furniture?.orderId?.count}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col Furniture_details_text">
                          <p>Dimension :</p>
                        </div>
                        <div className="col Furniture_details_text2">
                          {furniture?.furnitureId?.dimension}
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
                          {furniture?.customerId?.name}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col Furniture_details_text">
                          <p>Email:</p>
                        </div>
                        <div className="col Furniture_details_text2">
                          {furniture?.customerId?.email}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col Furniture_details_text">
                          <p>Phone number :</p>
                        </div>
                        <div className="col Furniture_details_text2">
                          {furniture?.customerId?.phone}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col Furniture_details_text">
                          <p>Address :</p>
                        </div>
                        <div className="col Furniture_details_text2">
                          {furniture?.customerId?.address}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {returnStatus[furniture._id] ? (
                      <div className="assign-delv-main">
                        <div>
                          <h6>Assign Delivery Agent</h6>
                        </div>
                        <div>
                          <select
                            className="assign-del-select"
                            value={selectedDeliveryAgent[furniture._id] || ""}
                            onChange={(e) => handleDeliveryAgentChange(e, furniture._id)}
                          >
                            <option hidden>Email</option>
                            {delivery.length ? (
                              delivery.map((a) => (
                                <option key={a._id} value={a._id}>
                                  {a.email}
                                </option>
                              ))
                            ) : (
                              <option>No Delivery Agent available</option>
                            )}
                          </select>
                        </div>
                        <div>
                          <h6>Date</h6>
                        </div>
                        <div className="d-flex">
                          <input
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            value={deliveryDate[furniture._id] || ""}
                            onChange={(e) => handleDeliveryDateChange(e, furniture._id)}
                          />
                          <button
                            type="button"
                            className="ri-checkbox-line"
                            onClick={(e) => assigndelfn(e, furniture._id)}
                          >
                            Assign
                          </button>
                        </div>
                        <div></div>
                      </div>
                    ) : (
                      <div
                        className="row mt-5 col"
                        style={{ paddingLeft: "100px" }}
                      >
                        <div className="col">
                          <button
                            className="Accept_bg Accept_text ri-checkbox-line"
                            type="button"
                            onClick={() => handleApprove(furniture._id)}
                          >
                            Approve
                          </button>
                        </div>
                        <div className="col">
                          <button
                            className="Reject_bg Reject_text ri-close-circle-line"
                            onClick={() => handleReject(furniture._id)}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="viewcounsellor-lottiereqq" style={{textAlign:"center"}}>No request found</div>
      )}
    </div>
  );
}

export default ReturnRequest;
