"use client";

import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  count: string;
  note: string;
}
interface Props {
  onSubmit: (data: FormData) => void;
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function ApplyForm({ onSubmit }: Props) {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    count: "1",
    note: "",
  });
  const [loading, setLoading] = useState(false);
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
    onSubmit(form);
  };

  return (
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
  );
}
