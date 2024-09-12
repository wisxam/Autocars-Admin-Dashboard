import { ColorModeContext, useMode } from "./theme"; //import the methods i created from the file theme which has the path of ./theme
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Sellers from "./scenes/sellers";
import BannedSellers from "./scenes/banned sellers";
import Customer from "./scenes/customers";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Pie from "./scenes/pie";
import Calendar from "./scenes/calendar";
import BannedCustomers from "./scenes/banned customers";
import Categories from "./scenes/categories";
import RequestedSeller from "./scenes/requested sellers";
import HiddenCategories from "./scenes/hidden categories";
import ProposedCategories from "./scenes/proposed categories";
import ProposedCar from "./scenes/proposed car";
import Cars from "./scenes/cars";
import ProposedCarType from "./scenes/proposed car type";
import CarType from "./scenes/car type";
import Parts from "./scenes/parts";
import Sales from "./scenes/sales";
import AddCarType from "./scenes/form add car type";
import ContactUS from "./scenes/contact us";
import Report from "./scenes/report";
import AddCarModel from "./scenes/form add car model";
import Login from "./scenes/login";
import EditCategory from "./scenes/editCategory";
import { enc, SHA256 } from 'crypto-js';
import { useState, useEffect } from 'react';
import UserProfile from "./scenes/userProfile/userProfile";
import EditProfile from "./scenes/Edit Profile/editProfile";
import AddAdmin from "./scenes/Add Admin";
import RemoveAdmin from "./scenes/Remove Admin";
import Users_backup from "./scenes/users backup";
import AuthUser from "./components/AuthUser";


function App() {
  var isMatch = false;

  const [theme, colorMode] = useMode(); //now i can have access to the theme and color mode 


  const [users, setUser] = useState([]);

  const { http } = AuthUser();


  useEffect(() => {
    http.post('/me').then((res) => {
      setUser(res.data)
    })


  }, []);

  const utype = users.utype;


  if (utype != '0')
    return <Login />;


  isMatch = utype === '0';


  if (isMatch === true) {
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/banned customers" element={<BannedCustomers />} />
              <Route path="/sellers" element={<Sellers />} />
              <Route path="/customers" element={<Customer />} />
              <Route path="/banned sellers" element={<BannedSellers />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/RequestedSeller" element={<RequestedSeller />} />
              <Route path="/HiddenCategories" element={<HiddenCategories />} />
              <Route path="/ProposedCategories" element={<ProposedCategories />} />
              <Route path="/ProposedCar" element={<ProposedCar />} />
              <Route path="/Cars" element={<Cars />} />
              <Route path="/ProposedCarType" element={<ProposedCarType />} />
              <Route path="/CarType" element={<CarType />} />
              <Route path="/Parts" element={<Parts />} />
              <Route path="/Sales" element={<Sales />} />
              <Route path="/AddCarType" element={<AddCarType />} />
              <Route path="/AddCarModel" element={<AddCarModel />} />
              <Route path="/ContactUS" element={<ContactUS />} />
              <Route path="/Report" element={<Report />} />
              <Route path="/editCategory" element={<EditCategory />} />
              <Route path="/UserProfile" element={<UserProfile />} />
              <Route path="/EditProfile" element={<EditProfile />} />
              <Route path="/AddAdmin" element={<AddAdmin />} />
              <Route path="/RemoveAdmin" element={<RemoveAdmin />} />
              <Route path="/users backup" element={<Users_backup />} />




              {/* <Route path="/line" element={<Line />} /> */}
              {/* <Route path="/faq" element={<FAQ />} /> */}
              {/* <Route path="/geography" element={<Geography />} /> */}
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>//this is a way to set up my color context and i have access to it from everywhere 
  )
  }
  else {
    return <Login />
  }
}


export default App;
