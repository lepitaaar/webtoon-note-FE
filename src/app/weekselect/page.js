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
  );
}
