import type { ServiceId } from "../content/types";

const INK = "#0d0d0d";
const line = { fill: "none", stroke: INK, strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** One small illustration per service, drawn as SVG. Decorative. */
const ART: Record<ServiceId, React.ReactNode> = {
  web: (
    <>
      <rect x="22" y="10" width="196" height="120" rx="10" fill="#fff" stroke={INK} strokeWidth="3" />
      <path d="M22 34h196" {...line} />
      <circle cx="36" cy="22" r="3.5" fill={INK} /><circle cx="48" cy="22" r="3.5" fill={INK} /><circle cx="60" cy="22" r="3.5" fill={INK} />
      <rect x="36" y="48" width="84" height="12" rx="6" fill={INK} />
      <rect x="36" y="68" width="60" height="8" rx="4" fill="#d9d3c3" />
      <rect x="36" y="88" width="56" height="20" rx="10" fill="#c8ff3a" stroke={INK} strokeWidth="2.5" />
      <rect x="134" y="46" width="70" height="66" rx="8" fill="#0d0d0d" />
      <circle cx="169" cy="72" r="14" fill="#c8ff3a" />
    </>
  ),
  app: (
    <>
      <rect x="84" y="4" width="72" height="132" rx="15" fill={INK} stroke="#fff" strokeWidth="3" />
      <rect x="108" y="10" width="24" height="5" rx="2.5" fill="#fff" />
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
        <rect key={`${r}${c}`} x={94 + c * 20} y={30 + r * 24} width="16" height="16" rx="5" fill={["#c8ff3a", "#c8ff3a", "#c8ff3a", "#0d0d0d", "#c8ff3a", "#fff", "#b9b2a2", "#c8ff3a", "#c8ff3a"][r * 3 + c]} />
      )))}
      <rect x="98" y="106" width="44" height="14" rx="7" fill="#c8ff3a" />
    </>
  ),
  marketing: (
    <>
      <rect x="22" y="14" width="196" height="112" rx="10" fill="#fff" stroke={INK} strokeWidth="3" />
      <rect x="44" y="82" width="22" height="30" rx="4" fill="#d9d3c3" />
      <rect x="80" y="66" width="22" height="46" rx="4" fill="#b9b2a2" />
      <rect x="116" y="52" width="22" height="60" rx="4" fill="#0d0d0d" />
      <rect x="152" y="34" width="22" height="78" rx="4" fill={INK} />
      <path d="M44 62l36-18 36 8 48-26" {...line} stroke="#c8ff3a" />
      <path d="M168 24h16v16" {...line} stroke="#c8ff3a" />
    </>
  ),
  software: (
    <>
      <rect x="22" y="10" width="196" height="120" rx="10" fill={INK} stroke="#fff" strokeWidth="3" />
      <rect x="40" y="30" width="40" height="8" rx="4" fill="#c8ff3a" />
      <rect x="88" y="30" width="64" height="8" rx="4" fill="#fff" />
      <rect x="54" y="50" width="70" height="8" rx="4" fill="#c8ff3a" />
      <rect x="132" y="50" width="36" height="8" rx="4" fill="#b9b2a2" />
      <rect x="54" y="70" width="48" height="8" rx="4" fill="#fff" />
      <rect x="110" y="70" width="60" height="8" rx="4" fill="#c8ff3a" />
      <rect x="40" y="90" width="84" height="8" rx="4" fill="#b9b2a2" />
      <path d="M176 100l-10-10 10-10M196 80l10 10-10 10" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  branding: (
    <>
      <circle cx="92" cy="66" r="46" fill="#fff" stroke={INK} strokeWidth="3" />
      <rect x="104" y="40" width="80" height="80" rx="12" fill={INK} stroke="#fff" strokeWidth="3" />
      <path d="M150 18l34 52h-68z" fill="#c8ff3a" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <circle cx="40" cy="120" r="8" fill="#0d0d0d" stroke={INK} strokeWidth="2.5" />
      <circle cx="62" cy="120" r="8" fill="#c8ff3a" stroke={INK} strokeWidth="2.5" />
      <circle cx="84" cy="120" r="8" fill="#c8ff3a" stroke={INK} strokeWidth="2.5" />
    </>
  ),
  content: (
    <>
      <rect x="88" y="4" width="64" height="106" rx="12" fill="#fff" stroke={INK} strokeWidth="3" />
      <rect x="96" y="12" width="48" height="76" rx="6" fill="#0d0d0d" />
      <path d="M112 38l20 12-20 12z" fill="#c8ff3a" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="96" y="96" width="48" height="5" rx="2.5" fill="#d9d3c3" />
      <rect x="96" y="96" width="26" height="5" rx="2.5" fill="#c8ff3a" />
      <rect x="28" y="40" width="44" height="60" rx="8" fill="#c8ff3a" stroke={INK} strokeWidth="3" />
      <rect x="168" y="40" width="44" height="60" rx="8" fill="#c8ff3a" stroke={INK} strokeWidth="3" />
      <rect x="20" y="124" width="200" height="6" rx="3" fill={INK} opacity="0.25" />
    </>
  ),
};

export default function ServiceArt({ id }: { id: ServiceId }) {
  return (
    <svg className="art" viewBox="0 0 240 140" aria-hidden="true" focusable="false">
      {ART[id]}
    </svg>
  );
}
