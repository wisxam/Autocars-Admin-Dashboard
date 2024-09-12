import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
import { useTheme } from "@mui/material";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Email } from "@mui/icons-material";
import Popup from 'reactjs-popup';
import { Button, Input } from 'reactstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
// import  CIcon  from '@coreui/icons-react';
// import { cilBan, cilShieldAlt } from '@coreui/icons';


const Users_backup = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/showUsersBackup")
    .then((response) => response.json())
    .then((data) => setPosts(data))
    .catch(error => console.log(error)); 
  }, []);
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

//function delete
  const handleDelete = (id) => {
    const url = "http://127.0.0.1:8000/api/deleteUserBackup"+"/"+id;
          fetch( url, { method: 'get'}).then((Response) => {
            if(!Response.ok){
              throw new Error('Something went wrong')
            }
          })
  setPosts(prevData => prevData.filter(row => row.id !== id));
};
  const columns = [
    {
      field: "id",
      headerName: "ID",
      valueGetter: params => params.row.id,
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
      field: "financial_balance",
      headerName: "Financl Balance",
      flex: 1,
    },
    {
      field: "utype",
      headerName: "User Type",
      flex: 1,
    },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        
        const id = params.row.id;
        return (
          <Popup
              overlayStyle //background: transparent;
              trigger={<DeleteIcon />}
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
                              onClick={() => handleDelete(id)}>< CheckIcon /></Button>
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
  ];

  return (
    <Box m="20px">
      <Header
        title="Users"
        subtitle="List of Users backup"
      />
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
      >
        <DataGrid
          rows={posts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          checkboxSelection
        />
         {/* <p>Selected IDs: {JSON.stringify(selectedIds)}</p> */}
      </Box>
    </Box>
  );
};
export default Users_backup;
