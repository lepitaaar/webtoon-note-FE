"use client";

import Link from "next/link";
import "./imagelist.css";

export default function ImageList() {
  const cards = Array.from({ length: 9 });

  return (
    <div className="image-list">
      {/* 3×3 그리드 */}
      <section className="image-grid">
        {cards.map((_, i) => (
          <Link
            key={i}
            href={`/webtoon_data?id=${i + 1}`}
            className="image-card"
          />
        ))}
      </section>
    </div>
  );
}
