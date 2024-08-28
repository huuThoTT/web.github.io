import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hero from "./hero/Hero";
import Homes from "./mainContent/homes/Home";
import Discover from "./discover/Discover";
import { getArticle } from "../../redux/apiRequest";
import "./Homepages.css"; // Nhớ import file CSS của bạn

const Homepages = () => {
  const dispatch = useDispatch();
  
  // Lấy trạng thái từ redux store
  const { loading, error } = useSelector((state) => state.article.getArticle);

  useEffect(() => {
    getArticle(dispatch);
  }, [dispatch]);

  // Hiệu ứng loading
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Hiệu ứng error
  if (error) {
    return (
      <div className="error-message">
        Error fetching data. Please try again!
      </div>
    );
  }

  return (
    <>
      <Hero />
      <Homes />
      <Discover />
    </>
  );
};

export default Homepages;
