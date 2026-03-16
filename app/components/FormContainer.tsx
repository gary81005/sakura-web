"use client";

import React, { useState, useEffect } from "react";
import ApplyForm from "./ApplyForm";

interface FormData {
  name: string;
  email: string;
  phone: string;
  count: string;
  note: string;
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function FormContainer() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (val: FormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
  };

  return (
    <>
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
          <ApplyForm onSubmit={handleSubmit} />
        )}
      </section>
    </>
  );
}
