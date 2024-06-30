import { Avatar, Badge, Drawer, Image, List, Space, Typography, Form, Input, Button } from "antd";
import { BellFilled, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./header.css";

// Static data for comments and orders for demonstration
const staticCommentsData = [
  { id: 1, body: "This is a comment." },
  { id: 2, body: "Another comment here." },
  { id: 3, body: "Yet another comment." },
];

const staticOrdersData = [
  { id: 1, title: "Product A" },
  { id: 2, title: "Product B" },
  { id: 3, title: "Product C" },
];

function AdminHeader() {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [adminInfoVisible, setAdminInfoVisible] = useState(false);
  const [adminInfo, setAdminInfo] = useState({
    username: "admin",
    password: "********",
    email: "admin@example.com",
  });

  const comments = staticCommentsData;
  const orders = staticOrdersData;

  const showAdminInfoDrawer = () => {
    setAdminInfoVisible(true);
  };

  const closeAdminInfoDrawer = () => {
    setAdminInfoVisible(false);
  };

  const handleAdminInfoUpdate = (values) => {
    // Handle update logic here
    console.log("Updated admin info:", values);
    setAdminInfo(values); // Update admin info state
    closeAdminInfoDrawer();
  };

  return (
    <div className="AppHeader">
      <Avatar
        size={40}
        icon={<UserOutlined />}
        src="https://baccara-tokyo.com/wp-content/uploads/2021/04/Eimi-Fukada.2-769x1024.png"
        onClick={showAdminInfoDrawer}
        style={{ cursor: "pointer" }}
      />
      <Typography.Title level={3} style={{ margin: "0 16px" }}>
        Admin Dashboard
      </Typography.Title>
      <Space>
        <Badge count={comments.length} dot>
          <MailOutlined
            style={{ fontSize: 24 }}
            onClick={() => {
              setCommentsOpen(true);
            }}
          />
        </Badge>
        <Badge count={orders.length}>
          <BellFilled
            style={{ fontSize: 24 }}
            onClick={() => {
              setNotificationsOpen(true);
            }}
          />
        </Badge>
      </Space>
      <Drawer
        title="Comments"
        visible={commentsOpen}
        onClose={() => {
          setCommentsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => {
            return <List.Item>{item.body}</List.Item>;
          }}
        />
      </Drawer>
      <Drawer
        title="Notifications"
        visible={notificationsOpen}
        onClose={() => {
          setNotificationsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={orders}
          renderItem={(item) => {
            return (
              <List.Item>
                <Typography.Text strong>{item.title}</Typography.Text> has been
                ordered!
              </List.Item>
            );
          }}
        />
      </Drawer>
      <Drawer
        title="Admin Information"
        visible={adminInfoVisible}
        onClose={closeAdminInfoDrawer}
        width={400}
      >
        <Form
          layout="vertical"
          onFinish={handleAdminInfoUpdate}
          initialValues={adminInfo}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter username" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
              <Button onClick={closeAdminInfoDrawer}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default AdminHeader;
