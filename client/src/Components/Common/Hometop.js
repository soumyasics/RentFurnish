import React from "react";
import "./Hometop.css";
import img from "../../Assets/livingroom.jpg";
import img2 from "../../Assets/Rectangle 24.png";
import img3 from "../../Assets/Rectangle.png";

function Hometop() {
  return (
    <div className="hometop-main">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6 hometop-main-left ">
            <h4>Welcome to Rental property Management System</h4>
            <p>
              <span>
                <span id="here">Here ,</span>we believe that building a strong
                professional network begins with your participation
              </span>
              <span id="">
                .We are,delight to offer a modern and user-friendly service to
                ensure you have the best experience.
              </span>
            </p>
            <h5 className="ri-service-fill">Our Rental Service Includes</h5>
            <h6 className="ri-arrow-right-double-fill">
              Search Assistance: Our team searches for available local
              properties and suggests options for your consideration.
            </h6>
            <h6 className="ri-arrow-right-double-fill">
              Application Support: We assist in preparing your application
              package and family profile for a strong submission to landlords.
            </h6>
            <h6 className="ri-arrow-right-double-fill">
              Rental Offer Submission: Our team takes care of submitting your
              rental offer, increasing your chances of securing your desired
              property.
            </h6>
            <h6 className="ri-arrow-right-double-fill">
              Lease Review: We thoroughly review the lease agreement to protect
              your interests and ensure clarity.
            </h6>
            <h6 className="ri-arrow-right-double-fill">
              Incheck Inspection: We’re present for the check-in inspection,
              ensuring the property meets your expectations.
            </h6>
            <h6 className="ri-arrow-right-double-fill">
              Exit Inspection Support: When it’s time to move out, we facilitate
              the exit inspection to ensure a smooth process.
            </h6>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 hometop-main-left ">
            <div className="carousel">
              <div
                id="carouselExampleInterval"
                class="carousel slide"
                data-bs-ride="carousel"
              >
                <div class="carousel-inner">
                  <div class="carousel-item active" data-bs-interval="10000">
                    <img src={img} class="d-block w-100" alt="..." />
                  </div>
                  <div class="carousel-item" data-bs-interval="2000">
                    <img src={img2} class="d-block w-100" alt="..." />
                  </div>
                  <div class="carousel-item">
                    <img src={img3} class="d-block w-100" alt="..." />
                  </div>
                </div>
                {/* <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleInterval"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button
                  class="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleInterval"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Next</span>
                </button> */}
              </div>
            </div>
            <div className="row rowhomeleft">
                <div className="col-sm-12 col-md-6 col-lg-6 ">
                    <button type="submit">Know More About Us !</button>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 ">
                <button type="submit">Get Started Now <span className="ri-arrow-right-line"></span> </button>
                </div>
                
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hometop;