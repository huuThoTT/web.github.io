// import React, { useState } from "react";
// import Head from "./Head";
// import "./header.css";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { Drawer, Switch, Button, Menu, Dropdown, Modal, Input, Form, Select } from "antd";
// import { MenuOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import { getCategories } from "../../../redux/apiRequest";
// const { Option } = Select;

// const Header = () => {
//   const [navbar, setNavbar] = useState(false);
//   const dispatch = useDispatch();
//   const [user, setUser] = useState({
//     username: "Phung",
//     email: "phung@example.com",
//     preferences: {
//       categories: [
//         {
//           category: "Technology",
//           topics: ["React", "Node.js"]
//         }
//       ]
//     },
//     notificationsEnabled: true,
//     adFreeSubscription: false
//   });
//   useEffect(() => {
//     getCategories(dispatch);
//   }, [dispatch]);
//   const [drawerVisible, setDrawerVisible] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [form] = Form.useForm();
  
//   const staticCategoryData = {
//     "categories": [
//       {
//         "name": "Thời sự",
//         "tags": [
//           "Chính trị",
//           "Xã hội",
//           "Quốc tế",
//           "Giao thông",
//           "Môi trường"
//         ]
//       },
//       {
//         "name": "Kinh tế",
//         "tags": [
//           "Tài chính",
//           "Chứng khoán",
//           "Bất động sản",
//           "Doanh nghiệp",
//           "Khởi nghiệp"
//         ]
//       },
//       {
//         "name": "Thể thao",
//         "tags": [
//           "Bóng đá",
//           "Bóng rổ",
//           "Tennis",
//           "Cầu lông",
//           "Điền kinh"
//         ]
//       },
//       {
//         "name": "Văn hóa",
//         "tags": [
//           "Điện ảnh",
//           "Âm nhạc",
//           "Mỹ thuật",
//           "Văn học",
//           "Sân khấu"
//         ]
//       },
//       {
//         "name": "Giải trí",
//         "tags": [
//           "Sao",
//           "Phim ảnh",
//           "TV Show",
//           "Âm nhạc",
//           "Trò chơi"
//         ]
//       },
//       {
//         "name": "Công nghệ",
//         "tags": [
//           "Điện thoại",
//           "Máy tính",
//           "Internet",
//           "AI",
//           "Gadget"
//         ]
//       },
//       {
//         "name": "Sức khỏe",
//         "tags": [
//           "Dinh dưỡng",
//           "Bệnh tật",
//           "Lối sống",
//           "Tập luyện",
//           "Tinh thần"
//         ]
//       },
//       {
//         "name": "Giáo dục",
//         "tags": [
//           "Học đường",
//           "Tuyển sinh",
//           "Du học",
//           "Đào tạo",
//           "Công nghệ giáo dục"
//         ]
//       },
//       {
//         "name": "Du lịch",
//         "tags": [
//           "Điểm đến",
//           "Kinh nghiệm",
//           "Ẩm thực",
//           "Khám phá",
//           "Nghỉ dưỡng"
//         ]
//       }
//     ]
//   };
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
//     }
//   };

//   const handleLogout = () => {
//     console.log("User logged out");
//   };

//   const toggleDrawer = () => {
//     setDrawerVisible(!drawerVisible);
//   };

//   const handleToggleNotifications = () => {
//     setUser({ ...user, notificationsEnabled: !user.notificationsEnabled });
//   };

//   const handleToggleAdFree = () => {
//     setUser({ ...user, adFreeSubscription: !user.adFreeSubscription });
//   };

//   const openModal = () => {
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//   };

//   const openEditModal = () => {
//     setEditModalVisible(true);
//     form.setFieldsValue({
//       username: user.username,
//       email: user.email,
//       categories: user.preferences.categories.map(c => c.category)
//     });
//   };

//   const closeEditModal = () => {
//     setEditModalVisible(false);
//   };

//   const handleUpdateInfo = (values) => {
//     setUser({
//       ...user,
//       username: values.username,
//       email: values.email,
//       preferences: {
//         categories: values.categories.map(category => ({
//           category,
//           topics: []
//         }))
//       }
//     });
//     closeEditModal();
//   };

