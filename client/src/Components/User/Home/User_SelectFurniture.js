import React from 'react'
import living from '../../../Assets/userhome_living.png'
import bedroom from '../../../Assets/userhome_bedroom.png'
import dining from '../../../Assets/userhome_dining.png'
import study from '../../../Assets/userhome_study.png'
import bed from '../../../Assets/bed_image_forrent.png'
import { Link } from 'react-router-dom'
function User_SelectFurniture() {
  return (
    <div>
      <div  className='text-center'>
        <div>
          <p className='user_home_furniture_main_heading'>Furnitures</p>
          <p className='user_home_furniture_sub_heading'>Select the furniture and rent with your style</p>
        </div>
        <div className='row container-fluid'>
          <div className='col-md-3'>
          <Link to='/user-viewlivingroom'><img src={living}className='img-fluid userhome_fur_button'/></Link>
          </div>
          <div className='col-md-3'>
            <Link to='/user-viewbedroom'><img src={bedroom}className='img-fluid userhome_fur_button'/></Link>
          </div>
          <div className='col-md-3'>
          <Link to='/user-viewdiningroom'><img src={dining}className='img-fluid userhome_fur_button'/></Link>
          </div>
          <div className='col-md-3'>
          <Link to='/user-viewstudyroom'><img src={study}className='img-fluid userhome_fur_button'/></Link>
          </div>
        </div>
      </div>
      <div className='container user_fome_selectfur_sec_div text-center'>
          <div className='row'>
              <div className='col-md-6'>
                <div className='user_home_second_div_left'>
                  <h1>Double bed with <br/>wooden frame</h1>
                  <p>Finalize your order through our secure <br/>checkout process.</p>
                  <button className='userhome_fur_seccol_btn'>Rent Now</button>
                </div>
              </div>
              <div className='col-md-6 text-center'>
                <img src={bed} className='img-fluid sec_div_padd'/>
              </div>
          </div>
      </div>
    </div>
  )
}

export default User_SelectFurniture