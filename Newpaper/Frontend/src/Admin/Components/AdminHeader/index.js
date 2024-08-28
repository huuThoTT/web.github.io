import { Avatar, Badge, Drawer, List, Space, Typography, Form, Input, Button } from "antd";
import { BellFilled, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, getComment, getArticlePending } from "../../../redux/apiRequest";
import "./header.css";

function AdminHeader() {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [adminInfoVisible, setAdminInfoVisible] = useState(false);
  const dispatch = useDispatch();

  const adminInfo = useSelector((state) => state.auth?.login?.currentUser);
  const articlesPending = useSelector((state) => state.article?.getArticlePending?.articlesPending) || [];
  const comments = useSelector((state) => state.comment?.getComment?.comments) || [];

  // Lọc những comment và article chưa được đọc
  const unreadComments = comments.filter((comment) => !comment.isRead);
  const unreadNotifications = articlesPending.filter((article) => !article.isRead);

  useEffect(() => {
    getComment(dispatch);
    getArticlePending(dispatch);
  }, [dispatch]);

  const showAdminInfoDrawer = () => {
    setAdminInfoVisible(true);
  };

  const closeAdminInfoDrawer = () => {
    setAdminInfoVisible(false);
  };

  const handleAdminInfoUpdate = (values) => {
    const updatedValues = {
      ...adminInfo,
      ...values,
    };
    updateUser(dispatch, updatedValues);
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
        <Badge count={unreadComments.length} dot>
          <MailOutlined
            style={{ fontSize: 24 }}
            onClick={() => {
              setCommentsOpen(true);
            }}
          />
        </Badge>
        <Badge count={unreadNotifications.length}>
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
        onClose={() => setCommentsOpen(false)}
        maskClosable
      >
        <List
          dataSource={unreadComments}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text strong>{item.user}</Typography.Text>: {item.content}
            </List.Item>
          )}
        />
      </Drawer>
      <Drawer
        title="Notifications"
        visible={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        maskClosable
      >
        <List
          dataSource={unreadNotifications}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text strong>{item.author}</Typography.Text>: {item.title} is pending review!
            </List.Item>
          )}
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
