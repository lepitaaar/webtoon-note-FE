"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("모든 항목을 입력해 주세요.");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      setIsSubmitting(true);
      // TODO: 서버 회원가입 API 연동
      // 예: await fetch("/api/register", { method: "POST", body: JSON.stringify({ name, email, password }) })
      console.log("register submit", { name, email, password });
      alert("회원가입이 완료되었습니다. 로그인해 주세요.");
      // 필요 시 라우팅: window.location.href = "/login";
    } catch (err) {
      setError("회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 20,
          background: "#fff",
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6, color: "pink" }}>회원가입</h1>

        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span>이름</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="홍길동"
            required
            style={{ padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 8 }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span>이메일</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            style={{ padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 8 }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span>비밀번호</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
            minLength={8}
            style={{ padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 8 }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span>비밀번호 확인</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호 확인"
            required
            minLength={8}
            style={{ padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 8 }}
          />
        </label>

        {error && (
          <p style={{ color: "#dc2626", fontSize: 14 }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            marginTop: 6,
            padding: "12px 14px",
            background: isSubmitting ? "#9ca3af" : "#111827",
            color: "#fff",
            border: 0,
            borderRadius: 8,
            cursor: isSubmitting ? "not-allowed" : "pointer",
            fontWeight: 600,
          }}
        >
          {isSubmitting ? "처리 중..." : "회원가입"}
        </button>

        <p style={{ fontSize: 14, color: "#6b7280", marginTop: 4 }}>
          이미 계정이 있으신가요? <a href="/login" style={{ color: "#2563eb" }}>로그인</a>
        </p>
      </form>
    </main>
  );
}


