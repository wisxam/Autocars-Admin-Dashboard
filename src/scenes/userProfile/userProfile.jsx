import React, { useRef, useState, useEffect } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from 'reactstrap';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AuthUser from '../../components/AuthUser';
import "../../styles/user-style.css";
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import { Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const UserProfile = () => {
  //const ref = useRef(null);
  const [posts, setPosts] = useState([]);
  const [monyValue, setMonyValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { http } = AuthUser();
  const [id, setID] = useState([]);
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    http.post('/me').then((res) => {
      setPosts(res.data);
    });
  }, []);

  const AddToBalance = () => {
    http.get("/MoveToBalance/" + posts.id + "/" + monyValue);
    setIsOpen(false); // Close the popup
  };


  const EditProfile = () => {
    navigate('/EditProfile');
  };

  const isSeller = posts.utype === '2';


  return (
    <section>
      <Box height="860px" width="1468px" display="flex">
      <MDBContainer style={{ marginInline: 200, marginLeft: 600 ,marginBottom:'60px'}} >
      <MDBRow style={{ margin: 100, marginInline: -200, width: 700}}>
        <MDBCol>
            <img src={`http://localhost:8000/${posts.image}`} alt={posts.image} style={{ width:'380px',height:'200px',marginLeft:'400px' }} />
            <MDBTypography style={{ fontSize: 30, color: "#333333"}}>User: {posts.name}</MDBTypography>
            <MDBTypography style={{ fontSize: 20, color: "#333333"}}>Balance: ${posts.financial_balance}.00</MDBTypography>
            <MDBTypography style={{ fontSize: 20, color: "#333333"}}>Profit: ${posts.profits}.00</MDBTypography>
        </MDBCol>
          <MDBCol>
            <MDBCardBody>
              <hr />
              <MDBTypography style={{ fontSize: 30, color: "#333333"}}>Information</MDBTypography>
              {/* <MDBTypography  >ID: {posts.id}</MDBTypography> */}
              <MDBTypography style={{ fontSize: 20, color: "#333333"}}>ID owner: {posts.name}</MDBTypography>
              <MDBTypography style={{ fontSize: 20, color: "#333333"}}>Email: {posts.email}</MDBTypography>
              {/* <MDBCardText className="text-muted">{posts.name} email</MDBCardText> */}
              <hr/>
              <MDBTypography style={{ fontSize: 30, color: "#333333"}}>Accommodation</MDBTypography>
              <MDBTypography style={{ fontSize: 20, color: "#333333"}}>Address: {posts.address}</MDBTypography>
              <Button style={{ backgroundColor: "#EEA47F", marginLeft: 20, fontSize: 20, fontFamily: "inherit",float:'right' }} onClick={EditProfile}>Edit Profile <ModeEditIcon /> </Button>

              <MDBTypography style={{ fontSize: 20, color: "#333333", color: "#333333"}}>Phone: {posts.phone}</MDBTypography>




            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      </Box>
    </section >
  );
}

export default UserProfile;

