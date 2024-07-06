import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rate } from 'antd'; // Import Rate from antd
import Side from "../home/sideContent/side/Side";
import "../home/mainContent/homes/style.css";
import "./singlepage.css";
import "../home/sideContent/side/side.css";
import 'antd/dist/reset.css';
import Suggest from "./suggest/suggest";

const SinglePage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [visibleComments, setVisibleComments] = useState(5); // Number of comments to show initially
  const [totalRating, setTotalRating] = useState(0); // Total rating score
  const [ratingCount, setRatingCount] = useState(0); // Number of ratings
  const [userRating, setUserRating] = useState(0); // User's current rating

  const hero = [
    {
      id: 1,
      title: "Sample Article",
      authorImg: "author_image_url",
      authorName: "Author Name",
      categories: "world",
      time: "2024-07-01",
      content_blocks: [
        { type: "paragraph", content: "This is the first paragraph of the article." },
        { type: "image", src: "https://baccara-tokyo.com/wp-content/uploads/2021/04/Eimi-Fukada.2-769x1024.png", alt: "Image caption 1" },
        { type: "paragraph", content: "This is the second paragraph of the article." },
        { type: "image", src: "https://baccara-tokyo.com/wp-content/uploads/2021/04/Eimi-Fukada.2-769x1024.png", alt: "Image caption 2" },
        { type: "paragraph", content: "This is the third paragraph of the article." },
        { type: "quote", content: "This is a quote from the article." }
      ],
      totalRating: 25, // Example total rating
      ratingCount: 5 // Example rating count
    }
    ,
    {
      id: 2,
      title: "Sample Article",
      authorImg: "author_image_url",
      authorName: "Author Name",
      categories: "world",
      time: "2024-07-01",
      content_blocks: [
        { type: "paragraph", content: "This is the first paragrapAh of the article." },
        { type: "image", src: "", alt: "Image caption 1" },
        { type: "paragraph", content: "This is the second paragraph of the article." },
        { type: "image", src: "", alt: "Image caption 2" },
        { type: "paragraph", content: "This is the third paragraph of the article." },
        { type: "quote", content: "This is a quote from the article." }
      ],
      totalRating: 25, // Example total rating
      ratingCount: 5 // Example rating count
    }
    // Add more articles if needed
  ];

  const sampleComments = [
    { id: 1, content: "Great article!", user: "Alice", time: "2024-07-01 10:00 AM" },
    { id: 2, content: "I enjoyed reading this.", user: "Bob", time: "2024-07-01 11:30 AM" },
    { id: 3, content: "Looking forward to more content like this.", user: "Eve", time: "2024-07-01 2:00 PM" },
    // Add more sample comments if needed
  ];

  useEffect(() => {
    const item = hero.find((item) => item.id === parseInt(id));
    window.scrollTo(0, 0);
    if (item) {
      setItem(item);
      setComments(sampleComments);
      setTotalRating(item.totalRating);
      setRatingCount(item.ratingCount);
    }
  }, [id]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const addComment = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      const comment = {
        id: comments.length + 1,
        content: newComment,
        user: "Anonymous",
        time: new Date().toLocaleString()
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  const loadMoreComments = () => {
    setVisibleComments((prevVisibleComments) => prevVisibleComments + 5);
  };

  const handleRatingChange = (value) => {
    setUserRating(value);
    setTotalRating((prevTotal) => prevTotal + value);
    setRatingCount((prevCount) => prevCount + 1);
  };

  const averageRating = ratingCount > 0 ? totalRating / ratingCount : 0;

  const getShareUrl = (platform) => {
    const currentUrl = window.location.href;
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(item.title);
    const encodedDescription = encodeURIComponent(item.content_blocks[0].content);

    switch (platform) {
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      case 'twitter':
        return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
      case 'instagram':
        return `https://www.instagram.com/?url=${encodedUrl}`;
      default:
        return '#';
    }
  };

  return (
    <>
      {item ? (
        <main className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row">
            <section className="mainContent details md:w-2/3 p-4">
              <h1 className="title text-2xl font-bold mb-4">{item.title}</h1>

              <div className="author flex items-center mb-4">
                <span className="text-gray-600">by</span>
                <img src={item.authorImg} alt={item.authorName} className="ml-2 w-8 h-8 rounded-full" />
                <p className="ml-2"> {item.authorName} on</p>
                <label className="ml-2 text-gray-600">{item.time}</label>
              </div>

              <div className='social'>
                <div className='socBox' onClick={() => window.open(getShareUrl('facebook'), '_blank')}>
                  <i className='fab fa-facebook-f'></i>
                  <span>SHARE</span>
                </div>
                <div className='socBox' onClick={() => window.open(getShareUrl('twitter'), '_blank')}>
                  <i className='fab fa-twitter'></i>
                  <span>SHARE</span>
                </div>
                <div className='socBox' onClick={() => window.open(getShareUrl('instagram'), '_blank')}>
                  <i className='fab fa-instagram'></i>
                  <span>SHARE</span>
                </div>
              </div>

              <div className="content">
                {item.content_blocks.map((block, index) => {
                  if (block.type === "paragraph") {
                    return <p key={index} className="my-4 text-justify leading-relaxed">{block.content}</p>;
                  } else if (block.type === "image") {
                    return (
                      <div key={index} className="image-block my-6 flex flex-col items-center">
                        <img src={block.src} alt={block.alt} className="max-w-full rounded-lg shadow-md" />
                        <div className="caption mt-2 text-sm text-gray-600">{block.alt}</div>
                      </div>
                    );
                  } else if (block.type === "quote") {
                    return (
                      <div key={index} className="quote my-4 border-l-4 border-gray-300 pl-4 italic text-gray-700">
                        <i className="fa fa-quote-left"></i>
                        <p className="ml-2">{block.content}</p>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>

              {/* Rating Section */}
              <div className="rating-section mt-8">
                <h2 className="text-lg font-bold mb-2">Rating</h2>
                <Rate value={averageRating} disabled />
                <p className="mt-2 text-sm text-gray-600">
                  Average Rating: {averageRating.toFixed(1)} ({ratingCount} ratings)
                </p>
                <div className="mt-4">
                  <h3 className="text-lg font-bold mb-2">Rate this article</h3>
                  <Rate value={userRating} onChange={handleRatingChange} />
                </div>
              </div>

              <section className="comments mt-8">
                <h2 className="text-lg font-bold mb-4">Comments</h2>
                {comments.length === 0 ? (
                  <p>No comments yet.</p>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {comments.slice(0, visibleComments).map((comment) => (
                      <li key={comment.id} className="py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src="/avatar.jpg" alt="" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{comment.user}</p>
                            <p className="text-sm text-gray-500">{comment.time}</p>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-700">{comment.content}</p>
                      </li>
                    ))}
                  </ul>
                )}
                {visibleComments < comments.length && (
                  <button
                    onClick={loadMoreComments}
                    className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    Load More Comments
                  </button>
                )}

                <form onSubmit={addComment} className="mt-4">
                  <div className="shadow-sm rounded-lg">
                    <textarea
                      className="w-full p-4 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      rows="3"
                      placeholder="Add your comment..."
                      value={newComment}
                      onChange={handleCommentChange}
                      required
                    ></textarea>
                  </div>
                  <div className="mt-3">
                    <button
                      type="submit"
                      className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                      Post Comment
                    </button>
                  </div>
                </form>
              </section>
            </section>

            <section className="sideContent md:w-1/3 p-4">
              <Side />
            </section>
          </div>
          <section>
            <Suggest category={item.categories} />
          </section>
        </main>
      ) : (
        <h1>Not Found</h1>
      )}
    </>
  );
};

export default SinglePage;
