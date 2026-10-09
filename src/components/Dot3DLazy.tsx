"use client";

import { Component, useSyncExternalStore, type ReactNode } from "react";
import dynamic from "next/dynamic";
import DotOrb from "./DotOrb";
import SparkForgeFluffy from "./SparkForgeFluffy";
import type { DotStatus, Look } from "@/lib/types";

type Props = { look: Look; name?: string; status?: DotStatus; size?: number; stage?: boolean; className?: string };

const SPARKFORGE_NAMES = new Set(["Scout", "Forge", "Canvas", "Listing", "Pulse", "Audience", "Operator", "Browser"]);

// WebGL only on the client. SparkForge agents use their dedicated Fluffy characters.
const Dot3D = dynamic(() => import("./Dot3D"), { ssr: false, loading: () => null });

let webgl: boolean | null = null;
function detectWebGL(): boolean {
  if (webgl === null) {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
      webgl = !!gl;
      (gl as WebGLRenderingContext | null)?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      webgl = false;
    }
  }
  return webgl;
}
const noop = () => () => {};

class Fallback extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function Dot3DLazy({ look, name, status, size = 160, stage, className }: Props) {
  const canRender3D = useSyncExternalStore(noop, detectWebGL, () => false);
  const isSparkForge = !!name && SPARKFORGE_NAMES.has(name);

  if (isSparkForge) {
    return (
      <div className={`relative shrink-0 ${className ?? ""}`} style={{ width: size, height: size }}>
        <SparkForgeFluffy name={name} status={status} size={size} />
      </div>
    );
  }

  const orb = (
    <div className="absolute inset-0 flex items-center justify-center">
      <DotOrb look={look} name={name} status={status} size={size * 0.72} />
    </div>
  );
  return (
    <div className={`relative shrink-0 ${className ?? ""}`} style={{ width: size, height: size }}>
      {canRender3D ? (
        <Fallback fallback={orb}>
          <Dot3D look={look} status={status} size={size} stage={stage} className="absolute inset-0" />
        </Fallback>
      ) : (
        orb
      )}
    </div>
  );
}
