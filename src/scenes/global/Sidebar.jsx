import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom"; //allows to have links when i click on the navigation item, takes me to the page where im clicking
import { tokens } from "../../theme";
import  HomeOutlinedIcon from "@mui/icons-material/PersonOutlined";
import  PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import  ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import  ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import  PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import  CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import  HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import  BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import  PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import  TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import  MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import  MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ForumIcon from '@mui/icons-material/Forum';
import FlagIcon from '@mui/icons-material/Flag';
import CategoryIcon from '@mui/icons-material/Category';
import GroupIcon from '@mui/icons-material/Group';
import { Directions } from "@mui/icons-material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MinorCrashIcon from '@mui/icons-material/MinorCrash';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
//create a sperate component for the items list inside the side bar which will take 5 different properties as its arguments
const Item = ( {title, to, icon, selected, setSelected} ) => {
    //will pass in theme so there wont be a need to pass it again and again
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    //doing this so i wont need to rewrite this code multiple times
    //onClick={()=> setSelected(title)} we set the title to the onClick if it gets clicked
    return (
        <MenuItem 
            active={selected === title} 
            style={{color: colors.grey[100]}} 
            onClick={()=> setSelected(title)} 
            icon={icon}
        >
           {/* if the item is selected then it will be active thats what menu item require from the react prosidebar  */}
          <Typography>{ title }</Typography>
          <Link to={to} />
        </MenuItem>
    )
}

