import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  

  return (
    <div className="auth-page-layer">
    <div className="container rounded bg-white p-4 shadow col-12 col-md-6 col-lg-4 card">
      <Form  className="m-4">
        <h2> Register</h2>


        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Firstname"
            value={firstName}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Lastname"
            value={lastName}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Link to="/src/Pages/Dashboard">
        <Button variant="primary" type="submit" >
        
          Submit 
        </Button>
        </Link>
      
      </Form>
    </div>
    </div>
  );
}

export default Register;
