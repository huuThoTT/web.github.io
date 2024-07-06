import React from "react";
import { Link } from "react-router-dom"; // Import Link
import { tpost } from "../../../../dummyData";
import Heading from "../../../common/heading/Heading";
import "./tpost.css";

const Tpost = () => {
  return (
    <>
      <section className="tpost">
        <Heading title="GenZ" />
        {tpost.map((val) => {
          return (
            <div className="box flexSB" key={val.id}>
              <div className="img">
                <img src={val.cover} alt={val.title} />
              </div>
              <div className="text">
                <h1 className="title">
                  <Link to={`/SinglePage/${val.id}`}>{val.title.slice(0, 35)}...</Link>
                </h1>
                <span>a year ago</span>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Tpost;
