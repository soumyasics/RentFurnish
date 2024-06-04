import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import 'remixicon/fonts/remixicon.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
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

function App() {
  return (
    <BrowserRouter   basename="/rentfurnish">
    <div>
      <Routes 
          >
          <Route path='/' element={[<Navbar/>,<Usercarousel/>,<Hometop/>,<Homesec/>,<Homethird/>,<Footer/>]}/>

        {/* // User // */}
          <Route path='/userlogin' element={[<Navbar/>,<Userlogin/>]}/>
          <Route path='/usersignin' element={[<Navbar/>,<Usersignup/>]}/>
          <Route path='/userforgetpswd' element={<Userforgetpswd/>}/>
         
        {/* Shops */}
          <Route path='/shopsignin' element={[<Shopnav/>,<Shopsignin/>,<Footer/>]}/>
          <Route path='/shoplogin' element={[<Shopnav/>,<Shoplogin/>,<Footer/>]}/>
          <Route path='/shopforgetpswd' element={[<Shopnav/>,<Shopforgetpswd/>,<Footer/>]}/>
          <Route path='/editprofileshop' element={<Shopeditprofile/>}/>

          <Route path='/shop-dashboard' element={[<Shopsmain data="shopownerdashboard"/>]}/>
          <Route path='/shop-returnrequest' element={[<Shopsmain data="returnrequest"/>]}/>
          <Route path='/shop-inspection' element={[<Shopsmain data="shop-inspections"/>]}/>
          <Route path='/add-deliveryagent' element={[<Shopsmain data="add-deliveryagent"/>]}/>
          <Route path='/view-deliveryagentbyshop' element={[<Shopsmain data="view-deliveryagentbyshop"/>]}/>
          <Route path='/edit-deliveryagentbyshop/:id' element={[<Shopsmain data="edit-deliveryagentbyshop"/>]}/>


          {/* Delivery Agent */}
          <Route path='/agentsignup' element={[<Navbar/>,<Deliveryagentsignup/>]}/>
          <Route path='/agentlogin' element={[<Navbar/>,<Deliverylogin/>]}/>
          <Route path='/agentrecoverpswd' element={<Deliveryforgetpswd/>}/>
          <Route path='/adddeliveryagent' element={[<Adddeliveryagent/>]}/> 
          <Route path='/deliveryagenteditpage' element={[<Deliveryagenteditpage/>]}/>         
          <Route path='/delivery-dashboard' element={[<Deliverymain data="delivery-dashboard"/>]}/>
          <Route path='/edit-deliveryprofile/:id' element={[<Deliverymain data="edit-deliveryprofile"/>]}/>

          <Route path='/deliverysidebar' element={[<Deliverysidebar/>]}/>

          {/* Admin */}
          <Route path='/adminlogin' element={[<Adminnav/>,<Adminlogin/>,<Footer/>]}/>
          <Route path='/admindashboard' element={<Admindashbboard/>}/>
          <Route path='/shopreq' element={<Shopreq/>}/>
          <Route path='/Viewshops' element={<Adminviewshops/>}/>

      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
