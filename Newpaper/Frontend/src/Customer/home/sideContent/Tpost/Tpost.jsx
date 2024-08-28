// import React from "react";
// import { Link } from "react-router-dom";
// import Heading from "../../../common/heading/Heading";
// import "./tpost.css";

// // Dữ liệu mẫu
// const sampleData = [
//   {
//     title: "The Rise of GenZ Technology",
//     content_blocks: [
//       { type: "paragraph", content: "GenZ is increasingly shaping the technology landscape." },
//       { type: "image", src: "https://via.placeholder.com/150", alt: "GenZ Technology" },
//       { type: "quote", content: "Innovation is driven by the new generation." }
//     ],
//     author: "Jane Doe",
//     category: "genz", // Sử dụng ID hoặc tên của danh mục nếu có
//     tags: ["tech", "genz"], // Sử dụng ID của các tag nếu có
//     Comment: [], // Sử dụng ID của các bình luận nếu có
//     status: "approved",
//     Publish: true,
//     views: 120,
//     totalRating: 4.5,
//     ratingCount: 10,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   },
//   {
//     title: "GenZ and Social Media Trends",
//     content_blocks: [
//       { type: "paragraph", content: "Social media usage among GenZ has seen significant changes." },
//       { type: "image", src: "https://via.placeholder.com/150", alt: "Social Media Trends" },
//       { type: "quote", content: "Social media is a tool for self-expression for GenZ." }
//     ],
//     author: "John Smith",
//     category: "genz", // Sử dụng ID hoặc tên của danh mục nếu có
//     tags: ["social media", "genz"], // Sử dụng ID của các tag nếu có
//     Comment: [], // Sử dụng ID của các bình luận nếu có
//     status: "approved",
//     Publish: true,
//     views: 90,
//     totalRating: 4.0,
//     ratingCount: 8,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   },
//   // Thêm dữ liệu mẫu khác nếu cần
// ];

// const Tpost = () => {
//   // Lọc các bài báo có danh mục là "genz"
//   const filteredArticles = sampleData.filter(article => article.category === "genz");

//   return (
//     <>
//       <section className="tpost">
//         <Heading title="GenZ" />
//         {filteredArticles.map((val, index) => (
//           <div className="box flexSB" key={index}>
//             <div className="img">
//               <img src={val.content_blocks[1]?.src} alt={val.content_blocks[1]?.alt} />
//             </div>
//             <div className="text">
//               <h1 className="title">
//                 <Link to={`/SinglePage/${index}`}>{val.title.slice(0, 35)}...</Link>
//               </h1>
//               <span>{val.createdAt.toDateString()}</span>
//             </div>
//           </div>
//         ))}
//       </section>
//     </>
//   );
// };

// export default Tpost;


import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Heading from "../../../common/heading/Heading";
import "./tpost.css";

const Tpost = () => {
  // Lấy dữ liệu article từ redux store
  const articles = useSelector((state) => state.article?.getArticle?.articles) || [];

  // Lọc các bài báo có danh mục là "genz"
  const filteredArticles = articles.filter((article) => article.category === "genz");

  return (
    <>
      <section className="tpost">
        <Heading title="GenZ" />
        {filteredArticles.length > 0 ? (
          filteredArticles.map((val, index) => {
            // Lấy thông tin hình ảnh từ content_blocks
            const imageBlock = val.content_blocks?.find((block) => block.type === "image") || {};
            const coverImageSrc = imageBlock.src || "";
            const coverImageAlt = imageBlock.alt || "No Image";

            return (
              <div className="box flexSB" key={index}>
                <div className="img">
                  {coverImageSrc ? (
                    <img
                      src={coverImageSrc}
                      alt={coverImageAlt}
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                </div>
                <div className="text">
                  <h1 className="title">
                    <Link to={`/SinglePage/${val._id}`}>
                      {val.title?.slice(0, 35) || "No Title"}...
                    </Link>
                  </h1>
                  <span>{val.createdAt ? new Date(val.createdAt).toDateString() : "Unknown Date"}</span>
                </div>
              </div>
            );
          })
        ) : (
          <p>No articles available for "GenZ".</p>
        )}
      </section>
    </>
  );
};

export default Tpost;
