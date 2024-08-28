// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom'; // Import useLocation
// import './ArticleForm.css';

// const ArticleForm = () => {
//     const location = useLocation(); // Sử dụng useLocation để lấy dữ liệu từ state
//     const [title, setTitle] = useState('');
//     const [author, setAuthor] = useState('');
//     const [category, setCategory] = useState('');
//     const [selectedTags, setSelectedTags] = useState([]);
//     const [contentBlocks, setContentBlocks] = useState([]);
    
//     const categories = ['Technology', 'Health', 'Science', 'Politics'];
//     const tags = {
//         'Technology': ['AI', 'Blockchain', 'Cybersecurity'],
//         'Health': ['Nutrition', 'Mental Health', 'Fitness'],
//         'Science': ['Physics', 'Astronomy', 'Biology'],
//         'Politics': ['Elections', 'Policy', 'Global Issues'],
//     };

//     useEffect(() => {
//         if (location.state && location.state.article) {
//             const { title, author, category, selectedTags, content_blocks } = location.state.article;
//             setTitle(title || '');
//             setAuthor(author || '');
//             setCategory(category || '');
//             setSelectedTags(selectedTags || []);
//             setContentBlocks(content_blocks || []);
//         }
//     }, [location.state]);

//     const handleCategoryChange = (e) => {
//         setCategory(e.target.value);
//         setSelectedTags([]);
//     };

//     const handleTagChange = (e) => {
//         const tag = e.target.value;
//         if (!selectedTags.includes(tag)) {
//             setSelectedTags([...selectedTags, tag]);
//         }
//     };

//     const handleContentTypeChange = (type) => {
//         setContentBlocks([...contentBlocks, { type, content: '' }]);
//     };

//     const handleDeleteContentBlock = (index) => {
//         const newBlocks = contentBlocks.filter((_, i) => i !== index);
//         setContentBlocks(newBlocks);
//     };

//     const handleSaveDraft = () => {
//         // Logic to save the draft (e.g., call an API to save the draft)
//         console.log('Draft saved');
//         alert('Draft saved successfully!');
//     };

//     const handlePublish = () => {
//         // Logic to publish the article (e.g., call an API to publish the article)
//         console.log('Article published');
//         alert('Article published');
//     };

//     return (
//         <div className="article-form">
//             <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Article Title"
//                 className="input-title"
//             />
//             <input
//                 type="text"
//                 value={author}
//                 onChange={(e) => setAuthor(e.target.value)}
//                 placeholder="Author"
//                 className="input-author"
//             />
//             <select value={category} onChange={handleCategoryChange} className="input-category">
//                 <option value="">Select Category</option>
//                 {categories.map((cat) => (
//                     <option key={cat} value={cat}>
//                         {cat}
//                     </option>
//                 ))}
//             </select>
//             {category && (
//                 <select onChange={handleTagChange} className="input-tags">
//                     <option value="">Select Tags</option>
//                     {(tags[category] || []).map((tag) => (
//                         <option key={tag} value={tag}>
//                             {tag}
//                         </option>
//                     ))}
//                 </select>
//             )}
//             <div className="selected-tags">
//                 {(selectedTags || []).map((tag) => (
//                     <span key={tag} className="tag">
//                         {tag}
//                     </span>
//                 ))}
//             </div>
//             <div className="content-type-options">
//                 <button onClick={() => handleContentTypeChange('paragraph')}>Paragraph</button>
//                 <button onClick={() => handleContentTypeChange('image')}>Image</button>
//                 <button onClick={() => handleContentTypeChange('quote')}>Quote</button>
//             </div>
//             <div className="content-blocks">
//                 {(contentBlocks || []).map((block, index) => (
//                     <div key={index} className="content-block">
//                         <label>{block.type}:</label>
//                         {block.type === 'image' ? (
//                             <input
//                                 type="text"
//                                 value={block.content}
//                                 onChange={(e) => {
//                                     const newBlocks = [...contentBlocks];
//                                     newBlocks[index].content = e.target.value;
//                                     setContentBlocks(newBlocks);
//                                 }}
//                                 placeholder="Image URL"
//                             />
//                         ) : (
//                             <textarea
//                                 value={block.content}
//                                 onChange={(e) => {
//                                     const newBlocks = [...contentBlocks];
//                                     newBlocks[index].content = e.target.value;
//                                     setContentBlocks(newBlocks);
//                                 }}
//                             />
//                         )}
//                         <button onClick={() => handleDeleteContentBlock(index)} className="delete-button">
//                             Xóa
//                         </button>
//                     </div>
//                 ))}
//             </div>
//             <button onClick={handleSaveDraft} className="save-draft-button">Save Draft</button>
//             <button onClick={handlePublish} className="publish-button">Publish</button>
//         </div>
//     );
// };

