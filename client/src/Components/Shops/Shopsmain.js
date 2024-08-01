import React from 'react';
import Shopsidebar from './Shopsidebar';
import '../Shops/Shopmain.css'; 
import Shopdashboard from './Shopdashboard';
import Shoplogin from './Shopdashboard';
import ReturnRequest from './ReturnRequest';
import Inspections from './Inspections';
import Viewalldeliverybyshop from './Viewalldeliverybyshop';
import Deliveryagenteditpage from '../Deliveryagent/Deliveryagenteditpage';
import Adddeliveryagent from '../Deliveryagent/Adddeliveryagent';
import AddFurniture from './AddFurniture';
import ViewFurniture from './ViewFurniture';
import ShopViewOrder from './Orders/ShopViewOrder';
import OrderStatus from './Orders/OrderStatus';
import EditFurniture from './EditFurniture';
import Shopviewcomplaint from './Complaintsshop/Shopviewcomplaint';
import ShopViewReview from './ShopViewReview';
import PaymentStatus from './PaymentStatus';
import ShopReturnPayment from './ShopReturnPayment';

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
        data==="edit-deliveryagentbyshop"?(<Deliveryagenteditpage/>): 
        data==="add-furniture"?(<AddFurniture/>): 
        data==="view-furniture"?(<ViewFurniture/>): 
        data==="view-vieworders"?(<ShopViewOrder/>): 
        data==="shop-vieworderstatus"?(<OrderStatus/>): 
        data==="shop-viewcomplaint"?(<Shopviewcomplaint/>): 
        data==="edit-furniture"?(<EditFurniture />): 
        data==="shop-reviewfeedback"?(<ShopViewReview />): 
        data==="shop-paymentstatus"?(<PaymentStatus />): 
        data==="shop-returnpayment"?(<ShopReturnPayment />): 
        <Shoplogin/> }
      </div>
    </div>
  );
}

export default Shopsmain;
