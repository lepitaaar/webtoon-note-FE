"use client";

import Link from "next/link";
import "./imagelist.css";

// 부모 컴포넌트(WeekSelect)로부터 웹툰 데이터 리스트(items)를 받아옵니다.
export default function ImageList({ items = [] }) {
  
  // 데이터가 아직 없을 때(로딩 중이거나 비어있을 때) 보여줄 스켈레톤 UI (선택사항)
  if (!items || items.length === 0) {
    return <div className="no-data">데이터를 불러오는 중입니다...</div>;
  }

  return (
    <div className="image-list">
      <section className="image-grid">
        {items.map((item, index) => (
          <Link
            key={item.id || index}
            href={`/webtoon_data?id=${item.id}`} // 상세 페이지로 이동
            className="image-card-link"
          >
            <div className="image-card-wrapper">
              {/* 썸네일 이미지 */}
              <div className="image-thumbnail-box">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="image-thumbnail"
                  onError={(e) => e.target.style.display = 'none'} // 이미지 깨짐 방지
                />
              </div>
              
              {/* 텍스트 정보 */}
              <div className="image-info">
                <div className="image-title">{item.title}</div>
                <div className="image-author">{item.authors}</div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}