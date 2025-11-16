  "use client";

  import { useEffect, useState } from "react";
  import "./imagelist/imagelist.css";

  // 재사용 가능한 웹툰 카드 리스트 컴포넌트
  export default function CardList({ day = "월" }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      let cancelled = false;
      setLoading(true);

      // 실제 API 경로가 있으면 환경변수 NEXT_PUBLIC_API_URL을 사용하도록 함
      const base = process.env.NEXT_PUBLIC_API_URL || "";
      const url = `${base}/api/webtoons?day=${encodeURIComponent(day)}`;

      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error("Fetch failed");
          return res.json();
        })
        .then((data) => {
          if (cancelled) return;
          // 서버에서 { id, title, author, image } 형태의 배열을 반환한다고 가정
          setItems(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
          console.warn("API fetch failed, using fallback data:", err);
          if (cancelled) return;
          // 임시 더미 데이터 (API가 준비되기 전까지 사용)
          setItems([
            { id: 1, title: "웹툰 A", author: "작가 A", image: "/placeholder.png" },
            { id: 2, title: "웹툰 B", author: "작가 B", image: "/placeholder.png" },
            { id: 3, title: "웹툰 C", author: "작가 C", image: "/placeholder.png" },
            { id: 4, title: "웹툰 D", author: "작가 D", image: "/placeholder.png" },
            { id: 5, title: "웹툰 E", author: "작가 E", image: "/placeholder.png" },
            { id: 6, title: "웹툰 F", author: "작가 F", image: "/placeholder.png" },
            { id: 7, title: "웹툰 G", author: "작가 G", image: "/placeholder.png" },
            { id: 8, title: "웹툰 H", author: "작가 H", image: "/placeholder.png" },
            { id: 9, title: "웹툰 I", author: "작가 I", image: "/placeholder.png" },
          ]);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });

      return () => {
        cancelled = true;
      };
    }, [day]);

    function handleCardClick(item) {
      // 임시: 클릭 시 알림창만 띄움
      alert(`${item.title} 클릭됨 (임시)\n작성자: ${item.author}`);
    }

    // 로딩 상태면 빈(플레이스홀더) 카드들을 보여줌
    const displayItems = loading ? Array.from({ length: 9 }).map((_, i) => ({ id: `p-${i}` })) : items;

    return (
      <div className="image-list">
        <section className="image-grid">
          {displayItems.map((it, idx) => (
            <div key={it.id ?? idx} className="card-wrapper">
              <button
                type="button"
                className="image-card"
                onClick={() => !loading && handleCardClick(it)}
                style={
                  it.image
                    ? { backgroundImage: `url(${it.image})`, backgroundSize: "cover", backgroundPosition: "center" }
                    : {}
                }
                aria-label={it.title || `placeholder ${idx + 1}`}
              />

              {/* 제목/작가 메타 */}
              <div className="card-meta">
                <div className="card-title">{it.title ?? "로딩 중..."}</div>
                <div className="card-author">{it.author ?? ""}</div>
              </div>
            </div>
          ))}
        </section>
      </div>
    );
  }

