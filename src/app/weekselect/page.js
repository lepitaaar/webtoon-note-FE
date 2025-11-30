"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "../imagelist/imagelist.css"; 
import "./weekselect.css";
import ImageList from "../imagelist/page";

const days = ["월", "화", "수", "목", "금", "토", "일"];

// ✅ API 명세서에 맞춘 요일 변환 맵 (월 -> MON)
const DAY_TO_API_CODE = {
  "월": "MON",
  "화": "TUE",
  "수": "WED",
  "목": "THU", 
  "금": "FRI",
  "토": "SAT",
  "일": "SUN"   
};

const MAIN_API_URL = "https://webtoon-note-862566155052.asia-northeast3.run.app";
const SEARCH_API_URL = "https://webtoon-note-887030605758.asia-northeast3.run.app";

export default function WeekSelect() {
  const [selectedDay, setSelectedDay] = useState("월");
  const [query, setQuery] = useState("");
  
  const [searchResult, setSearchResult] = useState([]);
  const [dayWebtoons, setDayWebtoons] = useState([]);
  const [initialWebtoons, setInitialWebtoons] = useState([]);

  const [viewMode, setViewMode] = useState("initial"); 

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 1. 초기 데이터 로드
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res = await fetch(`${MAIN_API_URL}/webtoons`);
        const data = await res.json();
        const sourceData = data.webtoons || (Array.isArray(data) ? data : []);
        
        const processed = sourceData.map(item => ({
          id: item.webtoon_id || item.id || item._id, 
          title: item.title,
          authors: item.authors,
          thumbnail: item.thumbnail ? item.thumbnail.split(",")[0] : "",
        }));

        setInitialWebtoons(processed.slice(0, 9)); 
      } catch (err) {
        console.error("초기 데이터 로딩 실패:", err);
      }
    };
    fetchInitialData();
  }, []);

  // ✅ 2. 요일 버튼 클릭 (한글 요일을 API 코드로 변환하여 요청)
  const handleDayClick = async (day) => {
    setSelectedDay(day); 
    setViewMode("day");  
    setQuery("");        
    setSearchResult([]); 
    setLoading(true);
    setError("");

    try {
     
      const apiDayCode = DAY_TO_API_CODE[day];
      const url = `${MAIN_API_URL}/webtoons/day/${apiDayCode}`;
      
      console.log(`📡 요일별 요청: ${url}`);
      
      const res = await fetch(url);
      
      if (!res.ok) throw new Error("요일 데이터를 불러오는데 실패했습니다.");

      const data = await res.json();
      console.log(`✅ ${day}요일(${apiDayCode}) 데이터:`, data);

      const sourceData = data.webtoons || (Array.isArray(data) ? data : []);

      const processed = sourceData.map(item => ({
        id: item.webtoon_id || item.id || item._id,
        title: item.title,
        authors: item.authors,
        thumbnail: item.thumbnail ? item.thumbnail.split(",")[0] : "",
      }));

      // 9개만 자르기
      setDayWebtoons(processed.slice(0, 9));

    } catch (err) {
      console.error(err);
      setError("해당 요일의 웹툰을 불러오지 못했습니다.");
      setDayWebtoons([]);
    } finally {
      setLoading(false);
    }
  };

  // 3. 검색 기능
  const handleSearch = async () => {
    if (!query.trim()) {
      alert("검색어를 입력해주세요");
      return;
    }

    setViewMode("search");
    setLoading(true);
    setError("");

    try {
      console.log(`📡 검색 요청: ${SEARCH_API_URL}/search?q=${query}`);

      const res = await fetch(
        `${SEARCH_API_URL}/search?q=${encodeURIComponent(query)}`
      );

      if (!res.ok) throw new Error("서버 오류 발생");

      const data = await res.json();
      
      // 검색 로직 (filter 사용)
      const processed = (data.webtoons || [])
        .filter(item => item.title.includes(query))
        .map(item => ({
          id: item.id || item.webtoon_id || item._id,
          title: item.title,
          authors: item.authors,
          thumbnail: item.thumbnail ? item.thumbnail.split(",")[0] : "",
        }));

      setSearchResult(processed);

    } catch (err) {
      console.error(err);
      setError("검색 중 오류가 발생했습니다.");
      setSearchResult([]);
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setQuery("");
    setSearchResult([]);
    setDayWebtoons([]);
    setError("");
    setLoading(false);
    setSelectedDay("월");
    setViewMode("initial");
  };

  // 화면 표시 데이터 결정
  let displayData = [];
  let titleText = "";

  if (viewMode === "search") {
    displayData = searchResult;
    titleText = "검색 결과";
  } else if (viewMode === "day") {
    displayData = dayWebtoons;
    titleText = `환영합니다!`;
  } else {
    displayData = initialWebtoons;
    titleText = "환영합니다!";
  }

  return (
    <div className="weekselect-container">
      <header className="header">
        <img src="/wn.svg" alt="로고" className="logo" onClick={resetSearch} style={{ cursor: 'pointer' }}/>
        <div className="search-bar">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="리뷰할 웹툰 검색"
            onKeyDown={e => e.key === "Enter" && handleSearch()}
            className="search-input"
          />
          <button className="search-btn" onClick={handleSearch}>
            <img src="searchicon.svg" alt="검색" className="search-icon" />
          </button>
        </div>
      </header>

      <h1 className="weekselect-title">{titleText}</h1>

      <div className="weekselect-buttons">
        {days.map(day => (
          <button
            key={day}
            onClick={() => handleDayClick(day)}
            className={`weekselect-btn${selectedDay === day ? " selected" : ""}`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="weekselect-content">
        {loading && <div style={{textAlign: 'center', padding: '20px'}}>로딩 중...</div>}
        
        {!loading && error && <div style={{ color: "red", textAlign: 'center', padding: '20px' }}>{error}</div>}

        {!loading && !error && viewMode === "search" && searchResult.length === 0 && (
            <div style={{textAlign: 'center', padding: '40px', color: '#999'}}>
                '{query}'에 대한 검색 결과가 없습니다.
            </div>
        )}

        {!loading && !error && viewMode === "day" && dayWebtoons.length === 0 && (
             <div style={{textAlign: 'center', padding: '40px', color: '#999'}}>
                해당 요일의 웹툰이 없습니다.
            </div>
        )}

        {!loading && !error && (
             <ImageList items={displayData} />
        )}
      </div>
    </div>
  );
}