import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import PublicRoutes from "./Routes/PublicRoutes";
import { ToastContainer } from 'react-toastify';
import PrivateRoutes from "./Routes/PrivateRoutes";
import AdminLogin from "./Component/AdminLogin";
import AdminHome from "./Component/Adminhome";
import UserDetails from "./Component/UserDetails";
 import Usersingup from "./Component/Usersignup";
 import Layout  from "./Component/Layout"



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<PublicRoutes />}>
            <Route index element={<AdminLogin />}>
            </Route>

          </Route>

          <Route path="/adminhome" element={<PrivateRoutes />}>
            <Route index element={<Layout />}/>
          </Route>

          {/* <Route path="/get-user" element ={<AdminHome />} /> */}

         
     
           <Route path="/usersignup" element={<Usersingup />}></Route>
          {/* <Route path="/userlogin" element={<UserLogin />}></Route> */}
           <Route path="/user" element={<UserDetails />}></Route>
        

        
        </Routes>

        <ToastContainer />
      </BrowserRouter>



    </div>
  );
}

export default App;
