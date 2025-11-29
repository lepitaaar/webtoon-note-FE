"use client";

import { useState } from "react";
import "../imagelist/imagelist.css"; 
import "./weekselect.css";
import ImageList from "../imagelist/page";

const days = ["월", "화", "수", "목", "금", "토", "일"];

export default function WeekSelect() {
  const [selectedDay, setSelectedDay] = useState("월");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
  if (!query.trim()) {
    alert("검색어를 입력해주세요");
    return;
  }

  setLoading(true);
  setError("");

  const params = new URLSearchParams({
    title: query,
    day: selectedDay,
    page: 1,
  });

  try {
    const res = await fetch(
      `https://webtoon-note-862566155052.asia-northeast3.run.app/webtoons?${params.toString()}`
    );

    if (!res.ok) throw new Error("서버 오류 발생");

    const data = await res.json();
    setResult(data.webtoons || []);
  } catch (err) {
    console.error("API 요청 오류:", err);
    setError("검색 중 오류가 발생했습니다.");
    setResult([]);
  } finally {
    setLoading(false);
  }
};

const resetSearch = () => {
  setQuery("");
  setResult([]);
  setError("");
  setLoading(false);
  setSelectedDay("월"); 
};


  return (
    <div className="weekselect-container">
      <header className="header">
        <img src="/wn.svg" alt="웹툰노트 로고" className="logo" onClick={resetSearch}/>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="리뷰할 웹툰을 검색해보세요"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            <img src="searchicon.svg" alt="검색 아이콘" className="search-icon" />
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
        <ImageList />
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>검색 결과</h2>
        {loading && <div>검색 중...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {!loading && !error && result.length === 0 && <div>검색 결과가 없습니다.</div>}

        {result.map((w) => (
          <div key={w.id} style={{ marginBottom: "12px", display: "flex", gap: "10px" }}>
            <img src={w.thumbnail} width={80} alt={w.title} />
            <div>
              <div style={{ fontWeight: "bold" }}>{w.title}</div>
              <div>{w.authors}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
