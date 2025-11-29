"use client";

import { useState } from "react";
import "./ReviewWidget.css";

export default function ReviewWidget({ title = "노아인가" }) {
  const [rating, setRating] = useState(0); // 별점
  const [hover, setHover] = useState(0); // 마우스 올린 별점
  const [text, setText] = useState(""); // 리뷰 내용

  // 예시용 댓글 데이터
  const sampleComment = {
    name: "익명3",
    score: 4.5,
    likes: 20,
    content: "이거보고 눈물흘렸다 ㅠㅠㅠ",
  };

  const handleSubmit = () => {
    if (!rating || !text.trim()) {
      alert("별점과 리뷰 내용을 입력해 주세요!");
      return;
    }

    console.log("제출된 리뷰:", { rating, text });
    alert("리뷰가 제출되었습니다. (데모)");

    // 제출 후 초기화
    setRating(0);
    setText("");
  };

  return (
    <section className="rw-root">
      {/* 제목 */}
      <h2 className="rw-title">{title}</h2>

      {/* 위쪽 리뷰 작성 카드 */}
      <article className="rw-review-card">
        {/* 이름 칩 */}
        <div className="rw-name-chip">이름</div>

        {/* 별점 줄 */}
        <div className="rw-stars-row">
          <div className="rw-stars">
            {Array.from({ length: 5 }).map((_, i) => {
              const value = i + 1;
              const filled = value <= (hover || rating);
              return (
                <button
                  key={value}
                  type="button"
                  className={filled ? "rw-star rw-star-filled" : "rw-star"}
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHover(value)}
                  onMouseLeave={() => setHover(0)}
                >
                  ★
                </button>
              );
            })}
          </div>
          <span className="rw-rating-number">{rating || 1}</span>
        </div>

        {/* 텍스트 입력 + 제출 버튼 */}
        <div className="rw-textbox">
          <textarea
            className="rw-textarea"
            placeholder="리뷰를 작성해 주세요"
            value={text}
            onChange={(e) => setText(e.target.value)} // ← 테스트 코드랑 똑같은 패턴
          />
          <button className="rw-submit" type="button" onClick={handleSubmit}>
            제출
          </button>
        </div>
      </article>

      {/* 아래 댓글 카드 */}
      <article className="rw-comment-card">
        <header className="rw-comment-header">
          <div className="rw-comment-left">
            <div className="rw-avatar" />
            <div className="rw-name-score">
              <span className="rw-comment-name">{sampleComment.name}</span>
              <span className="rw-comment-score">
                <span className="rw-star-small">★</span>
                {sampleComment.score}
              </span>
            </div>
          </div>

          <button className="rw-like-btn" type="button">
            <span className="rw-like-icon">👍</span>
            <span>{sampleComment.likes}</span>
          </button>
        </header>

        <p className="rw-comment-content">{sampleComment.content}</p>
      </article>
    </section>
  );
}
