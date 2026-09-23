import * as React from "react";

import { cn } from "@/lib/utils";

type OrbitRingProps = React.ComponentProps<"span"> & {
  /** Ring width in px or any CSS length. */
  width?: number | string;
  /** Ring height in px or any CSS length. Defaults to the width (a circle). */
  height?: number | string;
  /** Tilt in degrees. */
  rotation?: number;
  /** Offset from the center of the layer, in px. */
  x?: number;
  y?: number;
  /** Slowly rotate the ring. Skipped when the visitor prefers reduced motion. */
  spin?: boolean;
  /** Seconds per full turn when spinning. */
  duration?: number;
  reverse?: boolean;
};

const toLength = (v: number | string) => (typeof v === "number" ? `${v}px` : v);

/** One dashed elliptical ring. Use inside Orbit to build your own arrangement. */
function OrbitRing({
  className,
  style,
  width = 450,
  height,
  rotation = -20,
  x = 0,
  y = 0,
  spin = false,
  duration = 120,
  reverse = false,
  ...props
}: OrbitRingProps) {
  return (
    <span
      data-slot="orbit-ring"
      className={cn(
        "absolute top-1/2 left-1/2 block max-w-full rounded-full border border-dashed border-[#5a633b60]",
        spin && "motion-safe:animate-spin",
        className,
      )}
      style={{
        width: toLength(width),
        height: toLength(height ?? width),
        translate: `calc(-50% + ${x}px) calc(-50% + ${y}px)`,
        rotate: `${rotation}deg`,
        ...(spin ? { animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" } : null),
        ...style,
      }}
      {...props}
    />
  );
}

type OrbitProps = React.ComponentProps<"div"> & {
  /** Number of generated rings. Ignored when you pass OrbitRing children. */
  count?: number;
  /** Width of the outer ring in px. Each next ring gets narrower and taller, like the Lantern hero. */
  size?: number;
  /** Tilt of every ring in degrees. */
  rotation?: number;
  /** Slowly rotate the rings, alternating direction. Respects prefers-reduced-motion. */
  spin?: boolean;
  /** Seconds per full turn for the outer ring. */
  duration?: number;
  /** Extra classes for every generated ring, such as a border color. */
  ringClassName?: string;
};

/**
 * The dashed orbit rings behind the Lantern hero terminal. A decorative, absolutely positioned
 * layer: put it inside a relative parent, before the content it sits behind.
 */
function Orbit({
  className,
  children,
  count = 2,
  size = 450,
  rotation = -20,
  spin = false,
  duration = 120,
  ringClassName,
  ...props
}: OrbitProps) {
  return (
    <div
      data-slot="orbit"
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 select-none", className)}
      {...props}
    >
      {children ??
        Array.from({ length: count }, (_, i) => (
          <OrbitRing
            key={i}
            width={Math.round(size * (1 - 0.22 * i))}
            height={Math.round(size * (1 + 0.11 * i))}
            x={Math.round(size * 0.07 * i)}
            y={Math.round(-size * 0.03 * i)}
            rotation={rotation}
            spin={spin}
            duration={duration + i * 30}
            reverse={i % 2 === 1}
            className={ringClassName}
          />
        ))}
    </div>
  );
}

export { Orbit, OrbitRing };
