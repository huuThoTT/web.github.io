import React, { useState } from "react";
import "./side.css";
import axios from "axios";
import Heading from "../../common/heading/Heading";

const Side = () => {
  const user = {
    _id: "64e555fbf4a3a2b0b2d9f80c", // MongoDB ObjectId
    username: "johndoe",
    email: "johndoe@example.com",
    password: "$2b$10$zZGxlKzXj9aV7e0vE9RDEO4VsaVtBX2m.Z/N.ZP5.8vflWk0.EGZe", // Mã hóa bcrypt
    isAdmin: false,
    socialAccounts: {
      facebook: "https://facebook.com/johndoe",
      google: "https://plus.google.com/johndoe",
      phoneNumber: "+123456789"
    },
    preferences: {
      categories: [
        {
          category: "64e555fbf4a3a2b0b2d9f812", // ObjectId của category
          tags: ["news", "tech", "science"]
        }
      ]
    },
    Subscribe: true, // Người dùng đã đăng ký nhận tin tức
    notificationsEnabled: true,
    bookmarkedArticles: [
      "64e555fbf4a3a2b0b2d9f823", // ObjectId của bài báo đã bookmark
      "64e555fbf4a3a2b0b2d9f824"
    ],
    adFreeSubscription: false, // Người dùng không có gói ad-free
    createdAt: "2024-08-23T07:45:27.929Z",
    updatedAt: "2024-08-23T07:45:27.929Z"
  };
  const [subscribed, setSubscribed] = useState(user.Subscribe);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/subscribe", {
        userId: user._id, // Sử dụng userId từ biến user
      });

      if (response.status === 200) {
        setSubscribed(response.data.Subscribe);
        alert(`Subscription ${response.data.Subscribe ? "enabled" : "disabled"}!`);
      }
    } catch (error) {
      console.error("There was an error updating subscription:", error);
      alert("Failed to update subscription. Please try again.");
    }
  };

  return (
    <>
     <Heading title="Subscribe" />
      <section className="subscribe">
        <h1 className="title">Đăng ký để nhận thông báo về các bài báo mới nhất</h1>
        <button onClick={handleSubscribe}>
          <i className="fa fa-paper-plane"></i> ĐĂNG KÝ
        </button>
      </section>
      <section className="banner banner1">
        <img src="https://adsngoaitroi.vn/wp-content/uploads/2021/05/quang-cao-ngoai-troi-an-tuong-660x330.jpg" alt="Banner 1" />
      </section>
      <section className="banner ">
        <img src="https://thietkemyb.com.vn/wp-content/uploads/2022/10/image5-1.jpg" alt="Banner 2" />
      </section>
      <section className="banner banner3">
        <img src="https://cdn.brvn.vn/editor_news/2013/10/Billboard1-ID2887.jpg" alt="Banner 3" />
      </section>
      <section className="banner banner4">
        <img src="https://trangtridothi.com.vn/Data/upload/images/Bi%E1%BB%83n%20b%E1%BA%A3ng%20qu%E1%BA%A3ng%20c%C3%A1o/bien%20quang%20cao%20bia4.jpg" alt="Banner 4" />
      </section>
      <section className="banner banner5">
        <img src="https://greenway.com.vn/wp-content/uploads/2018/08/chien-dich-quang-cao-milo-nang-dong-viet-nam.jpg" alt="Banner 5" />
      </section>
    </>
  );
};

export default Side;
