import { Button, Modal, Space, Table, Form, Input, Select, Typography,Rate } from "antd";
import { useState } from "react";

// Static articles data for demonstration
const staticArticlesData = {
  articles: [
    {
      id: 1,
      title: "Article 1",
      content: "Content of Article 1",
      author: "Author 1",
      categories: ["60c72b2f9b1e8b0b8c9c9a1a"], // ObjectId of Category
      tags: ["tag1", "tag2"],
      status: "pending",
      views: 100,
      totalRating: 4,
      ratingCount: 1,
    },
    {
      id: 2,
      title: "Article 2",
      content: "Content of Article 2",
      author: "Author 2",
      categories: ["60c72b2f9b1e8b0b8c9c9a1b"], // ObjectId of Category
      tags: ["tag3"],
      status: "approved",
      views: 200,
      totalRating: 10,
      ratingCount: 2,
    },
    {
      id: 3,
      title: "Article 3",
      content: "Content of Article 3",
      author: "Author 3",
      categories: ["60c72b2f9b1e8b0b8c9c9a1c"], // ObjectId of Category
      tags: ["tag4", "tag5"],
      status: "rejected",
      views: 50,
      totalRating: 2,
      ratingCount: 1,
    },
  ],
};
const calculateAverageRating = (totalRating, ratingCount) => {
  return ratingCount === 0 ? 0 : totalRating / ratingCount;
};
function Articles() {
  const [dataSource, setDataSource] = useState(staticArticlesData.articles);
  const [editingArticle, setEditingArticle] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const calculateAverageRating = (totalRating, ratingCount) => {
    if (ratingCount === 0) return 0;
    return Math.min(totalRating / ratingCount, 5.0).toFixed(1);
  };

  const handleAddArticle = () => {
    setEditingArticle(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditArticle = (article) => {
    setEditingArticle(article);
    form.setFieldsValue(article);
    setModalVisible(true);
  };

  const handleDeleteArticle = (articleId) => {
    const updatedData = dataSource.filter((article) => article.id !== articleId);
    setDataSource(updatedData);
  };

  const handleSaveArticle = () => {
    form.validateFields().then((values) => {
      if (editingArticle) {
        const updatedData = dataSource.map((article) =>
          article.id === editingArticle.id ? { ...article, ...values } : article
        );
        setDataSource(updatedData);
      } else {
        const newId = dataSource.length > 0 ? dataSource[dataSource.length - 1].id + 1 : 1;
        const newArticle = { ...values, id: newId };
        setDataSource([...dataSource, newArticle]);
      }
      setModalVisible(false);
    });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Views",
      dataIndex: "views",
    },
    {
      title: "Total Rating",
      dataIndex: "totalRating",
  
    },
    {
      title: "Rating Count",
      dataIndex: "ratingCount",
    },
    {
      title: "Average Rating",
      render: (record) => {
        const averageRating = calculateAverageRating(record.totalRating, record.ratingCount);
        return <Rate value={averageRating} allowHalf disabled />;
      },
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleEditArticle(record)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDeleteArticle(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Articles</Typography.Title>
      <Button type="primary" onClick={handleAddArticle}>
        Add Article
      </Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      />
      <Modal
        title={editingArticle ? "Edit Article" : "Add Article"}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleSaveArticle}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please enter the title" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="content" label="Content" rules={[{ required: true, message: "Please enter the content" }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="author" label="Author" rules={[{ required: true, message: "Please enter the author" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="categories" label="Categories" rules={[{ required: true, message: "Please enter the categories" }]}>
            <Select mode="tags" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="tags" label="Tags" rules={[{ required: true, message: "Please enter the tags" }]}>
            <Select mode="tags" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true, message: "Please select the status" }]}>
            <Select>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="approved">Approved</Select.Option>
              <Select.Option value="rejected">Rejected</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="views" label="Views" rules={[{ required: true, message: "Please enter the views" }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="totalRating" label="Total Rating" rules={[{ required: true, message: "Please enter the total rating" }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="ratingCount" label="Rating Count" rules={[{ required: true, message: "Please enter the rating count" }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
}

export default Articles;
