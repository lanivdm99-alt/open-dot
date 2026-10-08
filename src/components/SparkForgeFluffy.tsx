"use client";

import { useId } from "react";
import type { DotStatus } from "@/lib/types";

type FluffyProps = {
  name?: string;
  status?: DotStatus;
  size?: number;
  className?: string;
};

type FluffyTheme = {
  body: string;
  light: string;
  accent: string;
  eye: string;
  accessory: "tie" | "bow" | "tablet" | "phone" | "headphones" | "clipboard" | "paint" | "goggles";
  tuft: number;
};

const THEMES: Record<string, FluffyTheme> = {
  Scout: { body: "#9fe0bf", light: "#e7fff2", accent: "#197c59", eye: "#2b8c68", accessory: "goggles", tuft: 24 },
  Forge: { body: "#fff0b2", light: "#fffaf0", accent: "#e39b16", eye: "#9b6810", accessory: "paint", tuft: 22 },
  Canvas: { body: "#c6a5ff", light: "#f2eaff", accent: "#7244d8", eye: "#6f4bd3", accessory: "paint", tuft: 26 },
  Listing: { body: "#ff8e8e", light: "#ffe9e9", accent: "#d52d3b", eye: "#b52c39", accessory: "clipboard", tuft: 25 },
  Pulse: { body: "#ff8ed0", light: "#ffe9f6", accent: "#d52a87", eye: "#a92171", accessory: "phone", tuft: 27 },
  Audience: { body: "#ffffff", light: "#ffffff", accent: "#4a70d8", eye: "#3c5fb8", accessory: "phone", tuft: 23 },
  Operator: { body: "#447cff", light: "#dfe9ff", accent: "#163eaa", eye: "#1e3f9e", accessory: "tie", tuft: 25 },
  Browser: { body: "#27b8f0", light: "#ddf8ff", accent: "#0677b2", eye: "#126b98", accessory: "headphones", tuft: 24 },
};

const FALLBACK: FluffyTheme = {
  body: "#ffb7cf", light: "#fff0f6", accent: "#d52d72", eye: "#6d2d57", accessory: "bow", tuft: 24,
};

function themeFor(name?: string) {
  return (name && THEMES[name]) || FALLBACK;
}

function hexMix(hex: string, other: string, amount: number) {
  const toRgb = (v: string) => [1, 3, 5].map((i) => parseInt(v.slice(i, i + 2), 16));
  const a = toRgb(hex);
  const b = toRgb(other);
  if (a.some(Number.isNaN) || b.some(Number.isNaN)) return hex;
  return "#" + a.map((v, i) => Math.round(v + (b[i] - v) * amount).toString(16).padStart(2, "0")).join("");
}

function FurTufts({ theme }: { theme: FluffyTheme }) {
  const points = Array.from({ length: theme.tuft }, (_, i) => {
    const angle = (i / theme.tuft) * Math.PI * 2;
    const rx = 35;
    const ry = 34;
    const x = 50 + Math.cos(angle) * rx;
    const y = 51 + Math.sin(angle) * ry;
    const tx = 50 + Math.cos(angle) * (rx + 7);
    const ty = 51 + Math.sin(angle) * (ry + 7);
    return <path key={i} d={`M${x} ${y} L${tx} ${ty}`} stroke={theme.body} strokeWidth="5.5" strokeLinecap="round" />;
  });
  return <g opacity=".98">{points}</g>;
}

