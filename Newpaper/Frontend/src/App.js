
import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AdminFooter from "./Admin/Components/AdminFooter";
import AdminHeader from "./Admin/Components/AdminHeader";
import SideMenu from "./Admin/Components/SideMenu";
import Article from "./Admin/Pages/Article";
import Category from "./Admin/Pages/Category";
import Dashboard from "./Admin/Pages/Dashboard";
import Users from "./Admin/Pages/Users";
import ReviewArticles from "./Admin/Pages/ReviewArtic";
import Tag from "./Admin/Pages/Tags/index"
import { useState } from "react";
import Header from "./Customer/common/header/Header"
import Homepages from "./Customer/home/Homepages"
import Footer from "./Customer/common/footer/Footer"
import SinglePage from "./Customer/singlePage/SinglePage"
import Categorypages from "./Customer/Categorypages/Categorypages"
import Culture from "./Customer/culture/Culture"
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import Writter from "./Writter/Component/ArticleForm"
import UserInfo from "./Writter/Component/UserInfo";
import Searchpage from "./Customer/Searchpages/Searchpage";
import Publish from "./Writter/Component/Publishpage/Publish";
import Draft from "./Writter/Component/Draftpage/Draft";
function App() {
  return (
    <div className="App">
  
  <Routes>
  <Route path="/login" element={ <Login />} />
  <Route path="/register" element={<Register />} />
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
       <Route path="/admin/tag" element={
        <div>
          <AdminHeader />
          <div className="SideMenuAndPageContent">
            <SideMenu />
            <div className="PageContent">
              <Tag />
            </div>
          </div>
          <AdminFooter />
        </div>
      } />
       <Route path="/" element={
        <div>
          <Header />
         <Homepages/>
          <Footer />
        </div>
      } />
        <Route path="/singlepage/:id" element={
        <div>
          <Header />
         <SinglePage/>
          <Footer />
        </div>
      } />

      <Route path="/:idcate/:idtag" element={
        <div>
          <Header />
     <Categorypages/>
          <Footer />
        </div>
      } />
        <Route path="/culture" element={
        <div>
          <Header />
         <Culture/>
          <Footer />
        </div>
      } />
        <Route path="/writer" element={
        <div>
          <div className="writter" >
          <div className="sidebar">
                <UserInfo/>
            </div>
            <div className="main-content">
                <Writter />
            </div>
            </div>
        </div>
      } />
       <Route path="/search" element={
        <div>
          <Header />
         <Searchpage/>
          <Footer />
        </div>
      } />
        <Route path="/writer/publish" element={
        <div>
          <Header />
         <Publish/>
          <Footer />
        </div>
      } />
           <Route path="/writer/draft" element={
        <div>
          <Header />
         <Draft/>
          <Footer />
        </div>
      } />
    </Routes>

    </div>
    
  );
}

export default App;