const Sidebar = () => { 
    // 1. setup some of the states such as themes and colors
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false); // isCollapsed will represent whether the sidebar will be collapsed or not
    const [selected, setSelected] = useState("Dashboard");// selected will represent which item we are at or which page im at
    //after the return im basically setting up the styling
    return (
        <Box    
           sx={{
            "& .pro-sidebar-inner": {
              background: `${colors.handle[300]} !important` //this will override the background because i need to override the library which is the 'react-pro-sidebar/dist/css/styles.css' library that i imported
             },
             "& .pro-icon-wrapper": {
               backgroundColor: "transparent !important"
             },
             "& .pro-inner-item": {
               padding: "5px 35px 5px 30px !important" 
             },
             "& .pro-inner-item:hover": {
               color: "#868dfb !important" 
             },
             "& .pro-menu-item.active": {
               color: "#6870fa !important" 
             }
           }}    
        > 
        {/* here im selecting the prosidebar thats in the child component of the box which is inside the sx and thats how i selected it and changed those colors */}
         <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
             {/* iconShape="square" this will make the menu icons square */}
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ //inline style properties
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          > 
                    {/* here im going to show when its not collapsed */}
                 {!isCollapsed && (
                    //this whole box will represent the bar when its not collapsed
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
             </MenuItem>          
            {/*USER*/}
                {!isCollapsed && (
                    <Box mb="25px">
                    <Box display="flex" justifyContent="center" alignItems="center">
                    <img
                     alt="profile-user"
                     width="100px"   
                     height="100px"
                     src={`http://localhost:8000/${JSON.parse(sessionStorage.getItem('user')).image}`} 
                     style={{ cursor: "pointer", borderRadius: "50%"}}
                    />
                   </Box>
                   <Box textAlign="center">
                    <Typography 
                    variant="h2" 
                    color={colors.grey[100]} 
                    fontWeight="bold" 
                    sx={{ m: "10px 0 0 0"}}
                    >
                    {JSON.parse(sessionStorage.getItem('user')).name}
                    </Typography>                    
                    <Typography variant="h6" color="#EEA47F">Admin</Typography>
                   </Box> 
                </Box>
            )}

            {/* Menu Items */}
            <Box paddingLeft={isCollapsed? undefined : "10%"}>
                <Item
                    title="Dashboard"
                    // to is going to be for the main page for dashboard 
                    to="/" 
                    icon={<HomeOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                />

                {/* to add a text between the dashboard and manage team or anything in between i can just use typography element */}
                <Typography
                    variant="h6"
                    color="#EEA47F"
                    sx={{ m: "15px 0 5px 20px" }}
                >Tables
                </Typography>
                <Item
                    title="Requested Sellers"
                    to="/RequestedSeller" 
                    icon={<PeopleOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                />

                <SubMenu 
                title="Pruposed Tables"
                icon={<ReceiptOutlinedIcon />}
                >
                <Item
                    title="Pruposed Categories"
                    to="/ProposedCategories" 
                    icon={<CategoryIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                />
                <Item
                    title="Pruposed Cars"
                    to="/ProposedCar" 
                    icon={<ReceiptOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                />
                <Item
                    title="Pruposed Brands"
                    to="/ProposedCarType" 
                    icon={<ReceiptOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                />
                </SubMenu>
                <SubMenu 
                title="Banned"
                icon= {<RemoveCircleIcon />}
                >
                <Item
                    title="Banned Sellers"
                    to="/banned sellers" 
                    icon={<RemoveCircleOutlineIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                />
                <Item
                    title="Banned Customers"
                    to="/banned customers" 
                    icon={<RemoveCircleOutlineIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                />
                </SubMenu>
                
                <Item
                    title="Reports"
                    to="/report" 
                    icon={<FlagIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                />
                <Item
                    title="Messages"
                    to="/ContactUS" 
                    icon={<ForumIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                />    
                
               <Item
                    title="Hidden Categories"
                    to="/hiddencategories" 
                    icon={<CategoryIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                />
                
                 
                
                

                <Typography
                    variant="h6"
                    color="#EEA47F"
                    sx={{ m: "15px 0 5px 20px" }}
                >Pages
                </Typography>
                <SubMenu title="users" icon={<GroupIcon />}>
                <Item
                    title="Sellers"
                    to="/sellers" 
                    icon={<PeopleOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                />
                <Item
                    title="Customers"
                    to="/customers" 
                    icon={<ContactsOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                />
                <Item
                    title="Users Backup"
                    to="/users backup" 
                    icon={<ContactsOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                />

                </SubMenu>
                <SubMenu title="Vehicle" icon={<DirectionsCarIcon />}>
                <Item
                    title="Parts"
                    to="/Parts" 
                    icon={<ReceiptOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                />
                <Item
                    title="Cars"
                    to="/Cars" 
                    icon={<ReceiptOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                />
                 <Item
                    title="Car Types"
                    to="/CarType" 
                    icon={<ReceiptOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                />
                <Item
                    title="Categories"
                    to="/categories" 
                    icon={<ReceiptOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                />
                </SubMenu>

                
               
               
                
                <Item
                    title="Sales"
                    to="/Sales" 
                    icon={<ReceiptOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                />

                <Typography
                    variant="h6"
                    color="#EEA47F"
                    sx={{ m: "15px 0 5px 20px" }}
                >Recruiting
                </Typography>
                <SubMenu title="Vehicle" icon={<MinorCrashIcon />}>
                <Item
                    title="Add Category"
                    to="/form" 
                    icon={<CategoryIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                /> 
                <Item
                    title="Add Car Type"
                    to="/AddCarType" 
                    icon={<PersonOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                /> 
                <Item
                    title="Add Car Model"
                    to="/AddCarModel" 
                    icon={<PersonOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                /> 
                </SubMenu>
                <SubMenu title="Admin" icon={<RecordVoiceOverIcon />}>
                <Item
                    title="Add Admin"
                    to="/AddAdmin" 
                    icon={<PersonAddIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                /> 
                <Item
                    title="Remove Admin"
                    to="/RemoveAdmin" 
                    icon={<PersonRemoveIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                />
                </SubMenu>
                
{/* <Item
                    title="Calendar"
                    to="/calendar" 
                    icon={<CalendarTodayOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                /> */}
                {/* <Item
                    title="FAQ Page"
                    to="/faq" 
                    icon={<HelpOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                /> */}
                <Typography
                    variant="h6"
                    color="#EEA47F"
                    sx={{ m: "15px 0 5px 20px" }}
                >Charts
                </Typography>
                {/* <Item
                    title="Bar Chart"
                    to="/bar" 
                    icon={<BarChartOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                /> */}
                <Item
                    title="Pie Chart"
                    to="/pie" 
                    icon={<PieChartOutlineOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected} 
                />


            </Box> 
             </Menu> 
            </ProSidebar>
        </Box>
    )
}

export default Sidebar;

