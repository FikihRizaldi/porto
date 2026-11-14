"use client";

/**
 * GlobalBackground
 * - Fixed background layer behind ALL sections.
 * - Blueprint grid + subtle ambient glow + 3-orbit space artwork SVG.
 * - Sized cleanly (min(780px, 82vw)) so it elegantly frames the card stack
 *   without being overly massive or overflowing into headers/footers.
 * - NO conveyor belt here — that lives only inside Hero.tsx.
 */
export default function GlobalBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
      style={{ overflow: "hidden" }}
    >
      {/* 1. Blueprint Graph Paper Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.16) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.16) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
      />

      {/* 2. Soft Ambient Indigo Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2"
        style={{
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "500px",
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.06) 45%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />

      {/* 3. SPACE ARTWORK: 3 orbit ellipses + 6 traveling dots.
              Proportionally sized (780px max / 82vw) to frame the card stack perfectly. */}
      <svg
        className="space-artwork"
        width="1150"
        height="655"
        viewBox="0 0 1150 655"
        fill="none"
        style={{
          position: "absolute",
          top: "48%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(780px, 82vw)",
          height: "auto",
          animation: "40s ease-in-out infinite alternate space-drift",
        }}
      >
        {/* Orbit 1 */}
        <g>
          <path
            d="M1136.13 246.893C1143.46 296.612 898.052 374.001 587.986 419.744C277.921 465.488 20.6165 462.265 13.2814 412.545C5.94629 362.825 251.358 285.437 561.423 239.693C871.489 193.95 1128.79 197.173 1136.13 246.893Z"
            stroke="#64748B"
            strokeWidth="1.25"
            strokeOpacity="0.75"
          />
          <circle
            className="orbit-dot"
            r="7"
            fill="#4F46E5"
            style={{
              offsetPath:
                "path('M1136.13 246.893C1143.46 296.612 898.052 374.001 587.986 419.744C277.921 465.488 20.6165 462.265 13.2814 412.545C5.94629 362.825 251.358 285.437 561.423 239.693C871.489 193.95 1128.79 197.173 1136.13 246.893Z')",
              // @ts-expect-error CSS custom props
              "--orbit-duration": "72s",
              "--orbit-delay": "-32.4s",
            }}
          />
          <circle
            className="orbit-dot"
            r="5.5"
            fill="#6366F1"
            style={{
              offsetPath:
                "path('M1136.13 246.893C1143.46 296.612 898.052 374.001 587.986 419.744C277.921 465.488 20.6165 462.265 13.2814 412.545C5.94629 362.825 251.358 285.437 561.423 239.693C871.489 193.95 1128.79 197.173 1136.13 246.893Z')",
              // @ts-expect-error CSS custom props
              "--orbit-duration": "72s",
              "--orbit-delay": "-55s",
            }}
          />
        </g>

        {/* Orbit 2 */}
        <g>
          <path
            d="M1129.09 452.786C1119.3 490.346 865.498 456.717 562.207 377.674C258.916 298.631 20.9852 204.107 30.7737 166.548C40.5623 128.989 294.363 162.618 597.654 241.66C900.945 320.703 1138.88 415.227 1129.09 452.786Z"
            stroke="#64748B"
            strokeWidth="1.25"
            strokeOpacity="0.75"
          />
          <circle
            className="orbit-dot"
            r="7"
            fill="#4F46E5"
            style={{
              offsetPath:
                "path('M1129.09 452.786C1119.3 490.346 865.498 456.717 562.207 377.674C258.916 298.631 20.9852 204.107 30.7737 166.548C40.5623 128.989 294.363 162.618 597.654 241.66C900.945 320.703 1138.88 415.227 1129.09 452.786Z')",
              // @ts-expect-error CSS custom props
              "--orbit-duration": "86s",
              "--orbit-delay": "-6.88s",
            }}
          />
          <circle
            className="orbit-dot"
            r="5.5"
            fill="#818CF8"
            style={{
              offsetPath:
                "path('M1129.09 452.786C1119.3 490.346 865.498 456.717 562.207 377.674C258.916 298.631 20.9852 204.107 30.7737 166.548C40.5623 128.989 294.363 162.618 597.654 241.66C900.945 320.703 1138.88 415.227 1129.09 452.786Z')",
              // @ts-expect-error CSS custom props
              "--orbit-duration": "86s",
              "--orbit-delay": "-47.3s",
            }}
          />
        </g>

        {/* Orbit 3 */}
        <g>
          <path
            d="M1001.67 125.449C1033.34 194.733 861.226 341.3 617.244 452.816C373.262 564.333 149.804 598.569 118.137 529.286C86.4693 460.002 258.584 313.435 502.566 201.918C746.548 90.4019 970.006 56.1654 1001.67 125.449Z"
            stroke="#64748B"
            strokeWidth="1.25"
            strokeOpacity="0.75"
          />
          <circle
            className="orbit-dot"
            r="7"
            fill="#4F46E5"
            style={{
              offsetPath:
                "path('M1001.67 125.449C1033.34 194.733 861.226 341.3 617.244 452.816C373.262 564.333 149.804 598.569 118.137 529.286C86.4693 460.002 258.584 313.435 502.566 201.918C746.548 90.4019 970.006 56.1654 1001.67 125.449Z')",
              // @ts-expect-error CSS custom props
              "--orbit-duration": "96s",
              "--orbit-delay": "-49.92s",
            }}
          />
          <circle
            className="orbit-dot"
            r="5.5"
            fill="#6366F1"
            style={{
              offsetPath:
                "path('M1001.67 125.449C1033.34 194.733 861.226 341.3 617.244 452.816C373.262 564.333 149.804 598.569 118.137 529.286C86.4693 460.002 258.584 313.435 502.566 201.918C746.548 90.4019 970.006 56.1654 1001.67 125.449Z')",
              // @ts-expect-error CSS custom props
              "--orbit-duration": "96s",
              "--orbit-delay": "-80s",
            }}
          />
        </g>
      </svg>
    </div>
  );
}
