import Link from "next/link";

export function Logo({
  className = "",
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "paper";
}) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-baseline gap-[0.42rem] ${className}`}
      aria-label="Vellon home"
    >
      <span
        className={`display text-[1.45rem] leading-none ${
          tone === "paper" ? "text-paper" : "text-ink"
        }`}
        style={{ letterSpacing: "-0.03em" }}
      >
        Vellon
      </span>
      <span
        aria-hidden
        className="mb-[0.18rem] block h-[5px] w-[5px] rounded-full bg-accent transition-transform duration-500 group-hover:translate-x-[3px]"
      />
    </Link>
  );
}
