import Link from "next/link";
import { LuSettings, LuRadar } from "react-icons/lu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-zinc-800/80 bg-zinc-950 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-5 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 transition-colors group-hover:border-zinc-600">
            <LuRadar
              size={19}
              strokeWidth={1.8}
              className="text-zinc-200"
            />
          </div>

          <div>
            <p className="text-sm font-semibold tracking-tight text-zinc-100">
              Research Agent
            </p>
            <p className="text-[11px] text-zinc-500">
              AI-powered research
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Settings"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition-all hover:bg-zinc-900 hover:text-zinc-200 active:scale-95"
          >
            <LuSettings size={17} strokeWidth={1.8} />
          </button>

          <div className="mx-1 h-5 w-px bg-zinc-800" />

          <button
            type="button"
            aria-label="Profile"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-xs font-medium text-zinc-300 transition-all hover:border-zinc-600 hover:bg-zinc-700 hover:text-white active:scale-95"
          >
            RA
          </button>
        </div>
      </div>
    </header>
  );
}