import React, { useState,useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Space, Typography} from 'antd';

// Static data for demonstration
const staticCategoriesData = {
  categories: [
    {
      _id: "1",
      name: "Technology",
      description: "Articles about technology",
      listIdTags: [
        { name: "dsss" },
        { name: "ddd"}
      ],
      date : "13/02/2021"
    },
    {
      _id: "2",
      name: "Health",
      description: "Articles about health",
      listIdTags: [
        { name: "dsd"},
        { name: "đsdd" }
      ],
         
    },
  ],
};

const Category = () => {
  const [loading,setLoading] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [filteredData, setFilteredData] = useState(staticCategoriesData.categories);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    setLoading(true);
    // Simulating API call with static data
    setTimeout(() => {
      setDataSource(staticCategoriesData.categories);
      setLoading(false);
    }, 300); // Simulating loading time
  }, []);
  const handleAdd = () => {
    setEditingCategory(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingCategory(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    const newData = dataSource.filter((category) => category._id !== record._id);
    setDataSource(newData);
    setFilteredData(newData);
  };

  const handleSave = (values) => {
    if (editingCategory) {
      const newData = dataSource.map((category) =>
        category._id === editingCategory._id ? { ...category, name: values.name } : category
      );
      setDataSource(newData);
      setFilteredData(newData);
    } else {
      const newCategory = {
        _id: (dataSource.length + 1).toString(),
        name: values.name,
        description: '',
        listIdArticle: [],
      };
      const newData = [...dataSource, newCategory];
      setDataSource(newData);
      setFilteredData(newData);
    }
    setIsModalVisible(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = dataSource.filter((category) =>
      category.name.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  return (
    <Space direction="vertical" size={20}>
      <Typography.Title level={4}>Category Management</Typography.Title>
      <Space direction="horizontal">
        <Button type="primary" onClick={handleAdd}>Add Category</Button>
        <Input
          placeholder="Search categories"
          value={searchText}
          onChange={handleSearch}
        />
      </Space>
      <Table loading = {loading} dataSource={filteredData} rowKey="_id" columns={[
        {
          title: "Name",
          dataIndex: "name",
        },
        {
          title: "Tags",
          dataIndex: "listIdTags",
          render: (tags) => (
            <ul style={{ paddingInlineStart: 0 }}>
              {tags.map((tags, index) => (
                <li key={index} style={{ marginBottom: '15px' }}>
                  <strong>Tags name</strong> {tags.name} <br />
                </li>
              ))}
            </ul>
          ),
          
        },
        {
          title: "Actions",
          render: (text, record) => (
            <Space>
              <Button onClick={() => handleEdit(record)}>Edit</Button>
              <Button danger onClick={() => handleDelete(record)}>Delete</Button>
            </Space>
          ),
        },
      ]} />

      <Modal title={editingCategory ? "Edit Category" : "Add Category"} visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form initialValues={editingCategory} onFinish={handleSave}>
          <Form.Item name="name" label="Category Name" rules={[{ required: true, message: 'Please input the category name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};

export default Category;
