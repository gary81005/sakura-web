import { Suspense } from "react";
import PetalRain from "../components/PetalRain";
import Link from "next/link";

function SuccessContent() {
  return (
    <>
      <PetalRain />
      <div className="result-page flex items-center justify-center h-[80vh]">
        <div className="h-full flex items-center justify-center flex-col result-card success-card">
          {/* Icon */}
          <div className="result-icon text-2xl">🌸</div>

          {/* Title */}
          <h1 className="result-title text-2xl font-bold">挑戰成功！</h1>

          {/* Actions */}
          <Link href="/">
            <button className="submit-btn">回到首頁</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
