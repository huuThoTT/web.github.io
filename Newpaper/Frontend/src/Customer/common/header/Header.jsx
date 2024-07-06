import React, { useState } from "react";
import Head from "./Head";
import "./header.css";
import { Link } from "react-router-dom";
import { Drawer, Switch, Button, Menu, Dropdown, Modal, Input, Form, Select } from "antd";
import { MenuOutlined } from '@ant-design/icons';

const { Option } = Select;

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const [user, setUser] = useState({
    username: "Phung",
    email: "phung@example.com",
    preferences: {
      categories: [
        {
          category: "Technology",
          topics: ["React", "Node.js"]
        }
      ]
    },
    notificationsEnabled: true,
    adFreeSubscription: false
  });
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  
  const staticCategoryData = {
    "categories": [
      {
        "name": "Thời sự",
        "tags": [
          "Chính trị",
          "Xã hội",
          "Quốc tế",
          "Giao thông",
          "Môi trường"
        ]
      },
      {
        "name": "Kinh tế",
        "tags": [
          "Tài chính",
          "Chứng khoán",
          "Bất động sản",
          "Doanh nghiệp",
          "Khởi nghiệp"
        ]
      },
      {
        "name": "Thể thao",
        "tags": [
          "Bóng đá",
          "Bóng rổ",
          "Tennis",
          "Cầu lông",
          "Điền kinh"
        ]
      },
      {
        "name": "Văn hóa",
        "tags": [
          "Điện ảnh",
          "Âm nhạc",
          "Mỹ thuật",
          "Văn học",
          "Sân khấu"
        ]
      },
      {
        "name": "Giải trí",
        "tags": [
          "Sao",
          "Phim ảnh",
          "TV Show",
          "Âm nhạc",
          "Trò chơi"
        ]
      },
      {
        "name": "Công nghệ",
        "tags": [
          "Điện thoại",
          "Máy tính",
          "Internet",
          "AI",
          "Gadget"
        ]
      },
      {
        "name": "Sức khỏe",
        "tags": [
          "Dinh dưỡng",
          "Bệnh tật",
          "Lối sống",
          "Tập luyện",
          "Tinh thần"
        ]
      },
      {
        "name": "Giáo dục",
        "tags": [
          "Học đường",
          "Tuyển sinh",
          "Du học",
          "Đào tạo",
          "Công nghệ giáo dục"
        ]
      },
      {
        "name": "Du lịch",
        "tags": [
          "Điểm đến",
          "Kinh nghiệm",
          "Ẩm thực",
          "Khám phá",
          "Nghỉ dưỡng"
        ]
      }
    ]
  };

  const handleLogout = () => {
    console.log("User logged out");
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const handleToggleNotifications = () => {
    setUser({ ...user, notificationsEnabled: !user.notificationsEnabled });
  };

  const handleToggleAdFree = () => {
    setUser({ ...user, adFreeSubscription: !user.adFreeSubscription });
  };

  const categoryMenu = (category) => (
    <Menu>
      {category.tags.map((tag, index) => (
        <Menu.Item key={index}>
          <Link to={`/tag/${tag}`}>{tag}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openEditModal = () => {
    setEditModalVisible(true);
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      categories: user.preferences.categories.map(c => c.category)
    });
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  const handleUpdateInfo = (values) => {
    setUser({
      ...user,
      username: values.username,
      email: values.email,
      preferences: {
        categories: values.categories.map(category => ({
          category,
          topics: []
        }))
      }
    });
    closeEditModal();
  };

  return (
    <>
      <Head />
      <header>
        <div className="container mx-auto p-4">
          <nav className="flex justify-between items-center">
            <ul className={navbar ? "navbar" : "flex space-x-4"}>
              <li>
                <Link to="/" className="hover:text-gray-700">
                  Home
                </Link>
              </li>
              {staticCategoryData.categories.slice(0, 9).map((category, index) => (
                <li key={index}>
                  <Link to={`/category/${category.name}`} className="ant-dropdown-link hover:text-gray-700">
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <button onClick={openModal} className="hover:text-gray-700">
                  More
                </button>
              </li>
            </ul>
            <div className="relative flex items-center space-x-4">
              {user ? (
                <>
                  <button onClick={toggleDrawer} className="relative text-blue-700">
                    Hi, <span>{user.username}</span>
                  </button>
                  <Drawer
                    title="User Info"
                    placement="right"
                    onClose={toggleDrawer}
                    visible={drawerVisible}
                  >
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <div className="py-2">
                      <label className="text-gray-700">
                        Enable Notifications
                        <Switch
                          checked={user.notificationsEnabled}
                          onChange={handleToggleNotifications}
                          className="ml-2"
                        />
                      </label>
                    </div>
                    <div className="py-2">
                      <label className="text-gray-700">
                        Ad-Free Subscription
                        <Switch
                          checked={user.adFreeSubscription}
                          onChange={handleToggleAdFree}
                          className="ml-2"
                        />
                      </label>
                    </div>
                    <Button type="primary" className="mt-4" onClick={openEditModal}>
                      Update Info
                    </Button>
                    <Button
                      type="primary"
                      danger
                      className="mt-4"
                      onClick={handleLogout}
                    >
                      Log out
                    </Button>
                  </Drawer>
                </>
              ) : (
                <>
                  <Link to="/login" className="navbar-login text-blue-700">
                    Login
                  </Link>
                  <Link to="/register" className="navbar-register text-blue-700">
                    Register
                  </Link>
                </>
              )}
              <button
                className="barIcon text-gray-900"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <i className="fa fa-times"></i>
                ) : (
                  <MenuOutlined />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>
      <Modal
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
        width="80%"
      >
        <div className="grid grid-cols-6 gap-4">
          {staticCategoryData.categories.map((category, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold">
                <Link to={`/category/${category.name}`}>{category.name}</Link>
              </h3>
              <ul className="ml-4 list-disc">
                {category.tags.map((tag, tagIndex) => (
                  <li key={tagIndex}>
                    <Link to={`/tag/${tag}`}>{tag}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Modal>
      <Modal
        visible={editModalVisible}
        onCancel={closeEditModal}
        footer={null}
        title="Update Info"
      >
        <Form form={form} onFinish={handleUpdateInfo}>
          <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="categories" label="Categories" rules={[{ required: true, message: 'Please select your categories!' }]}>
            <Select mode="multiple">
              {staticCategoryData.categories.map(category => (
                <Option key={category.name} value={category.name}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Header;
