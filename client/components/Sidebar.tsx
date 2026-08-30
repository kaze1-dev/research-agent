"use client";

import Link from "next/link";
import { useState } from "react";

const recentResearch = [
  {
    id: "1",
    title: "AI agent architectures",
  },
  {
    id: "2",
    title: "MCP protocol overview",
  },
  {
    id: "3",
    title: "RAG vs fine-tuning",
  },
];

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 mt-16 flex h-[calc(100vh-4rem)]
          flex-col border-r border-zinc-800 bg-zinc-950
          transition-all duration-200 ease-in-out
          md:static md:z-auto md:mt-0
          ${collapsed ? "md:w-[72px]" : "md:w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex items-center justify-end p-3">
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-900 hover:text-white md:flex"
          >
            {collapsed ? "→" : "←"}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-900 hover:text-white md:hidden"
          >
            x
          </button>
        </div>

        <div className="px-3 pb-4">
          <button
            type="button"
            title="New Research"
            className={`
              flex w-full items-center justify-center gap-2 rounded-lg
              bg-white py-2.5 text-sm font-medium text-zinc-950
              transition hover:bg-zinc-200
              ${collapsed ? "px-0" : "px-4"}
            `}
          >
            <span className="text-lg leading-none">+</span>

            {!collapsed && <span>New Research</span>}
          </button>
        </div>

        <nav className="px-3">
          <Link
            href="/"
            title="Research"
            onClick={() => setMobileOpen(false)}
            className={`
              flex items-center rounded-lg bg-zinc-900
              py-2.5 text-sm text-zinc-100
              ${collapsed ? "justify-center px-0" : "gap-3 px-3"}
            `}
          >
            <span>⌂</span>

            {!collapsed && <span>Research</span>}
          </Link>
        </nav>

        {/* History */}
        <div className="mt-6 flex-1 overflow-y-auto px-3">
          {!collapsed && (
            <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
              Recent Research
            </p>
          )}

          <div className="space-y-1">
            {recentResearch.map((research) => (
              <Link
                key={research.id}
                href={`/research/${research.id}`}
                title={research.title}
                onClick={() => setMobileOpen(false)}
                className={`
                  block truncate rounded-lg py-2.5 text-sm
                  text-zinc-400 transition hover:bg-zinc-900
                  hover:text-zinc-100
                  ${collapsed ? "px-2 text-center" : "px-3"}
                `}
              >
                {collapsed ? research.title.charAt(0) : research.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="border-t border-zinc-800 p-3">
          <button
            type="button"
            title="Settings"
            className={`
              flex w-full items-center rounded-lg py-2.5
              text-sm text-zinc-400 transition
              hover:bg-zinc-900 hover:text-zinc-100
              ${collapsed ? "justify-center px-0" : "gap-3 px-3"}
            `}
          >
            <span>⚙</span>

            {!collapsed && <span>Settings</span>}
          </button>
        </div>
      </aside>

      {/* <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
        className="fixed left-4 top-20 z-30 flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-300 shadow-lg hover:bg-zinc-900 md:hidden"
      >
        ☰
      </button> */}
    </>
  );
}