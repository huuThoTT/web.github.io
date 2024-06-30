import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PageContent from "./Admin/Components/PageContent";
import AdminFooter from "./Admin/Components/AdminFooter";
import AdminHeader from "./Admin/Components/AdminHeader";
import SideMenu from "./Admin/Components/SideMenu";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <AdminHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </div>
      <AdminFooter />
    </div>
  );
}

export default App;
