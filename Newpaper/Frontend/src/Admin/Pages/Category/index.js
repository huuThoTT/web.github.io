// import React, { useState,useEffect } from 'react';
// import { Button, Table, Modal, Form, Input, Space, Typography} from 'antd';
// import { updateArticle, deleteArticle, getCategories } from '../../../redux/apiRequest';
// import { useDispatch, useSelector } from "react-redux";
// // Static data for demonstration
// const staticCategoriesData = {
//   categories: [
//     {
//       _id: "1",
//       name: "Technology",
//       description: "Articles about technology",
//       listIdTags: [
//         { name: "dsss" },
//         { name: "ddd"}
//       ],
//       date : "13/02/2021"
//     },
//     {
//       _id: "2",
//       name: "Health",
//       description: "Articles about health",
//       listIdTags: [
//         { name: "dsd"},
//         { name: "đsdd" }
//       ],
         
//     },
//   ],
// };

// const Category = () => {
//   const categories = useSelector((state) => state.category?.getCategory?.categories);
//   const [loading,setLoading] = useState(false);
//   const [dataSource, setDataSource] = useState(null);
//   const [filteredData, setFilteredData] = useState(staticCategoriesData.categories);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [editingCategory, setEditingCategory] = useState(null);
//   const [searchText, setSearchText] = useState('');
//   useEffect(() => {
//     setLoading(true);
//     // Simulating API call with static data
//     setTimeout(() => {
//       setDataSource(staticCategoriesData.categories);
//       setLoading(false);
//     }, 300); // Simulating loading time
//   }, []);
//   const handleAdd = () => {
//     setEditingCategory(null);
//     setIsModalVisible(true);
//   };

//   const handleEdit = (record) => {
//     setEditingCategory(record);
//     setIsModalVisible(true);
//   };

//   const handleDelete = (record) => {
//     const newData = dataSource.filter((category) => category._id !== record._id);
//     setDataSource(newData);
//     setFilteredData(newData);
//   };

//   const handleSave = (values) => {
//     if (editingCategory) {
//       const newData = dataSource.map((category) =>
//         category._id === editingCategory._id ? { ...category, name: values.name } : category
//       );
//       setDataSource(newData);
//       setFilteredData(newData);
//     } else {
//       const newCategory = {
//         _id: (dataSource.length + 1).toString(),
//         name: values.name,
//         description: '',
//         listIdArticle: [],
//       };
//       const newData = [...dataSource, newCategory];
//       setDataSource(newData);
//       setFilteredData(newData);
//     }
//     setIsModalVisible(false);
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchText(value);
//     const filtered = dataSource.filter((category) =>
//       category.name.toLowerCase().includes(value)
//     );
//     setFilteredData(filtered);
//   };

//   return (
//     <Space direction="vertical" size={20}>
//       <Typography.Title level={4}>Category Management</Typography.Title>
//       <Space direction="horizontal">
//         <Button type="primary" onClick={handleAdd}>Add Category</Button>
//         <Input
//           placeholder="Search categories"
//           value={searchText}
//           onChange={handleSearch}
//         />
//       </Space>
//       <Table loading = {loading} dataSource={filteredData} rowKey="_id" columns={[
//         {
//           title: "Name",
//           dataIndex: "name",
//         },
//         {
//           title: "Tags",
//           dataIndex: "listIdTags",
//           render: (tags) => (
//             <ul style={{ paddingInlineStart: 0 }}>
//               {tags.map((tags, index) => (
//                 <li key={index} style={{ marginBottom: '15px' }}>
//                   <strong>Tags name</strong> {tags.name} <br />
//                 </li>
//               ))}
//             </ul>
//           ),
          
//         },
//         {
//           title: "Actions",
//           render: (text, record) => (
//             <Space>
//               <Button onClick={() => handleEdit(record)}>Edit</Button>
//               <Button danger onClick={() => handleDelete(record)}>Delete</Button>
//             </Space>
//           ),
//         },
//       ]} />

//       <Modal title={editingCategory ? "Edit Category" : "Add Category"} visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
//         <Form initialValues={editingCategory} onFinish={handleSave}>
//           <Form.Item name="name" label="Category Name" rules={[{ required: true, message: 'Please input the category name!' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Save
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </Space>
//   );
// };

// export default Category;
import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Space, Typography, message } from 'antd'; // Thêm message vào import
import { updateCategory, deleteCategory, getCategories } from '../../../redux/apiRequest';
import { useDispatch, useSelector } from "react-redux";

const Category = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category?.getCategory?.categories) || [];
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setLoading(true);
    getCategories(dispatch).finally(() => setLoading(false)); // Đảm bảo setLoading(false) sau khi getCategories hoàn tất
  }, [dispatch]);

  useEffect(() => {
    if (categories.length) {
      setDataSource(categories);
      setFilteredData(categories);
    }
  }, [categories]);

  const handleAdd = () => {
    setEditingCategory(null); // Xóa dữ liệu khi bấm vào Add
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingCategory(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (record) => {
    try {
      await deleteCategory(dispatch, record?._id);
      message.success("Category deleted successfully");
      getCategories(dispatch);
    } catch (error) {
      message.error("Failed to delete category: " + error.message);
    }
  };

  const handleSave = async (values) => {
    const categoryData = {
      ...editingCategory,
      name: values.name,
      description: values.description,
      tags: editingCategory?.tags || [], // Cập nhật tags
    };

    try {
      const response = await updateCategory(dispatch, categoryData);

      if (response) {
        if (editingCategory) {
          // Cập nhật danh mục hiện có
          const newData = dataSource.map((category) =>
            category._id === editingCategory._id ? response : category
          );
          setDataSource(newData);
          setFilteredData(newData);
        } else {
          // Thêm danh mục mới
          const newData = [...dataSource, response];
          setDataSource(newData);
          setFilteredData(newData);
        }

        // Gọi lại getCategories để đảm bảo dữ liệu luôn cập nhật
        message.success("Category saved successfully");
        getCategories(dispatch);
      }
    } catch (error) {
      message.error("Failed to save category: " + error.message);
    } finally {
      setIsModalVisible(false);
      setLoading(false);
    }
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
      <Table 
        loading={loading} 
        dataSource={filteredData} 
        rowKey="_id" 
        columns={[
          {
            title: "Name",
            dataIndex: "name",
          },
          {
            title: "Description", 
            dataIndex: "description",
          },
          {
            title: "Tags",
            dataIndex: "tags", // Cập nhật thành tags
            render: (tags) => (
              <ul style={{ paddingInlineStart: 0 }}>
                {tags?.map((tag, index) => (
                  <li key={index} style={{ marginBottom: '15px' }}>
                    <strong>Tag:</strong> {tag} <br /> {/* Hiển thị tag */}
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
        ]}
      />

      <Modal 
        title={editingCategory ? "Edit Category" : "Add Category"} 
        visible={isModalVisible} 
        onCancel={() => setIsModalVisible(false)} 
        footer={null}
      >
        <Form 
          initialValues={editingCategory || { name: '', description: '', tags: [] }} 
          onFinish={handleSave}
        >
          <Form.Item 
            name="name" 
            label="Category Name" 
            rules={[{ required: true, message: 'Please input the category name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="description" 
            label="Description"
            rules={[{ required: false }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item 
            name="tags"
            label="Tags"
            rules={[{ required: false }]}
          >
            <Input.TextArea rows={4} placeholder="Tags cannot be edited or added" disabled />
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
