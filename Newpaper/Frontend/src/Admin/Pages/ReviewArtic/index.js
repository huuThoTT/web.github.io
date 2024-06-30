import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Typography, Tag, Rate, Modal } from 'antd';

// Static articles data for demonstration
const staticArticlesData = {
  articles: [
    {
      id: 1,
      title: "Article 1",
      content: "Content for article 1",
      author: "Author 1",
      categories: ["Category1", "Category2"],
      tags: ["Tag1", "Tag2"],
      status: "pending",
      views: 100,
      totalRating: 25,
      ratingCount: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: "Article 2",
      content: "Content for article 2",
      author: "Author 2",
      categories: ["Category3", "Category4"],
      tags: ["Tag3", "Tag4"],
      status: "pending",
      views: 50,
      totalRating: 40,
      ratingCount: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      title: "Article 3",
      content: "Content for article 3",
      author: "Author 3",
      categories: ["Category5", "Category6"],
      tags: ["Tag5", "Tag6"],
      status: "pending",
      views: 200,
      totalRating: 45,
      ratingCount: 9,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};

// Function to calculate average rating
const calculateAverageRating = (totalRating, ratingCount) => {
  return ratingCount === 0 ? 0 : totalRating / ratingCount;
};

const ReviewArticles = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Simulating API call with static data
    setTimeout(() => {
      setDataSource(staticArticlesData.articles);
      setLoading(false);
    }, 300); // Simulating loading time
  }, []);

  const handleApprove = (id) => {
    const updatedArticles = dataSource.map((article) => {
      if (article.id === id) {
        return { ...article, status: 'approved' };
      }
      return article;
    });
    setDataSource(updatedArticles);
  };

  const handleReject = (id) => {
    const updatedArticles = dataSource.map((article) => {
      if (article.id === id) {
        return { ...article, status: 'rejected' };
      }
      return article;
    });
    setDataSource(updatedArticles);
  };

  const handleViewContent = (article) => {
    setCurrentArticle(article);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setCurrentArticle(null);
  };

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Review Articles</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Author",
            dataIndex: "author",
          },
          {
            title: "Categories",
            dataIndex: "categories",
            render: (categories) => categories.join(", "),
          },
          {
            title: "Tags",
            dataIndex: "tags",
            render: (tags) => tags.join(", "),
          },
          {
            title: "Status",
            dataIndex: "status",
            render: (status) => {
              let color = status === 'approved' ? 'green' : status === 'rejected' ? 'red' : 'orange';
              return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
          },
          {
            title: "Views",
            dataIndex: "views",
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
            render: (record) => (
              <Space size="middle">
                <Button onClick={() => handleApprove(record.id)} disabled={record.status !== 'pending'}>Approve</Button>
                <Button onClick={() => handleReject(record.id)} disabled={record.status !== 'pending'}>Reject</Button>
                <Button onClick={() => handleViewContent(record)}>View Content</Button>
              </Space>
            ),
          },
        ]}
        dataSource={dataSource.map((item) => ({ ...item, key: item.id }))}
        pagination={{
          pageSize: 5,
        }}
      />
      <Modal
        title="Article Content"
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>Close</Button>,
        ]}
      >
        {currentArticle && (
          <div>
            <Typography.Title level={5}>{currentArticle.title}</Typography.Title>
            <Typography.Paragraph>{currentArticle.content}</Typography.Paragraph>
          </div>
        )}
      </Modal>
    </Space>
  );
};

export default ReviewArticles;
