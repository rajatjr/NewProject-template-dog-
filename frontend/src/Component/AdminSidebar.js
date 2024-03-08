import React from 'react';
import { Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AdminHome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const AdminSidebar = ({ handleSidebarButtonClick }) => {
  return (
    <div class="wrapper ">
       <div class="sidebar" data-color="white" data-active-color="danger">
      <div class="logo">
        <a href="https://www.creative-tim.com" class="simple-text logo-mini">
          <div class="logo-image-small">
            <img src="../assets/img/logo-small.png" />
          </div>
        </a>
        <a href="https://www.creative-tim.com" class="simple-text logo-normal">
          Creative Rajat
         
        </a>
      </div>
      <div class="sidebar-wrapper">
        <ul class="nav">
          <li>
            <a href="">
              <i class="nc-icon nc-bank"></i>
              <p>Dashboard</p>
            </a>
          </li>
          <li>
            <a href="">
              <i class="nc-icon nc-diamond"></i>
              <p>User-Details</p>
            </a>
          </li>
          <li>
            <a href="./usersignup">
              <i class="nc-icon nc-pin-3"></i>
              <p>AddUser</p>
            </a>
          </li>
          <li>
            <a href="">
              <i class="nc-icon nc-bell-55"></i>
              <p>Notifications</p>
            </a>
          </li>
          <li>
            <a href="">
              <i class="nc-icon nc-single-02"></i>
              <p>User Profile</p>
            </a>
          </li>
          <li class="active ">
            <a href="">
              <i class="nc-icon nc-tile-56"></i>
              <p>Table List</p>
            </a>
          </li>
          <li>
            <a href="">
              <i class="nc-icon nc-caps-small"></i>
              <p>Typography</p>
            </a>
          </li>
        
        </ul>
      </div>
    </div>
    </div>
  );
};

export default AdminSidebar;
