import Link from "next/link";

export default function Header() {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950">
      <div className="flex h-full items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-bold text-zinc-950">
            ✦
          </div>

          <span className="text-sm font-semibold text-zinc-100">
            Research Agent
          </span>
        </Link>

        <div className="flex items-center gap-3">
          

          <button
            type="button"
            aria-label="Settings"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
          >
            ⚙
          </button>

          <div className="h-8 w-8 rounded-full bg-zinc-800" />
        </div>
      </div>
    </header>
  );
}