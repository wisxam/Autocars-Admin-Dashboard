import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery"; //so i can have responsive layout

import React, { Component } from "react";
import "../../styles/form.css";
import Header from "../../components/Header";

const initialValues = { 
        name: "",
        description: "",
};

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/; //js thing where i can check based on the string and i can check what the values are (copied from stackoverflow)

const userSchema = yup.object().shape({ //this schema will define the validation logic for each field that will be used, and yup provides many validation functions
    name: yup.string().required("required"), //if there is no input this firstName field is going to be a required input
    description: yup.string().required("required"),
});



const Form = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)"); //if the width is less than 600px then it will trigger the isNonMobile which is a boolean
    
    const handleFormSubmit = (values) => { //this function will be triggered once i have submitted the form
        // console.log(values)
        fetch('http://127.0.0.1:8000/api/addedcaty',{
                    method:'post',
                    body:JSON.stringify(values),
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json',
                    }
                })
        }



        
    return(
        <Box m="20px">

            <Header title="Create Category" subtitle="Create a New Category" />
            <div className="form-container" >
            <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={userSchema}
            >
                {/* all of these values errors touched etc, all of them come from this Formik component and this arrow function allow me to use these values inside my form component */}
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="form-body" >
                        <Box 
                        display="grid" 
                        gap="30px" 
                        gridTemplateColumns="repeat(4, minnmax(0, 1fr))"
                        // gridTemplateColumns allows me to split the grid into 4 sections and each of the section is going to have a minimum of 0 and a max of 1fr which is a specific unit dedicated for grids only (fractional units) *means each coloumn can have the max of 1 fraction*
                        sx={{
                            "& > div": {gridColumn: isNonMobile ? undefined : "span 4"}
                        }}
                        >
                            <TextField
                                className="textField"
                                variant="filled"
                                type="text"
                                label="Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name="name"
                                error={!!touched.name && !!errors.name} 
                                helperText={touched.name && errors.name}
                                sx={{ gridColumn: "span 2"}}
                             />
                             <TextField
                                className="textField"
                                variant="filled"
                                type="text"
                                label="Description"
                                onBlur={handleBlur}//represent the function that changes depending on whether i touch it or not 
                                onChange={handleChange}//when i change the text
                                value={values.description}//it has to change the initial values which are empty strings 
                                name="description"//this needs to align with the particular value
                                error={!!touched.description && !!errors.description} //touched is when i press on a field and get out of it while doing nothing on it, so !!touched will force it to become boolean
                                helperText={touched.description && errors.description}
                                sx={{ gridColumn: "span 2"}}
                             />

                        </Box>
                        <Box  mt="20px">
                            <Button 
                            type="submit" 
                            color="secondary" 
                            variant="contained"
                            >
                                Create New Category
                            </Button>
                        </Box>
                    </form>
                )}
            {/* formik provides a number of premade values that come from the formik component itself */}

            </Formik>
            </div>
        </Box>
    )
} 

export default Form;