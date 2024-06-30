
import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PageContent from "./Admin/Components/PageContent";
import AdminFooter from "./Admin/Components/AdminFooter";
import AdminHeader from "./Admin/Components/AdminHeader";
import SideMenu from "./Admin/Components/SideMenu";
import Article from "./Admin/Pages/Article";
import Category from "./Admin/Pages/Category";
import Dashboard from "./Admin/Pages/Dashboard";
import Users from "./Admin/Pages/Users";
import ReviewArticles from "./Admin/Pages/ReviewArtic";
import CusHome from "./Customer/Pages/CusHome/CusHome";
import CusHeader from "./Customer/Components/CusHeader/CusHeader";
import CusFooter from "./Customer/Components/CusFooter/CusFooter";
import { useState } from "react";

function App() {
  return (
    <div className="App">
  
  <Routes>
      <Route path="/admin" element={
        <div>
          <AdminHeader />
          <div className="SideMenuAndPageContent">
            <SideMenu />
            <div className="PageContent">
              <Dashboard />
            </div>
          </div>
          <AdminFooter />
        </div>
      } />
      <Route path="/admin/article" element={
        <div>
          <AdminHeader />
          <div className="SideMenuAndPageContent">
            <SideMenu />
            <div className="PageContent">
              <Article />
            </div>
          </div>
          <AdminFooter />
        </div>
      } />
      <Route path="/admin/category" element={
        <div>
          <AdminHeader />
          <div className="SideMenuAndPageContent">
            <SideMenu />
            <div className="PageContent">
              <Category />
            </div>
          </div>
          <AdminFooter />
        </div>
      } />
      <Route path="/admin/user" element={
        <div>
          <AdminHeader />
          <div className="SideMenuAndPageContent">
            <SideMenu />
            <div className="PageContent">
              <Users />
            </div>
          </div>
          <AdminFooter />
        </div>
      } />
      <Route path="/admin/review" element={
        <div>
          <AdminHeader />
          <div className="SideMenuAndPageContent">
            <SideMenu />
            <div className="PageContent">
              <ReviewArticles />
            </div>
          </div>
          <AdminFooter />
        </div>
      } />
      <Route path="/" element={
        <div>
          <CusHeader />
          <CusHome />
          <CusFooter />
        </div>
      } />
    </Routes>

    </div>
    
  );
}

export default App;

