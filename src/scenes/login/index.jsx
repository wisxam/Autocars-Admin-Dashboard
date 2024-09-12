import { Box, Button, TextField } from "@mui/material";
import { Form } from "reactstrap";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthUser from "../../components/AuthUser";
import StatBox from "../../components/StatBox";
import './login.css';

const Login = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  var id=0
  
  var utype2=null;
  var utype=null;

  const{http,setToken}= AuthUser();
  
  const SendDataToApi=(formData)=>{
    http.post('/login',{'email':formData.email,'password':formData.password,}).then((res)=>{
      setToken(res.data.user,res.data.access_token);
      worksWithAuthAdmin();

    })
  }

  const worksWithAuthAdmin=()=>{
      http.post('/me').then((res)=>{
        setPosts(res.data)
        window.location.reload()
        navigate('/dashboard')
      });  
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    };
    SendDataToApi(formData);

  };

  return (
    <div className="login-container">
      <Box m="20px" className="login-form">
      <div class="logo">
      <h1 class="text">Login</h1>
      </div>
        <Form onSubmit={handleSubmit}>
          {/* <StatBox progress="null" title="" subtitle="Login" /> */}
          <TextField
            required
            variant="filled"
            type="email"
            label="E-mail"
            name="email"
            placeholder="Write Email"
            defaultValue=""
            fullWidth
            margin="normal"
            className="form-control"
          />
          <TextField
            required
            variant="filled"
            type="password"
            label="Password"
            name="password"
            placeholder="Write Password"
            defaultValue=""
            fullWidth
            margin="normal"
            className="form-control"
          />
          <Button type="submit" color="secondary" variant="contained" fullWidth className="btn mt-3">
            Login
          </Button>
        </Form>
      </Box>
    </div>
  );
};

export default Login;
