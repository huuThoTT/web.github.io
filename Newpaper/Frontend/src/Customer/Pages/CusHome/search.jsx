import React, { useState } from "react";
import Slider from "react-slick";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Heading from "../common/heading/Heading";
import { useSelector } from "react-redux";
import "./search.css";

const Searchpage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState(queryParams.get("query") || "");

  // Lấy dữ liệu từ Redux store
  const articles = useSelector((state) => state.article?.getArticle?.articles) || [];

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
    rows: 10,
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
          <button onClick={handleSearch} className='search-button'>Tìm kiếm</button>
        </div>
        <div className='content'>
          <Slider {...settings}>
            {articles
              .filter((val) =>
                val.title.toLowerCase().includes(searchQuery.toLowerCase())
              ) // Lọc theo searchQuery
              .map((val) => {
                // Lấy ảnh đầu tiên từ content_blocks
                const firstImageBlock = Array.isArray(val.content_blocks)
                  ? val.content_blocks.find((block) => block.type === "image")
                  : null;

                return (
                  <div className='items' key={val._id}>
                    <div className='box shadow flexSB'>
                      <div className='images'>
                        {firstImageBlock && (
                          <div className='img'>
                            <img src={firstImageBlock.src} alt={firstImageBlock.alt || 'Article image'} />
                          </div>
                        )}
                        <div className='category category1'>
                          <span>{val.category?.name || 'No category'}</span>
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
                          {val.content_blocks.find((block) => block.type === "paragraph")?.content.slice(0, 250)}
                          ...
                        </p>
                        <div className='comment'>
                          <i className='fas fa-share'></i>
                          <label>Share / </label>
                          <i className='fas fa-comments'></i>
                          <label>{val.ratingCount || 0}</label>
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
