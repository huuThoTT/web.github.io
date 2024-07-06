import React from "react";
import "./side.css";
import "../Tpost/Tpost"
import Heading from "../../../common/heading/Heading";
import { Link } from "react-router-dom";
import Tpost from "../Tpost/Tpost";

const Side = () => {
  const categories = [
    {
      _id: "1",
      name: "Technology",
      description: "Articles about technology",
      listIdArticle: [
        { title: "Tech Article 1", description: "Description of Tech Article 1", author: "John Doe", date: "13/02/2021" },
        { title: "Tech Article 2", description: "Description of Tech Article 2", author: "Jane Smith", date: "13/02/2021" }
      ],
      date: "13/02/2021"
    },
    {
      _id: "2",
      name: "Health",
      description: "Articles about health",
      listIdArticle: [
        { title: "Health Article 1", description: "Description of Health Article 1", author: "Emily Johnson", date: "13/02/2021" },
        { title: "Health Article 2", description: "Description of Health Article 2", author: "Michael Brown", date: "13/02/2021" }
      ],
    },
  ];

  return (
    <>
      <section className="banner">
        <img src="https://adsngoaitroi.vn/wp-content/uploads/2021/05/quang-cao-ngoai-troi-an-tuong-660x330.jpg" alt="" />
      </section>

      <section className="catgorys">
       <Tpost/>
      </section>

      <Heading title="Subscribe" />

      <section className="subscribe">
        <h1 className="title">Subscribe to our New Stories</h1>
        <form action="">
          <input type="email" placeholder="Email Address..." />
          <button>
            <i className="fa fa-paper-plane"></i> SUBMIT
          </button>
        </form>
      </section>
    </>
  );
};

export default Side;
