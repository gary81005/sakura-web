"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CountdownTimerProps {
  seconds: number; // 倒數秒數
  redirectTo: string; // 時間到導向的路徑，例如 "/result"
  onComplete?: () => void; // 可選：時間到的 callback（導向前觸發）
}

export default function Countdown({
  seconds,
  redirectTo,
  onComplete,
}: CountdownTimerProps) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete?.();
      router.push(redirectTo);
      return;
    }

    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, redirectTo, onComplete, router]);

  // 計算進度百分比（給圓形進度條用）
  const progress = timeLeft / seconds;
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="countdown-wrapper flex flex-col ml-auto items-center justify-center w-full h-[200px]">
      <svg viewBox="0 0 100 100" className="countdown-ring">
        {/* 背景圓 */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="var(--sakura-light, #fce4ec)"
          strokeWidth="6"
        />
        {/* 進度圓 */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="var(--sakura-dark, #ad1457)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
        {/* 數字 */}
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="14"
          fontWeight="700"
          fill="var(--text-dark, #2d1b1e)"
        >
          {timeLeft}
        </text>
      </svg>
      <p className="countdown-label">
        {timeLeft > 0 ? `${timeLeft} 秒後跳轉` : "跳轉中…"}
      </p>
    </div>
  );
}
