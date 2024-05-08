import React from "react";
import "./Homethird.css";
import img from "../../Assets/regrental.png";
import img2 from "../../Assets/easyrent.png";
import img3 from "../../Assets/support.png";
import img4 from "../../Assets/growth.png";
import img5 from "../../Assets/work.png";
import img6 from "../../Assets/commission.png";

export default function Homethird() {
  return (
    <div className="homethird-main">
      <div className="container">
        <div className="row">
          <h3 className="main-head">Manage your property with ease</h3>
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 homethird-firstleft">
              <img src={img} alt="image" width="150px" height="150px" />
              <h5>Quick Registration</h5>
              <p>
                "Get Started in Seconds: Easy and Fast Registration Process!"
              </p>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 homethird-firstleft ">
              <img src={img2} alt="image" width="150px" height="150px" />
              <h5>Easy property import</h5>
              <p>
                "Seamless Start: Import your properties effortlessly and begin
                managing with ease!"
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 homethird-firstleft">
              <img src={img3} alt="image" width="130px" height="150px" />
              <h5>Robust support</h5>
              <p>
                "Empower Your Property Journey: With our robust support, you're
                never alone in managing your rentals successfully!"
              </p>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 homethird-firstleft ">
              <img src={img4} alt="image" width="150px" height="150px" />
              <h5>Secure growth</h5>
              <p>
                "Experience Secure Growth: Your property ventures thrive under
                our watchful and secure management."
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 homethird-firstleft">
              <img src={img5} alt="image" width="150px" height="150px" />
              <h5>Streamlined work</h5>
              <p>
                "Effortlessly Efficient: Our platform ensures streamlined work,
                making property management a breeze for you."
              </p>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 homethird-firstleft ">
              <img src={img6} alt="image" width="130px" height="160px" />
              <h5>Clarity in Payments</h5>
              <p>
                "Clarity in Payments: Understand precisely what and to whom
                you're paying, ensuring transparency and confidence in your
                transactions."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
