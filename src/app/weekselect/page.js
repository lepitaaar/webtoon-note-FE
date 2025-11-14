"use client";

import { useState } from "react";
import "../imagelist/imagelist.css";   // 🔴 빨간 카드 스타일
import "./weekselect.css";            // 🔴 요일 선택 UI 스타일
import ImageList from "../imagelist/page"; // 🔴 방금 만든 컴포넌트

const days = ["월", "화", "수", "목", "금", "토", "일"];

// 모든 요일에 ImageList 보여주기
const dayContents = {
  월: <ImageList />,
  화: <ImageList />,
  수: <ImageList />,
  목: <ImageList />,
  금: <ImageList />,
  토: <ImageList />,
  일: <ImageList />,
};

export default function WeekSelect() {
  const [selectedDay, setSelectedDay] = useState("월");

  return (
    <div className="weekselect-container">

      <header className="header">
        <img src="/wn.svg" alt="웹툰노트 로고" className="logo"/>   
      
      
      <div className="search-bar">
        <input
        type="text"
        className="search-input"
        placeholder="리뷰할 웹툰을 검색해보세요"
        />

        <button className="search-btn">
          <img src="searchicon.svg" alt="검색 아이콘" className="search-icon"/>
        </button>
      </div>
      
        

      </header>

    
      <h1 className="weekselect-title">요일 순 웹툰</h1>

      <div className="weekselect-buttons">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`weekselect-btn${selectedDay === day ? " selected" : ""}`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="weekselect-content">
        {dayContents[selectedDay]}
      </div>
    </div>
  )
}

