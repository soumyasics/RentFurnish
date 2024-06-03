import React from 'react'
import '../Shops/Shopmain.css'; 
import Deliverysidebar from './Deliverysidebar';
import DeliveryDashboard from './DeliveryDashboard';
import Deliverylogin from './Deliverylogin';
import Deliveryagenteditpage from './Deliveryagenteditpage';


function Deliverymain({data}) {
  return (
    <div className="shopsmain-container"  >
    <div className="shopsmain-sidebar">
      <Deliverysidebar />
    </div>
    <div className="shopsmain-content">
        {
            data==="delivery-dashboard"?(<DeliveryDashboard/>):
            data==="edit-deliveryprofile"?(<Deliveryagenteditpage/>):
            <Deliverylogin/>
        }
      {/* {data === "shopownerdashboard" ?( <Shopdashboard/>
      ):data==="returnrequest"?(<ReturnRequest/>
      ):data==="shop-inspections"?(<Inspections/>
      ):data==="add-deliveryagent"?(<Adddeliveryagent/>)
      :data==="view-deliveryagentbyshop"?(<Viewalldeliverybyshop/>):
      <Shoplogin/> } */}
    </div>
  </div>

  )
}

export default Deliverymain