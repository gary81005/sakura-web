"use client";

import React, { useState, useEffect, useMemo } from "react";
import PetalRain from "../components/PetalRain";
import { useRouter } from "next/navigation";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import Image from "next/image";
import { triggerConfetti } from "../components/Confettiburst";
import Countdown from "../components/Countdown";
import useDragSelect from "../hooks/useDragSelect";
import clsx from "clsx";

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function SakuraEventPage() {
  const VALUE_BUG_MAP: Record<string, string> = {
    "50000人": "bug-4",
    "EUR€ 1980 / 人": "bug-8",
    吉力馬札羅山: "bug-9",
    "上午 13:30": "bug-7",
    "2026年 2月 30日（六）": "bug-5",
    "This is Tiger Speaking": "bug-3",
    你不該看到這張卡片: "bug-15",
  };
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });
  const [correctCount, setCorrectCount] = useState<string[]>([]);
  const [errorCount, setErrorCount] = useState(0);
  const containerRef = useDragSelect({
    selector: ".bug-card", // 要偵測的目標
    onSelect: (elements) => {
      console.log("Selected element:", elements);
      if (elements.length === 0) {
        setErrorCount((c) => c + 1);
        return;
      }
      if (
        elements.length === 1 ||
        (elements.length === 2 &&
          elements.some((el) => el.classList.contains("bug-20")))
      ) {
        elements.forEach((el) => {
          console.log("Selected element:", el);
          const rect = el.getBoundingClientRect();
          const bugId = el.className
            .split(" ")
            .find((c) => c.startsWith("bug-"))
            ?.replace("bug-", "");
          console.log("Selected element:", el);
          console.log("Bug ID:", bugId);
          if (bugId && !correctCount.includes(bugId)) {
            setCorrectCount((prev) => [...prev, bugId]);
            triggerConfetti(
              rect.left + rect.width / 2,
              rect.top + rect.height / 2,
            );
          }
        });
      }
      return;
      // elements 是 Element[]，可以拿 dataset、textContent 等
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  const generateBugs = () => {
    const bugs: string[] = [];

    while (bugs.length < 10) {
      const no = Math.floor(Math.random() * 25) + 1;
      if (!bugs.includes(no.toString())) {
        bugs.push(no.toString());
      }
    }

    return bugs;
  };

  const [bugList, setBugList] = useState<string[]>(generateBugs);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    count: bugList.includes("11") ? "a" : "1",
    note: "",
  });
  const handleBtnHover = () => {
    if (!bugList.includes("23")) return;
    setBtnOffset({
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 100,
    });
  };
  console.log(bugList);
  const info = useMemo(() => {
    const res = [
      {
        icon: "📅",
        label: "活動日期",
        value: bugList.includes("5")
          ? "2026年 2月 30日（六）"
          : "2026年 3月 29日（六）",
      },
      {
        icon: "🕐",
        label: "集合時間",
        value: bugList.includes("7") ? "上午 13:30" : "上午 09:30",
      },
      {
        icon: "📍",
        label: "活動地點",
        value: bugList.includes("9") ? "吉力馬札羅山" : "陽明山花鐘廣場",
      },
      {
        icon: "💰",
        label: "報名費用",
        value: bugList.includes("8") ? "EUR€ 1980 / 人" : "NT$ 980 / 人",
      },
      {
        icon: "🙋‍♂️",
        label: "人數上限",
        value: bugList.includes("4") ? "50000人" : "50人",
      },
    ];
    if (bugList.includes("3")) {
      res.push({
        icon: "👽",
        label: "#$!@@#",
        value: "This is Tiger Speaking",
      });
    }
    if (bugList.includes("15")) {
      res.push({ icon: "🕵️", label: "???", value: "你不該看到這張卡片" });
    }
    if (bugList.includes("20")) {
      res.forEach((r) => (r.icon = "🐛"));
    }
    return res;
  }, [bugList]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    isPhone = false,
  ) => {
    if (isPhone) {
      const numericOnly = e.target.value.replace(/[^0-9]/g, "");
      setForm({ ...form, [e.target.name]: numericOnly });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bugList.includes("23")) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  useEffect(() => {
    if (correctCount.length >= 5) {
      router.push("/success");
    }
  }, [correctCount, router]);

  useEffect(() => {
    if (errorCount >= 10) {
      router.push("/fail");
    }
  }, [errorCount, router]);

  return (
    <div ref={containerRef}>
      <PetalRain isBug={bugList.includes("6")} />
      <Countdown seconds={90} redirectTo="/fail" />
      <div className="flex items-center justify-center text-2xl font-bold">
        找到的Bug數：{correctCount.length}/5
      </div>
      <div className="flex items-center justify-center text-2xl font-bold">
        失敗次數：{errorCount}/10
      </div>
      <div className={`page-wrap ${visible ? "visible" : ""}`}>
        {/* ── Hero ── */}
        <section className="hero">
          <div
            className={`hero-badge bug-1 ${bugList.includes("1") ? "bug-card" : ""}`}
          >
            SAKURA FESTIVAL {bugList.includes("1") ? "2025" : "2026"}
          </div>
          <h1 className="hero-title">
            春の<span>櫻</span>花祭
          </h1>
          <p className="hero-subtitle">
            在最美的花季，與我們共賞一片粉紅雪景
            <br />
            限量席次，把握這場春日限定的浪漫相遇
          </p>
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000 }}
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <div className="w-[1000px] h-[300px]">
                <Image src="/sbanner1.webp" alt="" fill />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-[1000px] h-[300px]">
                <Image src="/sbanner2.jpg" alt="" fill />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-[1000px] h-[300px]">
                <Image src="/sbanner3.jpg" alt="" fill />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-[1000px] h-[300px]">
                <Image src="/sbanner4.jpg" alt="" fill />
              </div>
            </SwiperSlide>
            {bugList.includes("2") && (
              <SwiperSlide>
                <div
                  className={`w-[1000px] h-[300px] bug-2 ${bugList.includes("2") ? "bug-card" : ""}`}
                >
                  <Image src="/tiger.jpg" alt="" fill />
                </div>
              </SwiperSlide>
            )}
            ...
          </Swiper>
          <div className="hero-divider" />
        </section>

        {/* ── Info Cards ── */}
        <div className="info-grid">
          {info.map((c) => {
            const valueBug = VALUE_BUG_MAP[c.value];
            console.log(valueBug);
            return (
              <div
                key={c.label}
                className={clsx(
                  "info-card",
                  "bug-20",
                  bugList.includes("20") && "bug-card",
                )}
              >
                <div className="info-icon">{c.icon}</div>
                <div className="info-label">{c.label}</div>
                <div
                  className={clsx(
                    "info-value",
                    valueBug,
                    valueBug && "bug-card",
                  )}
                >
                  {c.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Highlights ── */}
        <section>
          <h2 className="section-title">活動亮點</h2>
          <div className="highlights">
            <ul className={`highlight-list`}>
              {[
                bugList.includes("19")
                  ? "導覽員帶路賞鯨，深入瞭解各品種鯨魚的故事"
                  : "導覽員帶路賞花，深入瞭解各品種山櫻、吉野櫻的故事",
                "戶外野餐席次，精緻和風便當＋抹茶飲料一份",
                "專業攝影師現場拍攝，活動後提供精選照片下載",
                bugList.includes("22")
                  ? "手工和紙押鯨魚體驗，帶走獨一無二的秋日紀念品"
                  : "手工和紙押花體驗，帶走獨一無二的春日紀念品",
                "限量 50 位，確保每位賓客擁有最佳賞花體驗",
              ].map((item, i) => (
                <li
                  key={i}
                  className={`${bugList.includes("22") ? "bug-22 bug-card" : ""} ${bugList.includes("19") ? "bug-19 bug-card" : ""}`}
                >
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
              <div
                className={`success-icon" ${bugList.includes("13") ? "bug-card bug-13" : ""}`}
              >
                {bugList.includes("13") ? "💩" : "🌸"}
              </div>
              <h2>報名成功！</h2>
              <p
                className={`${bugList.includes("14") ? "bug-card bug-14" : ""}`}
              >
                感謝您的報名，我們將於 {bugList.includes("14") ? "365" : "2"}{" "}
                個工作天內
                <br />
                寄送確認信與繳費資訊至您的信箱。
              </p>
            </div>
          ) : (
            <form className="form-section" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div
                  className={`form-group ${bugList.includes("16") ? "bug-card bug-16" : ""}`}
                >
                  <label htmlFor="name">姓名 NAME</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="您的姓名"
                    disabled={bugList.includes("16")}
                    required
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div
                  className={`form-group ${bugList.includes("10") ? "bug-card bug-10" : ""}`}
                >
                  <label htmlFor="phone">聯絡電話 PHONE</label>
                  <input
                    id="phone"
                    name="phone"
                    type={bugList.includes("10") ? "" : "tel"}
                    placeholder="09xx-xxx-xxx"
                    required
                    value={form.phone}
                    onChange={(e) => handleChange(e, true)}
                  />
                </div>
                <div
                  className={`form-group full ${bugList.includes("12") ? "bug-card bug-12" : ""}`}
                >
                  <label htmlFor="email">電子信箱 EMAIL</label>
                  <input
                    id="email"
                    name="email"
                    type={bugList.includes("12") ? "password" : "email"}
                    placeholder="example@email.com"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div
                  className={`form-group ${bugList.includes("11") ? "bug-card bug-11" : ""}`}
                >
                  <label htmlFor="count">報名人數 GUESTS</label>
                  <select
                    id="count"
                    name="count"
                    value={form.count}
                    onChange={handleChange}
                  >
                    {(bugList.includes("11")
                      ? ["a", "b", "c", "d", "e", "f"]
                      : [1, 2, 3, 4, 5, 6]
                    ).map((n) => (
                      <option key={n} value={n}>
                        {n} 人
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  className={`form-group ${bugList.includes("21") ? "bug-card bug-21" : ""}`}
                >
                  <label htmlFor="note">備註 NOTE</label>
                  <input
                    id="note"
                    name="note"
                    type="text"
                    disabled={bugList.includes("21")}
                    placeholder="素食需求、輪椅友善等"
                    value={form.note}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                className={`submit-btn ${bugList.includes("17") ? "bug-card bug-17" : ""} ${bugList.includes("23") ? "bug-card bug-23" : ""}`}
                type="submit"
                disabled={loading || bugList.includes("17")}
                onMouseEnter={handleBtnHover}
                style={{
                  position: "relative",
                  transform: `translate(${btnOffset.x}px, ${btnOffset.y}px)`,
                  transition: "transform 0.2s",
                }}
              >
                {loading ? "送出中…" : "確認報名 ✦ 春日限定"}
              </button>
            </form>
          )}
        </section>

        <footer>
          <p className={bugList.includes("25") ? "bug-card bug-25" : ""}>
            © 2026 春の櫻花祭 · 洽詢請來信 sakura@example.com
          </p>
          {/* ── Bug 25: 離奇免責聲明 ── */}
          {bugList.includes("25") && (
            <p style={{ fontSize: "0.6rem", color: "#aaa", marginTop: "4px" }}>
              本活動保留取消權利，費用不予退還。主辦方不對任何損失負責，包括但不限於時光倒流、平行宇宙穿越及花粉過敏。
            </p>
          )}
        </footer>
      </div>
    </div>
  );
}
