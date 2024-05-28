import React from 'react';
import Shopsidebar from './Shopsidebar';
import Adddeliveryagent from '../Deliveryagent/Adddeliveryagent';
import '../Shops/Shopmain.css'; 
import Shopdashboard from './Shopdashboard';
import Shoplogin from './Shopdashboard';
import ReturnRequest from './ReturnRequest';
import Inspections from './Inspections';

function Shopsmain({ data }) {
  return (
    <div>
    <div className="shopsmain-container">
      <div className="shopsmain-sidebar">
        <Shopsidebar />
      </div>
      <div className="shopsmain-content">
        {data === "shopownerdashboard" ?( <Shopdashboard/>
        ):data==="returnrequest"?(<ReturnRequest/>
        ):data==="shop-inspections"?(<Inspections/>
        ):<Shoplogin/> }
      </div>
    </div>
    </div>
  );
}

export default Shopsmain;
