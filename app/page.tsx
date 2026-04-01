"use client";

import React, { useState, useEffect, useMemo } from "react";
import PetalRain from "./components/PetalRain";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import Image from "next/image";
import Link from "next/link";

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function SakuraEventPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

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

  const [bugList, setBugList] = useState<string[]>([]);
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
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bugList.includes("23")) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <PetalRain isBug={bugList.includes("6")} />
      <div
        className={`flex min-h-[600px] items-center justify-center page-wrap ${visible ? "visible" : ""}`}
      >
        <Link href="/answer">
          <button className="submit-btn">{"進入活動！"}</button>
        </Link>
      </div>
    </>
  );
}
