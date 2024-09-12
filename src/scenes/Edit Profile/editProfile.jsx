import "../../styles/user-style.css"
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from "../../components/Header";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import AuthUser from '../../components/AuthUser';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Co2Sharp } from "@mui/icons-material";

const initialValues = { 
  name: "",
  email: "",
  address: "",
  phone: ""
};

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/; //js thing where i can check based on the string and i can check what the values are (copied from stackoverflow)

const userSchema = yup.object().shape({ //this schema will define the validation logic for each field that will be used, and yup provides many validation functions
    name: yup.string(), //if there is no input this firstName field is going to be a required input
    email: yup.string(),
    address: yup.string(),  
    phone: yup.string().matches(phoneRegExp, 'Invalid phone number')
});


const EditProfile = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const{http}= AuthUser();
  const [user, setUser] = useState([]);
  
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const handleImageChange = (files) => {
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };


  useEffect(() => {
    http.post('/me')
    .then((res)=>{setPosts(res.data)})
  } , []);



  const sendDataToApi = (formData) => {
    const data = new FormData();
    data.append("id",formData.id)

    if (image) {
      data.append("image", image);
    } else {
      data.append("image", formData.image);
    }
  
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("address", formData.address);
    data.append("phone", formData.phone);
    data.append("password", formData.password);
  
    // Send the form data to the API
    fetch("http://127.0.0.1:8000/api/updateProfile", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setPosts(data);
        navigate("/userProfile");
      })
      .catch((error) => console.log(error));
      
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('token')
      window.location.reload()

  };
  
  

      const handleSubmit = (values) => {

        const formData = {
          image:posts.image,
          id: posts.id,
          name: values.name || posts.name,
          email: values.email || posts.email,
          address: values.address || posts.address,
          phone: values.phone || posts.phone,
          password: values.password || posts.password,
        };

      if (window.confirm("Are you sure you want to save?")) {
        // console.log(formData)
        sendDataToApi(formData);
      }
      else{
        
      }
      };
    return(
        <Box m="20px">
            <Header title="Edit Profile" subtitle="Edit" />
            <h2> Information </h2>
            < hr />
            <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={userSchema}
            >
                {/* all of these values errors touched etc, all of them come from this Formik component and this arrow function allow me to use these values inside my form component */}
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <img style={{ width:250 }} src={`http://localhost:8000/${posts.image}`} alt="profile image"/>
                        <TextField type="file"   onChange={(e) => handleImageChange(e.target.files)} style={{ backgroundColor:'orange'}}/>
                        <Box 
                        display="grid" 
                        gap="30px" 
                        gridTemplateColumns="repeat(4, minnmax(0, 1fr))"
                        // gridTemplateColumns allows me to split the grid into 4 sections and each of the section is going to have a minimum of 0 and a max of 1fr which is a specific unit dedicated for grids only (fractional units) *means each coloumn can have the max of 1 fraction*
                        sx={{
                            "& > div": {gridColumn: isNonMobile ? undefined : "span 4"}
                        }}
                        >
                          Name: {posts.name}
                            <TextField
                                fullWidth
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
                           Email: {posts.email}
                             <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email"
                                onBlur={handleBlur}//represent the function that changes depending on whether i touch it or not 
                                onChange={handleChange}//when i change the text
                                value={values.email}//it has to change the initial values which are empty strings 
                                name="email"//this needs to align with the particular value
                                error={!!touched.email && !!errors.email} //touched is when i press on a field and get out of it while doing nothing on it, so !!touched will force it to become boolean
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 2"}}
                             />
                        </Box>
                        < br />
                        <h2> Accomadation </h2>
                        < hr />
                        Address: {posts.address}
                             <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Address"
                                onBlur={handleBlur}//represent the function that changes depending on whether i touch it or not 
                                onChange={handleChange}//when i change the text
                                value={values.address}//it has to change the initial values which are empty strings 
                                name="address"//this needs to align with the particular value
                                error={!!touched.address && !!errors.address} //touched is when i press on a field and get out of it while doing nothing on it, so !!touched will force it to become boolean
                                helperText={touched.address && errors.address}
                                sx={{ gridColumn: "span 2"}}
                             />
                             Phone: {posts.phone}
                             <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Phone"
                                onBlur={handleBlur}//represent the function that changes depending on whether i touch it or not 
                                onChange={handleChange}//when i change the text
                                value={values.phone}//it has to change the initial values which are empty strings 
                                name="phone"//this needs to align with the particular value
                                error={!!touched.phone && !!errors.phone} //touched is when i press on a field and get out of it while doing nothing on it, so !!touched will force it to become boolean
                                helperText={touched.phone && errors.phone}
                                sx={{ gridColumn: "span 2"}}
                             />
                             New Password:<TextField
                                fullWidth
                                variant="filled"
                                type="password"
                                label="Password"
                                onBlur={handleBlur}//represent the function that changes depending on whether i touch it or not 
                                onChange={handleChange}//when i change the text
                                value={values.password}//it has to change the initial values which are empty strings 
                                name="password"//this needs to align with the particular value
                                sx={{ gridColumn: "span 2"}}
                             />
                             {/* <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label=""
                                onBlur={handleBlur}//represent the function that changes depending on whether i touch it or not 
                                onChange={handleChange}//when i change the text
                                value={values.phone}//it has to change the initial values which are empty strings 
                                name="phone"//this needs to align with the particular value
                                error={!!touched.phone && !!errors.phone} //touched is when i press on a field and get out of it while doing nothing on it, so !!touched will force it to become boolean
                                helperText={touched.phone && errors.phone}
                                sx={{ gridColumn: "span 2"}}
                             /> */}
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button 
                            type="submit" 
                            color="secondary" 
                            variant="contained"
                            onSubmit={handleSubmit}
                            >
                                Edit
                            </Button>
                        </Box>
                    </Form>
                )}
            {/* formik provides a number of premade values that come from the formik component itself */}
            </Formik>
        </Box>
    )
} 

export default EditProfile;