// export default ArticleForm;
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { updateArticle, updateUser } from '../../redux/apiRequest';
import { updateBookmarkedArticles } from '../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import './ArticleForm.css';

const ArticleForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [contentBlocks, setContentBlocks] = useState([]);

    const categories = useSelector((state) => state.category?.getCategory?.categories) || [];
    const user = useSelector((state) => state.auth?.login?.currentUser);

    useEffect(() => {
        if (location.state && location.state.article) {
            const { title, author, category, selectedTags, content_blocks } = location.state.article;
            setTitle(title || '');
            setAuthor(author || '');
            setCategory(category || '');
            setSelectedTags(selectedTags || []);
            setContentBlocks(content_blocks || []);
        }
    }, [location.state]);

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setSelectedTags([]);
    };

    const handleTagChange = (e) => {
        const tag = e.target.value;
        if (!selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleContentTypeChange = (type) => {
        setContentBlocks([...contentBlocks, { type, content: '' }]);
    };

    const handleDeleteContentBlock = (index) => {
        const newBlocks = contentBlocks.filter((_, i) => i !== index);
        setContentBlocks(newBlocks);
    };

    const handleSave = (isPublished) => {
        const article = {
            title,
            author,
            category,
            tags: selectedTags,
            content_blocks: contentBlocks,
            published: isPublished
        };
        updateArticle(dispatch, article);
        navigate('/writer');  // Chuyển hướng sau khi lưu
    };

    const handleSaveDraft = () => {
        handleSave(false);
    };

    const handlePublish = () => {
        handleSave(true);
    };

    // Hàm để cập nhật bookmarkedArticles
    const handleBookmark = (articleId) => {
        const updatedUser = {
            ...user,
            bookmarkedArticles: [...user.bookmarkedArticles, articleId],
        };
        updateUser(dispatch, updatedUser);
        if (user && user.bookmarkedArticles) {
            if (!user.bookmarkedArticles.includes(articleId)) {
                dispatch(updateBookmarkedArticles([articleId]));
            } else {
                console.log("This article is already bookmarked.");
            }
        } else {
            console.error("User or bookmarkedArticles not found");
        }
    };

    return (
        <div className="article-form">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Article Title"
                className="input-title"
            />
            <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
                className="input-author"
            />
            <select value={category} onChange={handleCategoryChange} className="input-category">
                <option value="">Select Category</option>
                {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                        {cat.name}
                    </option>
                ))}
            </select>
            {category && (
                <select onChange={handleTagChange} className="input-tags">
                    <option value="">Select Tags</option>
                    {categories.find(cat => cat.name === category)?.tags.map((tag) => (
                        <option key={tag} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>
            )}
            <div className="selected-tags">
                {selectedTags.map((tag) => (
                    <span key={tag} className="tag">
                        {tag}
                    </span>
                ))}
            </div>
            <div className="content-type-options">
                <button onClick={() => handleContentTypeChange('paragraph')}>Paragraph</button>
                <button onClick={() => handleContentTypeChange('image')}>Image</button>
                <button onClick={() => handleContentTypeChange('quote')}>Quote</button>
            </div>
            <div className="content-blocks">
                {contentBlocks.map((block, index) => (
                    <div key={index} className="content-block">
                        <label>{block.type}:</label>
                        {block.type === 'image' ? (
                            <input
                                type="text"
                                value={block.content}
                                onChange={(e) => {
                                    const newBlocks = [...contentBlocks];
                                    newBlocks[index].content = e.target.value;
                                    setContentBlocks(newBlocks);
                                }}
                                placeholder="Image URL"
                            />
                        ) : (
                            <textarea
                                value={block.content}
                                onChange={(e) => {
                                    const newBlocks = [...contentBlocks];
                                    newBlocks[index].content = e.target.value;
                                    setContentBlocks(newBlocks);
                                }}
                            />
                        )}
                        <button onClick={() => handleDeleteContentBlock(index)} className="delete-button">
                            Xóa
                        </button>
                    </div>
                ))}
            </div>
            <button onClick={handleSaveDraft} className="save-draft-button">Save Draft</button>
            <button onClick={handlePublish} className="publish-button">Publish</button>
            <button onClick={() => handleBookmark(location.state.article._id)} className="bookmark-button">Bookmark</button>
        </div>
    );
};

export default ArticleForm;
