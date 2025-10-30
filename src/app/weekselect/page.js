'use client';

import { useState } from "react";
import "./weekselect.css";

const days = ["월", "화", "수", "목", "금", "토", "일"];

const dayContents = {
    월: <div>월요일 화면입니다.</div>,
    화: <div>화요일 화면입니다.</div>,
    수: <div>수요일 화면입니다.</div>,
    목: <div>목요일 화면입니다.</div>,
    금: <div>금요일 화면입니다.</div>,
    토: <div>토요일 화면입니다.</div>,
    일: <div>일요일 화면입니다.</div>,
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