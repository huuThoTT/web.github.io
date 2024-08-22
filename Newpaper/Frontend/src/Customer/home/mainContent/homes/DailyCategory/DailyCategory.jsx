import React, { useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Heading from "../../../../common/heading/Heading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DailyCategory.css";

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
    category: { name: "Sample Category 1" },
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
    category: { name: "Sample Category 2" },
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
    category: { name: "Sample Category 3" },
    totalRating: 30,
    ratingCount: 15,
    views: 300,
    createdAt: "2024-08-19T00:00:00Z"
  }
];

const DailyCategory = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Lọc dữ liệu theo ngày
  const filteredArticles = popular.filter((article) => {
    const articleDate = new Date(article.createdAt).toLocaleDateString();
    return articleDate === selectedDate.toLocaleDateString();
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <section className='dailyCategory'>
        <Heading title='Danh mục theo ngày' />
        <div className='date-picker'>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            className="date-picker-input"
          />
        </div>
        <div className='content'>
          {filteredArticles.length > 0 ? (
            <Slider {...settings}>
              {filteredArticles.map((val) => (
                <div className='items' key={val._id}>
                  <div className='box shadow'>
                    <div className='images'>
                      {val.content_blocks.map((block, index) =>
                        block.type === "image" ? (
                          <div className='img' key={index}>
                            <img src={block.src} alt={block.alt} />
                          </div>
                        ) : null
                      )}
                    </div>
                    <div className='text'>
                      <Link to={`/SinglePage/${val._id}`}>
                        <h1 className='title'>{val.title.slice(0, 40)}...</h1>
                      </Link>
                      <div className='date'>
                        <i className='fas fa-calendar-days'></i>
                        <label>{new Date(val.createdAt).toLocaleDateString()}</label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p>Không có bài báo nào cho ngày đã chọn.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default DailyCategory;
