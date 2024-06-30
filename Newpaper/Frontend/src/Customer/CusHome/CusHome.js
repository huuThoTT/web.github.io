import * as React from "react";

const NewsItem = ({ imageSrc, title, url, author, publish_time }) => (
  <article className="flex gap-5 max-md:flex-col max-md:gap-0">
    <div className="flex flex-col w-[34%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow justify-center items-start max-md:mt-2">
        <img loading="lazy" src={imageSrc} alt={title} className="w-full aspect-[1.64]" />
      </div>
    </div>
    <div className="flex flex-col ml-5 w-[66%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow px-5 mt-3.5 text-2xl font-medium text-black max-md:mt-5 max-md:max-w-full">
        <a 
        className="max-md:max-w-full"
        href={url}
        target= "_blank"
        rel= "noopener noreferrer"
        >
          <h2>{title}</h2>
        </a>
        <div className="flex gap-5 self-start mt-20 max-md:mt-10 max-md:ml-1">
          <h1>{author}</h1>
         <time>{publish_time}</time>
        </div>
      </div>
    </div>
  </article>
);

function MyComponent() {
  const newsItems = [
    {
      imageSrc: "https://vcdn1-kinhdoanh.vnecdn.net/2024/06/13/nganhangbanvang33JPG-171825734-2233-9344-1718257496.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=h0D8npEGtQKwic8DZ3mQXw",
      title: "Agribank bán vàng trực tuyến từ tuần sau",
      url: "https://vnexpress.net/gia-vang-moi-nhat-hom-nay-13-6-4757870.html",
      author: "Minh Sơn",
      publish_time: "Thứ năm, 13/6/2024, 13:16 (GMT+7)",
    },
    {
      imageSrc: "https://vcdn1-thethao.vnecdn.net/2024/06/13/huynh-nhu-lank-fc-2024-jpeg-17-4192-5997-1718257157.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=DpmLnfX_0LScVyT2wZ3-Ag",
      title: "Huỳnh Như sở hữu bàn thắng đẹp bậc nhất giải Bồ Đào Nha",
      url: "https://vnexpress.net/huynh-nhu-so-huu-ban-thang-dep-bac-nhat-giai-bo-dao-nha-4757867.html",
      author: "Hiếu Lương",
      publish_time: "Thứ năm, 13/6/2024, 13:52 (GMT+7)",
    },
    {
      imageSrc: "https://vcdn1-vnexpress.vnecdn.net/2024/06/13/69e74940-3480-4901-9675-4b7ce4-7686-5055-1718261262.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=PN738QadhGX_Qov0lMeU3A",
      title: "Hà Nội công bố đáp án 7 môn thi lớp 10",
      url: "https://vnexpress.net/de-thi-dap-an-lop-10-ha-noi-nam-2023-cua-so-giao-duc-va-dao-tao-4756837.html",
      author: "Thanh Hằng",
      publish_time: "Thứ năm, 13/6/2024, 13:55 (GMT+7)",
    },
    {
      imageSrc: "https://vcdn1-vnexpress.vnecdn.net/2024/06/13/benh-vien-thu-duc-1-jpg-5184-1-9985-9293-1718262540.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=XGdnmRPhPH8tFrqV1Wh2BQ",
      title: "Cựu giám đốc Bệnh viện Thủ Đức: 'Sai vì lượng bệnh nhân Covid rất lớn'",
      url: "https://vnexpress.net/cuu-giam-doc-benh-vien-thu-duc-sai-vi-luong-benh-nhan-covid-rat-lon-4757657.html",
      author: "Hải Duyên - Trọng Nghĩa",
      publish_time: "Thứ năm, 13/6/2024, 09:28 (GMT+7)"
     },
     {
      imageSrc: "https://vcdn1-vnexpress.vnecdn.net/2024/06/13/phmnhnbtrn-1718247093-6584-171-4241-5087-1718249021.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=36QXQWZIajRd4tq9y5Yp9w",
      title: "Nữ phạm nhân trốn trại giam bị bắt",
      url: "https://vnexpress.net/nu-pham-nhan-vuot-nguc-bi-bat-4757719.html",
      author: "Đức Hùng",
      publish_time: "Thứ năm, 13/6/2024, 09:44 (GMT+7)"
     },
     {
      imageSrc: "https://i1-vnexpress.vnecdn.net/2024/06/13/z5533983419428-cf466f3ad6fdb69-2582-5357-1718251639.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=uNo7MQTysUBeOnawQ0YtjQ",
      title: "Thủy triều đỏ xuất hiện ở biển Phú Quốc",
      url: "https://vnexpress.net/thuy-trieu-do-xuat-hien-o-bien-phu-quoc-4757814.html",
      author: "Ngọc Tài",
      publish_time: "Thứ năm, 13/6/2024, 11:23 (GMT+7)"
     },
     {     
      imageSrc: "https://i1-vnexpress.vnecdn.net/2024/06/13/233a9523-1718252223-5989-1718252996.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=QkJbWEX8JOX_OsCgQZNPhQ",
      title: "TP HCM chấp nhận đáp án khác cho đề Tiếng Anh lớp 10",
      url: "https://vnexpress.net/tp-hcm-chap-nhan-dap-an-khac-cho-de-tieng-anh-lop-10-4757804.html",
      author: "Lệ Nguyễn",
      publish_time: "Thứ năm, 13/6/2024, 12:04 (GMT+7)"   
     },
     {      
      imageSrc: "https://i1-vnexpress.vnecdn.net/2024/06/13/2c6dc62352593075d6482e41459804-9562-6778-1718241780.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=BCOg43F7lCjVIedqeK6VSQ",
      title: "Thành phố Mỹ công nhận tiếng Việt là ngôn ngữ chính thức",
      url: "https://vnexpress.net/thanh-pho-my-cong-nhan-tieng-viet-la-ngon-ngu-chinh-thuc-4757673.html",
      author: "Đức Trung (Theo San Francisco Chronicle)",
      publish_time: "Thứ năm, 13/6/2024, 08:47 (GMT+7)"     
     },
     {      
      imageSrc: "https://i1-giadinh.vnecdn.net/2024/04/03/anh-4-ngoquyenhongson-17120785-9381-7271-1712078817.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=egniOzbWNe9mKDe1EqqXQQ",
      title: "Chàng trai chuyển giới mang thai thay vợ",
      url: "https://vnexpress.net/chang-trai-chuyen-gioi-mang-thai-thay-vo-4729775.html",
      author: "Thanh Nga",
      publish_time: "Thứ tư, 3/4/2024, 06:30 (GMT+7)"      
     },
     {      
      imageSrc: "https://i1-giadinh.vnecdn.net/2022/04/16/chuyen-gioi-1-1650043904-7681-1650044105.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=xkOlD-i-nKGz9Ld8VeuP6A",
      title: "Hành trình tìm lại mình của hai chị em chuyển giới",
      url: "https://vnexpress.net/hanh-trinh-tim-lai-minh-cua-hai-chi-em-chuyen-gioi-4450923.html",
      author: "Phạm Nga",
      publish_time: "Thứ bảy, 16/4/2022, 06:32 (GMT+7)"     
     }
  ];

  return (
    <main className="flex flex-col max-w-[985px]">
      {newsItems.slice(0).map((item, index) => (
        <section>
          <NewsItem {...item} />
        </section>
      ))}
    </main>
  );
}

export default MyComponent;