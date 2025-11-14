"use client";

import ReviewWidget from "./ReviewWidget";

export default function StarDotPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "24px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ReviewWidget title="노아인가" />
    </main>
  );
}
