"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import "./webtoon_data.css";

function WebtoonDataContent() {
  const searchParams = useSearchParams();
  const webtoonId = searchParams.get("id");

  const [webtoon, setWebtoon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWebtoonData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!webtoonId) {
          setError("웹툰 ID가 필요합니다.");
          setLoading(false);
          return;
        }

        // API 기본 URL
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "https://webtoon-note-862566155052.asia-northeast3.run.app";

        // 쿼리 파라미터 방식으로 요청
        const endpoint = `${apiUrl}/webtoons?webtoon_id=${webtoonId}`;
        console.log("📡 API 요청:", endpoint);

        const response = await fetch(endpoint);
        console.log("응답 상태:", response.status);

        if (!response.ok) {
          throw new Error(`웹툰 데이터를 가져오는데 실패했습니다. (${response.status})`);
        }

        // 데이터 파싱
        const webtoonData = await response.json();
        console.log("🎯 받은 데이터:", webtoonData);

        // 백엔드 응답 구조가 {"webtoons": [...]} 인 경우 처리
        let data = webtoonData;
        if (webtoonData.webtoons && Array.isArray(webtoonData.webtoons)) {
          data = webtoonData.webtoons[0];
        }

        const processedData = { ...data };
        if (processedData.tags && typeof processedData.tags === "string") {
          processedData.tagsArray = processedData.tags.split(",").map(tag => tag.trim());
        }

        setWebtoon(processedData);
        setLoading(false);
      } catch (err) {
        console.error("🚨 API 호출 에러:", err);
        setError(err.message || "알 수 없는 에러가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchWebtoonData();
  }, [webtoonId]);

  // 로딩 중
  if (loading) {
    return (
      <div className="webtoon-data-container">
        <div style={{ textAlign: "center", padding: "2rem" }}>로딩 중...</div>
      </div>
    );
  }

  // 에러 발생 
  if (error) {
    return (
      <div className="webtoon-data-container">
        <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
          에러: {error}
        </div>
      </div>
    );
  }

  if (!webtoon) return null;

  // 정상적으로 표시
  return (
    <div className="webtoon-data-container">
      <div className="webtoon-content">
        {/* 썸네일 이미지 */}
        <div className="webtoon-image-wrapper">
          <img
            src={webtoon.thumbnail}
            alt={webtoon.title || "웹툰 이미지"}
            className="webtoon-image"
          />
        </div>

        {/* 웹툰 정보 */}
        <div className="webtoon-info">
          <div className="webtoon-header">
            <h1 className="webtoon-title">{webtoon.title}</h1>
            <span className="webtoon-author">{webtoon.authors}</span>
          </div>

          <div className="webtoon-day">{webtoon.updateDays}</div>

          {/* ✅ 시놉시스 표시 */}
          {webtoon.synopsis && (
            <div className="webtoon-synopsis">{webtoon.synopsis}</div>
          )}

          {/* ✅ 태그 표시 */}
          <div className="webtoon-hashtags">
            {webtoon.tagsArray && Array.isArray(webtoon.tagsArray)
              ? webtoon.tagsArray.map((tag, index) => (
                  <span key={index} className="hashtag">
                    {tag}
                  </span>
                ))
              : webtoon.tags && <span className="hashtag">{webtoon.tags}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WebtoonData() {
  return (
    <Suspense fallback={<div className="webtoon-data-container">LOADING...</div>}>
      <WebtoonDataContent />
    </Suspense>
  );
}

