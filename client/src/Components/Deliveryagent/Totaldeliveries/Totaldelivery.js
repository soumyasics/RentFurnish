import React, { useEffect, useState } from "react";
import Shopnav from "../../Navbar/Shopnav";
import axiosInstance from "../../Constants/Baseurl";

function Totaldelivery() {
  const [delivery, setDelivery] = useState([]);
  const id = localStorage.getItem("deliveryid");

  useEffect(() => {
    axiosInstance
      .post(`viewTotalOrderByDeliberyId/${id}`)
      .then((res) => {
        console.log(res);
        setDelivery(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Shopnav />
      <div className="container">
        <div className="viewcomplaints-head">
          <div className="col-sm-11 d-flex justify-content-end ms-5">
            <div className="border col-sm-12 col-md-12 col-lg-12 ms-5 mt-5 rounded-2 shadow-lg">
              <div className="table-responsive-md">
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">
                        <p className="Complain_head_text">SI No</p>
                      </th>
                      <th scope="col">
                        <p className="Complain_head_text">Furniture Name</p>
                      </th>
                      <th scope="col">
                        <p className="Complain_head_text">Customer Name</p>
                      </th>
                      {/* <th scope="col"><p className='Complain_head_text'>Rent Date</p></th> */}
                      <th scope="col">
                        <p className="Complain_head_text">Delivery Date</p>
                      </th>
                      <th scope="col">
                        <p className="Complain_head_text">Delivery Address</p>
                      </th>
                    </tr>
                  </thead>
                  {delivery && delivery?.length ? (
                    delivery.slice().reverse().map((order,index) => {
                      return (
                        <tbody>
                          <tr>
                            <th scope="row">
                              <p className="Complain_body_text">{index+1}</p>
                            </th>
                            <td>
                              <p className="Complain_body_text">{order?.furnitureId?.name}</p>
                            </td>
                            <td>
                              <p className="Complain_body_text">{order?.customerId?.name}</p>
                            </td>
                            <td>
                              <p className="Complain_body_text">{new Date(order?.completionDate).toLocaleDateString()}</p>
                            </td>
                            <td>
                              <p className="Complain_body_text">{order?.address}</p>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })
                  ) : (
                    <h1 className="ps-5 pt-5">No Orders available</h1>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Totaldelivery;
