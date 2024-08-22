import React from "react";
import { Link } from "react-router-dom";
import "./Popular.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Heading from "../../../common/heading/Heading";

// Dữ liệu mẫu với nhiều bài viết
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
    category: { name: "Sample Category 1" },
    totalRating: 10,
    ratingCount: 5,
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
    createdAt: "2024-08-19T00:00:00Z"
  },
  {
    _id: "sampleId126",
    title: "Sample Article Title 4",
    content_blocks: [
      { type: "paragraph", content: "This is a sample paragraph." },
      { type: "image", src: "https://via.placeholder.com/150", alt: "Sample Image" },
      { type: "quote", content: "This is a sample quote." }
    ],
    author: "Sample Author 4",
    category: { name: "Sample Category 4" },
    totalRating: 40,
    ratingCount: 20,
    createdAt: "2024-08-20T00:00:00Z"
  },
  {
    _id: "sampleId127",
    title: "Sample Article Title 5",
    content_blocks: [
      { type: "paragraph", content: "This is a sample paragraph." },
      { type: "image", src: "https://via.placeholder.com/150", alt: "Sample Image" },
      { type: "quote", content: "This is a sample quote." }
    ],
    author: "Sample Author 5",
    category: { name: "Sample Category 5" },
    totalRating: 50,
    ratingCount: 25,
    createdAt: "2024-08-21T00:00:00Z"
  },
  {
    _id: "sampleId128",
    title: "Sample Article Title 6",
    content_blocks: [
      { type: "paragraph", content: "This is a sample paragraph." },
      { type: "image", src: "https://via.placeholder.com/150", alt: "Sample Image" },
      { type: "quote", content: "This is a sample quote." }
    ],
    author: "Sample Author 6",
    category: { name: "Sample Category 6" },
    totalRating: 60,
    ratingCount: 30,
    createdAt: "2024-08-22T00:00:00Z"
  },
  // Thêm các bài viết mẫu khác nếu cần
];

const Popular = () => {
  const settings = {
    className: "center",
    centerMode: false,
    dots: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 2,
    speed: 500,
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

  // Chỉ lấy các phần tử từ chỉ số 4 đến hết mảng
  const filteredItems = popular.slice(4);

  return (
    <>
      <section className='popular'>
        <Heading title='Báo mới' />
        <div className='content'>
          <Slider {...settings}>
            {filteredItems.map((val) => {
              // Lấy thông tin hình ảnh từ content_blocks
              const coverImage = val.content_blocks.find(block => block.type === 'image')?.src || '';

              return (
                <div className='items' key={val._id}>
                  <div className='box shadow'>
                    <div className='images row'>
                      <div className='img'>
                        <img src={coverImage} alt={val.title} />
                      </div>
                      <div className='category category1'>
                        <span>{val.category.name}</span>
                      </div>
                    </div>
                    <div className='text row'>
                      <Link to={`/popular/${val._id}`}>
                        <h1 className='title'>{val.title.slice(0, 40)}...</h1>
                      </Link>
                      <div className='date'>
                        <i className='fas fa-calendar-days'></i>
                        <label>{new Date(val.createdAt).toLocaleDateString()}</label>
                      </div>
                      <div className='comment'>
                        <i className='fas fa-comments'></i>
                        <label>{val.ratingCount} comments</label>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Popular;
