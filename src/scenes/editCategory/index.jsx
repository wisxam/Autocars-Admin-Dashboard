import { Box, Button, TextField } from "@mui/material"; 
    import { Formik } from "formik"; 
    import * as yup from "yup"; 
    import useMediaQuery from "@mui/material/useMediaQuery"; //so i can have responsive layout 
    import Header from "../../components/Header"; 
    import React from "react"; 
    import { useState, useEffect } from "react"; 
    import { useNavigate } from 'react-router-dom'; 
import { esES } from "@mui/x-data-grid"; 
import UpgradeIcon from '@mui/icons-material/Upgrade';
    const initialValues = {  
            id:"", 
            name: "", 
            description: "", 
    }; 
    const EditCategory = () => { 
        const navigate = useNavigate(); 
        const isNonMobile = useMediaQuery("(min-width:600px)"); //if the width is less than 600px then it will trigger the isNonMobile which is a boolean 
            const [posts, setPosts] = useState([])   
            useEffect(() => { 
            fetch("http://127.0.0.1:8000/api/edit_category/"+localStorage.getItem('category_id')) 
            .then((data) => data.json()) 
            .then((data) => setPosts(data)) 
            },[]) 
            const sendDataToApi = (formData) => { 
                const url = "http://127.0.0.1:8000/api/update_category?"+"id="+formData.id + "&name="+formData.name+"&description="+formData.description 
                fetch( url, { method: 'get'}) 
                .then((Response) => { 
                  if(!Response.ok){ 
                    throw new Error('Something went wrong') 
                  } 
                }) 
          navigate('/categories') 
            } 
             
              const handleSubmit = (values) => { 
                var name=""; 
                var description=""; 
 
                if(!values.name) 
                    name = posts.map((data)=>data.name)[0] 
                else 
                    name=values.name;   
 
                if(!values.description) 
                    description = posts.map((data)=>data.description)[0] 
                else 
                    description=values.description   
                     
                const formData = { 
                  id: posts.map((data)=>data.id)[0], 
                  name: name, 
                  description:description, 
                }; 
                // console.log(formData) 
                sendDataToApi(formData); 
              }; 
             
        return( 
            <Box m="20px"> 
  <Header title="Edit Category" /> 
 
  <Formik 
    onSubmit={handleSubmit} 
    initialValues={initialValues} 
  > 
    {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => ( 
      <form onSubmit={handleSubmit}> 
        <Box 
          display="grid" 
          gap="30px" 
          gridTemplateColumns="repeat(4, minmax(0, 1fr))" 
          sx={{ 
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } 
          }} 
        > 
          {posts.map((data) => ( 
            <React.Fragment key={data.id}> 
 
              <TextField 
                fullWidth 
                variant="filled" 
                type="text" 
                label="Name" 
                onBlur={handleBlur} 
                onChange={handleChange} 
                placeholder={data.name} 
                name="name" 
                value={values.name} // Update value prop with formik values 
                error={!!touched.name && !!errors.name} 
                helperText={touched.name && errors.name} 
                sx={{ gridColumn: "span 2" }} 
              /> 
 
              <TextField 
                fullWidth 
                variant="filled" 
                type="text" 
                label="Description" 
                onBlur={handleBlur} 
                onChange={handleChange} 
                placeholder={data.description} 
                name="description" 
                value={values.description} // Update value prop with formik values 
                error={!!touched.description && !!errors.description} 
                helperText={touched.description && errors.description} 
                sx={{ gridColumn:"span 2" }} 
                /> 
              </React.Fragment> 
            ))} 
   
            <Box display="flex" justifyContent="end" mt="20px"> 
              <Button color="secondary" variant="contained" type="submit"> 
                < UpgradeIcon /> 
              </Button> 
            </Box> 
          </Box> 
        </form> 
      )} 
    </Formik> 
  </Box> 
   
        
          ) 
      }  
   
      export default EditCategory;