function Accessory({ kind, theme }: { kind: FluffyTheme["accessory"]; theme: FluffyTheme }) {
  const ink = "#241d2b";
  switch (kind) {
    case "tie":
      return (
        <g>
          <path d="M46 70 L54 70 L57 91 L50 96 L43 91 Z" fill={theme.accent} stroke={ink} strokeWidth="2.3" />
          <circle cx="50" cy="69" r="4" fill={theme.accent} stroke={ink} strokeWidth="2" />
        </g>
      );
    case "bow":
      return (
        <g transform="translate(72 23) rotate(-12)">
          <ellipse cx="-8" cy="0" rx="9" ry="6.5" fill={theme.accent} stroke={ink} strokeWidth="2.3" />
          <ellipse cx="8" cy="0" rx="9" ry="6.5" fill={theme.accent} stroke={ink} strokeWidth="2.3" />
          <circle r="4" fill={theme.accent} stroke={ink} strokeWidth="2" />
        </g>
      );
    case "goggles":
      return (
        <g stroke={ink} strokeWidth="2.5">
          <path d="M25 40 Q50 34 75 40" fill="none" />
          <circle cx="37" cy="42" r="9" fill="#b9ecff" fillOpacity=".78" />
          <circle cx="63" cy="42" r="9" fill="#b9ecff" fillOpacity=".78" />
          <path d="M46 42 H54" />
        </g>
      );
    case "phone":
      return (
        <g transform="translate(69 60) rotate(12)">
          <rect x="0" y="0" width="14" height="25" rx="3" fill="#26344d" stroke={ink} strokeWidth="2" />
          <rect x="3" y="4" width="8" height="15" rx="1.5" fill={theme.light} />
          <circle cx="7" cy="22" r="1" fill="#fff" />
        </g>
      );
    case "tablet":
      return (
        <g transform="translate(67 48) rotate(8)">
          <rect x="0" y="0" width="25" height="19" rx="3" fill="#26344d" stroke={ink} strokeWidth="2.2" />
          <path d="M5 13 L10 9 L14 11 L20 5" fill="none" stroke={theme.accent} strokeWidth="2" />
        </g>
      );
    case "clipboard":
      return (
        <g transform="translate(68 52) rotate(7)">
          <rect x="0" y="0" width="19" height="24" rx="2.5" fill="#fff" stroke={ink} strokeWidth="2.2" />
          <rect x="5" y="-3" width="9" height="6" rx="2" fill={theme.accent} stroke={ink} strokeWidth="2" />
          <path d="M4 9 H15 M4 14 H15 M4 19 H11" stroke={theme.accent} strokeWidth="1.8" />
        </g>
      );
    case "paint":
      return (
        <g transform="translate(67 58) rotate(-8)">
          <ellipse cx="10" cy="12" rx="13" ry="9" fill="#fff" stroke={ink} strokeWidth="2" />
          {["#2463e8","#ef4b66","#f0a31a","#45bd76"].map((c, i) => <circle key={c} cx={5 + i * 4.5} cy={12 - (i % 2) * 2} r="2.4" fill={c} />)}
          <path d="M-1 5 L-10 -10" stroke={ink} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M-10 -10 L-12 -15" stroke="#d79a5b" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case "headphones":
      return (
        <g stroke={ink} strokeWidth="3.2" fill="none">
          <path d="M22 45 A28 28 0 0 1 78 45" />
          <rect x="18" y="43" width="10" height="16" rx="4" fill={theme.accent} />
          <rect x="72" y="43" width="10" height="16" rx="4" fill={theme.accent} />
        </g>
      );
  }
}

export default function SparkForgeFluffy({ name, status = "idle", size = 160, className }: FluffyProps) {
  const id = useId().replace(/:/g, "");
  const theme = themeFor(name);
  const ink = "#241d2b";
  const sleeping = status === "paused";
  const working = status === "working";
  const waiting = status === "waiting";
  const furShadow = hexMix(theme.body, "#000000", 0.12);
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center ${working ? "animate-[dot-bob_0.5s_ease-in-out_infinite]" : waiting ? "animate-[dot-bob_1.1s_ease-in-out_infinite]" : ""} ${className ?? ""}`}
      style={{ width: size, height: size, filter: sleeping ? "grayscale(.45)" : undefined }}
      aria-label={`${name ?? "SparkForge"} Fluffy`}
      title={`${name ?? "SparkForge"} Fluffy`}
    >
      <svg viewBox="0 0 100 110" width={size} height={size} role="img" aria-hidden="true">
        <defs>
          <radialGradient id={`fur-${id}`} cx=".35" cy=".25" r=".82">
            <stop offset="0" stopColor={theme.light} />
            <stop offset=".48" stopColor={theme.body} />
            <stop offset="1" stopColor={furShadow} />
          </radialGradient>
        </defs>
        <ellipse cx="50" cy="98" rx="30" ry="5.5" fill="#000" opacity=".08" />
        <FurTufts theme={theme} />
        <ellipse cx="50" cy="51" rx="35" ry="34" fill={`url(#fur-${id})`} stroke={ink} strokeWidth="2.5" />
        <ellipse cx="35" cy="90" rx="14" ry="8" fill={theme.accent} stroke={ink} strokeWidth="2.5" transform="rotate(-8 35 90)" />
        <ellipse cx="65" cy="90" rx="14" ry="8" fill={theme.accent} stroke={ink} strokeWidth="2.5" transform="rotate(8 65 90)" />
        <ellipse cx="18" cy="63" rx="10" ry="7" fill={theme.body} stroke={ink} strokeWidth="2.5" transform="rotate(-22 18 63)" />
        <ellipse cx="82" cy="63" rx="10" ry="7" fill={theme.body} stroke={ink} strokeWidth="2.5" transform="rotate(22 82 63)" />
        <ellipse cx="39" cy="47" rx="8" ry="11" fill={ink} />
        <ellipse cx="61" cy="47" rx="8" ry="11" fill={ink} />
        <ellipse cx="39" cy="51" rx="6" ry="6.5" fill={theme.eye} />
        <ellipse cx="61" cy="51" rx="6" ry="6.5" fill={theme.eye} />
        <circle cx="36.5" cy="43.5" r="2.8" fill="#fff" />
        <circle cx="58.5" cy="43.5" r="2.8" fill="#fff" />
        <ellipse cx="29" cy="59" rx="6" ry="3.1" fill={theme.accent} opacity=".28" />
        <ellipse cx="71" cy="59" rx="6" ry="3.1" fill={theme.accent} opacity=".28" />
        <path d="M46 61 Q50 65 54 61" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
        <Accessory kind={theme.accessory} theme={theme} />
        {waiting && <circle cx="78" cy="20" r="5" fill="#f0a31a" stroke={ink} strokeWidth="2" />}
        {working && <path d="M82 20 L86 24 L82 28 L78 24 Z" fill="#51a2ff" stroke={ink} strokeWidth="1.5" />}
      </svg>
    </span>
  );
}
