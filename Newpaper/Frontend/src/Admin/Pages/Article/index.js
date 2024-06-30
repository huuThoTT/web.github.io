import React, { useState,useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Space, Typography } from 'antd';

// Static data for demonstration
const staticArticlesData = {
  articles: [
    {
      _id: "1",
      title: "Tech Article 1",
      content: "Content of Tech Article 1",
      author: "John Doe",
      categories: ["1"],
      tags: ["tech", "AI"],
      status: "approved",
      views: 100,
      totalRating: 4.5,
      ratingCount: 20,
    },
    {
      _id: "2",
      title: "Health Article 1",
      content: "Content of Health Article 1",
      author: "Jane Smith",
      categories: ["2"],
      tags: ["health", "fitness"],
      status: "approved",
      views: 150,
      totalRating: 4.8,
      ratingCount: 15,
    },
  ],
};

const Article = () => {
  const [loading,setLoading] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [filteredData, setFilteredData] = useState(staticArticlesData.articles);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  useEffect(() => {
    setLoading(true);
    // Simulating API call with static data
    setTimeout(() => {
      setDataSource(staticArticlesData.articles);
      setLoading(false);
    }, 300); // Simulating loading time
  }, []);
  const handleAdd = () => {
    setEditingArticle(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingArticle(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    const newData = dataSource.filter((article) => article._id !== record._id);
    setDataSource(newData);
    setFilteredData(newData);
  };

  const handleSave = (values) => {
    if (editingArticle) {
      const newData = dataSource.map((article) =>
        article._id === editingArticle._id ? { ...article, title: values.title } : article
      );
      setDataSource(newData);
      setFilteredData(newData);
    } else {
      const newArticle = {
        _id: (dataSource.length + 1).toString(),
        title: values.title,
        content: '',
        author: '',
        categories: [],
        tags: [],
        status: 'pending',
        views: 0,
        totalRating: 0,
        ratingCount: 0,
      };
      const newData = [...dataSource, newArticle];
      setDataSource(newData);
      setFilteredData(newData);
    }
    setIsModalVisible(false);
  };

  const handleSearch = (value) => {
    const filtered = dataSource.filter((article) =>
      article.title.toLowerCase().includes(value.toLowerCase()) ||
      article.author.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <Space direction="vertical" size={20}>
      <Typography.Title level={4}>Article Management</Typography.Title>
      <Space direction="horizontal">
        <Button type="primary" onClick={handleAdd}>Add Article</Button>
        <Input.Search
          placeholder="Search articles"
          enterButton
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </Space>
      <Table loading ={loading} dataSource={filteredData} rowKey="_id" columns={[
        {
          title: "Title",
          dataIndex: "title",
        },
        {
          title: "Content",
          dataIndex: "content",
        },
        {
          title: "Author",
          dataIndex: "author",
        },
        {
          title: "Categories",
          dataIndex: "categories",
          render: (categories) => (
            <ul>
              {categories.map((category, index) => (
                <li key={index}>{category}</li>
              ))}
            </ul>
          ),
        },
        {
          title: "Tags",
          dataIndex: "tags",
          render: (tags) => (
            <ul>
              {tags.map((tag, index) => (
                <li key={index}>{tag}</li>
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

      <Modal title={editingArticle ? "Edit Article" : "Add Article"} visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form initialValues={editingArticle} onFinish={handleSave}>
          <Form.Item name="title" label="Article Title" rules={[{ required: true, message: 'Please input the article title!' }]}>
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

export default Article;
