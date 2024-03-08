import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import './AdminLogin.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required')
    .test('gmail', 'Only Gmail addresses are allowed', (value) => {
      return value.endsWith('@gmail.com');
    }),
  password: Yup.string().required('Password is required'),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const [wrongPasswordError, setWrongPasswordError] = useState(false);

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post('http://localhost:4000/adminlogin', {
        email: values.email,
        password: values.password,
      });

      if (res.data.success === true) {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('token', res.data.token);
        navigate('/adminhome');
        toast.success(res.data.msg)
       
      } else {
        if (res.status === 401) {
          // Handle wrong password error
          setWrongPasswordError(true);
        } else {
          // Handle other errors
          toast.error('Wrong credentials entered.', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        }
      }
    } catch (error) {
      toast.error( error.response.data.msg)
   
    }
  };

  return (
    <div className="login-container">
      <Container className="login-form-container">
        <Row className="justify-content-center align-items-center">
          <Col md={6}>
            <div className="login-form">
              <h2 className="text-danger">Admin Login</h2>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  {wrongPasswordError && (
                    <div className="text-danger">Wrong password entered.</div>
                  )}
                  <Button variant="primary" type="submit">
                    Admin Login
                  </Button>
                </Form>
              </Formik>
            </div>
          </Col>
          <Col md={6}>
            <img
              src="https://source.unsplash.com/K4mSJ7kc0As/600x800"
              alt="Your Image"
              className="img-fluid"
            />
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default AdminLogin;
