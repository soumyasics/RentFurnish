import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import 'remixicon/fonts/remixicon.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Userlogin from './Components/User/Userlogin';
import Usersignup from './Components/User/Usersignup';
import Userforgetpswd from './Components/User/Userforgetpswd';
import Hometop from './Components/Common/Hometop';
import Homesec from './Components/Common/Homesec';
import Homethird from './Components/Common/Homethird';
import Navbar from './Components/Navbar/Navbar';
import Usercarousel from './Components/Common/Usercarousel';
import Shopsignin from './Components/Shops/Shopsignin';
import Shoplogin from './Components/Shops/Shoplogin';
import Shopforgetpswd from './Components/Shops/Shopforgetpswd';
import Deliveryagentsignup from './Components/Deliveryagent/Deliveryagentsignup';
import Deliverylogin from './Components/Deliveryagent/Deliverylogin';
import Deliveryforgetpswd from './Components/Deliveryagent/Deliveryforgetpswd';
import Adminlogin from './Components/Admin/Adminlogin';
import Admindashbboard from './Components/Admin/Admindashbboard';
import 'remixicon/fonts/remixicon.css'
import Shopreq from './Components/Admin/Shopreq';
import Adminnav from './Components/Navbar/Adminnav';
import Shopdashboard from './Components/Shops/Shopdashboard';
import Shopeditprofile from './Components/Shops/Shopeditprofile';
import Adminviewshops from './Components/Admin/Adminviewshops';
import Footer from './Components/Footer/Footer';
import Shopnav from './Components/Navbar/Shopnav';
import Adddeliveryagent from './Components/Deliveryagent/Adddeliveryagent';
import AgentNav from './Components/Navbar/AgentNav';
import Shopsidebar from './Components/Shops/Shopsidebar';
import Shopsmain from './Components/Shops/Shopsmain';
import Shopdropdown from './Components/Shops/Shopdropdown';
import Shopprofile from './Components/Shops/Shopprofile';
import DeliveryDashboard from './Components/Deliveryagent/DeliveryDashboard';
import Deliverysidebar from './Components/Deliveryagent/Deliverysidebar';
import Deliverymain from './Components/Deliveryagent/Deliverymain';
import Deliveryagenteditpage from './Components/Deliveryagent/Deliveryagenteditpage';
import AddFurniture from './Components/Shops/AddFurniture';
import UserNav1 from './Components/User/Home/UserNav1';
import UserNav2 from './Components/User/Home/UserNav2';
import User_SelectFurniture from './Components/User/Home/User_SelectFurniture';
import User_ViewAllFur from './Components/User/Home/User_ViewAllFur';
import Services from './Components/User/Home/Services';
import ViewFurniture from './Components/Shops/ViewFurniture';
import Viewallfurnituresuser from './Components/User/Furnitures/Viewallfurnituresuser';
import Bookorder1 from './Components/User/Purchase/Bookorder1';
import Deliveryorder from './Components/User/Purchase/Deliveryorder';
import Adminexample from './Components/Admin/Adminexample';
import Changeaddress from './Components/User/Purchase/ChangeAddress/Changeaddress';
import CustViewProfile from './Components/User/Profile/CustViewProfile';
import Complaints from './Components/Admin/Complaints/Complaints';

