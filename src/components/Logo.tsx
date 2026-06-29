import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Vellon home"
    >
      <span className="text-[17px] font-semibold tracking-tight text-white">
        Vellon
      </span>
    </Link>
  );
}
