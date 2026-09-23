import Link from "next/link";

export function LanternMark({ className = "size-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" aria-hidden="true">
      <path d="m12 2 10 10-10 10L2 12ZM12 7l5 5-5 5-5-5Z" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 rounded-sm font-display text-2xl font-semibold tracking-[-0.04em] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
      <span className="text-primary">
        <LanternMark />
      </span>
      lantern
      <span className="ml-1 border border-[#647160] px-1.5 py-1 font-mono text-[9px] font-normal tracking-[0.2em] text-[#b8c2b2]">UI</span>
    </Link>
  );
}
