import React, { useEffect, useState } from 'react'
import Shopnav from '../../Navbar/Shopnav'
import Showdropdown from '../Shopdropdown'
import '../Orders/ShopViewOrder.css';
import Product_img from '../../../Assets/image 41.jpg';
import axiosInstance from '../../Constants/Baseurl';

function ShopViewOrder() {
    const shopId=localStorage.getItem("shopid")
    const[data,setData]=useState([])
    const url = axiosInstance.defaults.url;

    console.log(shopId);

    useEffect(()=>{
        axiosInstance.post(`viewOrdersByShopId/${shopId}`)
        .then((result)=>{
            console.log(result);
            setData(result.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
  return (
    <div><Shopnav /><Showdropdown />


{data && data.length ? (
            data.map((a) => {
              return (

      <div className='back_ground ms-5 mb-2 mt-3 container '>
        <div className='col'>
          <div className='row'>
            <div className='col'>
              <img className='mt-5 ms-3 img-fluid product_img' 
              src={`${url}/${a?.furnitureId?.image1?.filename}`}
 />
            </div>
            <div className='col-8'>
              <div className='row'>
                <div className='col mt-5'>
                  <p className='Furniture_text'>Furniture details</p>
                  <div className='row mt-4'>
                    <div className='col Furniture_details_text'><p>Furniture Type :</p></div>
                    <div className='col Furniture_details_text2'><p>{a?.furnitureId?.category}</p></div>
                  </div>
                  <div className='row'>
                    <div className='col Furniture_details_text'><p>Quantity:</p></div>
                    <div className='col Furniture_details_text2'><p>{a?.count}</p></div>
                  </div>
                  <div className='row'>
                    <div className='col Furniture_details_text'><p>Dimension :</p></div>
                    <div className='col Furniture_details_text2'><p>{a?.furnitureId?.dimension}</p></div>
                  </div>
                  <div className='row'>
                    <div className='col Furniture_details_text'><p>price :</p></div>
                    <div className='col Furniture_details_text2'><p>{a?.amount}</p></div>
                  </div>
                </div>
                <div className='col mt-5'>
                  <p className='Customer_text'>Customer information</p>
                  <div className='row mt-4'>
                    <div className='col Furniture_details_text'><p>Name:</p></div>
                    <div className='col Furniture_details_text2'><p>{a?.customerId?.name} </p></div>
                  </div>
                  <div className='row'>
                    <div className='col Furniture_details_text'><p>Email:</p></div>
                    <div className='col Furniture_details_text2'><p>{a?.customerId?.email}</p></div>
                  </div>
                  <div className='row'>
                    <div className='col Furniture_details_text'><p>Phone number :</p></div>
                    <div className='col Furniture_details_text2'><p>{a?.customerId?.phone}</p></div>
                  </div>
                  <div className='row'>
                    <div className='col Furniture_details_text'><p>Address :</p></div>
                    <div className='col Furniture_details_text2'><p>{a?.customerId?.address}</p></div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className=' row  mt-5 col' style={{ paddingLeft: '100px' }}> <div className='col'>
                  <button className='Accept_bg Accept_text ri-checkbox-line'>Approve</button>
                </div>
                  <div className='col'>
                    <button className='Reject_bg Reject_text ri-close-circle-line'>Reject</button>
                  </div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
              );
            })
          ) : (
            <div className="viewcounsellor-lottiereqq">No request found</div>
          )}


      {/* <div className='back_ground ms-5 mb-2 mt-3 container '>
        <div className='col'>
          <div className='row'>
            <div className='col'>
              <img className='mt-5 ms-3 img-fluid product_img' src={Product_img} />
            </div>
            <div className='col-8'>
              <div className='row'>
                <div className='col mt-5'>
                  <p className='Furniture_text'>Furniture details</p>
                  <div className='row mt-4'>
                    <div className='col Furniture_details_text'><p>Furniture Type :</p></div>
                    <div className='col Furniture_details_text2'><p>Sofa</p></div>
                  </div>
                  <div className='row'>
                    <div className='col Furniture_details_text'><p>Quantity:</p></div>
                    <div className='col Furniture_details_text2'><p>Sofa</p></div>
                  </div>
                  <div className='row'>
                    <div className='col Furniture_details_text'><p>Dimension :</p></div>
                    <div className='col Furniture_details_text2'><p>72L*72B</p></div>
                  </div>
                  <div className='row'>
                    <div className='col Furniture_details_text'><p>price :</p></div>
                    <div className='col Furniture_details_text2'><p>20,000</p></div>
                  </div>
                </div>
                <div className='col mt-5'>
                  <p className='Customer_text'>Customer information</p>
                  <div className='row mt-4'>
                    <div className='col Furniture_details_text'><p>Name:</p></div>
                    <div className='col Furniture_details_text2'><p>Ashok N K </p></div>
                  </div>
                  <div className='row'>
                    <div className='col Furniture_details_text'><p>Email:</p></div>
                    <div className='col Furniture_details_text2'><p>ashok23@gmail.com</p></div>
                  </div>
                  <div className='row'>
                    <div className='col Furniture_details_text'><p>Phone number :</p></div>
                    <div className='col Furniture_details_text2'><p>023456789</p></div>
                  </div>
                  <div className='row'>
                    <div className='col Furniture_details_text'><p>Address :</p></div>
                    <div className='col Furniture_details_text2'><p>2/12A Near New Bus Stand Marthandam</p></div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className=' row  mt-5 col' style={{ paddingLeft: '100px' }}> <div className='col'>
                  <button className='Accept_bg Accept_text ri-checkbox-line'>dfdw</button>
                </div>
                  <div className='col'>
                    <button className='Reject_bg Reject_text ri-close-circle-line'>Reject</button>
                  </div></div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className='back_ground ms-5 mb-2 mt-3 container '>
        <div className='col'>
          <div className='row'>
            <div className='col'>
              <img className='mt-5 ms-3 img-fluid product_img' src={Product_img} />
            </div>
            <div className='col-8'>
              <div className='row'>
                <div className='col mt-5'>
                  <p className='Furniture_text'>Furniture details</p>
                  <div className='row mt-4'>
                    <div className='col Furniture_details_text'><p>Furniture Type :</p></div>
                    <div className='col Furniture_details_text2'><p>Sofa</p></div>
                  </div>
                  <div className='row'>
                    <div className='col Furniture_details_text'><p>Quantity:</p></div>
                    <div className='col Furniture_details_text2'><p>Sofa</p></div>
                  </div>
                  <div className='row'>
                    <div className='col Furniture_details_text'><p>Dimension :</p></div>
                    <div className='col Furniture_details_text2'><p>72L*72B</p></div>
                  </div>
                  <div className='row'>
                    <div className='col Furniture_details_text'><p>price :</p></div>
                    <div className='col Furniture_details_text2'><p>20,000</p></div>
                  </div>
                </div>
                <div className='col mt-5'>
                  <p className='Customer_text'>Customer information</p>
                  <div className='row mt-4'>
                    <div className='col Furniture_details_text'><p>Name:</p></div>
                    <div className='col Furniture_details_text2'><p>Ashok N K </p></div>
                  </div>
                  <div className='row'>
                    <div className='col Furniture_details_text'><p>Email:</p></div>
                    <div className='col Furniture_details_text2'><p>ashok23@gmail.com</p></div>
                  </div>
                  <div className='row'>
                    <div className='col Furniture_details_text'><p>Phone number :</p></div>
                    <div className='col Furniture_details_text2'><p>023456789</p></div>
                  </div>
                  <div className='row'>
                    <div className='col Furniture_details_text'><p>Address :</p></div>
                    <div className='col Furniture_details_text2'><p>2/12A Near New Bus Stand Marthandam</p></div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className=' row  mt-5 col' style={{ paddingLeft: '100px' }}> <div className='col'>
                  <button className='Accept_bg Accept_text ri-checkbox-line'>dfdw</button>
                </div>
                  <div className='col'>
                    <button className='Reject_bg Reject_text ri-close-circle-line'>Reject</button>
                  </div></div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className='back_ground ms-5 mb-2 mt-3 container '>
        <div className='col'>
          <div className='row'>
            <div className='col'>
              <img className='mt-5 ms-3 img-fluid product_img' src={Product_img} />
            </div>
            <div className='col-8'>
              <div className='row'>
                <div className='col mt-5'>
                  <p className='Furniture_text'>Furniture details</p>
                  <div className='row mt-4'>
                    <div className='col Furniture_details_text'><p>Furniture Type :</p></div>
                    <div className='col Furniture_details_text2'><p>Sofa</p></div>
                  </div>
                  <div className='row'>
                    <div className='col Furniture_details_text'><p>Quantity:</p></div>
                    <div className='col Furniture_details_text2'><p>Sofa</p></div>
                  </div>
                  <div className='row'>
                    <div className='col Furniture_details_text'><p>Dimension :</p></div>
                    <div className='col Furniture_details_text2'><p>72L*72B</p></div>
                  </div>
                  <div className='row'>
                    <div className='col Furniture_details_text'><p>price :</p></div>
                    <div className='col Furniture_details_text2'><p>20,000</p></div>
                  </div>
                </div>
                <div className='col mt-5'>
                  <p className='Customer_text'>Customer information</p>
                  <div className='row mt-4'>
                    <div className='col Furniture_details_text'><p>Name:</p></div>
                    <div className='col Furniture_details_text2'><p>Ashok N K </p></div>
                  </div>
                  <div className='row'>
                    <div className='col Furniture_details_text'><p>Email:</p></div>
                    <div className='col Furniture_details_text2'><p>ashok23@gmail.com</p></div>
                  </div>
                  <div className='row'>
                    <div className='col Furniture_details_text'><p>Phone number :</p></div>
                    <div className='col Furniture_details_text2'><p>023456789</p></div>
                  </div>
                  <div className='row'>
                    <div className='col Furniture_details_text'><p>Address :</p></div>
                    <div className='col Furniture_details_text2'><p>2/12A Near New Bus Stand Marthandam</p></div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className=' row  mt-5 col' style={{ paddingLeft: '100px' }}> <div className='col'>
                  <button className='Accept_bg Accept_text ri-checkbox-line'>dfdw</button>
                </div>
                  <div className='col'>
                    <button className='Reject_bg Reject_text ri-close-circle-line'>Reject</button>
                  </div></div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default ShopViewOrder