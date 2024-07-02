import React from 'react'
import chair from '../../../Assets/userhome_viewfur.png'
import { FaArrowRight } from "react-icons/fa6";

function User_ViewAllFur() {
  return (
    <div  className='user_home_viewfur'>
        <div className='container'>
            <h1 className='user_home_viewfur_heading'>You May Like these...</h1>
            <div className='row user_home_eachcard_paddd'>
                <div className='col-md-3 col-sm-6'>
                    <div class="card">
                        <img src={chair} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Single seat sofa</h5>
                            <p class="card-text">Rent</p>
                            <p class="card-text userhome_card_price">₹499/MO</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 col-sm-6'>
                    <div class="card">
                        <img src={chair} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Single seat sofa</h5>
                            <p class="card-text">Rent</p>
                            <p class="card-text userhome_card_price">₹499/MO</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 col-sm-6'>
                    <div class="card">
                        <img src={chair} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Single seat sofa</h5>
                            <p class="card-text">Rent</p>
                            <p class="card-text userhome_card_price">₹499/MO</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 col-sm-6'>
                    <div class="card">
                        <img src={chair} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Single seat sofa</h5>
                            <p class="card-text">Rent</p>
                            <p class="card-text userhome_card_price">₹499/MO</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row user_home_eachcard_paddd'>
                <div className='col-md-3 col-sm-6'>
                    <div class="card">
                        <img src={chair} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Single seat sofa</h5>
                            <p class="card-text">Rent</p>
                            <p class="card-text userhome_card_price">₹499/MO</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 col-sm-6'>
                    <div class="card">
                        <img src={chair} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Single seat sofa</h5>
                            <p class="card-text">Rent</p>
                            <p class="card-text userhome_card_price">₹499/MO</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 col-sm-6'>
                    <div class="card">
                        <img src={chair} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Single seat sofa</h5>
                            <p class="card-text">Rent</p>
                            <p class="card-text userhome_card_price">₹499/MO</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 col-sm-6'>
                    <div class="card">
                        <img src={chair} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Single seat sofa</h5>
                            <p class="card-text">Rent</p>
                            <p class="card-text userhome_card_price">₹499/MO</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='userhome_viewfur_viewall_butt'>
                <button className='userhome_fur_seccol_btn'>View All <FaArrowRight /></button>
            </div>
        </div>
    </div>
  )
}

export default User_ViewAllFur