import { Avatar, Button, Modal, Space, Table, Form, Input, Checkbox, Typography } from "antd";
import { useState } from "react";

// Static customers data for demonstration
const staticCustomersData = {
  users: [
    {
      id: 1,
      username: "johndoe",
      email: "john.doe@example.com",
      isAdmin: false,
      socialAccounts: {
        facebook: "john.doe.facebook",
        google: "john.doe.google",
        phoneNumber: "+1234567890",
      },
      preferences: {
        categories: [
          {
            category: "60c72b2f9b1e8b0b8c9c9a1a", // ObjectId of Category
            topics: ["technology", "health"],
          },
        ],
      },
      notificationsEnabled: true,
      bookmarkedArticles: ["60c72b3e9b1e8b0b8c9c9a1b"], // ObjectId of Article
      adFreeSubscription: false,
    },
    {
      id: 2,
      username: "janesmith",
      email: "jane.smith@example.com",
      isAdmin: true,
      socialAccounts: {
        facebook: "jane.smith.facebook",
        google: "jane.smith.google",
        phoneNumber: "+1987654321",
      },
      preferences: {
        categories: [
          {
            category: "60c72b2f9b1e8b0b8c9c9a1c", // ObjectId of Category
            topics: ["business", "sports"],
          },
        ],
      },
      notificationsEnabled: true,
      bookmarkedArticles: ["60c72b3e9b1e8b0b8c9c9a1d"], // ObjectId of Article
      adFreeSubscription: true,
    },
    {
      id: 3,
      username: "michaeljohnson",
      email: "michael.johnson@example.com",
      isAdmin: false,
      socialAccounts: {
        facebook: "michael.johnson.facebook",
        google: "michael.johnson.google",
        phoneNumber: "+1122334455",
      },
      preferences: {
        categories: [
          {
            category: "60c72b2f9b1e8b0b8c9c9a1e", // ObjectId of Category
            topics: ["entertainment", "travel"],
          },
        ],
      },
      notificationsEnabled: false,
      bookmarkedArticles: ["60c72b3e9b1e8b0b8c9c9a1f"], // ObjectId of Article
      adFreeSubscription: false,
    },
  ],
};

function Customers() {
  const [dataSource, setDataSource] = useState(staticCustomersData.users);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    form.setFieldsValue(customer);
    setModalVisible(true);
  };

  const handleDeleteCustomer = (customerId) => {
    const updatedData = dataSource.filter((customer) => customer.id !== customerId);
    setDataSource(updatedData);
  };

  const handleSaveCustomer = () => {
    form.validateFields().then((values) => {
      if (editingCustomer) {
        const updatedData = dataSource.map((customer) =>
          customer.id === editingCustomer.id ? { ...customer, ...values } : customer
        );
        setDataSource(updatedData);
      } else {
        const newId = dataSource.length > 0 ? dataSource[dataSource.length - 1].id + 1 : 1;
        const newCustomer = { ...values, id: newId };
        setDataSource([...dataSource, newCustomer]);
      }
      setModalVisible(false);
    });
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Is Admin",
      dataIndex: "isAdmin",
      render: (isAdmin) => <Checkbox checked={isAdmin} disabled />,
    },
    {
      title: "Phone Number",
      dataIndex: ["socialAccounts", "phoneNumber"],
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleEditCustomer(record)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDeleteCustomer(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Users</Typography.Title>
      <Button type="primary" onClick={handleAddCustomer}>
        Add User
      </Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 5 }}
        rowKey="id"
      />
      <Modal
        title={editingCustomer ? "Edit User" : "Add User"}
        visible={modalVisible}
        onOk={handleSaveCustomer}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="username" label="Username" rules={[{ required: true, message: "Please enter username" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please enter email" }, { type: "email", message: "Please enter a valid email" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="isAdmin" valuePropName="checked">
            <Checkbox>Is Admin</Checkbox>
          </Form.Item>
          <Form.Item name={["socialAccounts", "phoneNumber"]} label="Phone Number">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
}

export default Customers;
