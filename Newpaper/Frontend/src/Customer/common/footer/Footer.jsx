import React from "react";
import "./footer.css";


const Footer = () => {
const articles = [
    {
      title: "Giải vô địch bóng đá thế giới 2024",
      content_blocks: [
        {
          type: "paragraph",
          content: "Giải vô địch bóng đá thế giới 2024 sẽ được tổ chức tại Qatar...",
        },
        {
          type: "image",
          src: "https://example.com/image1.jpg",
          alt: "Bóng đá thế giới 2024"
        }
      ],
      author: "Nguyễn Văn A",
      category: "Thể thao",
      tags: ["605c72efc4f6a93b240d7b24", "605c72efc4f6a93b240d7b25"],
      Comment: [],
      status: "approved",
      Publish: true,
      views: 1200,
      totalRating: 4.5,
      ratingCount: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Kỹ thuật tập luyện cơ bắp hiệu quả",
      content_blocks: [
        {
          type: "paragraph",
          content: "Bài viết này sẽ hướng dẫn các bạn về kỹ thuật tập luyện cơ bắp để đạt hiệu quả cao nhất...",
        }
      ],
      author: "Trần Thị B",
      category: "Thể thao",
      tags: ["605c72efc4f6a93b240d7b24", "605c72efc4f6a93b240d7b26"],
      Comment: [],
      status: "approved",
      Publish: true,
      views: 800,
      totalRating: 4.0,
      ratingCount: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Khám phá vũ trụ với kính viễn vọng không gian",
      content_blocks: [
        {
          type: "paragraph",
          content: "Kính viễn vọng không gian đã mở ra những khám phá mới về vũ trụ...",
        },
        {
          type: "quote",
          content: "Vũ trụ còn rất nhiều điều bí ẩn đang chờ được khám phá.",
          src: "https://example.com/image2.jpg",
          alt: "Khám phá vũ trụ"
        }
      ],
      author: "Lê Minh C",
      category: "Khoa học",
      tags: ["605c72efc4f6a93b240d7b27", "605c72efc4f6a93b240d7b28"],
      Comment: [],
      status: "approved",
      Publish: true,
      views: 1500,
      totalRating: 4.8,
      ratingCount: 80,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Những bước tiến mới trong nghiên cứu gen",
      content_blocks: [
        {
          type: "paragraph",
          content: "Nghiên cứu gen đang có những bước tiến vượt bậc trong việc điều trị bệnh di truyền...",
        }
      ],
      author: "Phạm Thị D",
      category: "Khoa học",
      tags: ["605c72efc4f6a93b240d7b27", "605c72efc4f6a93b240d7b29"],
      Comment: [],
      status: "approved",
      Publish: true,
      views: 950,
      totalRating: 4.2,
      ratingCount: 60,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
  
  // Lọc bài báo theo danh mục
  const sportsArticles = articles.filter(article => article.category === "Thể thao");
  const scienceArticles = articles.filter(article => article.category === "Khoa học");
  const getTags = (articles) => {
    const tags = new Set();
    articles.forEach(article => {
      article.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  };

  const sportTags = getTags(sportsArticles);
  const scienceTags = getTags(scienceArticles);
  
  // Gộp tất cả tags
  const allTags = Array.from(new Set([...sportTags, ...scienceTags]));

  return (
    <>
      <footer>
        <div className='container'>
          <div className='box logo'>
            <img src='../images/Logo.png' alt='' />
            <p>NeP rất hoan nghên đọc giả gửi thông tin cho chúng tôi</p>
            <i className='fa fa-envelope'></i>
            <span> NeP_Group4@gmail.com </span> <br />
            <i className='fa fa-headphones'></i>
            <span> 1993992</span>
          </div>
          <div className='box'>
            <h3>Thể thao</h3>
            {sportsArticles.map((article, index) => (
              <div className='item' key={index}>
                {article.content_blocks[1]?.src && (
                  <img src={article.content_blocks[1].src} alt={article.content_blocks[1].alt || ''} />
                )}
                <p>{article.title}</p>
              </div>
            ))}
          </div>
          <div className='box'>
            <h3>Khoa học</h3>
            {scienceArticles.map((article, index) => (
              <div className='item' key={index}>
                {article.content_blocks[1]?.src && (
                  <img src={article.content_blocks[1].src} alt={article.content_blocks[1].alt || ''} />
                )}
                <p>{article.title}</p>
              </div>
            ))}
          </div>
          <div className='box'>
            <h3>Thẻ</h3>
            <ul>
              {allTags.map((tag, index) => (
                <li key={index}>
                  <span>{tag}</span> <label>(0)</label> {/* Số lượng bài viết cho mỗi tag có thể được cập nhật theo nhu cầu */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
      <div className='legal'>
        <div className='container flexSB'>
          <p>© all rights reserved</p>
        </div>
      </div>
    </>
  );
}

export default Footer;