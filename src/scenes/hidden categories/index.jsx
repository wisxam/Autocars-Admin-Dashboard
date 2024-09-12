import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
import { useTheme } from "@mui/material";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Popup from 'reactjs-popup';
import { Button, Input } from 'reactstrap';

const HiddenCategories = () => {
  
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/showDeletedCategories")
    .then((data) => data.json())
    .then((data) => setPosts(data))
  },[])
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleunhidecategory = (id) => {
    const url = "http://127.0.0.1:8000/api/undelete_categorys"+"/"+id
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
  // console.log(id);
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
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: 'unhide',
      headerName: 'Un Hide',
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const id = params.row.id;
        return (
          <Popup
          //overlayStyle={{background: 'transparent'}}
          trigger={< RemoveRedEyeIcon />}
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
                          onClick={() => handleunhidecategory(id)}>< CheckIcon /></Button>
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
    }
  ];
  return (
    <Box m="20px">
      <Header
        title="Hidden Categories"
        subtitle="List of Hidden Categories"
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
        />
      </Box>
    </Box>
  );
};

export default HiddenCategories;
