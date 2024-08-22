import React from "react";

const Head = () => {
  // Lấy ngày tháng năm hiện tại
  const currentDate = new Date();
  
  // Các tên ngày trong tuần
  const daysOfWeek = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
  
  // Định dạng ngày
  const formattedDate = `${daysOfWeek[currentDate.getDay()]}, ${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

  return (
    <>
      <section className='head'>
        <div className='container flexSB paddingTB'>
          <div className='logo'>
            <img src='../images/Logo.png' alt='Logo' />
          </div>
          <div className='ad'>
            <div className='date'>{formattedDate}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Head;
