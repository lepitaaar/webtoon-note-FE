"use client";  // ← 클라이언트 컴포넌트 선언 (alert, onClick 작동하려면 필수)

export default function Page() {
  const cards = Array.from({ length: 9 });

  // 🧩 카드 클릭 시 실행되는 함수 (임시 기능)
  function handleCardClick(index) {
    console.log(`🟥 Card ${index + 1} clicked!`);
    alert(`Card ${index + 1} 클릭됨! (임시 기능)`);

    // TODO: 나중에 여기서 백엔드 연결
    // fetch("/api/click", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ cardId: index }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log("서버 응답:", data))
    //   .catch((err) => console.error("서버 오류:", err));
  }

  return (
    <main className="page">
      {/* 상단 빈 공간 (텍스트 없이 자리만 확보) */}
      <div className="top-empty" aria-hidden="true" />

      {/* 3×3 그리드 */}
      <section className="grid">
        {cards.map((_, i) => (
          <div
            key={i}
            className="card"
            onClick={() => handleCardClick(i)} // 클릭 이벤트 연결
          />
        ))}
      </section>
    </main>
  );
}
