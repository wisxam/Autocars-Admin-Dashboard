import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery"; //so i can have responsive layout
import Header from "../../components/Header";
import React, { Component } from "react";
import "../../styles/form.css";

const initialValues = { 
        type: "",
};

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/; //js thing where i can check based on the string and i can check what the values are (copied from stackoverflow)

const userSchema = yup.object().shape({ //this schema will define the validation logic for each field that will be used, and yup provides many validation functions
    type: yup.string().required("required"), //if there is no input this firstName field is going to be a required input
});



const AddCarType = () => {

    const isNonMobile = useMediaQuery("(min-width:600px)"); //if the width is less than 600px then it will trigger the isNonMobile which is a boolean
    const handleFormSubmit = (values) => { //this function will be triggered once i have submitted the form
        // console.log(values)
        fetch('http://127.0.0.1:8000/api/addCarType',{
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
            <Header title="Create Car Type"subtitle="Create a New Brand"  />
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
                                label="Type"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.type}
                                name="type"
                                error={!!touched.firstName && !!errors.firstName} 
                                helperText={touched.firstName && errors.firstName}
                                sx={{ gridColumn: "span 2"}}
                             />
                        </Box>
                        <Box display="flex" mt="20px">
                            <Button 
                            type="submit" 
                            color="secondary" 
                            variant="contained"
                            >
                                Create new type
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

export default AddCarType;