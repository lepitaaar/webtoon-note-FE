  "use client";

  import { useState } from "react";
  import "../imagelist/imagelist.css";   // 🔴 빨간 카드 스타일
  import "./weekselect.css";            // 🔴 요일 선택 UI 스타일
  import CardList from "../card"; // Replaced placeholder ImageList with CardList

  const days = ["월", "화", "수", "목", "금", "토", "일"];

  // 콘텐츠는 선택된 요일을 `CardList`에 전달하여 렌더링

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
          <CardList day={selectedDay} />
        </div>
      </div>
    );
  }
