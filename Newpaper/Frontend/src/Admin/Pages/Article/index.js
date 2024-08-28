import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Space, Typography, Select, Rate } from 'antd';
const { Option } = Select;
import { useDispatch, useSelector } from "react-redux";
import { getArticle, updateArticle, deleteArticle, getCategories } from '../../../redux/apiRequest';

const Article = () => {
  const articles = useSelector((state) => state.article?.getArticle?.articles);
  const categories = useSelector((state) => state.category?.getCategory?.categories);
  const dispatch = useDispatch();
  
  useEffect(() => {
    getArticle(dispatch);
    getCategories(dispatch);
  }, [dispatch]);

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [contentBlocks, setContentBlocks] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    if(articles){
      setTimeout(() => {
        setDataSource(articles);
        setFilteredData(articles);
        setLoading(false);
      }, 300);
    }
  }, [articles]);

  const getCategoryNames = () => {
    if (!categories) return [];
    return categories.map(category => category.name);
  };

  const getTags = (categoryName) => {
    if (!categories) return [];
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.tags : [];
  };

  const handleAdd = () => {
    form.validateFields().then(values => {
      const newArticle = {
        ...values,
        content_blocks: contentBlocks,
        status: 'approved',
        views: 0,
        totalRating: 0,
        ratingCount: 0,
      };
      console.log(newArticle);
      updateArticle(dispatch, newArticle);
      setIsModalVisible(false);
    });
  };

  const handleEdit = (record) => {
    setEditingArticle(record);
    form.setFieldsValue(record);
    setContentBlocks(record.content_blocks || []);
    setSelectedCategory(record.categories[0]);
    setIsModalVisible(true);
  };

  const handleSaveEdit = () => {
    form.validateFields().then(values => {
      const updatedArticle = {
        ...editingArticle,
        ...values,
        content_blocks: contentBlocks,
      };
      updateArticle(dispatch, updatedArticle);
      setIsModalVisible(false);
    });
  };

  const handleDelete = (record) => {
    deleteArticle(dispatch, record._id);
    const newData = dataSource.filter((article) => article._id !== record._id);
    setDataSource(newData);
    setFilteredData(newData);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    form.setFieldsValue({ tags: [] });
  };

  const addContentBlock = () => {
    setContentBlocks([...contentBlocks, { type: 'paragraph', content: '' }]);
  };

  const handleBlockChange = (index, field, value) => {
    const newBlocks = [...contentBlocks];
    newBlocks[index][field] = value;
    setContentBlocks(newBlocks);
  };

  const removeContentBlock = (index) => {
    setContentBlocks(contentBlocks.filter((_, i) => i !== index));
  };

  return (
    <Space direction="vertical" size={20}>
      <Typography.Title level={4}>Article Management</Typography.Title>
      <Space direction="horizontal">
        <Button type="primary" onClick={() => setIsModalVisible(true)}>Add Article</Button>
        <Input.Search
          placeholder="Search articles"
          enterButton
          onSearch={(value) => setFilteredData(dataSource.filter((article) =>
            article.title.toLowerCase().includes(value.toLowerCase()) ||
            article.author.toLowerCase().includes(value.toLowerCase())
          ))}
        />
      </Space>
      <Table
        loading={loading}
        dataSource={filteredData}
        rowKey="_id"
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
            title: "Category",
            dataIndex: "categories",
            render: (categories) => <span>{categories[0]}</span>,
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
              const averageRating = record.ratingCount === 0 ? 0 : record.totalRating / record.ratingCount;
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
        ]}
      />

      <Modal
        title={editingArticle ? "Edit Article" : "Add Article"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} initialValues={editingArticle} onFinish={editingArticle ? handleSaveEdit : handleAdd}>
          <Form.Item
            name="title"
            label="Article Title"
            rules={[{ required: true, message: 'Please input the article title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="author"
            label="Author"
            rules={[{ required: true, message: 'Please input the author!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select
              style={{ width: '100%' }}
              placeholder="Select a category"
              onChange={handleCategoryChange}
            >
              {getCategoryNames().map(category => (
                <Option key={category} value={category}>{category}</Option>
              ))}
            </Select>
          </Form.Item>
          {selectedCategory && (
            <Form.Item
              name="tags"
              label="Tags"
              rules={[{ required: true, message: 'Please select at least one tag!' }]}
            >
              <Select mode="multiple" style={{ width: '100%' }} placeholder="Select tags">
                {getTags(selectedCategory).map(tag => (
                  <Option key={tag} value={tag}>{tag}</Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {/* Content Blocks */}
          {contentBlocks.map((block, index) => (
            <div key={index} style={{ marginBottom: '16px', border: '1px solid #ddd', padding: '16px', borderRadius: '4px' }}>
              <Form.Item label="Block Type">
                <Select
                  value={block.type}
                  onChange={(value) => handleBlockChange(index, 'type', value)}
                >
                  <Option value="paragraph">Paragraph</Option>
                  <Option value="image">Image</Option>
                  <Option value="quote">Quote</Option>
                </Select>
              </Form.Item>
              <Form.Item label={block.type === 'image' ? 'Image URL' : 'Content'}>
                <Input
                  value={block.content || block.src}
                  onChange={(e) => handleBlockChange(index, block.type === 'image' ? 'src' : 'content', e.target.value)}
                />
              </Form.Item>
              <Button type="danger" onClick={() => removeContentBlock(index)}>
                Remove Block
              </Button>
            </div>
          ))}
          <Button type="dashed" onClick={addContentBlock} style={{ width: '100%', marginBottom: '16px' }}>
            Add Content Block
          </Button>

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



/*
import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Space, Typography, Select, Rate } from 'antd';
const { Option } = Select;
import { useDispatch,useSelector } from "react-redux";
import { getArticle,updateArticle,deleteArticle,getCategories } from '../../../redux/apiRequest';

const staticCategoryData = {
  categories: [
    {
      name: "Thời sự",
      tags: ["Chính trị", "Xã hội", "Quốc tế", "Giao thông", "Môi trường"],
    },
    {
      name: "Khoa học",
      tags: ["Công nghệ", "Khám phá", "Nghiên cứu"],
    },
    // Add more categories as needed
  ],
};
const articles = useSelector((state) => state.article.getArticle.articles);
const categories = useSelector((state) => state.category.getCategory.categories);
const dispatch = useDispatch();
  

  useEffect(() => {
    getArticle(dispatch);
  }, [dispatch]);
const getCategories = () => staticCategoryData.categories.map(category => category.name);

const getTags = (categoryName) => {
  const category = staticCategoryData.categories.find(cat => cat.name === categoryName);
  return category ? category.tags : [];
};

const staticArticlesData = {
  articles: [
    // Articles data here...
  ],
};

const Article = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [filteredData, setFilteredData] = useState(staticArticlesData.articles);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setDataSource(staticArticlesData.articles);
      setLoading(false);
    }, 300);
  }, []);

  const handleAdd = () => {
    setEditingArticle(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingArticle(record);
    form.setFieldsValue(record);
    setSelectedCategory(record.categories[0]);
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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    form.setFieldsValue({ tags: [] }); // Reset tags field when category changes
  };

  return (
    <Space direction="vertical" size={20}>
      <Typography.Title level={4}>Article Management</Typography.Title>
      <Space direction="horizontal">
        <Button type="primary" onClick={handleAdd}>Add Article</Button>
        <Input.Search
          placeholder="Search articles"
          enterButton
          onSearch={(value) => setFilteredData(dataSource.filter((article) =>
            article.title.toLowerCase().includes(value.toLowerCase()) ||
            article.author.toLowerCase().includes(value.toLowerCase())
          ))}
        />
      </Space>
      <Table
        loading={loading}
        dataSource={filteredData}
        rowKey="_id"
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
            title: "Category",
            dataIndex: "categories",
            render: (categories) => <span>{categories[0]}</span>,
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
              const averageRating = record.ratingCount === 0 ? 0 : record.totalRating / record.ratingCount;
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
        ]}
      />

      <Modal
        title={editingArticle ? "Edit Article" : "Add Article"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} initialValues={editingArticle} onFinish={handleSave}>
          <Form.Item
            name="title"
            label="Article Title"
            rules={[{ required: true, message: 'Please input the article title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="author"
            label="Author"
            rules={[{ required: true, message: 'Please input the author!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="categories"
            label="Category"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select
              style={{ width: '100%' }}
              placeholder="Select a category"
              onChange={handleCategoryChange}
            >
              {getCategories().map(category => (
                <Option key={category} value={category}>{category}</Option>
              ))}
            </Select>
          </Form.Item>
          {selectedCategory && (
            <Form.Item
              name="tags"
              label="Tags"
              rules={[{ required: true, message: 'Please select at least one tag!' }]}
            >
              <Select mode="multiple" style={{ width: '300px' }} placeholder="Select tags">
                {getTags(selectedCategory).map(tag => (
                  <Option key={tag} value={tag}>{tag}</Option>
                ))}
              </Select>
            </Form.Item>
          )}
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

*/