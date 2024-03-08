import { Outlet } from "react-router-dom";
import React from 'react'
import Navbar from "./Navbar";
import AdminSidebar from "./AdminSidebar";
import AdminHome from "./Adminhome";

function layout() {
  return (
    <div>
        <Navbar />
        <AdminHome />
         <AdminSidebar />
       
      <Outlet />
    </div>
  )
}

export default layout
