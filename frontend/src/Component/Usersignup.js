import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faAddressCard, faPhone } from '@fortawesome/free-solid-svg-icons';
import './Usersignup.css'; // Import your custom CSS file

const Usersignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: '',
    address: '',
    phonenumber: '',
  });

  const { firstname, lastname, email, password, confirmpassword, address, phonenumber } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      return alert('Password and Confirm Password do not match');
    }

    try {
      const response = await axios.post('http://localhost:4000/usersingup', {
        firstname,
        lastname,
        email,
        password,
        confirmpassword,
        address,
        phonenumber,
      });

      if (response.status === 200) {
        alert(response.data.msg);
        navigate('/adminhome');
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while processing your request');
    }
  };

  return (
    <Container>
      <h2 className="text-center mb-4" ><FontAwesomeIcon icon={faUser} style={{ marginRight: '10px',color:"blue" }} /> Add User</h2>
      <Form onSubmit={handleSubmit} className="custom-form">
        <Row>
          <Col md={6}>
            <Form.Group controlId="firstname">
              <Form.Label><FontAwesomeIcon icon={faUser} /> First Name</Form.Label>
              <Form.Control type="text" name="firstname" value={firstname} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lastname">
              <Form.Label><FontAwesomeIcon icon={faUser} /> Last Name</Form.Label>
              <Form.Control type="text" name="lastname" value={lastname} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label><FontAwesomeIcon icon={faEnvelope} /> Email</Form.Label>
              <Form.Control type="email" name="email" value={email} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="password">
              <Form.Label><FontAwesomeIcon icon={faLock} /> Password</Form.Label>
              <Form.Control type="password" name="password" value={password} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="confirmpassword">
              <Form.Label><FontAwesomeIcon icon={faLock} /> Confirm Password</Form.Label>
              <Form.Control type="password" name="confirmpassword" value={confirmpassword} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="address">
              <Form.Label><FontAwesomeIcon icon={faAddressCard} /> Address</Form.Label>
              <Form.Control type="text" name="address" value={address} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="phonenumber">
              <Form.Label><FontAwesomeIcon icon={faPhone} /> Phone Number</Form.Label>
              <Form.Control type="text" name="phonenumber" value={phonenumber} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row> <br />
        <div className="d-flex justify-content-center">
          <Button type="submit" variant="primary" className="custom-button">
            Add User
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Usersignup;
