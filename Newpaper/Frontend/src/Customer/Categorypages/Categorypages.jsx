import React from 'react';
import { BrowserRouter as Router, Route, useParams, Link } from 'react-router-dom';
import './Category.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Side from "./sideCate/Side";
import "../home/mainContent/homes/style.css";
import "../home/sideContent/side/side.css";
import { useSelector } from "react-redux";

const CategoryPage = () => {
  const articles = useSelector((state) => state.article?.getArticle?.articles) || [];
  const categories = useSelector((state) => state.category?.getCategory?.categories) || [];
  const { idcate, idtag } = useParams();
  const decodedCategory = decodeURIComponent(idcate);
  const decodedTag = decodeURIComponent(idtag);

  const category = categories.find(cat => cat.name === decodedCategory);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="category-page">
      <Navbar tags={category.tags} category={category.name} />
      <Popular tag={decodedTag} articles={articles} />
    </div>
  );
};

const Navbar = ({ tags, category }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {tags.map((tag, index) => (
          <li key={index} className="navbar-item">
            <Link to={`/${category}/${tag}`} className="navbar-link">{tag}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const Popular = ({ tag, articles }) => {
  // Lọc bài viết theo tag
  const filteredArticles = articles.filter(article => article.tags.includes(tag));

  const settings = {
    className: "center",
    centerMode: false,
    dots: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 2,
    speed: 500,
    rows: 4,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 4,
        },
      },
    ],
  };

  return (
    <section className='popular'>
      <div className='contentWrapper'>
        <div className='contentMain'>
          <Slider {...settings}>
            {filteredArticles.length > 0 ? (
              filteredArticles.map((val) => (
                <div className='items' key={val.id}>
                  <div className='box shadow'>
                    <div className='images row'>
                      <div className='img'>
                        <img src={val.cover} alt='' />
                      </div>
                      <div className='category category1'>
                        {val.tags.length > 0 ? (
                          val.tags.map((tag, index) => (
                            <span key={index} className='tag-item'>
                              {tag}
                              {index < val.tags.length - 1 && ', '}
                            </span>
                          ))
                        ) : (
                          <span>No tags</span>
                        )}
                      </div>
                    </div>
                    <div className='text row'>
                      <Link to={`/SinglePage/${val.id}`}>
                        <h1 className='title'>{val.title.slice(0, 40)}...</h1>
                      </Link>
                      <div className='date'>
                        <i className='fas fa-calendar-days'></i>
                        <label>{val.date}</label>
                      </div>
                      <div className='comment'>
                        <i className='fas fa-comments'></i>
                        <label>{val.comments}</label>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No articles found for this tag.</div>
            )}
          </Slider>
        </div>
        <aside className="sideContent">
          <Side />
        </aside>
      </div>
    </section>
  );
};

export default CategoryPage;

// import React from 'react';
// import { BrowserRouter as Router, Route, useParams, Link } from 'react-router-dom';
// import './Category.css';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Side from "./sideCate/Side";
// import "../home/mainContent/homes/style.css";
// import "../home/sideContent/side/side.css";
// // Dữ liệu bài viết giả lập
// const articles = [
//   {
//     id: 1,
//     title: "Sample Article 1",
//     content_blocks: [
//       { type: "paragraph", content: "This is the first paragraph of the first article." },
//       { type: "image", src: "https://via.placeholder.com/150", alt: "Image caption 1" },
//       { type: "paragraph", content: "This is the second paragraph of the first article." },
//       { type: "quote", content: "This is a quote from the first article." }
//     ],
//     author: "Author One",
//     category: "Thời sự",
//     tags: ["Chính trị", "Xã hội"],
//     comments: 10,
//     status: "approved",
//     views: 150,
//     totalRating: 30,
//     ratingCount: 6,
//     cover: "https://via.placeholder.com/150",
//     date: "2024-08-01"
//   },
//   {
//     id: 2,
//     title: "Sample Article 2",
//     content_blocks: [
//       { type: "paragraph", content: "This is the first paragraph of the second article." },
//       { type: "image", src: "https://via.placeholder.com/150", alt: "Image caption 2" },
//       { type: "paragraph", content: "This is the second paragraph of the second article." },
//       { type: "quote", content: "This is a quote from the second article." }
//     ],
//     author: "Author Two",
//     category: "Thời sự",
//     tags: ["Quốc tế", "Giao thông"],
//     comments: 8,
//     status: "approved",
//     views: 200,
//     totalRating: 40,
//     ratingCount: 8,
//     cover: "https://via.placeholder.com/150",
//     date: "2024-08-02"
//   },
//   {
//     id: 3,
//     title: "Sample Article 3",
//     content_blocks: [
//       { type: "paragraph", content: "This is the first paragraph of the third article." },
//       { type: "image", src: "https://via.placeholder.com/150", alt: "Image caption 3" },
//       { type: "paragraph", content: "This is the second paragraph of the third article." },
//       { type: "quote", content: "This is a quote from the third article." }
//     ],
//     author: "Author Three",
//     category: "Thời sự",
//     tags: ["Môi trường", "Chính trị"],
//     comments: 5,
//     status: "approved",
//     views: 250,
//     totalRating: 35,
//     ratingCount: 7,
//     cover: "https://via.placeholder.com/150",
//     date: "2024-08-03"
//   },
//   {
//     id: 4,
//     title: "Sample Article 4",
//     content_blocks: [
//       { type: "paragraph", content: "This is the first paragraph of the fourth article." },
//       { type: "image", src: "https://via.placeholder.com/150", alt: "Image caption 4" },
//       { type: "paragraph", content: "This is the second paragraph of the fourth article." },
//       { type: "quote", content: "This is a quote from the fourth article." }
//     ],
//     author: "Author Four",
//     category: "Thời sự",
//     tags: ["Xã hội", "Giao thông"],
//     comments: 12,
//     status: "approved",
//     views: 300,
//     totalRating: 45,
//     ratingCount: 9,
//     cover: "https://via.placeholder.com/150",
//     date: "2024-08-04"
//   },
//   {
//     id: 5,
//     title: "Sample Article 5",
//     content_blocks: [
//       { type: "paragraph", content: "This is the first paragraph of the fifth article." },
//       { type: "image", src: "https://via.placeholder.com/150", alt: "Image caption 5" },
//       { type: "paragraph", content: "This is the second paragraph of the fifth article." },
//       { type: "quote", content: "This is a quote from the fifth article." }
//     ],
//     author: "Author Five",
//     category: "Thời sự",
//     tags: ["Quốc tế", "Môi trường"],
//     comments: 7,
//     status: "approved",
//     views: 180,
//     totalRating: 25,
//     ratingCount: 5,
//     cover: "https://via.placeholder.com/150",
//     date: "2024-08-05"
//   },
//   {
//     id: 6,
//     title: "Sample Article 6",
//     content_blocks: [
//       { type: "paragraph", content: "This is the first paragraph of the sixth article." },
//       { type: "image", src: "https://via.placeholder.com/150", alt: "Image caption 6" },
//       { type: "paragraph", content: "This is the second paragraph of the sixth article." },
//       { type: "quote", content: "This is a quote from the sixth article." }
//     ],
//     author: "Author Six",
//     category: "Thời sự",
//     tags: ["Chính trị", "Giao thông"],
//     comments: 14,
//     status: "approved",
//     views: 350,
//     totalRating: 50,
//     ratingCount: 10,
//     cover: "https://via.placeholder.com/150",
//     date: "2024-08-06"
//   },
//   {
//     id: 7,
//     title: "Sample Article 7",
//     content_blocks: [
//       { type: "paragraph", content: "This is the first paragraph of the seventh article." },
//       { type: "image", src: "https://via.placeholder.com/150", alt: "Image caption 7" },
//       { type: "paragraph", content: "This is the second paragraph of the seventh article." },
//       { type: "quote", content: "This is a quote from the seventh article." }
//     ],
//     author: "Author Seven",
//     category: "Thời sự",
//     tags: ["Xã hội", "Môi trường"],
//     comments: 9,
//     status: "approved",
//     views: 220,
//     totalRating: 30,
//     ratingCount: 6,
//     cover: "https://via.placeholder.com/150",
//     date: "2024-08-07"
//   }
// ];

// const categories = {
//   "categories": [
//     {
//       "name": "Thời sự",
//       "tags": [
//         "Chính trị",
//         "Xã hội",
//         "Quốc tế",
//         "Giao thông",
//         "Môi trường"
//       ]
//     }
//   ]
// };

// const CategoryPage = () => {
//   const { idcate, idtag } = useParams();
//   const decodedCategory = decodeURIComponent(idcate);
//   const decodedTag = decodeURIComponent(idtag);

//   const category = categories.categories.find(cat => cat.name === decodedCategory);

//   if (!category) {
//     return <div>Category not found</div>;
//   }

//   return (
//     <div className="category-page">
//       <Navbar tags={category.tags} category={category.name} />
//       <Popular tag={decodedTag} />
//     </div>
//   );
// };

// const Navbar = ({ tags, category }) => {
//   return (
//     <nav className="navbar">
//       <ul className="navbar-list">
//         {tags.map((tag, index) => (
//           <li key={index} className="navbar-item">
//             <Link to={`/${category}/${tag}`} className="navbar-link">{tag}</Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// const Popular = ({ tag }) => {
//   // Lọc bài viết theo tag
//   const filteredArticles = articles.filter(article => article.tags.includes(tag));

//   const settings = {
//     className: "center",
//     centerMode: false,
//     dots: true,
//     infinite: true,
//     centerPadding: "0",
//     slidesToShow: 2,
//     speed: 500,
//     rows: 4,
//     slidesPerRow: 1,
//     responsive: [
//       {
//         breakpoint: 800,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           rows: 4,
//         },
//       },
//     ],
//   };

//   return (
//     <section className='popular'>
//       <div className='contentWrapper'>
//         <div className='contentMain'>
//           <Slider {...settings}>
//           {filteredArticles.length > 0 ? (
//   filteredArticles.map((val) => (
//     <div className='items' key={val.id}>
//       <div className='box shadow'>
//         <div className='images row'>
//           <div className='img'>
//             <img src={val.cover} alt='' />
//           </div>
//           <div className='category category1'>
//             {val.tags.length > 0 ? (
//               val.tags.map((tag, index) => (
//                 <span key={index} className='tag-item'>
//                   {tag}
//                   {index < val.tags.length - 1 && ', '}
//                 </span>
//               ))
//             ) : (
//               <span>No tags</span>
//             )}
//           </div>
//         </div>
//         <div className='text row'>
//           <Link to={`/SinglePage/${val.id}`}>
//             <h1 className='title'>{val.title.slice(0, 40)}...</h1>
//           </Link>
//           <div className='date'>
//             <i className='fas fa-calendar-days'></i>
//             <label>{val.date}</label>
//           </div>
//           <div className='comment'>
//             <i className='fas fa-comments'></i>
//             <label>{val.comments}</label>
//           </div>
//         </div>
//       </div>
//     </div>
//   ))
// ) : (
//   <div>No articles found for this tag.</div>
// )}

//           </Slider>
//         </div>
//         <aside className="sideContent">
//           <Side />
//         </aside>
//       </div>
//     </section>
//   );
// };

// export default CategoryPage;
