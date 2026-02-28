"use client";

import React, { useState, useEffect } from "react";
import PetalRain from "./components/PetalRain";

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function SakuraEventPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    count: "1",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <PetalRain />
      <div className={`page-wrap ${visible ? "visible" : ""}`}>
        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-badge">SAKURA FESTIVAL 2025</div>
          <h1 className="hero-title">
            春の<span>櫻</span>花祭
          </h1>
          <p className="hero-subtitle">
            在最美的花季，與我們共賞一片粉紅雪景
            <br />
            限量席次，把握這場春日限定的浪漫相遇
          </p>
          <div className="hero-divider" />
        </section>

        {/* ── Info Cards ── */}
        <div className="info-grid">
          {[
            { icon: "📅", label: "活動日期", value: "2025年 3月 29日（六）" },
            { icon: "🕐", label: "集合時間", value: "上午 09:30" },
            { icon: "📍", label: "活動地點", value: "陽明山花鐘廣場" },
            { icon: "💰", label: "報名費用", value: "NT$ 980 / 人" },
          ].map((c) => (
            <div key={c.label} className="info-card">
              <div className="info-icon">{c.icon}</div>
              <div className="info-label">{c.label}</div>
              <div className="info-value">{c.value}</div>
            </div>
          ))}
        </div>

        {/* ── Highlights ── */}
        <section>
          <h2 className="section-title">活動亮點</h2>
          <div className="highlights">
            <ul className="highlight-list">
              {[
                "導覽員帶路賞花，深入瞭解各品種山櫻、吉野櫻的故事",
                "戶外野餐席次，精緻和風便當＋抹茶飲料一份",
                "專業攝影師現場拍攝，活動後提供精選照片下載",
                "手工和紙押花體驗，帶走獨一無二的春日紀念品",
                "限量 50 位，確保每位賓客擁有最佳賞花體驗",
              ].map((item, i) => (
                <li key={i}>
                  <span className="dot" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Form ── */}
        <section>
          <h2 className="section-title">立即報名</h2>
          {submitted ? (
            <div className="success">
              <div className="success-icon">🌸</div>
              <h2>報名成功！</h2>
              <p>
                感謝您的報名，我們將於 2 個工作天內
                <br />
                寄送確認信與繳費資訊至您的信箱。
              </p>
            </div>
          ) : (
            <form className="form-section" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">姓名 NAME</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="您的姓名"
                    required
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">聯絡電話 PHONE</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="09xx-xxx-xxx"
                    required
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group full">
                  <label htmlFor="email">電子信箱 EMAIL</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="count">報名人數 GUESTS</label>
                  <select
                    id="count"
                    name="count"
                    value={form.count}
                    onChange={handleChange}
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} 人
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="note">備註 NOTE</label>
                  <input
                    id="note"
                    name="note"
                    type="text"
                    placeholder="素食需求、輪椅友善等"
                    value={form.note}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button className="submit-btn" type="submit" disabled={loading}>
                {loading ? "送出中…" : "確認報名 ✦ 春日限定"}
              </button>
            </form>
          )}
        </section>

        <footer>
          <p>© 2025 春の櫻花祭 · 洽詢請來信 sakura@example.com</p>
        </footer>
      </div>
    </>
  );
}
