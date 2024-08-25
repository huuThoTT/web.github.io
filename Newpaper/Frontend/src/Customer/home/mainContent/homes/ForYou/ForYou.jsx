import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Heading from "../../../../common/heading/Heading";
import "../Ppost/ppost.css";

// Dữ liệu mẫu đã được cập nhật
const popular = [
  {
    _id: "sampleId123",
    title: "Sample Article Title 1",
    content_blocks: [
      { type: "paragraph", content: "This is a sample paragraph." },
      { type: "image", src: "https://via.placeholder.com/150", alt: "Sample Image" },
      { type: "quote", content: "This is a sample quote." }
    ],
    author: "Sample Author 1",
    category: "Thể thao",
    totalRating: 10,
    ratingCount: 5,
    views: 150,
    createdAt: "2024-08-17T00:00:00Z"
  },
  {
    _id: "sampleId124",
    title: "Sample Article Title 2",
    content_blocks: [
      { type: "paragraph", content: "This is a sample paragraph." },
      { type: "image", src: "https://via.placeholder.com/150", alt: "Sample Image" },
      { type: "quote", content: "This is a sample quote." }
    ],
    author: "Sample Author 2",
    category: "Giải trí",
    totalRating: 20,
    ratingCount: 10,
    views: 250,
    createdAt: "2024-08-18T00:00:00Z"
  },
  {
    _id: "sampleId125",
    title: "Sample Article Title 3",
    content_blocks: [
      { type: "paragraph", content: "This is a sample paragraph." },
      { type: "image", src: "https://via.placeholder.com/150", alt: "Sample Image" },
      { type: "quote", content: "This is a sample quote." }
    ],
    author: "Sample Author 3",
    category: "Công nghệ",
    totalRating: 30,
    ratingCount: 15,
    views: 300,
    createdAt: "2024-08-19T00:00:00Z"
  }
];

// Giả sử danh mục yêu thích của người dùng được lấy từ thông tin tài khoản
const userFavoriteCategories = ["Giải trí", "Công nghệ"];

// Lọc các bài báo theo danh mục yêu thích của người dùng và sắp xếp theo số lượt xem từ cao đến thấp
const filteredAndSortedFavorites = popular
  .filter(item => userFavoriteCategories.includes(item.category))
  .sort((a, b) => b.views - a.views);

const ForYou = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className='popularPost life'>
        <Heading title='Dành cho bạn' />
        <div className='content'>
          <Slider {...settings}>
            {filteredAndSortedFavorites.map((val) => (
              <div className='items' key={val.id}>
                <div className='box shadow'>
                  <div className='images'>
                    <div className='img'>
                      {val.content_blocks
                        .filter(block => block.type === 'image')
                        .map((block, index) => (
                          <div className='img' key={index}>
                            <img src={block.src} alt={block.alt} />
                          </div>
                        ))}
                    </div>
                    <div className='category category1'>
                      <span>{val.category}</span>
                    </div>
                  </div>
                  <div className='text'>
                    <h1 className='title'>
                      <Link to={`/SinglePage/${val.id}`}>{val.title.slice(0, 40)}...</Link>
                    </h1>
                    <div className='date'>
                      <i className='fas fa-calendar-days'></i>
                      <label>{val.date}</label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default ForYou;

/*
import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Heading from "../../../../common/heading/Heading";
import "../Ppost/ppost.css";

const ForYou = () => {
  // Lấy dữ liệu bài viết và danh mục yêu thích từ Redux store
 const user = useSelector((state) => state.auth.login.currentUser);

// Extract favorite categories from the user's preferences
const userFavoriteCategories = user?.preferences?.categories?.map(pref => pref.category.toString()) || [];

// Filter articles based on the user's favorite categories and sort by views
const filteredAndSortedFavorites = articles
  .filter(article => userFavoriteCategories.includes(article.category.toString())) // Ensure category comparison consistency
  .sort((a, b) => b.views - a.views);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className='popularPost life'>
        <Heading title='Dành cho bạn' />
        <div className='content'>
          <Slider {...settings}>
            {filteredAndSortedFavorites.length > 0 ? (
              filteredAndSortedFavorites.map((val) => (
                <div className='items' key={val._id}>
                  <div className='box shadow'>
                    <div className='images'>
                      <div className='img'>
                        {val.content_blocks
                          .filter(block => block.type === 'image')
                          .map((block, index) => (
                            <div className='img' key={index}>
                              <img src={block.src} alt={block.alt} />
                            </div>
                          ))}
                      </div>
                      <div className='category category1'>
                        <span>{val.category}</span>
                      </div>
                    </div>
                    <div className='text'>
                      <h1 className='title'>
                        <Link to={`/SinglePage/${val._id}`}>
                          {val.title.slice(0, 40)}...
                        </Link>
                      </h1>
                      <div className='date'>
                        <i className='fas fa-calendar-days'></i>
                        <label>{new Date(val.createdAt).toLocaleDateString()}</label>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Không có bài báo nào cho danh mục yêu thích của bạn.</p>
            )}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default ForYou;

*/