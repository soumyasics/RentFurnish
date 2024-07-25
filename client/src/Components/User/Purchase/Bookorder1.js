import React, { useEffect, useState } from "react";
import "../../User/Purchase/Bookorder1.css";
import Vector from "../../../Assets/Vector.png";
import Likeimg from "../../../Assets/Likeimg.png";
import Group_img from "../../../Assets/Group 79.png";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../Constants/Baseurl";
import { toast } from "react-toastify";
import ReactStars from "react-rating-stars-component";
import StarReview from "react-star-review";
import Viewreviews from "../Furnitures/Viewreviews";

function Bookorder1() {
  const { id } = useParams();
  const userid = localStorage.getItem("userid");
  const [data, setData] = useState({});
  const [totalRent, setTotalRent] = useState(0);
  const url = axiosInstance.defaults.url;
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [noOfDays, setNoOfDays] = useState("");
  const [rating, setRating] = useState(0);
  const [addreview, setAddreview] = useState({
    customerId: userid,
    furnitureId: id,
    shopId: "",
    review: "",
  });

  useEffect(() => {
    axiosInstance
      .post(`viewFurnitureById/${id}`)
      .then((result) => {
        console.log("API Response:", result);
        const fetchedData = result.data.data;
        setData(fetchedData);
        setTotalRent(fetchedData.rent);
        setAddreview((prevReview) => ({
          ...prevReview,
          shopId: fetchedData.shopId,
        }));
      })
      .catch((err) => {
        console.log("API Error:", err);
      });
  }, [id]);

  // Log the data.rating value and its type
  useEffect(() => {
    if (data.rating !== undefined) {
      console.log("Rating Value:", data.rating);
      console.log("Rating Type:", typeof data.rating);
    }
  }, [data]);

  const navigateBackFn = () => {
    navigate(-1);
  };

  const Add = () => {
    if (count < data.quantity) {
      setCount(count + 1);
      setTotalRent((count + 1) * data.rent);
    } else {
      toast.info(`Only ${data.quantity} products are available`);
    }
  };

  const Sub = () => {
    if (count > 1) {
      setCount(count - 1);
      setTotalRent((count - 1) * data.rent);
    }
  };

  const changeFn = (e) => {
    setNoOfDays(e.target.value);
  };

  const handleBookNow = (e) => {
    e.preventDefault();
    if (noOfDays === "") {
      toast.error("Please enter the number of days required.");
      return;
    }
    navigate("/user-confirmpurchase", {
      state: { id, totalRent, count, noOfDays },
    });
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleratingsubmit = () => {
    return axiosInstance
      .post(`addRating/${id}`, { rating })
      .then((result) => {
        console.log("Rating API Response:", result);
        // toast.success("Rating added successfully");
      })
      .catch((err) => {
        console.log("Rating API Error:", err);
        toast.error("Failed to add rating");
      });
  };

  const handlereviewchange = (e) => {
    setAddreview({
      ...addreview,
      [e.target.name]: e.target.value,
    });
  };

  const handlereviewsubmit = () => {
    return axiosInstance
      .post("addReview", addreview)
      .then((result) => {
        console.log("Review API Response:", result);
        if (result.data.status === 200) {
          toast.success("Added successfully");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log("Review API Error:", err);
        toast.error("Failed to add review");
      });
  };

  const handleBothSubmits = async (event) => {
    event.preventDefault();
    try {
      await handleratingsubmit();
      await handlereviewsubmit();
    } catch (error) {
      console.error("Error in submitting rating and review:", error);
    }
  };

  //modal for view reviews
  const [showreview, setshowreview] = useState(false);

  const closeModal = () => {
    setshowreview(false);
  };

  const handleOpenreview = () => {
    setshowreview(true);
  };

  const handleClosereview = () => {
    setshowreview(false);
  };



  return (
    <div>
      <div className="d-flex flex-row mt-5">
        <img
          className="ms-5 backimg"
          src={Vector}
          onClick={navigateBackFn}
          alt="Back"
        />
        <div className="ms-2 p-2 bookorder">View details</div>
      </div>
      <form onSubmit={handleBookNow}>
        <div className="row col-12 continer">
          <div className="col-md-6 img-fluid">
            <img
              className="img-fluid purchanse-mainimage"
              src={`${url}/${data?.image1?.filename}`}
              width="758px"
              height="390px"
              alt="Main Furniture"
            />
            <div className="row book-imagedown">
              <div className="col-sm-6 col-lg-4 p-2">
                {data?.image2?.filename && (
                  <img
                    className="img-fluid"
                    src={`${url}/${data.image2.filename}`}
                    alt="Sub Furniture 2"
                  />
                )}
              </div>
              <div className="col-sm-6 col-lg-4 p-2">
                {data?.image3?.filename && (
                  <img
                    className="img-fluid"
                    src={`${url}/${data.image3.filename}`}
                    alt="Sub Furniture 3"
                  />
                )}
              </div>
              <div className="col-sm-6 col-lg-4 p-2">
                {data?.image4?.filename && (
                  <img
                    className="img-fluid"
                    src={`${url}/${data.image4.filename}`}
                    alt="Sub Furniture 4"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6 continer ps-5">
            <p className="beadtext">{data?.name}</p>
            <div className="d-flex flex-row mb-3">
              <div className="p-2 Avilabel_text">Available</div>
              <div className="p-2">
                <img src={Group_img} alt="Group" />
              </div>
            </div>
            <div className="">
              <div className="d-flex mb-5">
                <div>₹</div>
                <div className="fw-bold">{totalRent}</div>
                <div>/Month</div>
              </div>
            </div>
            <div className="mb-5">
              <p className="Quantity_text">Quantity</p>
              <div className="d-flex mb-3">
                <div className="p-2 quantity_btnLeft">
                  <button
                    type="button"
                    onClick={Sub}
                    className="btn btn-danger"
                  >
                    <FaChevronCircleLeft />
                  </button>
                </div>
                <div className="p-2 quantity_input col-2">
                  <input
                    type="text"
                    className="form-control text-center"
                    value={count}
                    readOnly
                  />
                </div>
                <div className="p-2 quantity_btnRight">
                  <button
                    type="button"
                    onClick={Add}
                    className="btn btn-success"
                  >
                    <FaChevronCircleRight />
                  </button>
                </div>
              </div>
            </div>
            <div className="mb-5">
              <p className="Quantity_text">No Of Days Required</p>
              <div className="d-flex mb-3">
                <div className="p-2 quantity_input col-2">
                  <input
                    type="number"
                    className="form-control text-center"
                    min="1"
                    name="noOfDays"
                    value={noOfDays}
                    onChange={changeFn}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <p className="quantity_text">
                Dimensions<p className="quantity_text2">{data?.dimension}</p>
              </p>
            </div>
            <div className="">
              <p className="Description_text mt-4">Description</p>
              <p className="content col-6">{data?.description}</p>
            </div>
            <div className="">
              <button
                className="book book_text shadow-lg btn btn-warning"
                type="submit"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="row mt-5 mb-5">
        <div className="col-md-6">
          <h1 className="Rating">Ratings & Reviews</h1>
          <div className="continer">
            <div className="col-12">
              <div className="cont mt-3 mb-3">
                <div className="continer">
                  <div className="d-flex mb-3">
                    <div className="p-2">
                      {data.rating !== undefined && (
                        <StarReview
                          rating={Number(data.rating)}
                          numberOfStars={5}
                        />
                      )}
                      {/* {data.rating} */}
                    </div>
                   
                    {/* <div className="col-12 mt-2 ps-5">Good Product</div> */}
                  </div>
                  <div>
                    <p>{data.rating < 2 && "Low Rating"}
                      {data.rating >= 2 && data.rating < 4 && "Good Product"}
                      {data.rating === 5 && "Excellent Product"}
                      </p>
                  </div>
                  <div className="d-flex align-items-end ms-1">
                    <p>
                      <MdOutlineVerifiedUser size={20} />
                    </p>
                    <p className="ms-2">Verified purchase</p>
                    {/* <p className="ms-5">. Feb, 2024</p> */}
                  </div>
                  <div className="button-viewbookedorder" onClick={handleOpenreview}>
                    View Reviews
                  </div>
                </div>
              </div>
              {/* Repeat for other reviews */}
            </div>
          </div>
        </div>
        <div
          className="col-md-6 mx-auto p-2 text-center"
          style={{ width: "300px" }}
        >
          <button
            className="rate_product_button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <p className="rate_product_heading">Rate Product</p>
          </button>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modal_content_main">
            <form onSubmit={handleBothSubmits}>
              <h5 className="text-center modal_font_color">Add Rating</h5>
              <div className="rating-stars">
                <ReactStars
                  count={5}
                  value={rating}
                  size={24}
                  activeColor="#ffd700"
                  onChange={handleStarClick} // Allows user to select rating
                />
              </div>
              <h5 className="text-center modal_font_color">Add Comments</h5>
              <textarea
                className="form-control mb-3 modal_text_area"
                rows="3"
                name="review"
                value={addreview.review}
                onChange={handlereviewchange}
                required
              />
              <button type="submit" className="submit-btn mx-auto d-block">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      {showreview && (
        <div className="modal-overlay">
          <Viewreviews show={showreview} handleClose={handleClosereview} id={id}/>
        </div>
      )}

    </div>
  );
}

export default Bookorder1;
