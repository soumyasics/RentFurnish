import React, { useEffect, useState } from 'react'
import "./Viewreviews.css"
import { Link } from 'react-router-dom';
import axiosInstance from '../../Constants/Baseurl';

function Viewreviews({handleClose,id}) {
    console.log(id);

    const [data,setData]=useState([])

    useEffect(()=>{
        axiosInstance.post(`viewAllreviewsByFurnitureId/${id}`)
        .then((res)=>{
            console.log(res);
            setData(res.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
  return (
    <div className='viewreview-main'>
        <div className='viewreview-userbox'><Link onClick={handleClose} style={{textDecoration:"none"}}><span className='ri-arrow-left-line'/></Link>
            <div className='viewreview-userbox-scroll'>
                <div className='row'>


                {data && data.length ? (
            data.map((a) => (

                    <div className='col-12 reviews-main'>
                        <div className='reviews-main-box'>
                            <p>{a?.review}</p>
                            <h6 className='ri-user-line'>{a?.customerId?.name} {new Date(a?.date).toLocaleDateString()}</h6>
                        </div>
                    </div>
                                ))
                            ) : (
                              <div className="viewcounsellor-lottiereqq">No Reviews found</div>
                            )}
                  


                </div>
            </div>
        </div>
    </div>
  )
}

export default Viewreviews