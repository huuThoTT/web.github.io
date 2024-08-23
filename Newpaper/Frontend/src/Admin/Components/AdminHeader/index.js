import { Avatar, Badge, Drawer, List, Space, Typography, Form, Input, Button } from "antd";
import { BellFilled, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import "./header.css";

function AdminHeader() {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [adminInfoVisible, setAdminInfoVisible] = useState(false);
  const [adminInfo, setAdminInfo] = useState({
    username: "admin",
    password: "********",
    email: "admin@example.com",
  });
  const [comments, setComments] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Lấy dữ liệu bình luận mới nhất
    axios.get("/api/comments")
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error("Error fetching comments:", error);
      });

    // Lấy bài báo mới nhất với trạng thái pending
    axios.get("/api/articles/pending")
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error("Error fetching notifications:", error);
      });
  }, []);

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
        src="https://cdn.pixabay.com/photo/2014/03/25/16/32/user-297330_1280.png"
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
        <Badge count={notifications.length}>
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
            return <List.Item>{item.content}</List.Item>;
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
          dataSource={notifications}
          renderItem={(item) => {
            return (
              <List.Item>
                <Typography.Text strong>{item.title}</Typography.Text> is pending review!
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
