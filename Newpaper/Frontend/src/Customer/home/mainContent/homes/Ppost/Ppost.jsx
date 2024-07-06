import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { ppost } from "../../../../../dummyData";
import Heading from "../../../../common/heading/Heading";
import "./ppost.css";

const Ppost = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <>
      <section className='popularPost'>
        <Heading title='Popular Posts' />
        <div className='content'>
          <Slider {...settings}>
            {ppost.map((val) => (
              <div className='items' key={val.id}>
                <div className='box shadow'>
                  <div className='images'>
                    <div className='img'>
                      <img src={val.cover} alt='' />
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

export default Ppost;
