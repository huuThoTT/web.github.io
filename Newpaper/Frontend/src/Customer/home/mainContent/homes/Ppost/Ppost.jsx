import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Heading from "../../../../common/heading/Heading";
import "./ppost.css";

// Sắp xếp dữ liệu theo thuộc tính views từ cao đến thấp
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
    category: "Thể thao" ,
    totalRating: 10,
    ratingCount: 5,
    views: 150, // Thêm thuộc tính views
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
    category: { name: "Sample Category 2" },
    totalRating: 20,
    ratingCount: 10,
    views: 250, // Thêm thuộc tính views
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
    category: { name: "Sample Category 3" },
    totalRating: 30,
    ratingCount: 15,
    views: 300, // Thêm thuộc tính views
    createdAt: "2024-08-19T00:00:00Z"
  }
];
const sortedPopular = popular.slice().sort((a, b) => b.views - a.views);

const Popular = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    rows: 1,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className='popular'>
        <Heading title='Phổ biến' />
        <div className='content'>
          <Slider {...settings}>
            {sortedPopular.map((val) => (
              <div className='items' key={val._id}>
                <div className='box shadow'>
                  <div className='images row'>
                    {/* Hiển thị hình ảnh từ content_blocks */}
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
                  <div className='text row'>
                    <Link to={`/SinglePage/${val._id}`}>
                      <h1 className='title'>{val.title.slice(0, 40)}...</h1>
                    </Link>
                    <div className='date'>
                      <i className='fas fa-calendar-days'></i>
                      <label>{new Date(val.createdAt).toLocaleDateString()}</label>
                    </div>
                    <div className='views'>
                      <i className='fas fa-eye'></i>
                      <label>{val.views} views</label>
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

export default Popular;
/*
import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Heading from "../../../../common/heading/Heading";
import "./ppost.css";

const Popular = () => {
  // Lấy dữ liệu bài viết từ Redux store
const articles = useSelector((state) => state.article.getArticle.articles);

  // Sắp xếp bài viết theo số lượt xem từ cao đến thấp
  const sortedPopular = articles.slice().sort((a, b) => b.views - a.views);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    rows: 1,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className='popular'>
        <Heading title='Phổ biến' />
        <div className='content'>
          <Slider {...settings}>
            {sortedPopular.map((val) => (
              <div className='items' key={val._id}>
                <div className='box shadow'>
                  <div className='images row'>
                    {val.content_blocks
                      .filter(block => block.type === 'image')
                      .map((block, index) => (
                        <div className='img' key={index}>
                          <img src={block.src} alt={block.alt} />
                        </div>
                    ))}
                    <div className='category category1'>
                      <span>{val.category.name || val.category}</span>
                    </div>
                  </div>
                  <div className='text row'>
                    <Link to={`/SinglePage/${val._id}`}>
                      <h1 className='title'>{val.title.slice(0, 40)}...</h1>
                    </Link>
                    <div className='date'>
                      <i className='fas fa-calendar-days'></i>
                      <label>{new Date(val.createdAt).toLocaleDateString()}</label>
                    </div>
                    <div className='views'>
                      <i className='fas fa-eye'></i>
                      <label>{val.views} views</label>
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

export default Popular;

*/