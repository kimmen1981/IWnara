import type { ShopProduct } from "@/lib/shop-config";

// Neutral vector placeholders, never presented as photographs of the products.
export function ProductIllustration({ kind }: { kind: ShopProduct["illustration"] }) {
  return <div className="relative mb-5 flex h-44 items-center justify-center rounded-md border border-white/5 bg-[radial-gradient(ellipse_at_center,#30302d_0%,#151514_70%)] sm:h-48">
    <svg viewBox="0 0 240 180" className="h-full w-60" fill="none" aria-hidden="true">
      <ellipse cx="120" cy="160" rx="64" ry="8" fill="#090909" opacity=".7" />
      {kind === "pouch" ? <><path d="M77 22H163L175 151Q120 169 65 151Z" fill="#292a28" stroke="#777872" /><path d="M78 29H162M78 35H162" stroke="#aaa99e" /><path d="M76 63H164L169 132H71Z" fill="#d8d7ce" /></> : <><rect x={kind === "tub" ? 62 : 79} y="40" width={kind === "tub" ? 116 : 82} height="118" rx="14" fill="#292a28" stroke="#777872" /><rect x={kind === "tub" ? 60 : 78} y="24" width={kind === "tub" ? 120 : 84} height="26" rx="5" fill="#555650" stroke="#aaa99e" /><path d="M88 30V43M96 30V43M104 30V43M112 30V43M120 30V43M128 30V43M136 30V43M144 30V43M152 30V43" stroke="#777872" /><rect x={kind === "tub" ? 63 : 80} y="72" width={kind === "tub" ? 114 : 80} height="65" fill="#d8d7ce" /></>}
      <path d="M108 95H132M108 102H132M114 116H126" stroke="#575851" strokeWidth="3" />
    </svg>
    <span className="absolute bottom-2 right-3 text-[10px] text-muted">Illustration</span>
  </div>;
}
