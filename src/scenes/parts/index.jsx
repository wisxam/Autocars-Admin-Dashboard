import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
import { useTheme } from "@mui/material";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Parts = () => {
  

  // posts.map(customer => {

  // })

  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/showParts")
    .then((response) => response.json())
    .then((data) => setPosts(data))
    .catch(error => console.log(error)); 
  }, []);

  

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
      field: "seller_name",
      headerName: "Seller",
      flex: 1,
    },
    {
      field: "model",
      headerName: "Model",
      flex: 1
    },
    {
      field: "category_name",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },

  
  ];

  return (
    <Box m="20px">
      <Header
        title="Parts"
        subtitle="List of   Parts"
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

export default Parts;
