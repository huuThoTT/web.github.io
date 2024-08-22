// Publish.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Heading from "../../../Customer/common/heading/Heading";
import "./publish.css";

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
  // Thêm các bài viết khác nếu cần
];

const Publish = () => {
  const [articles, setArticles] = useState(popular || []);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setArticles(articles.filter(article => article._id !== id));
    console.log(`Article with id ${id} deleted`);
  };

  return (
    <>
      <section className='music'>
        <Heading title='Báo công khai của bạn' />
        <div className='content'>
          {articles.length > 0 ? (
            articles.map((val) => (
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

export default Publish;
