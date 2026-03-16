// ─── Falling Petal Component ───────────────────────────────────────────────
export function Petal({
  style,
  onClick,
}: {
  style: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <div className="petal" style={style} onClick={onClick}>
      <svg viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 2C20 2 35 10 38 25C41 40 28 48 20 48C12 48 -1 40 2 25C5 10 20 2 20 2Z"
          fill="currentColor"
          opacity="0.85"
        />
        <path
          d="M20 2C20 2 18 20 20 48"
          stroke="white"
          strokeWidth="0.5"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}

export default Petal;
