// import React, { useState, useEffect } from 'react';
// import { Table, Button, Space, Typography, Tag, Modal } from 'antd';
// import axios from 'axios'; // Import axios để gửi yêu cầu API

// // Static articles data for demonstration
// const staticArticlesData = {
//   articles: [
//     {
//       id: 1,
//       title: "Article 1",
//       content_blocks: [
//         { type: "paragraph", content: "This is the first paragraph of the article." },
//         { type: "image", src: "http://example.com/image1.jpg", alt: "Image caption 1" },
//         { type: "paragraph", content: "This is the second paragraph of the article." },
//         { type: "image", src: "http://example.com/image2.jpg", alt: "Image caption 2" },
//         { type: "paragraph", content: "This is the third paragraph of the article." },
//         { type: "quote", content: "This is a quote from the article." }
//       ],
//       author: "Author 1",
//       categories: ["Category1", "Category2"],
//       tags: ["Tag1", "Tag2"],
//       status: "pending",
//       views: 100,
//       totalRating: 25,
//       ratingCount: 5,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     // Các bài viết khác...
//   ],
// };

// // Giả sử đây là user mẫu có trường Subscribe
// const users = [
//   {
//     _id: "64e555fbf4a3a2b0b2d9f80c",
//     username: "johndoe",
//     email: "johndoe@example.com",
//     Subscribe: true,
//   },
//   {
//     _id: "64e555fbf4a3a2b0b2d9f80d",
//     username: "janedoe",
//     email: "janedoe@example.com",
//     Subscribe: true,
//   },
//   {
//     _id: "64e555fbf4a3a2b0b2d9f80e",
//     username: "nonSubscriber",
//     email: "nonsubscriber@example.com",
//     Subscribe: false,
//   },
//   // Các user khác...
// ];

// // Hàm gửi email thông báo
// const sendApprovalNotification = (article) => {
//   users.forEach((user) => {
//     if (user.Subscribe) {
//       // Gửi yêu cầu API để gửi email (giả sử bạn có API để xử lý việc này)
//       axios.post('/api/send-email', {
//         to: user.email,
//         subject: `Bài viết "${article.title}" đã được phê duyệt`,
//         body: `Xin chào ${user.username},\n\nBài viết "${article.title}" đã được phê duyệt và bạn có thể đọc nó trên trang web của chúng tôi.\n\nCảm ơn!`,
//       }).then((response) => {
//         console.log(`Email sent to ${user.email}`);
//       }).catch((error) => {
//         console.error(`Failed to send email to ${user.email}`, error);
//       });
//     }
//   });
// };

// const ReviewArticles = () => {
//   const [loading, setLoading] = useState(false);
//   const [dataSource, setDataSource] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [currentArticle, setCurrentArticle] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     setTimeout(() => {
//       setDataSource(staticArticlesData.articles);
//       setLoading(false);
//     }, 300);
//   }, []);

//   const handleApprove = (id) => {
//     const updatedArticles = dataSource.map((article) => {
//       if (article.id === id) {
//         const approvedArticle = { ...article, status: 'approved' };
//         sendApprovalNotification(approvedArticle); // Gửi email thông báo
//         return approvedArticle;
//       }
//       return article;
//     });
//     setDataSource(updatedArticles);
//   };

//   const handleReject = (id) => {
//     const updatedArticles = dataSource.map((article) => {
//       if (article.id === id) {
//         return { ...article, status: 'rejected' };
//       }
//       return article;
//     });
//     setDataSource(updatedArticles);
//   };

//   const handleViewContent = (article) => {
//     setCurrentArticle(article);
//     setModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setModalVisible(false);
//     setCurrentArticle(null);
//   };

