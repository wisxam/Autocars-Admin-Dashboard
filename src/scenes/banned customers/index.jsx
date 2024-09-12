import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import Mockdata from "../../data/mockData";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';
import { Button, Input } from 'reactstrap';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const BannedCustomers = () => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/show_baned_customer")
    .then((data) => data.json())
    .then((data) => setPosts(data))
  },[])
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);  

  const handleunban = (id,email) => {
    const subject="You Are unbanned from car auto parts";
    const url = "http://127.0.0.1:8000/api/unban_customer"+"/"+id+"/"+email+"/"+subject
          fetch( url, { method: 'get'}).then((Response) => {
            if(!Response.ok){
              throw new Error('Something went wrong')
            }
            console.log('cool');
          }).then((posts) => {})
          .catch((e) => {
            console.log('cool');
  })
  setPosts(prevData => prevData.filter(row => row.id !== id));
  console.log(id);
  };

  
  const columns = [
    {
      field: "id",
      headerName: "ID",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "utype",
      headerName: "User Type",
      flex: 1,
    },
    {
      field: 'unban',
      headerName: 'Un Ban',
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const id = params.row.id;
        const email = params.row.email;
        return (
          <Popup
          //overlayStyle={{background: 'transparent'}}
          trigger={< PersonRemoveIcon />}
          position="center center"
          modal
          closeOnDocumentClick
          contentStyle={{ maxWidth: '400px', padding: '2rem', backgroundColor: "#292929"}}
                >
                  {close => (
                    <div color="blue">
                      <p>Are you sure?</p>
                      <div>
                        <Button style={{ 
                          background: "none",
                          color: "inherit",
                          border: "none",
                          padding: 0,
                          font: "inherit",
                          cursor: "pointer",outline: "inherit" }} 
                          onClick={() => handleunban(id, email)}>< CheckIcon /></Button>
                        <Button style={{ 
                          background: "none",
                          color: "inherit",
                          border: "none",
                          padding: 20,
                          font: "inherit",
                          cursor: "pointer",outline: "inherit",
                          marginRight: '50px' }} onClick={close}>< CloseIcon /></Button>
                      </div>
                    </div>
            )}
          </Popup>
        );
      },
    },
    // {
    //   field: "accessLevel",
    //   headerName: "Access Level",
    //   flex: 1,
    //   renderCell: ({ row: { access } }) => {
    //     return (
    //       <Box
    //         width="60%"
    //         m="0 auto" //m is margin and if its 2 auto then it represents top and bottom and 0 auto it represents left and right 
    //         p="5px"
    //         display="flex"
    //         justifyContent="center"
    //         backgroundColor={
    //           access === "admin"
    //             ? colors.greenAccent[600]
    //             : access === "manager"
    //             ? colors.greenAccent[700]
    //             : colors.greenAccent[700]
    //         }
    //         borderRadius="4px"
    //       >  {/* now i can show the icons depending on the access */}
    //         {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
    //         {access === "manager" && <SecurityOutlinedIcon />}
    //         {access === "user" && <LockOpenOutlinedIcon />}
    //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
    //           {access}
    //         </Typography>
    //       </Box>
          
        //renderCell is a customized component which will act as i intend, i can destruction and grab a row which will be the access property from the mockData.js and i will use that information to render what i want
        //since the age field is a number then it will always be represented on right, so i use headerAlign and assign it to left 
        //cellClassName: "name-column--cell" is a custom cell class name, this will allow me to customize the column cell later on when i added classes
        //flex means that the column will grow depending on how many objects we have 
        //field represents the id of the field and headerName represents what will the column will show 
        //columns wont be an object it will be an array where i will pass in an object which will be a field
    //     );
    //   },
    // },
  ];

  return (
    <Box m="20px">
      <Header title="Banned Customer" subtitle="Managing Banned Customer" />    
      <Box>

      {/* <button 
      className="btn btn-primary btn-sm m-2"
      onClick={()=>{
        deleteCustomerByIds();
      }}
      >
        Delete Customer
      </button> */}
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      > {/* this is where im going to pass in the data grid */}
        <DataGrid checkboxSelection rows={posts}
         columns={columns}
         components={{ Toolbar: GridToolbar }}
         
         />
        {/* usually the data goes in the row section */}
        {/* columns will pass in a variable that i will create, columns will represent what i will pass in  */}
      </Box>
    </Box>
  );
};

export default BannedCustomers;