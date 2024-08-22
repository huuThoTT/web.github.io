import React from "react";
import { Link } from "react-router-dom";
import Heading from "../../common/heading/Heading";
import "./style.css";

// Dữ liệu mẫu về các tags với cover, tag và category
const discover = [
  {
    cover: 'https://example.com/tag1.jpg',
    tag: 'Chính trị',
    category: 'Thời sự'
  },
  {
    cover: 'https://example.com/tag2.jpg',
    tag: 'Sức khỏe',
    category: 'Sức khỏe'
  },
  {
    cover: 'https://example.com/tag3.jpg',
    tag: 'Khoa học',
    category: 'Khoa học'
  },
  {
    cover: 'https://example.com/tag4.jpg',
    tag: 'Chính trị',
    category: 'Chính trị'
  },
  {
    cover: 'https://example.com/tag5.jpg',
    tag: 'Nghệ thuật',
    category: 'Nghệ thuật'
  }
];

const Discover = () => {
  return (
    <>
      <section className='discover'>
        <div className='container'>
          <Heading title='Hot Tags' />
          <div className='content'>
            {discover.map((val, index) => {
              // Mã hóa các giá trị của category và tag
              const encodedCategory = encodeURIComponent(val.category);
              const encodedTag = encodeURIComponent(val.tag);
              return (
                <Link to={`/${encodedCategory}/${encodedTag}`} key={index} className='box'>
                  <div className='img'>
                    <img src={val.cover} alt={val.tag} />
                  </div>
                  <h1 className='title'>{val.tag}</h1>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Discover;
