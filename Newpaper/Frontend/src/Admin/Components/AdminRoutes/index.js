import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "../../Pages/Users";
import Dashboard from "../../Pages/Dashboard";
import Article from "../../Pages/Article";
import Orders from "../../Pages/Orders";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<Dashboard />}></Route>
      <Route path="/admin/article" element={<Article />}></Route>
      <Route path="/admin/orders" element={<Orders />}></Route>
      <Route path="/admin/user" element={<Users />}></Route>
    </Routes>
  );
}
export default AppRoutes;