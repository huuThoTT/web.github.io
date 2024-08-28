// import React from "react";
// import Slider from "react-slick";
// import { Link } from "react-router-dom";
// import Heading from "../../../../common/heading/Heading";
// import "./interested.css";

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
//     category: { name: "fun" }, // Cập nhật category để lọc theo "fun"
//     totalRating: 10,
//     ratingCount: 5,
//     views: 150,
//     createdAt: "2024-08-17T00:00:00Z"
//   },
//   {
//     _id: "sampleId124",
//     title: "Sample Article Title 2",
//     content_blocks: [
//       { type: "paragraph", content: "This is a sample paragraph." },
//       { type: "image", src: "https://via.placeholder.com/150", alt: "Sample Image" },
//       { type: "quote", content: "This is a sample quote." }
//     ],
//     author: "Sample Author 2",
//     category: { name: "fun" }, // Cập nhật category để lọc theo "fun"
//     totalRating: 20,
//     ratingCount: 10,
//     views: 250,
//     createdAt: "2024-08-18T00:00:00Z"
//   },
//   {
//     _id: "sampleId125",
//     title: "Sample Article Title 3",
//     content_blocks: [
//       { type: "paragraph", content: "This is a sample paragraph." },
//       { type: "image", src: "https://via.placeholder.com/150", alt: "Sample Image" },
//       { type: "quote", content: "This is a sample quote." }
//     ],
//     author: "Sample Author 3",
//     category: { name: "sports" }, // Cập nhật category khác để không được lọc
//     totalRating: 30,
//     ratingCount: 15,
//     views: 300,
//     createdAt: "2024-08-19T00:00:00Z"
//   }
// ];

// const Interested = () => {
//   const settings = {
//     dots: true,
//     className: "center",
//     centerMode: true,
//     infinite: true,
//     centerPadding: "0",
//     slidesToShow: 1,
//     speed: 500,
//     rows: 2,
//     slidesPerRow: 1,
//   };

//   return (
//     <>
//       <section className='music'>
//         <Heading title='Có thể bạn quan tâm' />
//         <div className='content'>
//           <Slider {...settings}>
//             {popular
//               .filter((val) => val.category.name === "fun") // Lọc theo category
//               .map((val) => {
//                 return (
//                   <div className='items' key={val._id}>
//                     <div className='box shadow flexSB'>
//                       <div className='images'>
//                         {/* Hiển thị hình ảnh từ content_blocks */}
//                         {val.content_blocks
//                           .filter(block => block.type === 'image')
//                           .map((block, index) => (
//                             <div className='img' key={index}>
//                               <img src={block.src} alt={block.alt} />
//                             </div>
//                         ))}
//                         <div className='category category1'>
//                           <span>{val.category.name}</span>
//                         </div>
//                       </div>
//                       <div className='text'>
//                         <h1 className='title'>
//                           <Link to={`/SinglePage/${val._id}`}>{val.title.slice(0, 40)}...</Link>
//                         </h1>
//                         <div className='date'>
//                           <i className='fas fa-calendar-days'></i>
//                           <label>{new Date(val.createdAt).toLocaleDateString()}</label>
//                         </div>
//                         <p className='desc'>{val.content_blocks.find(block => block.type === 'paragraph')?.content.slice(0, 250)}...</p>
//                         <div className='comment'>
//                           <i className='fas fa-share'></i>
//                           <label>Share / </label>
//                           <i className='fas fa-comments'></i>
//                           <label>{val.ratingCount}</label>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//           </Slider>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Interested;

import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Heading from "../../../../common/heading/Heading";
import "./interested.css";

const Interested = () => {
  // Lấy dữ liệu bài viết từ Redux store
  const articles = useSelector((state) => state.article?.getArticle?.articles) || [];

  // Lọc các bài báo theo category "fun"
  const funArticles = articles.filter((val) => val.category?.name === "fun");

  const settings = {
    dots: true,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
  };

  return (
    <>
      <section className='music'>
        <Heading title='Có thể bạn quan tâm' />
        <div className='content'>
          <Slider {...settings}>
            {funArticles.length > 0 ? (
              funArticles.map((val) => (
                <div className='items' key={val._id}>
                  <div className='box shadow flexSB'>
                    <div className='images'>
                      {val.content_blocks?.filter(block => block.type === 'image').map((block, index) => (
                        <div className='img' key={index}>
                          <img src={block.src} alt={block.alt} />
                        </div>
                      )) || null}
                      <div className='category category1'>
                        <span>{val.category?.name}</span>
                      </div>
                    </div>
                    <div className='text'>
                      <h1 className='title'>
                        <Link to={`/SinglePage/${val._id}`}>{val.title?.slice(0, 40)}...</Link>
                      </h1>
                      <div className='date'>
                        <i className='fas fa-calendar-days'></i>
                        <label>{new Date(val.createdAt).toLocaleDateString()}</label>
                      </div>
                      <p className='desc'>{val.content_blocks?.find(block => block.type === 'paragraph')?.content?.slice(0, 250)}...</p>
                      <div className='comment'>
                        <i className='fas fa-share'></i>
                        <label>Share / </label>
                        <i className='fas fa-comments'></i>
                        <label>{val.ratingCount || 0}</label>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Không có bài báo nào thuộc danh mục "fun".</p>
            )}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Interested;