//   return (
//     <Space size={20} direction="vertical">
//       <Typography.Title level={4}>Review Articles</Typography.Title>
//       <Table
//         loading={loading}
//         columns={[
//           {
//             title: "Title",
//             dataIndex: "title",
//           },
//           {
//             title: "Author",
//             dataIndex: "author",
//           },
//           {
//             title: "Categories",
//             dataIndex: "categories",
//             render: (categories) => categories.join(", "),
//           },
//           {
//             title: "Tags",
//             dataIndex: "tags",
//             render: (tags) => tags.join(", "),
//           },
//           {
//             title: "Status",
//             dataIndex: "status",
//             render: (status) => {
//               let color = status === 'approved' ? 'green' : status === 'rejected' ? 'red' : 'orange';
//               return <Tag color={color}>{status.toUpperCase()}</Tag>;
//             },
//           },
//           {
//             title: "Views",
//             dataIndex: "views",
//           },
//           {
//             title: "Actions",
//             render: (record) => (
//               <Space size="middle">
//                 <Button onClick={() => handleApprove(record.id)} disabled={record.status !== 'pending'}>Approve</Button>
//                 <Button onClick={() => handleReject(record.id)} disabled={record.status !== 'pending'}>Reject</Button>
//                 <Button onClick={() => handleViewContent(record)}>View Content</Button>
//               </Space>
//             ),
//           },
//         ]}
//         dataSource={dataSource.map((item) => ({ ...item, key: item.id }))}
//         pagination={{
//           pageSize: 5,
//         }}
//       />
//       <Modal
//         title="Article Content"
//         visible={modalVisible}
//         onCancel={handleCloseModal}
//         footer={[
//           <Button key="close" onClick={handleCloseModal}>Close</Button>,
//         ]}
//       >
//         {currentArticle && (
//           <div>
//             <Typography.Title level={5}>{currentArticle.title}</Typography.Title>
//             {currentArticle.content_blocks.map((block, index) => {
//               if (block.type === 'paragraph') {
//                 return <Typography.Paragraph key={index}>{block.content}</Typography.Paragraph>;
//               } else if (block.type === 'image') {
//                 return <img key={index} src={block.src} alt={block.alt} />;
//               } else if (block.type === 'quote') {
//                 return <blockquote key={index}>{block.content}</blockquote>;
//               }
//               return null; // Handle other types if needed
//             })}
//           </div>
//         )}
//       </Modal>
//     </Space>
//   );
// };

// export default ReviewArticles;
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Typography, Tag, Modal } from 'antd';
import axios from 'axios';
import { getArticlePending, updateArticlePending } from "../../../redux/apiRequest";
import { useSelector, useDispatch } from 'react-redux';

const ReviewArticles = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  
  const users = useSelector((state) => state.user?.users?.allUsers) || [];
  const articlesPending = useSelector((state) => state.article?.getArticlePending?.articlesPending) || [];

  useEffect(() => {
    setLoading(true);
    getArticlePending(dispatch);
    setLoading(false);
  }, [dispatch]);

  const sendApprovalNotification = (article) => {
    users.forEach((user) => {
      if (user.Subscribe) {
        axios.post('/api/send-email', {
          to: user.email,
          subject: `Bài viết "${article.title}" đã được phê duyệt`,
          body: `Xin chào ${user.username},\n\nBài viết "${article.title}" đã được phê duyệt và bạn có thể đọc nó trên trang web của chúng tôi.\n\nCảm ơn!`,
        }).then((response) => {
          console.log(`Email sent to ${user.email}`);
        }).catch((error) => {
          console.error(`Failed to send email to ${user.email}`, error);
        });
      }
    });
  };

  const handleApprove = (id) => {
    updateArticlePending(dispatch,  id ,'approved' );
    const approvedArticle = articlesPending.find(article => article._id === id);
    if (approvedArticle) {
      sendApprovalNotification(approvedArticle);
    }
  };

  const handleReject = (id) => {
    updateArticlePending(dispatch,  id, 'rejected' );
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
            title: "Actions",
            render: (record) => (
              <Space size="middle">
                <Button onClick={() => handleApprove(record._id)} disabled={record.status !== 'pending'}>Approve</Button>
                <Button onClick={() => handleReject(record._id)} disabled={record.status !== 'pending'}>Reject</Button>
                <Button onClick={() => handleViewContent(record)}>View Content</Button>
              </Space>
            ),
          },
        ]}
        dataSource={articlesPending.map((item) => ({ ...item, key: item._id }))}
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
            {currentArticle.content_blocks.map((block, index) => {
              if (block.type === 'paragraph') {
                return <Typography.Paragraph key={index}>{block.content}</Typography.Paragraph>;
              } else if (block.type === 'image') {
                return <img key={index} src={block.src} alt={block.alt} />;
              } else if (block.type === 'quote') {
                return <blockquote key={index}>{block.content}</blockquote>;
              }
              return null;
            })}
          </div>
        )}
      </Modal>
    </Space>
  );
};

export default ReviewArticles;