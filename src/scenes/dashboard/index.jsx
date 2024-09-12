import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import  PieChart  from "../../components/PieChart";
const Dashboard = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/count")
    .then((response) => response.json())
    .then((data) => setPosts(data))
    .catch(error => console.log(error)); 
  }, []);

  const [recent, setRecent] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/recentTransactions")
    .then((response) => response.json())
    .then((data) => setRecent(data))
    .catch(error => console.log(error)); 
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        
        <Box
          gridColumn="span 3"
          backgroundColor={colors.handle[200]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
         <StatBox
            progress="null"
            title={posts.map(item => (
              <Link to="/RequestedSeller" style={{ color:'#fff',textDecoration:'none'}} ><Box>  {item.validationsellers} </Box></Link>
            ))}
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
            subtitle="Requested Sellers"

          />
        </Box>       
        <Box
          gridColumn="span 3"
          backgroundColor={colors.handle[200]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={posts.map(item => (
            <Link to="/ProposedCategories" style={{ color:'#fff',textDecoration:'none'}} ><Box>  {item.proposedcategory} </Box></Link>
            ))}
            subtitle="Proposed Categories"
            progress="null"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.handle[200]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
           title={posts.map(item => (
              <Link to="/ProposedCar" style={{ color:'#fff',textDecoration:'none'}} ><Box>  {item.proposedcars} </Box></Link>
              ))}            
            subtitle="Proposed Car Models"
            progress="null"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.handle[200]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
           title={posts.map(item => (
            <Link to="/ProposedCarType" style={{ color:'#fff',textDecoration:'none'}} ><Box>  {item.proposedcartypes} </Box></Link>
            ))} 
            subtitle="Proposed Cars Types"
            progress="null"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.handle[200]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
           title={posts.map(item => (
            <Link to="/HiddenCategories" style={{ color:'#fff',textDecoration:'none'}} ><Box>  {item.hiddenCategories} </Box></Link>
            ))} 
            subtitle="Hidden Categories"
            progress="null"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        
        <Box
          gridColumn="span 3"
          backgroundColor={colors.handle[200]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
           title={posts.map(item => (
            <Link to="/banned sellers" style={{ color:'#fff',textDecoration:'none'}} ><Box>  {item.bannedSeller} </Box></Link>
            ))} 
            subtitle="Banned Sellers"
            progress="null"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.handle[200]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
           title={posts.map(item => (
            <Link to="/banned customers" style={{ color:'#fff',textDecoration:'none'}} ><Box>  {item.bannedCustomer} </Box></Link>
            ))} 
            subtitle="Banned Customer"
            progress="null"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.handle[200]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
           title={posts.map(item => (
            <Link to="/ContactUS" style={{ color:'#fff',textDecoration:'none'}} ><Box>  {item.messages} </Box></Link>
            ))} 
            subtitle="Messages"
            progress="null"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.handle[200]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Sales
            </Typography>
          </Box>

          {recent.map((transaction, i) => (
            <Box
              key={`${transaction.id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  Sale ID:{transaction.id}
                </Typography>
                <Typography color={colors.grey[100]}>
                  Customer Name:  {transaction.customer_name}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.created_at}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.totalprice}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.handle[200]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            
          </Typography>
          
            <PieChart isDashboard={true} />
        </Box>
       
       
      </Box>
    </Box>
  );
};

export default Dashboard;