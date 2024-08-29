import React, { useEffect, useState } from "react";
import { useParams,useLocation } from "react-router-dom";
import { Rate } from 'antd';
import Side from "../home/sideContent/side/Side";
import "../home/mainContent/homes/style.css";
import "./singlepage.css";
import "../home/sideContent/side/side.css";
import 'antd/dist/reset.css';
import Suggest from "./suggest/suggest";
import { useDispatch, useSelector } from "react-redux";
import { getComment, updateComment, deleteComment, getRating, updateRating, updateArticle } from "../../redux/apiRequest";

const SinglePage = () => {
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [visibleComments, setVisibleComments] = useState(5);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn về đầu trang
  }, [pathname]);
  const article = useSelector((state) => 
    Array.isArray(state.article?.getArticle?.articles) 
      ? state.article.getArticle.articles.find(a => a._id === id) 
      : null
  );

  const comments = useSelector((state) => 
    Array.isArray(state.comment?.getComment?.comments) 
      ? state.comment.getComment.comments.filter(c => c.articleId === id) 
      : []
  );

  const ratings = useSelector((state) => 
    Array.isArray(state.rating?.getRating?.ratings) 
      ? state.rating.getRating.ratings.filter(r => r.articleId === id) 
      : []
  );

  const userRating = useSelector((state) => {
    const rating = ratings.find(r => r.userId === user?._id);
    return rating ? rating.ratingCount : 0;
  });

  const [currentUserRating, setCurrentUserRating] = useState(userRating);
  const [averageRating, setAverageRating] = useState(article?.ratingCount > 0 ? article.totalRating / article.ratingCount : 0);
  useEffect(() => {
    getComment(dispatch);
    getRating(dispatch);
  }, [dispatch]);
  
  useEffect(() => {
    setCurrentUserRating(userRating);
  }, [userRating]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      const newCommentData = {
        content: newComment,
        user: user.username,
        userId: user._id,
        articleId: id,
      };
      await updateComment(dispatch, newCommentData);
      setNewComment("");
    }
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(dispatch, commentId);
  };

  const handleEditComment = async (commentId, updatedContent) => {
    const updatedComment = {
      _id: commentId,
      content: updatedContent,
      userId: user._id,
      articleId: id,
      user: user.username,
    };
    await updateComment(dispatch, updatedComment);
  };

  const loadMoreComments = () => {
    setVisibleComments((prevVisibleComments) => prevVisibleComments + 5);
  };

  const handleRatingChange = async (value) => {
    setCurrentUserRating(value);
  
    if (!user) {
      alert('You must be logged in to rate this article.');
      return;
    }
  
    const existingRating = ratings.find(r => r.userId === user._id);
  
    if (existingRating) {
      // Update existing rating
      const updatedRating = {
        ...existingRating,
        ratingCount: value,
      };
      await updateRating(dispatch, updatedRating);
    } else {
      // Create new rating
      const newRating = {
        ratingCount: value,
        articleId: id,
        userId: user._id,
      };
      await updateRating(dispatch, newRating);
    }
  
    // Calculate the updated total rating and rating count
    const totalRating = ratings.reduce((sum, r) => sum + r.ratingCount, 0) + (existingRating ? value - existingRating.ratingCount : value);
    const ratingCount = ratings.length + (existingRating ? 0 : 1);
  
    // Create a new article object with updated rating data
    const updatedArticle = {
      ...article,
      totalRating: totalRating,
      ratingCount: ratingCount,
    };
  
    // Update the article in Redux store
    await updateArticle(dispatch, updatedArticle);
  
    // Reflect the new average rating immediately in the UI
    const newAverageRating = ratingCount > 0 ? totalRating / ratingCount : 0;
    // Update local state if needed
    // Note: You might want to update your Redux store instead, depending on your app's structure
    setAverageRating(newAverageRating);
  };
  

  const getShareUrl = (platform) => {
    const currentUrl = window.location.href;
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(article.title);
    const encodedDescription = encodeURIComponent(article.content_blocks[0].content);

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
      {article ? (
        <main className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row">
            <section className="mainContent details md:w-2/3 p-4">
              <h1 className="title text-2xl font-bold mb-4">{article.title}</h1>

              <div className="author flex items-center mb-4">
                <span className="text-gray-600">by</span>
                <img src="https://i.pravatar.cc/150?img=10" alt="Random User" className="ml-2 w-8 h-8 rounded-full" />
                <p className="ml-2"> {article.author} on</p>
                <label className="ml-2 text-gray-600">{new Date(article.createdAt).toLocaleString()}</label>
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
                {article.content_blocks.map((block, index) => {
                  if (block.type === "paragraph") {
                    return <p key={index} className="my-4 text-justify leading-relaxed">{block.content}</p>;
                  } else if (block.type === "image") {
                    return (
                      <div key={index} className="image-block my-6 flex flex-col items-center">
                        {block.src && <img src={block.src} alt={block.alt} className="max-w-full rounded-lg shadow-md" />}
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

              <div className="rating-section mt-8">
                <h2 className="text-lg font-bold mb-2">Rating</h2>
                <Rate value={averageRating} disabled />
                <p className="mt-2 text-sm text-gray-600">
                  Average Rating: {averageRating.toFixed(1)} ({article.ratingCount} ratings)
                </p>
                <div className="mt-4">
                  <h3 className="text-lg font-bold mb-2">Rate this article</h3>
                  <Rate value={currentUserRating} onChange={handleRatingChange} />
                </div>
              </div>

              <section className="comments mt-8">
                <h2 className="text-lg font-bold mb-4">Comments</h2>
                {comments.length === 0 ? (
                  <p>No comments yet.</p>
                ) : (
                  comments.slice(0, visibleComments).map((comment) => (
                    <div key={comment._id} className="comment my-4 p-4 border-b border-gray-200">
                      <p className="font-bold">
                        {comment.userId === user._id ? `You: ${comment.user}` : comment.user}
                      </p>
                      <p className="text-gray-600">{new Date(comment.createdAt).toLocaleString()}</p>
                      <p className="mt-2">{comment.content}</p>
                
                      {comment.userId === user._id && (
                        <div className="mt-2 flex space-x-2">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => handleEditComment(comment._id, prompt("Edit your comment:", comment.content))}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteComment(comment._id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
                {comments.length > visibleComments && (
                  <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={loadMoreComments}>
                    Load more comments
                  </button>
                )}
              </section>

              <form onSubmit={addComment} className="comment-form mt-8">
                <h3 className="text-lg font-bold mb-2">Add a Comment</h3>
                <textarea
                  className="w-full h-32 p-2 border border-gray-300 rounded"
                  value={newComment}
                  onChange={handleCommentChange}
                />
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Add Comment
                </button>
              </form>
            </section>
            <section className="sideContent md:w-1/3 p-4">
              <Side />
            </section>
          </div>
          <section>
            <Suggest category={article.category} />
          </section>
        </main>
      ) : (
        <h1>Not Found</h1>
      )}
    </>
  );
};

export default SinglePage;

