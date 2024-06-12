import React from 'react';
import Shopsidebar from './Shopsidebar';
import '../Shops/Shopmain.css'; 
import Shopdashboard from './Shopdashboard';
import Shoplogin from './Shopdashboard';
import ReturnRequest from './ReturnRequest';
import Inspections from './Inspections';
import Viewalldeliverybyshop from './Viewalldeliverybyshop';

function Shopsmain({ data }) {
  return (
    <div className="shopsmain-container"  >
      <div className="shopsmain-sidebar">
        <Shopsidebar />
      </div>
      <div className="shopsmain-content">
        {data === "shopownerdashboard" ?( <Shopdashboard/>
        ):data==="returnrequest"?(<ReturnRequest/>
        ):data==="shop-inspections"?(<Inspections/>
        ):data==="add-deliveryagent"?(<Adddeliveryagent/>)
        :data==="view-deliveryagentbyshop"?(<Viewalldeliverybyshop/>):
        <Shoplogin/> }
      </div>
    </div>
  );
}

export default Shopsmain;
