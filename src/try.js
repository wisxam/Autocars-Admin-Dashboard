import { ColorModeContext, useMode } from "./theme"; //import the methods i created from the file theme which has the path of ./theme
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
// import Header from "./components/header";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
// import Sidebar from "./scenes/global/Sidebar";
// import Dashboard from "./scenes/dashboard";
// import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
// import Calendar from "./scenes/calendar";
import Axios from "axios";
import Mockdata from "./data/mockData";


function Try() {
    return (
        < div className="App" >
            < Mockdata />
        </div >
    );
}




export default Try;
