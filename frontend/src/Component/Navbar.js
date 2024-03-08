import React from 'react';
import { Navbar as BootstrapNavbar, Container, Nav, Button } from 'react-bootstrap';
import './AdminHome.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield } from '@fortawesome/free-solid-svg-icons'; // Import the admin dashboard icon

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.clear();
      navigate('/');
      toast.success('Logout Successfully!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (

    // <BootstrapNavbar expand="lg" bg="dark" variant="light">
    //   <Container>
    //     <BootstrapNavbar.Brand className="text-center" style={{ color: 'red' }}>
    //       <FontAwesomeIcon icon={faUserShield} className="mr-2" style={{ marginRight: '10px' }} /> {/* Add margin to the icon */}
    //       Admin Dashboard
    //     </BootstrapNavbar.Brand>
    //     <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
    //     <BootstrapNavbar.Collapse id="basic-navbar-nav">
    //       <Nav className="ml-auto">
    //         <Button variant="outline-primary" onClick={handleLogout} className="logout">
    //           Logout
    //         </Button>
    //       </Nav>
    //     </BootstrapNavbar.Collapse>
    //   </Container>
    // </BootstrapNavbar>
    <div class="main-panel">
<nav class="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
<div class="container-fluid">
  <div class="navbar-wrapper">
    <div class="navbar-toggle">
      <button type="button" class="navbar-toggler">
        <span class="navbar-toggler-bar bar1"></span>
        <span class="navbar-toggler-bar bar2"></span>
        <span class="navbar-toggler-bar bar3"></span>
      </button>
    </div>
    <a class="navbar-brand" href="javascript:;">Dashboard</a>
  </div>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-bar navbar-kebab"></span>
    <span class="navbar-toggler-bar navbar-kebab"></span>
    <span class="navbar-toggler-bar navbar-kebab"></span>
  </button>
  <div class="collapse navbar-collapse justify-content-end" id="navigation">
    <form>
      <div class="input-group no-border">
        <input type="text" value="" class="form-control" placeholder="Search..." />
        <div class="input-group-append">
          <div class="input-group-text">
            <i class="nc-icon nc-zoom-split"></i>
          </div>
        </div>
      </div>
    </form>
    <ul class="navbar-nav">
      
      <li class="nav-item">
        <a class="nav-link btn-rotate" href="javascript:;">
          <button onClick={handleLogout}>logout</button>
        </a>
      </li>
    </ul>
  </div>
</div>
</nav>
</div>
  );
};

export default Navbar;
