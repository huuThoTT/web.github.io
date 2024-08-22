import React, { useState } from "react";
import "./hero.css";
import Card from "./Card";

const Hero = () => {
  // Đảm bảo dữ liệu mẫu là một mảng
  const sampleData = [
    {
      _id: "sampleId123",
      title: "Sample Article Title",
      content_blocks: [
        { type: "paragraph", content: "This is a sample paragraph." },
        { type: "image", src: "https://via.placeholder.com/150", alt: "Sample Image" },
        { type: "quote", content: "This is a sample quote." }
      ],
      author: "Sample Author",
      category: { name: "Sample Category" },
      totalRating: 10,
      ratingCount: 5,
      createdAt: "2024-08-17T00:00:00Z"
    },
    {
      _id: "sampleId123",
      title: "Sample Article Title",
      content_blocks: [
        { type: "paragraph", content: "This is a sample paragraph." },
        { type: "image", src: "https://via.placeholder.com/150", alt: "Sample Image" },
        { type: "quote", content: "This is a sample quote." }
      ],
      author: "Sample Author",
      category: { name: "Sample Category" },
      totalRating: 10,
      ratingCount: 5,
      createdAt: "2024-08-17T00:00:00Z"
    },
    {
      _id: "sampleId123",
      title: "Sample Article Title",
      content_blocks: [
        { type: "paragraph", content: "This is a sample paragraph." },
        { type: "image", src: "https://via.placeholder.com/150", alt: "Sample Image" },
        { type: "quote", content: "This is a sample quote." }
      ],
      author: "Sample Author",
      category: { name: "Sample Category" },
      totalRating: 10,
      ratingCount: 5,
      createdAt: "2024-08-17T00:00:00Z"
    },
    {
      _id: "sampleId123",
      title: "Sample Article Title",
      content_blocks: [
        { type: "paragraph", content: "This is a sample paragraph." },
        { type: "image", src: "https://via.placeholder.com/150", alt: "Sample Image" },
        { type: "quote", content: "This is a sample quote." }
      ],
      author: "Sample Author",
      category: { name: "Sample Category" },
      totalRating: 10,
      ratingCount: 5,
      createdAt: "2024-08-17T00:00:00Z"
    }
  ];

  const [items, setItems] = useState(sampleData.slice(0, 4));

  return (
    <>
      <section className='hero'>
        <div className='container'>
          {items.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Hero;
