"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import "./webtoon_data.css";

// 웹툰 데이터 (실제로는 API나 props로 받아올 수 있습니다)
const webtoon = {
  image: "https://via.placeholder.com/120x160?text=웹툰+이미지",
  title: "웹툰 제목",
  author: "작가명",
  day: "@,@,@ 연재",
  synopsis: "웹툰 시놉시스 입니다.웹툰 시놉시스 입니다.웹툰 시놉시스 입니다.웹툰 시놉시스 입니다.웹툰 시놉시스 입니다.",
  hashtags: ["#갓부경", "#컴온", "#화이팅"]
};

function WebtoonDataContent() {
  return (
    <div className="webtoon-data-container">
      <div className="webtoon-content">
        <div className="webtoon-image-wrapper">
          <img 
            src={webtoon.image} 
            alt={webtoon.title}
            className="webtoon-image"
          />
        </div>
        
        <div className="webtoon-info">
          <div className="webtoon-header">
            <h1 className="webtoon-title">{webtoon.title}</h1>
            <span className="webtoon-author">{webtoon.author}</span>
          </div>
          
          <div className="webtoon-day">{webtoon.day}</div>
          
          <div className="webtoon-synopsis">{webtoon.synopsis}</div>
          
          <div className="webtoon-hashtags">
            {webtoon.hashtags.map((tag, index) => (
              <span key={index} className="hashtag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WebtoonData() {
  return (
    <Suspense fallback={<div className="webtoon-data-container">LODING...</div>}>
      <WebtoonDataContent />
    </Suspense>
  );
}

