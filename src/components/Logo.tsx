import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-baseline gap-[0.45rem] ${className}`}
      aria-label="Vellon home"
    >
      <span className="text-[1.05rem] font-semibold tracking-[-0.03em] text-fg">
        Vellon
      </span>
      <span
        aria-hidden
        className="mb-[0.14rem] block h-[5px] w-[5px] bg-brass transition-transform duration-500 group-hover:translate-x-[3px]"
      />
    </Link>
  );
}