import UserPayment from './Components/User/Purchase/Payment/UserPayment';
import AdminViewCust from './Components/Admin/Customers/AdminViewCust';
import AdminViewDelivery from './Components/Admin/DeliveryAgent/AdminViewDelivery';
import ViewMyOrder from './Components/User/Orders/ViewMyOrder';
import ViewCart from './Components/User/Cart/ViewCart';
import TrackDelivery from './Components/User/Orders/TrackDelivery';
import ContactUs from './Components/User/Home/ContactUs';
import ViewBedroomFurniture from './Components/User/Furnitures/ViewBedroomFurniture';
import ViewLivingRoomFurniture from './Components/User/Furnitures/ViewLivingRoomFurniture';
import ViewDiningRoom from './Components/User/Furnitures/ViewDiningRoom';
import ViewStudyRoom from './Components/User/Furnitures/ViewStudyRoom';
import ReturnDetails from './Components/User/Orders/Return/ReturnDetails';
import TrackReturnStatus from './Components/User/Orders/Return/TrackReturnStatus';
import TrackReturnConformed from './Components/User/Orders/Return/TrackReturnConformed';
import TrackInspectionStatus from './Components/User/Orders/Return/TrackInspectionStatus';
import TrackReturnPayment from './Components/User/Orders/Return/TrackReturnPayment';
import TrackDirectReturnStatus from './Components/User/Orders/Return/TrackDirectReturnStatus';
import Viewreviews from './Components/User/Furnitures/Viewreviews';
import Aboutus from './Components/Common/Aboutus';
import Adminviewtransaction from './Components/Admin/Transactions/Adminviewtransaction';


