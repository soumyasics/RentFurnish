import React from 'react'
import service from '../../../Assets/userhome_service.png'
import service1 from '../../../Assets/service1.png'
import service2 from '../../../Assets/service2.png'
import service3 from '../../../Assets/service3.png'


function Services() {
  return (
    <div>
        <div className='row container'>
            <div className='col-md-7 col-sm-12'>
                <img src={service} className='img-fluid'/>
            </div>
            <div className='col-md-5 col-sm-12'>
                <h1 className='userhome_ser_mainheading text-center'>Our Services</h1>
                <div className='row userhome_service_eachpad'>
                    <div className='col-3'>
                        <img src={service1} className='img-fluid'/>
                    </div>
                    <div className='col-9'>
                        <h4 className='userhome_ser_subheading'>Flexible Rentals:</h4>
                        <p>Rent a diverse range of furniture online or in-store (if available) to suit your style and budget.</p>
                    </div>
                </div>
                <div className='row userhome_service_eachpad'>
                    <div className='col-3'>
                        <img src={service2} className='img-fluid'/>
                    </div>
                    <div className='col-9'>
                        <h4 className='userhome_ser_subheading'>Hassle-Free Delivery & Setup:</h4>
                        <p>Our team delivers directly to your doorstep and offers add-on assembly for ultimate ease.</p>
                    </div>
                </div>
                <div className='row userhome_service_eachpad'>
                    <div className='col-3'>
                        <img src={service3} className='img-fluid'/>
                    </div>
                    <div className='col-9'>
                        <h4 className='userhome_ser_subheading'>Quality & Maintenance:</h4>
                        <p>Enjoy high-quality furniture from trusted brands, with us handling any minor repairs.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Services