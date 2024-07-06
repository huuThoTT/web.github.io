import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Space, Typography, Select, Rate } from 'antd';

const { Option } = Select;

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
      "name": "Khoa học",
      "tags": [
        "Công nghệ",
        "Khám phá",
        "Nghiên cứu"
      ]
    },
    // Add more categories as needed
  ]
};

const getCategories = () => staticCategoryData.categories.map(category => category.name);
const getTags = (categoryName) => {
  const category = staticCategoryData.categories.find(cat => cat.name === categoryName);
  return category ? category.tags : [];
};

const staticArticlesData = {
  articles: [
    {
      _id: "1",
      title: "Tech Article 1",
      content_blocks: [
        { type: "paragraph", content: "This is the first paragraph of the article." },
        { type: "image", src: "http://example.com/image1.jpg", alt: "Image caption 1" },
        { type: "paragraph", content: "This is the second paragraph of the article." },
        { type: "image", src: "http://example.com/image2.jpg", alt: "Image caption 2" },
        { type: "paragraph", content: "This is the third paragraph of the article." },
        { type: "quote", content: "This is a quote from the article." }
      ],
      author: "John Doe",
      categories: ["Tech"],
      tags: ["AI"],
      status: "approved",
      views: 100,
      totalRating: 45,
      ratingCount: 9,
    },
    {
      _id: "2",
      title: "Health Article 1",
      content_blocks: [
        { type: "paragraph", content: "This is the first paragraph of the article." },
        { type: "image", src: "http://example.com/image1.jpg", alt: "Image caption 1" },
        { type: "paragraph", content: "This is the second paragraph of the article." },
        { type: "image", src: "http://example.com/image2.jpg", alt: "Image caption 2" },
        { type: "paragraph", content: "This is the third paragraph of the article." },
        { type: "quote", content: "This is a quote from the article." }
      ],
      author: "Jane Smith",
      categories: ["Health"],
      tags: ["Fitness"],
      status: "approved",
      views: 150,
      totalRating: 45,
      ratingCount: 9,
    },
  ],
};

const Article = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [filteredData, setFilteredData] = useState(staticArticlesData.articles);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [form] = Form.useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setDataSource(staticArticlesData.articles);
      setLoading(false);
    }, 300);
  }, []);

  const calculateAverageRating = (totalRating, ratingCount) => {
    return ratingCount === 0 ? 0 : totalRating / ratingCount;
  };

  const handleAdd = () => {
    setEditingArticle(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingArticle(record);
    form.setFieldsValue(record);
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
        article._id === editingArticle._id ? { ...article, ...values } : article
      );
      setDataSource(newData);
      setFilteredData(newData);
    } else {
      const newArticle = {
        _id: (dataSource.length + 1).toString(),
        ...values,
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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    form.setFieldsValue({ tags: [] }); // Reset the tags field when category changes
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
      <Table loading={loading} dataSource={filteredData} rowKey="_id" columns={[
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
          title: "Average Rating",
          render: (record) => {
            const averageRating = calculateAverageRating(record.totalRating, record.ratingCount);
            return <Rate value={averageRating} allowHalf disabled />;
          },
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
        <Form form={form} initialValues={editingArticle} onFinish={handleSave}>
          <Form.Item name="title" label="Article Title" rules={[{ required: true, message: 'Please input the article title!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="author" label="Author" rules={[{ required: true, message: 'Please input the author!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="categories" label="Categories" rules={[{ required: true, message: 'Please select a category!' }]}>
            <Select style={{ width: '100%' }} placeholder="Select categories" onChange={handleCategoryChange}>
              {getCategories().map(category => (
                <Option key={category} value={category}>{category}</Option>
              ))}
            </Select>
          </Form.Item>
          {selectedCategory && (
            <Form.Item name="tags" label="Tags" rules={[{ required: true, message: 'Please select at least one tag!' }]}>
              <Select  style={{ width: '100%' }} placeholder="Select tags">
                {getTags(selectedCategory).map(tag => (
                  <Option key={tag} value={tag}>{tag}</Option>
                ))}
              </Select>
            </Form.Item>
          )}
          <Form.List name="content_blocks">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                  <div key={key}>
                    <Form.Item
                      {...restField}
                      name={[name, 'type']}
                      fieldKey={[fieldKey, 'type']}
                      label="Content Type"
                      rules={[{ required: true, message: 'Please select content type' }]}
                    >
                      <Select onChange={(value) => {
                        const contentBlocks = form.getFieldValue('content_blocks');
                        contentBlocks[index] = { type: value, content: '', src: '', alt: '' };
                        form.setFieldsValue({ content_blocks: contentBlocks });
                      }}>
                        <Option value="paragraph">Paragraph</Option>
                        <Option value="image">Image</Option>
                        <Option value="quote">Quote</Option>
                      </Select>
                    </Form.Item>
                    {form.getFieldValue(['content_blocks', index, 'type']) === 'paragraph' && (
                      <Form.Item
                        {...restField}
                        name={[name, 'content']}
                        fieldKey={[fieldKey, 'content']}
                        label="Content"
                        rules={[{ required: true, message: 'Please input content' }]}
                      >
                        <Input.TextArea />
                      </Form.Item>
                    )}
                    {form.getFieldValue(['content_blocks', index, 'type']) === 'image' && (
                      <>
                        <Form.Item
                          {...restField}
                          name={[name, 'src']}
                          fieldKey={[fieldKey, 'src']}
                          label="Image Source"
                          rules={[{ required: true, message: 'Please input image source' }]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'alt']}
                          fieldKey={[fieldKey, 'alt']}
                          label="Alt Text"
                          rules={[{ required: true, message: 'Please input alt text' }]}
                        >
                          <Input />
                        </Form.Item>
                      </>
                    )}
                    {form.getFieldValue(['content_blocks', index, 'type']) === 'quote' && (
                      <Form.Item
                        {...restField}
                        name={[name, 'content']}
                        fieldKey={[fieldKey, 'content']}
                        label="Quote"
                        rules={[{ required: true, message: 'Please input quote' }]}
                      >
                        <Input.TextArea />
                      </Form.Item>
                    )}
                    <Button type="dashed" onClick={() => remove(name)} block>
                      Remove Content Block
                    </Button>
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  Add Content Block
                </Button>
              </>
            )}
          </Form.List>
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
