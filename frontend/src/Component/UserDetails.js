import React, { useEffect, useState } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserDetails.css';

const UserDetails = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const [selectedUser, setSelectedUser] = useState(null);
  const queryParams = new URLSearchParams(location.search);
  const itemString = queryParams.get('item');

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

  const handleGetUsers = async () => {
    const res = await axios.get(`http://localhost:4000/getuser`);
    setUsers(res.data.getuser);
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  useEffect(() => {
    if (itemString) {
      const filteritem = users.find((item) => item._id === itemString);
      setSelectedUser(filteritem);
    }
  }, [itemString, users]);

  return (
    <>
      <div className="admin-home-background">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>User Details</Navbar.Brand>
          </Container>
        </Navbar>

        <main className="col-md-9 ms-sm-auto col-lg-12 px-md-4">
          <Container className="mt-5">
            {selectedUser ? (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{selectedUser.firstname}</td>
                    <td>{selectedUser.lastname}</td>
                    <td>{selectedUser.phonenumber}</td>
                    <td>{selectedUser.email}</td>
                    <td>{selectedUser.address}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>No user selected</p>
            )}

            <Button variant="outline-dark" onClick={handleLogout}>
              Logout
            </Button>
          </Container>
        </main>
      </div>
    </>
  );
};

export default UserDetails;
