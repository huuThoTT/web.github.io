<<<<<<< HEAD
import "./App.css";
import HomePage from "./Admin/Components/Home/HomePage";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Admin/Components/Login/Login";
import Register from "./Admin/Components/Register/Register";
import NavBar from "./Admin/Components/NavBar/NavBar";
import CustomerHome from "./Customer/CustomerHome/CustomerHome";
import { useState } from "react";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App"> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<CustomerHome/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
=======
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
>>>>>>> Phung
