import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Col, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AdminHome.css';
import Navbar from './Navbar';
import AdminSidebar from './AdminSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faPhone,
  faEnvelope,
  faEye,
  faEdit,
  faTrash,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleGetUsers = async () => {
    const res = await axios.get('http://localhost:4000/getuser');
    setUsers(res.data.getuser);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/deleteuser/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      setSelectedUser(null);
      toast.success('User deleted successfully!', {
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

  const handleUpdate = (id) => {
    setIsEditing(true);
    const userToEdit = users.find((user) => user._id === id);
    setEditedUser(userToEdit);
    setShowEditModal(true); // Show the edit modal
  };

  const handleSaveUpdate = async () => {
    try {
      await axios.put(`http://localhost:4000/updateuser/${editedUser._id}`, editedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === editedUser._id ? editedUser : user))
      );

      setIsEditing(false);
      setEditedUser(null);
      setShowEditModal(false); // Close the edit modal
      toast.success('User updated successfully!', {
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

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
  
    <div class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title"> Simple</h4>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead class=" text-primary">

                    <th> First Name </th>
                    <th> Last Name </th>
                    <th>Phone Number </th>
                    <th> Email </th>
                    <th> Actions</th>

                  </thead>
                  <tbody>
                    {users.map((item) => (
                      <tr key={item._id} onClick={() => { handleUserClick(item) }}>
                        <td>{item.firstname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.phonenumber}</td>
                        <td>{item.email}</td>
                        <td>
                           <Link
                            to={{
                              pathname: '/user',
                             search: `?item=${item._id}`,
                            }}
                             className="btn btn-success mr-2"
                           >
                             <FontAwesomeIcon icon={faEye} /> 
                        </Link>
                         <button
                            onClick={() => handleUpdate(item._id)}
                           className="btn btn-info mr-2"
                          >
                             <FontAwesomeIcon icon={faEdit} /> 
                          </button>
                           <button
                           onClick={() => handleDeleteUser(item._id)}
                          className="btn btn-danger"
                         >
                           <FontAwesomeIcon icon={faTrash} /> 
                         </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {selectedUser && (
                  <div>UserDetails: {selectedUser.firstname}</div>
                )}

              </div>
            </div>
          </div>
        </div>

        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
           <Modal.Header closeButton>
             <Modal.Title>Edit User</Modal.Title>
           </Modal.Header>
           <Modal.Body>
             {editedUser && (
               <form>
                 <div className="form-group">
                   <label htmlFor="firstname">
                     <FontAwesomeIcon icon={faUser} /> First Name
                   </label>
                   <input
                     type="text"
                     className="form-control"
                     id="firstname"
                     value={editedUser.firstname}
                     onChange={(e) =>
                       setEditedUser({ ...editedUser, firstname: e.target.value })
                     }
                   />
                 </div>
                 <div className="form-group">
                   <label htmlFor="lastname">
                     <FontAwesomeIcon icon={faUser} /> Last Name
                   </label>
                   <input
                     type="text"
                     className="form-control"
                     id="lastname"
                     value={editedUser.lastname}
                     onChange={(e) =>
                       setEditedUser({ ...editedUser, lastname: e.target.value })
                     }
                   />
                 </div>
                 <div className="form-group">
                   <label htmlFor="phonenumber">
                     <FontAwesomeIcon icon={faPhone} /> Phone Number
                   </label>
                   <input
                     type="text"
                     className="form-control"
                     id="phonenumber"
                     value={editedUser.phonenumber}
                     onChange={(e) =>
                       setEditedUser({ ...editedUser, phonenumber: e.target.value })
                     }
                   />
                 </div>
                 <div className="form-group">
                   <label htmlFor="email">
                     <FontAwesomeIcon icon={faEnvelope} /> Email
                   </label>
                   <input
                     type="email"
                     className="form-control"
                     id="email"
                     value={editedUser.email}
                     onChange={(e) =>
                       setEditedUser({ ...editedUser, email: e.target.value })
                     }
                   />
                 </div>
               </form>
             )}
           </Modal.Body>
           <Modal.Footer>
             <Button variant="secondary" onClick={() => setShowEditModal(false)}>
               Cancel
             </Button>
             <Button variant="primary" onClick={handleSaveUpdate}>
               Save
             </Button>
           </Modal.Footer>
      </Modal>
      </div>
    </div>

  );
};

export default AdminHome;
