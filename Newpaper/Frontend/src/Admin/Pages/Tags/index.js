import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Space, Typography } from 'antd';

// Static data for demonstration
const staticTagsData = {
  tags: [
    {
      _id: "1",
      name: "Technology",
      description: "Articles about technology",
      listIdArticle: [
        { title: "Tech Article 1", description: "Description of Tech Article 1", author: "John Doe", date: "13/02/2021" },
        { title: "Tech Article 2", description: "Description of Tech Article 2", author: "Jane Smith", date: "13/02/2021" }
      ],
      date: "13/02/2021"
    },
    {
      _id: "2",
      name: "Health",
      description: "Articles about health",
      listIdArticle: [
        { title: "Health Article 1", description: "Description of Health Article 1", author: "Emily Johnson", date: "13/02/2021" },
        { title: "Health Article 2", description: "Description of Health Article 2", author: "Michael Brown", date: "13/02/2021" }
      ],
    },
  ],
};

const Tag = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [filteredData, setFilteredData] = useState(staticTagsData.tags);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setLoading(true);
    // Simulating API call with static data
    setTimeout(() => {
      setDataSource(staticTagsData.tags);
      setLoading(false);
    }, 300); // Simulating loading time
  }, []);

  const handleAdd = () => {
    setEditingTag(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingTag(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    const newData = dataSource.filter((tag) => tag._id !== record._id);
    setDataSource(newData);
    setFilteredData(newData);
  };

  const handleSave = (values) => {
    if (editingTag) {
      const newData = dataSource.map((tag) =>
        tag._id === editingTag._id ? { ...tag, name: values.name } : tag
      );
      setDataSource(newData);
      setFilteredData(newData);
    } else {
      const newTag = {
        _id: (dataSource.length + 1).toString(),
        name: values.name,
        description: '',
        listIdArticle: [],
      };
      const newData = [...dataSource, newTag];
      setDataSource(newData);
      setFilteredData(newData);
    }
    setIsModalVisible(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = dataSource.filter((tag) =>
      tag.name.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  return (
    <Space direction="vertical" size={20}>
      <Typography.Title level={4}>Tag Management</Typography.Title>
      <Space direction="horizontal">
        <Button type="primary" onClick={handleAdd}>Add Tag</Button>
        <Input
          placeholder="Search tags"
          value={searchText}
          onChange={handleSearch}
        />
      </Space>
      <Table loading={loading} dataSource={filteredData} rowKey="_id" columns={[
        {
          title: "Name",
          dataIndex: "name",
        },
        {
          title: "Articles",
          dataIndex: "listIdArticle",
          render: (articles) => (
            <ul style={{ paddingInlineStart: 0 }}>
              {articles.map((article, index) => (
                <li key={index} style={{ marginBottom: '15px' }}>
                  <strong>Title:</strong> {article.title} <br />
                  <strong>Author:</strong> {article.author}<br />
                  <strong>Date:</strong> {article.date}
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

      <Modal title={editingTag ? "Edit Tag" : "Add Tag"} visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form initialValues={editingTag} onFinish={handleSave}>
          <Form.Item name="name" label="Tag Name" rules={[{ required: true, message: 'Please input the tag name!' }]}>
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

export default Tag;