function App() {
  return (
    <BrowserRouter basename="/rentfurnish">
      <div>
        <Routes
        >
          <Route path='/' element={[<Navbar />, <Usercarousel />, <Hometop />, <Homesec />, <Homethird />, <Footer />]} />

          {/* // Users // */}
          <Route path='/userlogin' element={[<Navbar />, <Userlogin />]} />
          <Route path='/usersignin' element={[<Navbar />, <Usersignup />]} />
          <Route path='/userforgetpswd' element={[<Navbar />, <Userforgetpswd />]} />
          <Route path='/user-home' element={[<UserNav1 />, <UserNav2 />, <Usercarousel />, <User_SelectFurniture />, <Hometop />, <User_ViewAllFur />, <Services />, <Footer />]} />
          <Route path='/user-viewallfurniture' element={[<UserNav1 />, <Viewallfurnituresuser />]} />
          <Route path='/user-services' element={[<UserNav1 />, <UserNav2 />, <Services />]} />
          <Route path='/user-contactus' element={[ <ContactUs />]} />

          <Route path='/user-purchesproduct/:id' element={[<UserNav1 />, <Bookorder1 />, <Footer />]} />
          <Route path='/user-confirmpurchase' element={[<UserNav1 />, <Deliveryorder />, <Footer />]} />
          <Route path='/user-viewprofile' element={[<CustViewProfile />]} />
          <Route path='/user-payment/:id' element={[<UserNav1 />, <UserPayment />, <Footer />]} />
          <Route path='/user-viewmyorder' element={[<UserNav1 />, <UserNav2 />, <ViewMyOrder />]} />
          <Route path='/user-viewcart' element={[<UserNav1 />, <ViewCart />]} />
          <Route path='/user-trackdelivery/:id' element={[<UserNav1 />, <UserNav2 />, <TrackDelivery />]} />
          <Route path='/user-viewbedroom' element={[<UserNav1 />, <UserNav2 />, <ViewBedroomFurniture />]} />
          <Route path='/user-viewlivingroom' element={[<UserNav1 />, <UserNav2 />, <ViewLivingRoomFurniture />]} />
          <Route path='/user-viewdiningroom' element={[<UserNav1 />, <UserNav2 />, <ViewDiningRoom />]} />
          <Route path='/user-viewstudyroom' element={[<UserNav1 />, <UserNav2 />, <ViewStudyRoom />]} />
          <Route path='/user-return/:id' element={[<UserNav1 />, <UserNav2 />, <ReturnDetails />]} />
          <Route path='/user-trackreturnstatus/:id' element={[<UserNav1 />, <UserNav2 />, <TrackReturnStatus />]} />
          <Route path='/user-trackdirectreturnstatus/:id' element={[<UserNav1 />, <UserNav2 />, <TrackDirectReturnStatus />]} />

          {/* <Route path='/user-conformedreturn' element={[<UserNav1 />,<UserNav2/>,<TrackReturnConformed/>]}/>
          <Route path='/user-inspectionstatus' element={[<UserNav1 />,<UserNav2/>,<TrackInspectionStatus/>]}/> */}
          <Route path='/user-returnpayment/:id' element={[<UserNav1 />, <UserNav2 />, <TrackReturnPayment />]} />
          <Route path='/view-reviews' element={[<Viewreviews/>]} />
          <Route path='/about' element={<Hometop/>}/>

          {/* Shops */}
          <Route path='/shopsignin' element={[<Navbar />, <Shopsignin />, <Footer />]} />
          <Route path='/shoplogin' element={[<Navbar />, <Shoplogin />, <Footer />]} />
          <Route path='/shopforgetpswd' element={[<Navbar />, <Shopforgetpswd />, <Footer />]} />
          <Route path='/editprofileshop' element={<Shopeditprofile />} />

          <Route path='/shop-dashboard' element={[<Shopsmain data="shopownerdashboard" />]} />
          <Route path='/shop-returnrequest' element={[<Shopsmain data="returnrequest" />]} />
          <Route path='/shop-inspection' element={[<Shopsmain data="shop-inspections" />]} />
          <Route path='/add-deliveryagent' element={[<Shopsmain data="add-deliveryagent" />]} />
          <Route path='/view-deliveryagentbyshop' element={[<Shopsmain data="view-deliveryagentbyshop" />]} />
          <Route path='/edit-deliveryagentbyshop/:id' element={[<Shopsmain data="edit-deliveryagentbyshop" />]} />
          <Route path='/add-furniture' element={[<Shopsmain data="add-furniture" />]} />
          <Route path='/view-furniture' element={[<Shopsmain data="view-furniture" />]} />
          <Route path='/view-vieworders' element={[<Shopsmain data="view-vieworders" />]} />
          <Route path='/shop-vieworderstatus' element={[<Shopsmain data="shop-vieworderstatus" />]} />
          <Route path='/edit-furniture/:id' element={[<Shopsmain data="edit-furniture" />]} />
          <Route path='/shop-viewcomplaint' element={[<Shopsmain data="shop-viewcomplaint" />]} />
          <Route path='/shop-reviewfeedback' element={[<Shopsmain data="shop-reviewfeedback" />]} />
          <Route path='/shop-paymentstatus' element={[<Shopsmain data="shop-paymentstatus" />]} />
          <Route path='/shop-returnpayment/:id' element={[<Shopsmain data="shop-returnpayment" />]} />


          {/* Delivery Agents */}
          <Route path='/agentsignup' element={[<Shopnav />, <Deliveryagentsignup />]} />
          <Route path='/agentlogin' element={[<Navbar />, <Deliverylogin />]} />
          <Route path='/agentrecoverpswd' element={[<Navbar />, <Deliveryforgetpswd />]} />
          {/* <Route path='/adddeliveryagent' element={[<Adddeliveryagent/>]}/>  */}
          <Route path='/deliveryagenteditpage' element={[<Deliveryagenteditpage />]} />
          <Route path='/delivery-dashboard' element={[<Deliverymain data="delivery-dashboard" />]} />
          <Route path='/edit-deliveryprofile/:id' element={[<Deliverymain data="edit-deliveryprofile" />]} />
          <Route path='/del-pending' element={[<Deliverymain data="del-pending" />]} />
          <Route path='/pending-returns' element={[<Deliverymain data="pending-returns" />]} />
          <Route path='/delivery-totaldelivery' element={[<Deliverymain data="delivery-totaldelivery" />]} />


          {/* Admin */}
          <Route path='/adminlogin' element={[<Navbar />, <Adminlogin />, <Footer />]} />
          <Route path='/admindashboard' element={<Admindashbboard />} />
          <Route path='/shopreq' element={<Shopreq />} />
          <Route path='/Viewshops' element={<Adminviewshops />} />
          <Route path='/example' element={[<Adminexample />]} />

          <Route path='/adminview-complaints' element={[<Complaints />]} />
          <Route path='/admin-viewcust' element={[<AdminViewCust />]} />
          <Route path='/admin-viewdelivery' element={[<AdminViewDelivery />]} />
          <Route path='/admin-viewtransactions' element={[<Adminviewtransaction />]} />

          {/* common */}
          <Route path='/about-us' element={<Aboutus/>}/>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
