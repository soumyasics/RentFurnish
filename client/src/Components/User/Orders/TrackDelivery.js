import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import "./TrackDelivery.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../Constants/Baseurl";
import axiosMultipartInstance from "../../Constants/FormDataUrl";
import { toast } from "react-toastify";

function TrackDelivery() {
  const { id } = useParams();
  const userid = localStorage.getItem("userid");
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const url = axiosInstance.defaults.url;
  const [complaintText, setComplaintText] = useState("");

  useEffect(() => {
    if (!id) {
      navigate("/");
    } else {
      axiosMultipartInstance
        .post(`viewOrderById/${id}`)
        .then((res) => {
          console.log(res);
          setData(res.data.data);
          const sortedData = res.data.data.sort((a, b) => {
            const dateA = new Date(a.deliveryDate).setHours(0, 0, 0, 0);
            const dateB = new Date(b.deliveryDate).setHours(0, 0, 0, 0);
            return dateA - dateB;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id, navigate]);

  const handleComplaintSubmit = () => {
    if (!complaintText) {
      alert("Please enter a complaint.");
      return;
    }

    // if (!data || !data.shopId || !data.shopId._id) {
    //   toast.error("Shop ID not found.");
    //   return;
    // }

    const complaintData = {
      shopId: data.furnitureId.shopId,
      userId: userid,
      complaint: complaintText,
      furnitureId:data.furnitureId._id,
      date: new Date(),
    };

    axiosInstance
      .post("/createComplaint", complaintData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success("Complaint added successfully!");
          setComplaintText("");
        } else {
          toast.error("Failed to add complaint.");
        }
      })
      .catch((err) => {
        console.error("Failed to add complaint:", err);
        toast.error("Failed to add complaint.");
      });
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="track-delivery">
      <Link to="/user-viewmyorder" style={{ textDecoration: "none" }}>
        <h1 className="ri-arrow-left-line">Track Delivery</h1>
      </Link>
      <div className="trackdelivery-main_div">
        <div className="status-bar">
          <div className="status-item">
            <FaCheckCircle size={50} className="icon_style_track" />
            <p className="trackdelivery_track_status">Order confirmed</p>
            <p className="trackdelivery_date">
              {new Date(data?.orderDate).toLocaleDateString()}
            </p>
          </div>
          {
            data?.shopApproved==="rejected"?(
              <div className="status-item">
              <FaTimesCircle size={50} className="icon_style_rejected" />
              <p className="trackdelivery_track_status">
                  Shop Reject Your Request!
                </p>
              </div>
            ):(<></>)
          }
          {data?.deliveryDate ? (
            <>
              <div className="status-line"></div>
              <div className="status-item">
                <FaCheckCircle size={50} className="icon_style_track" />
                <p className="trackdelivery_track_status">
                  Order is in transit!
                </p>
                <p className="trackdelivery_date">
                  {new Date(data?.deliveryDate).toLocaleDateString()}
                </p>
              </div>
            </>
          ) : (
            <div></div>
          )}
          {data?.completionDate ? (
            <>
              <div className="status-line"></div>
              <div className="status-item">
                <FaCheckCircle size={50} className="icon_style_track" />
                <p className="trackdelivery_track_status">Delivered</p>
                <p className="trackdelivery_date">
                  {new Date(data?.completionDate).toLocaleDateString()}
                </p>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="row trackdelivery_main_row">
          <div className="col-md-7">
            <img
              src={`${url}/${data.furnitureId.image1.filename}`}
              className="img-fluid trackdelivery_img"
              alt={data.furnitureId.name}
            />
          </div>
          <div className="col-md-5 mt-3">
            <p className="trackdelivery_itemname">{data?.furnitureId?.name}</p>
            <p className="trackdelivery_amount">
              ₹{data?.furnitureId?.rent}/
              <span className="trackdelivery_span">Month</span>
            </p>
            <div className="row mt-3">
              <div className="col-6 trackdelivery_color">Deposit Amount:</div>
              <div className="col-6 text-black"> ₹{data?.amount?.toFixed(2)}/-</div>
            </div>
            <div className="row mt-3">
              <div className="col-6 trackdelivery_color">Quantity:</div>
              <div className="col-6 text-black"> {data?.count}</div>
            </div>
            <div className="row mt-3">
              <div className="col-6 trackdelivery_color">
                No of Days Required:
              </div>
              <div className="col-6 text-black"> {data?.noOfDays}</div>
            </div>

            <div className="row mt-3">
              <div className="col-6 trackdelivery_color">Dimensions:</div>
              <div className="col-6 text-black">
                {" "}
                {data?.furnitureId?.dimension}
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-4">
            <h4 className="trackdelivery_info mb-3">Customer information</h4>
            <div className="row mt-3">
              <div className="col-3 trackdelivery_subtext">Name</div>
              <div className="col-1">:</div>
              <div className="col-8">
                {data?.name ? data.name : data?.customerId?.name}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-3 trackdelivery_subtext">Email</div>
              <div className="col-1">:</div>
              <div className="col-8">
                {data?.email ? data.email : data?.customerId?.email}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-3 trackdelivery_subtext">Phone</div>
              <div className="col-1">:</div>
              <div className="col-8">
                {data?.contact ? data.contact : data?.customerId?.phone}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-3 trackdelivery_subtext">Address</div>
              <div className="col-1">:</div>
              <div className="col-8">
                {data?.address ? data.address : data?.customerId?.address}
              </div>
            </div>
          </div>
          {data?.deliveryId ? (
            <>
              <div className="col-md-4">
                <h4 className="trackdelivery_info mb-3">Delivery agent</h4>
                <div className="row">
                  <div className="col-5 trackdelivery_subtext">Name</div>
                  <div className="col-1">:</div>
                  <div className="col-6">{data?.deliveryId?.name}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-5 trackdelivery_subtext">
                    Vehicle type
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-6">{data?.deliveryId?.vehicleType}</div>
                </div>
                <div className="row mt-3">
                  <div className="col-5 trackdelivery_subtext">
                    Vehicle number
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-6">{data?.deliveryId?.vehicleNumber}</div>
                </div>
              </div>
              <div className="col-md-4">
                <h4 className="trackdelivery_info mb-3">
                  Delivery information
                </h4>
                <p className="text-justify">
                  Great news! Our team will reach out to finalize details within
                  2 days
                </p>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>

        <h4 className="trackdelivery_info mt-5">Register a Complaint</h4>
        <div className="complaint-box-container">
          <textarea
            rows={5}
            cols={100}
            className="trackdelivery_textarea"
            value={complaintText}
            onChange={(e) => setComplaintText(e.target.value)}
          ></textarea>
          <button onClick={handleComplaintSubmit}>
            <IoMdSend />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TrackDelivery;
