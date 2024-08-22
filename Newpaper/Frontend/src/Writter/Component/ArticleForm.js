import React, { useState } from 'react';
import './ArticleForm.css';

const ArticleForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [contentBlocks, setContentBlocks] = useState([]);
    const [premiereDate, setPremiereDate] = useState('');
    const categories = ['Technology', 'Health', 'Science', 'Politics'];
    const tags = {
        'Technology': ['AI', 'Blockchain', 'Cybersecurity'],
        'Health': ['Nutrition', 'Mental Health', 'Fitness'],
        'Science': ['Physics', 'Astronomy', 'Biology'],
        'Politics': ['Elections', 'Policy', 'Global Issues'],
    };

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

    const handleSaveDraft = () => {
        // Logic to save the draft (e.g., call an API to save the draft)
        console.log('Draft saved');
        window.location.reload();
        alert('Draft saved successfully!');
    };

    const handlePublish = () => {
        // Logic to publish the article (e.g., call an API to publish the article)
        console.log('Article published');
        window.location.reload();
        alert('Article published');
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
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>
            {category && (
                <select onChange={handleTagChange} className="input-tags">
                    <option value="">Select Tags</option>
                    {tags[category]?.map((tag) => (
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
                        <textarea
                            value={block.content}
                            onChange={(e) => {
                                const newBlocks = [...contentBlocks];
                                newBlocks[index].content = e.target.value;
                                setContentBlocks(newBlocks);
                            }}
                        />
                        <button onClick={() => handleDeleteContentBlock(index)} className="delete-button">
                            Xóa
                        </button>
                    </div>
                ))}
            </div>
            <button onClick={handleSaveDraft} className="save-draft-button">Save Draft</button>
            <button onClick={handlePublish} className="publish-button">Publish</button>
        </div>
    );
};

export default ArticleForm;
