import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./slideMenu.css"

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashbaord",
            icon: <AppstoreOutlined />,
            key: "/admin",
          },
          {
            label: "Article",
            key: "/admin/article",
            icon: <ShopOutlined />,
          },
         ,
          {
            label: "Users",
            key: "/admin/user",
            icon: <UserOutlined />,
          },
          {
            label: "Orders",
            key: "/admin/orders",
            icon: <ShoppingCartOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
