import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import * as yup from "yup";
import {Form} from "reactstrap";

import useMediaQuery from "@mui/material/useMediaQuery"; //so i can have responsive layout
import React from "react";
import { useState, useEffect } from "react";
import AuthUser from "../../components/AuthUser";
import "../../styles/form.css";
import Header from "../../components/Header";

const AddAdmin = () => {
    
    const {http} = AuthUser();
    
    const sendDataToApi = (formData) => {
      console.log(formData)
      http.post('/AddAdmin',{'id':formData.id,'securityCode':formData.securityCode,})
    
    };
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        const formData = {
          id: event.target.elements.id.value,
          securityCode: event.target.elements.securityCode.value,
        };
        sendDataToApi(formData);
    	event.target.reset();

      };

      return (


        <Box m="20px">

        <Header title="Add Admin"subtitle="Add a New Admin"  />
        <div className="form-container" >

          <Form onSubmit={handleSubmit} className="form-body" >
            <TextField
              required
              className="textField"
              variant="filled"
              type="text"
              label="ID"
              name="id"
              placeholder="Add ID"
            />
            <TextField
              required
              className="textField"
              variant="filled"
              type="password"
              label="Security Code"
              name="securityCode"
              placeholder="Add a Security Code"
            /><br/><br/>

            <Button type="submit" color="secondary" variant="contained">
              Add Admin
            </Button>
          </Form>
          </div>

        </Box>
      );
} 

export default AddAdmin;
