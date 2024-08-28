// // Draft.js

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Heading from "../../../Customer/common/heading/Heading";
// import "./draft.css";

// // Dữ liệu mẫu
// const popular = [
//   {
//     _id: "sampleId123",
//     title: "Sample Article Title 1",
//     content_blocks: [
//       { type: "paragraph", content: "This is a sample paragraph." },
//       { type: "image", src: "https://via.placeholder.com/150", alt: "Sample Image" },
//       { type: "quote", content: "This is a sample quote." }
//     ],
//     author: "Sample Author 1",
//     category: { name: "fun" },
//     totalRating: 10,
//     ratingCount: 5,
//     Publish: false,
//     views: 150,
//     createdAt: "2024-08-17T00:00:00Z"
//   },
//   // Thêm các bài viết khác nếu cần
// ];

// const Draft = () => {
//   const [articles, setArticles] = useState(popular);
//   const navigate = useNavigate();

//   const handleDelete = (id) => {
//     setArticles(articles.filter(article => article._id !== id));
//     console.log(`Article with id ${id} deleted`);
//   };

//   const handleEdit = (article) => {
//     navigate('/writer', { state: { article } });
//   };

//   return (
//     <>
//       <section className='music'>
//         <Heading title='Báo nháp của bạn' />
//         <div className='content'>
//           {articles.length > 0 ? (
//             articles.map((val) => (
//               <div className='items' key={val._id}>
//                 <div className='box shadow flexSB'>
//                   <div className='images'>
//                     {val.content_blocks
//                       .filter(block => block.type === 'image')
//                       .map((block, index) => (
//                         <div className='img' key={index}>
//                           <img src={block.src} alt={block.alt} />
//                         </div>
//                       ))}
//                     <div className='category category1'>
//                       <span>{val.category.name}</span>
//                     </div>
//                   </div>
//                   <div className='text'>
//                     <h1 className='title'>
//                       <Link to={`/SinglePage/${val._id}`}>{val.title.slice(0, 40)}...</Link>
//                     </h1>
//                     <div className='date'>
//                       <i className='fas fa-calendar-days'></i>
//                       <label>{new Date(val.createdAt).toLocaleDateString()}</label>
//                     </div>
//                     <p className='desc'>{val.content_blocks.find(block => block.type === 'paragraph')?.content.slice(0, 250)}...</p>
//                     <div className='comment'>
//                       <i className='fas fa-share'></i>
//                       <label>Share / </label>
//                       <i className='fas fa-comments'></i>
//                       <label>{val.ratingCount}</label>
//                     </div>
//                     <button onClick={() => handleEdit(val)} className='edit-button'>
//                       Chỉnh sửa
//                     </button>
//                     <button onClick={() => handleDelete(val._id)} className='delete-button'>
//                       Xóa
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No drafts available</p>
//           )}
//         </div>
//       </section>
//     </>
//   );
// };

// export default Draft;
// Draft.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Heading from "../../../Customer/common/heading/Heading";
import { useDispatch, useSelector } from "react-redux";
import { deleteArticle } from "../../../redux/apiRequest";
import "./draft.css";

const Draft = () => {
  const articles = useSelector((state) => state.article?.getArticle?.articles) || [];
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleDelete = (id) => {
    deleteArticle(dispatch, id).then(() => {
      // Lọc lại các bài viết sau khi xóa
      const updatedArticles = articles.filter(article => article._id !== id);
      setArticles(updatedArticles);
    });
  };

  const handleEdit = (article) => {
    navigate('/writer', { state: { article } });
  };

  // Lọc các bài viết chưa được xuất bản và nằm trong danh sách bookmarkedArticles của user
  const unpublishedBookmarkedArticles = articles.filter(article =>
    article.Publish === false && user.bookmarkedArticles.includes(article._id)
  );

  return (
    <>
      <section className='music'>
        <Heading title='Báo nháp của bạn' />
        <div className='content'>
          {unpublishedBookmarkedArticles.length > 0 ? (
            unpublishedBookmarkedArticles.map((val) => (
              <div className='items' key={val._id}>
                <div className='box shadow flexSB'>
                  <div className='images'>
                    {val.content_blocks
                      .filter(block => block.type === 'image')
                      .map((block, index) => (
                        <div className='img' key={index}>
                          <img src={block.src} alt={block.alt} />
                        </div>
                      ))}
                    <div className='category category1'>
                      <span>{val.category.name}</span>
                    </div>
                  </div>
                  <div className='text'>
                    <h1 className='title'>
                      <Link to={`/SinglePage/${val._id}`}>{val.title.slice(0, 40)}...</Link>
                    </h1>
                    <div className='date'>
                      <i className='fas fa-calendar-days'></i>
                      <label>{new Date(val.createdAt).toLocaleDateString()}</label>
                    </div>
                    <p className='desc'>{val.content_blocks.find(block => block.type === 'paragraph')?.content.slice(0, 250)}...</p>
                    <div className='comment'>
                      <i className='fas fa-share'></i>
                      <label>Share / </label>
                      <i className='fas fa-comments'></i>
                      <label>{val.ratingCount}</label>
                    </div>
                    <button onClick={() => handleEdit(val)} className='edit-button'>
                      Chỉnh sửa
                    </button>
                    <button onClick={() => handleDelete(val._id)} className='delete-button'>
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No drafts available</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Draft;