//   return (
//     <>
//       <Head />
//       <header>
//         <div className="container mx-auto p-4">
//           <nav className="flex justify-between items-center">
//             <ul className={navbar ? "navbar" : "flex space-x-4"}>
//               <li>
//                 <Link to="/" className="hover:text-gray-700">
//                   Home
//                 </Link>
//               </li>
//               {staticCategoryData.categories.slice(0, 9).map((category, index) => (
//                 <li key={index}>
//                   <Link to={`/${category.name}/${category.tags[0]}`} className="ant-dropdown-link hover:text-gray-700">
//                     {category.name}
//                   </Link>
//                 </li>
//               ))}
//               <li>
//                 <button onClick={openModal} className="hover:text-gray-700">
//                   More
//                 </button>
//               </li>
//             </ul>
//             <div className="relative flex items-center space-x-4">
//               {user ? (
//                 <>
//                   <div className="relative text-blue-700 flex items-center">
//                     <input
//                       type="text"
//                       placeholder="Tìm kiếm bài báo..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="border p-2"
//                     />
//                     <button
//                       type="button"
//                       onClick={handleSearch}
//                       className="ml-2 p-2 bg-blue-500 text-white"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-6 w-6 inline-block"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                   <Link to="/writer" className="ml-2">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6 inline-block"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                       />
//                     </svg>
//                   </Link>
//                 </>
//               ) : (
//                 <>
//                   <Link to="/login" className="navbar-login text-blue-700">
//                     Đăng nhập
//                   </Link>
//                   <Link to="/register" className="navbar-register text-blue-700">
//                    Đăng ký
//                   </Link>
//                 </>
//               )}
//               <button
//                 className="barIcon text-gray-900"
//                 onClick={() => setNavbar(!navbar)}
//               >
//                 {navbar ? (
//                   <i className="fa fa-times"></i>
//                 ) : (
//                   <MenuOutlined />
//                 )}
//               </button>
//             </div>
//           </nav>
//         </div>
//       </header>
//       <Modal
//         visible={modalVisible}
//         onCancel={closeModal}
//         footer={null}
//         width="80%"
//       >
//         <div className="grid grid-cols-6 gap-4">
//           {staticCategoryData.categories.map((category, index) => (
//             <div key={index} className="mb-4">
//               <h3 className="font-bold">
//                 <Link to={`/${category.name}/${category.tags[0]}`}>{category.name}</Link>
//               </h3>
//               <ul className="ml-4 list-disc">
//                 {category.tags.map((tag, tagIndex) => (
//                   <li key={tagIndex}>
//                     <Link to={`/${category.name}/${tag}`}>{tag}</Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default Header;
import React, { useState, useEffect } from "react";
import Head from "./Head";
import "./header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, Switch, Button, Menu, Dropdown, Modal, Input, Form, Select } from "antd";
import { MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getCategories } from "../../../redux/apiRequest";

const { Option } = Select;

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const dispatch = useDispatch();

  const articles = useSelector((state) => state.article?.getArticle?.articles) || [];
  const categories = useSelector((state) => state.category?.getCategory?.categories) || [];
  const user = useSelector((state) => state.auth?.login?.currentUser);

  useEffect(() => {
    getCategories(dispatch);
  }, [dispatch]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  return (
    <>
      <Head />
      <header>
        <div className="container mx-auto p-4">
          <nav className="flex justify-between items-center">
            <ul className={navbar ? "navbar" : "flex space-x-4"}>
              <li>
                <Link to="/" className="hover:text-gray-700">
                  Home
                </Link>
              </li>
              {categories.length > 0 && categories.slice(0, 9).map((category, index) => (
                <li key={index}>
                  <Link to={`/${category.name}/${category.tags[0]}`} className="ant-dropdown-link hover:text-gray-700">
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <button onClick={openModal} className="hover:text-gray-700">
                  More
                </button>
              </li>
            </ul>
            <div className="relative flex items-center space-x-4">
              {user ? (
                <>
                  <div className="relative text-blue-700 flex items-center">
                    <input
                      type="text"
                      placeholder="Tìm kiếm bài báo..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border p-2"
                    />
                    <button
                      type="button"
                      onClick={handleSearch}
                      className="ml-2 p-2 bg-blue-500 text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 inline-block"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <Link to="/writer" className="ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 inline-block"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </Link>
                </>
              ) : (
                <>
                 <div className="relative text-white-700 flex items-center">
                    <input
                      type="text"
                      placeholder="Tìm kiếm bài báo..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border p-2"
                    />
                    <button
                      type="button"
                      onClick={handleSearch}
                      className="ml-2 p-2 bg-blue-500 text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 inline-block"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <Link to="/login" className="navbar-login text-white-700">
                    Đăng nhập
                  </Link>
                  <Link to="/register" className="navbar-registertext-white-700">
                   Đăng ký
                  </Link>
                </>
              )}
              <button
                className="barIcon text-gray-900"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <i className="fa fa-times"></i>
                ) : (
                  <MenuOutlined />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>
      <Modal
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
        width="80%"
      >
        <div className="grid grid-cols-6 gap-4">
          {categories.length > 0 && categories.map((category, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold">
                <Link to={`/${category.name}/${category.tags[0]}`}>{category.name}</Link>
              </h3>
              <ul className="ml-4 list-disc">
                {category.tags.map((tag, tagIndex) => (
                  <li key={tagIndex}>
                    <Link to={`/${category.name}/${tag}`}>{tag}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default Header;
