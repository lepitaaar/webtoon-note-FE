"use client";

import "./imagelist.css";

export default function ImageList() {
  const cards = Array.from({ length: 9 });

  function handleCardClick(index) {
    console.log(`🟥 Card ${index + 1} clicked!`);
    alert(`Card ${index + 1} 클릭됨! (임시 기능)`);
  }

  return (
    <div className="image-list">
      {/* 3×3 그리드 */}
      <section className="image-grid">
        {cards.map((_, i) => (
          <div
            key={i}
            className="image-card"
            onClick={() => handleCardClick(i)}
          />
        ))}
      </section>
    </div>
  );
}
