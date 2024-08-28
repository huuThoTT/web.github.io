// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Modal, Form, Input, Button, Select } from 'antd';
// import { HomeOutlined } from '@ant-design/icons'; // Import biểu tượng Home
// import './UserInfo.css';
// import { useSelector } from 'react-redux';
// const { Option } = Select;

// // Dữ liệu mẫu cho các category
// const staticCategoryData = {
//     categories: [
//         { name: 'Technology' },
//         { name: 'Health' },
//         { name: 'Science' },
//         { name: 'Politics' },
//         { name: 'Art' },
//         { name: 'Design' },
//         { name: 'Photography' }
//     ]
// };

// const UserInfo = () => {
//     const [user, setUser] = useState({
//         username: "johndoe123",
//         email: "johndoe@example.com",
//         password: "hashedPassword123",
//         isAdmin: false,
//         socialAccounts: {
//             facebook: "john.doe.fb",
//             google: "johndoe@gmail.com",
//             phoneNumber: "+1234567890"
//         },
//         preferences: {
//             categories: [
//                 {
//                     category: "Technology",
//                     topics: ["Technology", "AI", "Web Development"]
//                 },
//                 {
//                     category: "Science",
//                     topics: ["Science", "Space Exploration"]
//                 }
//             ]
//         },
//         Subscribe: "premium_monthly",
//         notificationsEnabled: true,
//         bookmarkedArticles: [
//             "60d5ecb8b6e7c45b4f5e8b1c",
//             "60d5ecb8b6e7c45b4f5e8b1d"
//         ],
//         adFreeSubscription: true,
//         createdAt: new Date("2023-01-15T10:30:00Z"),
//         updatedAt: new Date("2023-08-20T15:45:00Z")
//     });
     
//     const [editModalVisible, setEditModalVisible] = useState(false);
//     const [form] = Form.useForm();

//     const handleLogout = () => {
//         // Clear user session or token
//         // For example: localStorage.removeItem('userToken');
//         // Redirect to login page
//         window.location.href = '/login';
//     };

//     const handleUpdateInfo = (values) => {
//         console.log('Updated user info:', values);
//         // Here you would usually send a PUT request to update user info
//         setUser({ ...user, ...values });
//         setEditModalVisible(false);
//     };

//     const openEditModal = () => {
//         form.setFieldsValue({
//             username: user.username,
//             email: user.email,
//             categories: user.preferences.categories.map(c => c.category)
//         });
//         setEditModalVisible(true);
//     };

//     const closeEditModal = () => {
//         setEditModalVisible(false);
//     };

//     return (
//         <div className="user-info">
//             <Link to="/" className="home-link">
//                 <HomeOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
//             </Link>
//             <p className="user-email">Username: {user.username}</p>
//             <p className="user-detail">Email: {user.email}</p>
//             <p className="user-detail">Danh mục yêu thích: 
//                 {user.preferences.categories.map((cat, index) => (
//                     <span key={index} className="user-category">
//                         {cat.category}{index < user.preferences.categories.length - 1 ? ', ' : ''}
//                     </span>
//                 ))}
//             </p>
            
//             <ul className="user-links">
//                 <li><Link to="/writer/publish">Tin đã viết</Link></li>
//                 <li><Link to="/writer/draft">Tin nháp</Link></li>
//             </ul>
//             <hr />
//             <Button className="update-info" onClick={openEditModal}>Cập Nhật Thông Tin</Button>
//             <Button className="logout" onClick={handleLogout}>Đăng xuất</Button>

//             <Modal
//                 visible={editModalVisible}
//                 onCancel={closeEditModal}
//                 footer={null}
//                 title="Update Info"
//             >
//                 <Form form={form} onFinish={handleUpdateInfo}>
//                     <Form.Item
//                         name="username"
//                         label="Username"
//                         rules={[{ required: true, message: 'Please input your username!' }]}
//                     >
//                         <Input />
//                     </Form.Item>
//                     <Form.Item
//                         name="email"
//                         label="Email"
//                         rules={[{ required: true, message: 'Please input your email!' }]}
//                     >
//                         <Input />
//                     </Form.Item>
//                     <Form.Item
//                         name="categories"
//                         label="Categories"
//                         rules={[{ required: true, message: 'Please select your categories!' }]}
//                     >
//                         <Select mode="multiple" placeholder="Select categories">
//                             {staticCategoryData.categories.map(category => (
//                                 <Option key={category.name} value={category.name}>
//                                     {category.name}
//                                 </Option>
//                             ))}
//                         </Select>
//                     </Form.Item>
//                     <Form.Item>
//                         <Button type="primary" htmlType="submit">
//                             Save
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </div>
//     );
// };

// export default UserInfo;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Form, Input, Button, Select } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import './UserInfo.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, logOut } from '../../redux/apiRequest';
import { createAxios } from '../../createInstance';
import { loginSuccess } from '../../redux/authSlice';

const { Option } = Select;

const UserInfo = () => {
    const categories = useSelector((state) => state.category?.getCategory?.categories) || [];
    const user = useSelector((state) => state.auth?.login?.currentUser);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
 let axiosJWT = createAxios(user, dispatch, loginSuccess)
    const handleLogout = () => {
        logOut(dispatch,navigate, user?._id,user?.accessToken,axiosJWT);
    };

    const handleUpdateInfo = (values) => {
        console.log('Updated user info:', values);
        const updatedUser = { ...user, ...values };
        updateUser(dispatch, updatedUser);
        setEditModalVisible(false);
    };

    const openEditModal = () => {
        form.setFieldsValue({
            username: user?.username || '',
            email: user?.email || '',
            categories: user?.preferences?.categories?.map(c => c.category) || []
        });
        setEditModalVisible(true);
    };

    const closeEditModal = () => {
        setEditModalVisible(false);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-info">
            <Link to="/" className="home-link">
                <HomeOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            </Link>
            <p className="user-email">Username: {user.username}</p>
            <p className="user-detail">Email: {user.email}</p>
            <p className="user-detail">Danh mục yêu thích: 
                {user.preferences?.categories?.map((cat, index) => (
                    <span key={index} className="user-category">
                        {cat.category}{index < user.preferences.categories.length - 1 ? ', ' : ''}
                    </span>
                ))}
            </p>
            
            <ul className="user-links">
                <li><Link to="/writer/publish">Tin đã viết</Link></li>
                <li><Link to="/writer/draft">Tin nháp</Link></li>
            </ul>
            <hr />
            <Button className="update-info" onClick={openEditModal}>Cập Nhật Thông Tin</Button>
            <Button className="logout" onClick={handleLogout}>Đăng xuất</Button>

            <Modal
                visible={editModalVisible}
                onCancel={closeEditModal}
                footer={null}
                title="Update Info"
            >
                <Form form={form} onFinish={handleUpdateInfo}>
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="categories"
                        label="Categories"
                        rules={[{ required: true, message: 'Please select your categories!' }]}
                    >
                     <Select 
    mode="multiple" 
    placeholder="Select categories" 
    className="w-full h-12 text-lg"
>
    {categories && categories.map(category => (
        <Option  style={{ width: '300px' }}  key={category.name} value={category.name}>
            {category.name}
        </Option>
    ))}
</Select>

                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UserInfo;