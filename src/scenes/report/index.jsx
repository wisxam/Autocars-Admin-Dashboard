import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid , GridToolbar} from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
// import Mockdata from "../../data/mockData";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mockDataTeam } from "../../data/mockData";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Popup from 'reactjs-popup';
import { Button, Input } from 'reactstrap';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';

const Report = () => {

  const [posts, setPosts] = useState([])

  
  useEffect(() => {

    fetch("http://127.0.0.1:8000/api/showReport"+"/")
    .then((data) => data.json())
    .then((data) => setPosts(data))
  },[])

  // const DeleteCustomerByIds=()=> {
    



  //   let arrayIds = [];
  //   posts.forEach(cool => {
  //     if(cool.select) {
  //       arrayIds.push(cool.id);
  //     }
  //   })
  //   console.log(arrayIds);
  // };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDeletePart = (id) => {
    const url = "http://127.0.0.1:8000/api/DeletePartFromReport"+"/"+id
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

const handleDeleteReport=(id)=>{
    const url = "http://127.0.0.1:8000/api/DeleteReport"+"/"+id
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

}
const handleban = (id) => {
  const url = "http://127.0.0.1:8000/api/baned_seller"+"/"+id
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
      valueGetter: params => params.row.id,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "seller_name",
      headerName: "Seller",
      flex: 1,
    },
    {
      field: "part_name",
      headerName: "Part",
      flex: 1,
    },
    {
      field: "customer_name",
      headerName: "Customer",
      flex: 1
    },
    
    {
      field: "description",
      headerName: "Description",
      flex: 7,
    },
    {
      field: 'delete',
      headerName: 'Delete Part',
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const id = params.row.part_id;
        return (
          <Popup
          //overlayStyle={{background: 'transparent'}}
          trigger={< DeleteForeverIcon />}
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
                          onClick={() => handleDeletePart(id)}>< CheckIcon /></Button>
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
      field: 'ban',
      headerName: 'Ban Seller',
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const id = params.row.seller_id;
        return (
          <Popup
          //overlayStyle={{background: 'transparent'}}
          trigger={< RemoveCircleOutlineIcon />}
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
                          onClick={() => handleban(id)}>< CheckIcon /></Button>
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
        field: 'deleteReport',
        headerName: 'Delete Report',
        sortable: false,
        width: 100,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          const id = params.row.id
          return (
            <Popup
            //overlayStyle={{background: 'transparent'}}
            trigger={< FolderDeleteIcon />}
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
                            onClick={() => handleDeleteReport(id)}>< CheckIcon /></Button>
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
      <Header title="Reports" subtitle="Managing the Reports on Parts" />
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
        <DataGrid checkboxSelection
         rows={posts} 
         columns={columns}
         components={{ Toolbar: GridToolbar }}

         getRowId={(row) => row.id} />
      </Box>
    </Box>
  );
};

export default Report;
