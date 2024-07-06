import React from "react";
import { Link } from "react-router-dom"; // Import Link
import Slider from "react-slick";
import Heading from "../../common/heading/Heading";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Suggest = ({ category }) => {
  const popular = [
    {
      id: 1,
      category: "world",
      title: "Our Favorite Photos From All Around",
      date: "19. February 2022",
      comments: 0,
      cover: "../images/popular/pop1.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    },
    {
      id: 2,
      category: "world",
      title: "Places To Visit For A Peaceful Holiday",
      date: "19. February 2022",
      comments: 0,
      cover: "../images/popular/pop2.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    },
    {
      id: 3,
      category: "world",
      title: "Is This The New Boxing Champion?",
      date: "19. February 2022",
      comments: 0,
      cover: "../images/popular/pop3.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    },
    {
      id: 4,
      category: "world",
      title: "A Detailed Retelling Of Our Trek Through The Dangerous Alps",
      date: "19. February 2022",
      comments: 0,
      cover: "../images/popular/pop4.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    },
    {
      id: 5,
      category: "world",
      title: "Natural Sunlight Boosts Your Immunity",
      date: "19. February 2022",
      comments: 0,
      cover: "../images/popular/pop5.jpg",
      desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    },
  ];

  // Lọc và chỉ lấy bài viết theo category
  const filteredPosts = popular.filter((post) => post.category === category);

  // Cấu hình của slider
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
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="popularPost life">
      <Heading title={`${category.charAt(0).toUpperCase() + category.slice(1)} Articles`} />
      <div className="content">
        {filteredPosts.length > 0 && (
          <Slider {...settings}>
            {filteredPosts.map((post) => (
              <div className="items" key={post.id}>
                <div className="box shadow">
                  <div className="images">
                    <div className="img">
                      <img src={post.cover} alt={post.title} />
                    </div>
                    <div className="category category1">
                      <span>{post.category}</span>
                    </div>
                  </div>
                  <div className="text">
                    <h1 className="title">
                      <Link to={`/SinglePage/${post.id}`}>{post.title.slice(0, 40)}...</Link>
                    </h1>
                    <div className="date">
                      <i className="fas fa-calendar-days"></i>
                      <label>{post.date}</label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default Suggest;
