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

function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
          <Route path='/' element={[<Navbar/>,<Usercarousel/>,<Hometop/>,<Homesec/>,<Homethird/>]}/>

        {/* // User // */}
          <Route path='/userlogin' element={[<Navbar/>,<Userlogin/>]}/>
          <Route path='/usersignin' element={[<Navbar/>,<Usersignup/>]}/>
          <Route path='/userforgetpswd' element={<Userforgetpswd/>}/>
          
        {/* Shops */}
          <Route path='/shopsignin' element={[<Navbar/>,<Shopsignin/>]}/>
          <Route path='/shoplogin' element={<Shoplogin/>}/>
          <Route path='/shopforgetpswd' element={<Shopforgetpswd/>}/>

          {/* Delivery Agent */}
          <Route path='/agentsignup' element={[<Navbar/>,<Deliveryagentsignup/>]}/>
          <Route path='/agentlogin' element={[<Navbar/>,<Deliverylogin/>]}/>
          <Route path='/agentrecoverpswd' element={<Deliveryforgetpswd/>}/>


          {/* Admin */}
          <Route path='/adminlogin' element={<Adminlogin/>}/>
          <Route path='/admindashboard' element={<Admindashbboard/>}/>

      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
