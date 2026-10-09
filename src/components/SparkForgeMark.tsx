"use client";

type Props = { size?: number; showWordmark?: boolean; className?: string };

export default function SparkForgeMark({ size = 28, showWordmark = false, className = "" }: Props) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" role="img">
        <defs>
          <linearGradient id="sf-mark" x1="8" y1="56" x2="56" y2="8" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#7C5CFF" />
            <stop offset=".52" stopColor="#28D7FF" />
            <stop offset="1" stopColor="#FF4FB3" />
          </linearGradient>
        </defs>
        <path d="M32 4 57 18v28L32 60 7 46V18L32 4Z" fill="url(#sf-mark)" opacity=".12" />
        <path d="M32 7 53 19v24L32 55 11 43V19L32 7Z" fill="none" stroke="url(#sf-mark)" strokeWidth="3" />
        <path d="M36 13 22 32h11l-5 19 14-22H31l5-16Z" fill="url(#sf-mark)" />
        <circle cx="51" cy="14" r="3" fill="#FF4FB3" />
        <circle cx="13" cy="49" r="2.5" fill="#28D7FF" />
      </svg>
      {showWordmark && <span className="text-[15px] font-semibold tracking-[-0.03em]">SparkForge</span>}
    </span>
  );
}
