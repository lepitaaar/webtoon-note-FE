"use client";

import { useState } from "react";
import "./ReviewWidget.css";

export default function ReviewWidget({ title = "노아인가" }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [likes, setLikes] = useState(20);
  const [isLiked, setIsLiked] = useState(false);

  const sampleComment = {
    name: "익명3",
    score: 4.5,
    content: "이거보고 눈물흘렸다 ㅠㅠㅠ",
  };

  const handleSubmit = () => {
    if (!rating || !text.trim()) {
      alert("별점과 리뷰 내용을 입력해 주세요!");
      return;
    }

    console.log("제출된 리뷰:", {
      name: name || "익명",
      rating,
      text,
    });

    alert("리뷰가 제출되었습니다. (데모)");

    setRating(0);
    setText("");
  };

  const handleLike = () => {
    if (isLiked) {
      setLikes((prev) => prev - 1);
      setIsLiked(false);
      alert("좋아요를 취소했습니다.");
    } else {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
      alert("좋아요를 눌렀습니다!");
    }
  };

  const nameMaxLength = 10;
  const nameSize = Math.max(2, (name || "이름").length);

  return (
    <section className="rw-root">
      <h2 className="rw-title">{title}</h2>

      <article className="rw-review-card">
        {/* 이름 칩 */}
        <input
          className="rw-name-chip"
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={nameMaxLength}
          size={nameSize}
        />

        {/* 별점 */}
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

        {/* 리뷰 입력 */}
        <div className="rw-textbox">
          <textarea
            className="rw-textarea"
            placeholder="리뷰를 작성해 주세요"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="rw-submit" type="button" onClick={handleSubmit}>
            제출
          </button>
        </div>
      </article>

      {/* 댓글 UI */}
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

          {/* 좋아요 버튼 */}
          <button className="rw-like-btn" type="button" onClick={handleLike}>
            <span className="rw-like-icon">👍</span>
            <span className="rw-like-count">{likes}</span>
          </button>
        </header>

        <p className="rw-comment-content">{sampleComment.content}</p>
      </article>
    </section>
  );
}
