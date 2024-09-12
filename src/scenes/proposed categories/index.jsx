import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
import { useTheme } from "@mui/material";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';
import { Button, Input } from 'reactstrap';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const ProposedCategories = () => {
  
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/showproposecategory")
    .then((data) => data.json())
    .then((data) => setPosts(data))
  },[])
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleapprovecategory = (id,seller_id,cat_name) => {
    const subject=`Your proposed category(${cat_name}) was approved `;

    const url = "http://127.0.0.1:8000/api/approvecategory"+"/"+id+"/"+seller_id+"/"+subject
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
  };
  const handlerejectcategory = (id,seller_id,cat_name) => {
    const subject=`Your proposed category(${cat_name}) was rejected for details call 0932392808 `;
    const url = "http://127.0.0.1:8000/api/rejectproposedcategory"+"/"+id+"/"+seller_id+"/"+subject
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
      field: "seller_name",
      headerName: "Seller",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex:7,
    },

    {
      field: 'approve',
      headerName: 'Approve',
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const id = params.row.id;
        const seller_id = params.row.seller_id;
        const cat_name = params.row.name;
        return (
          <Popup
              //overlayStyle={{background: 'transparent'}}
              trigger={< ThumbUpIcon />}
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
                              onClick={() => handleapprovecategory(id,seller_id,cat_name)}>< CheckIcon /></Button>
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
    {
      field: 'reject',
      headerName: 'Reject',
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const id = params.row.id;
        const seller_id = params.row.seller_id;
        const cat_name = params.row.name;
        return (
          <Popup
          //overlayStyle={{background: 'transparent'}}
          trigger={< ThumbDownIcon />}
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
                          onClick={() => handlerejectcategory(id,seller_id,cat_name)}>< CheckIcon /></Button>
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
        title="Proposed Categories"
        subtitle="List of Proposed Categories"
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

export default ProposedCategories;
