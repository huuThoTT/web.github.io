import React, { useState } from "react";
import Slider from "react-slick";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Heading from "../common/heading/Heading";
import "./search.css";

// Dữ liệu mẫu
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
    category: { name: "fun" },
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
    category: { name: "fun" },
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
    category: { name: "sports" },
    totalRating: 30,
    ratingCount: 15,
    views: 300,
    createdAt: "2024-08-19T00:00:00Z"
  }
];


const Searchpage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState(queryParams.get("query") || "");

  const handleSearch = () => {
    // Cập nhật URL với từ khóa tìm kiếm mới
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

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
        <Heading title='Tìm kiếm' />
        <div className='search-container'>
  <input
    type='text'
    className='search-input'
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder='Nhập từ khóa tìm kiếm...'
  />
</div>
        <div className='content'>
          <Slider {...settings}>
            {popular
              .filter((val) =>
                val.title.toLowerCase().includes(searchQuery.toLowerCase())
              ) // Lọc theo searchQuery
              .map((val) => {
                return (
                  <div className='items' key={val._id}>
                    <div className='box shadow flexSB'>
                      <div className='images'>
                        {/* Hiển thị hình ảnh từ content_blocks */}
                        {val.content_blocks
                          .filter((block) => block.type === "image")
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
                          <Link to={`/SinglePage/${val._id}`}>
                            {val.title.slice(0, 40)}...
                          </Link>
                        </h1>
                        <div className='date'>
                          <i className='fas fa-calendar-days'></i>
                          <label>{new Date(val.createdAt).toLocaleDateString()}</label>
                        </div>
                        <p className='desc'>
                          {val.content_blocks.find(
                            (block) => block.type === "paragraph"
                          )?.content.slice(0, 250)}
                          ...
                        </p>
                        <div className='comment'>
                          <i className='fas fa-share'></i>
                          <label>Share / </label>
                          <i className='fas fa-comments'></i>
                          <label>{val.ratingCount}</label>
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

export default Searchpage;
