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

    try {
      const res = await fetch(
        `https://webtoon-note-887030605758.asia-northeast3.run.app/search?q=${encodeURIComponent(query)}`
      );

      if (!res.ok) throw new Error("서버 오류 발생");

      const data = await res.json();

      console.log("API 데이터:", data);

      const processed = (data.webtoons || [])
        // 🔹 제목에만 검색어 포함 여부 체크
        .filter(item => item.title.includes(query))
        .map(item => ({
          id: item.id,
          title: item.title,
          authors: item.authors,
          thumbnail: item.thumbnail ? item.thumbnail.split(",")[0] : "",
        }));


      console.log("processed:", processed);

      setResult(processed);
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

  const SearchResultCard = ({ item }) => (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: "100%",
          aspectRatio: "3/4",
          backgroundColor: "#e6e6e6",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <img
          src={item.thumbnail}
          alt={item.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={e => (e.currentTarget.style.display = "none")}
        />
      </div>
      <div style={{ fontWeight: "bold", marginTop: "7px" }}>{item.title}</div>
      <div style={{ fontSize: "12px", color: "#666" }}>{item.authors}</div>
    </div>
  );

  return (
    <div className="weekselect-container">
      <header className="header">
        <img src="/wn.svg" alt="웹툰노트 로고" className="logo" onClick={resetSearch}/>
        <div className="search-bar">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="리뷰할 웹툰을 검색해보세요"
            onKeyDown={e => e.key === "Enter" && handleSearch()}
            className="search-input"
          />
          <button className="search-btn" onClick={handleSearch}>
            <img src="searchicon.svg" alt="검색 아이콘" className="search-icon" />
          </button>
        </div>
      </header>

      <h1 className="weekselect-title">
        {result.length > 0 ? "검색 결과" : "요일 순 웹툰"}
        </h1>

      <div className="weekselect-buttons">
        {days.map(day => (
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
        {/* 로딩 / 에러 표시 */}
        {loading && <div>검색 중...</div>}
        {!loading && error && <div style={{ color: "red" }}>{error}</div>}

        {/* 검색 결과가 있으면 결과 보여주기 */}
        {!loading && !error && result.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: "16px",
              marginTop: "0px"
            }}
          >
            {result.map(w => (
              <SearchResultCard key={w.id} item={w} />
            ))}
          </div>
        )}

        {/* 검색 결과 없으면 초기 화면 유지 */}
        {!loading && !error && result.length === 0 && <ImageList items={[]} />}
      </div>
    </div>
  );
}
