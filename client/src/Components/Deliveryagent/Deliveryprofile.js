import React from 'react'
import { Link } from 'react-router-dom'

function Deliveryprofile({data}) {
  return (
    <div className="modal-container">
    <div className="modal-content">
      <React.Fragment>
        <div className='container'>
          <div className='userprofilehead'>
          <Link 
          onClick={data} 
           style={{textDecoration:"none"}}> <h3 className='ri-arrow-left-line'  style={{textAlign:"left"}}></h3></Link> 
          </div>
          <div className='row'>
            <div className='col-12 text-center'>
              <div className='userprofileimg'>
                <img 
                //  src={`${url}/${shop?.image?.filename}`} 
                // src={admin1}
                alt='Profile image' width="250px" height="250px" style={{borderRadius:"50%"}}/>
                <h4>Name</h4>
              </div>
            </div>
            <div className='col-12 text-center'>
              <div className='userprofiletable'>
                <table>
                  <tbody>
                    <tr>
                      <td id='td1'>Shop Name</td>
                      <td id='td2'>Name</td>
                    </tr>
                    <tr>
                      <td id='td1'>Building Name</td>
                      <td id='td2'>jwkncdcd</td>
                    </tr>
                    <tr>
                      <td id='td1'>Email</td>
                      <td id='td2'>wekcjndcjdc</td>
                    </tr>
                    <tr>
                      <td id='td1'>Phone</td>
                      <td id='td2'>ecn dcdcdcdc</td>
                    </tr>
                    <tr>
                      <td id='td1'>Address:</td>
                      <td id='td2'>ecjndecjndwcdcdwcdcdcd ds c</td>
                    </tr>
                    <tr>
                      <td id='td1'>Shop License</td>
                      <td id='td2'> cjndcndc</td>
                    </tr>
                  </tbody>
                </table>
              <Link to=""> <button type='submit' style={{margin:"30px"}}>Edit Profile</button></Link> 
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </div>
  </div>

  )
}

export default Deliveryprofile