import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import * as yup from "yup";
import {Form} from "reactstrap";

import useMediaQuery from "@mui/material/useMediaQuery"; //so i can have responsive layout
import React from "react";
import Header from "../../components/Header";

import { useState, useEffect } from "react";
import "../../styles/form.css";



const AddCarModel = () => {


    const [posts, setPosts] = useState([]);
    useState(() => {
      fetch("http://127.0.0.1:8000/api/Brands")
        .then((data) => data.json())
        .then((data) => setPosts(data)); // Slice the data array to contain only the first 4 items
    }, []);


    
  
    
    const sendDataToApi = (formData) => {
        fetch("http://127.0.0.1:8000/api/AddCarModel?model="+formData.model+"&type_id="+formData.type_id)
          .then((response) => response.json())
          .catch((error) => console.log(error));
    };
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        const formData = {
          model: event.target.elements.model.value,
          type_id: event.target.elements.type_id.value,
        };
        sendDataToApi(formData);
        event.target.reset();
      };
      return (
        <Box m="20px">
            <Header title="Create Car Model" subtitle="Create a New Model" />

            <div className="form-container" >

          <Form onSubmit={handleSubmit} className="form-body" >

            <TextField
              required
              className="textField"
              variant="filled"
              type="text"
              label="Name"
              name="model"
              placeholder="Part Name"
              defaultValue="" // Set an initial value
            />
            <br />
    
            <Select
              required
              style={{ width:'500px' }}
              className="select__group"
              label="model"
              name="type_id"
              defaultValue="" // Set an initial value
            >
              <MenuItem key="default">Select Brand</MenuItem>
              {posts.map((data) => (
                <MenuItem key={data.id} value={data.id}>
                  {data.type}
                </MenuItem>
              ))}
            </Select>
    
            <br /><br />
            <Button type="submit" color="secondary" variant="contained">
              Create new model
            </Button>
          </Form>
        </div>
        </Box>
        
      );
} 

export default AddCarModel;
