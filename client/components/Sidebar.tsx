"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LuChevronLeft,
  LuChevronRight,
  LuClock3,
  LuFileSearch,
  LuHistory,
  LuMenu,
  LuPlus,
  LuSearch,
  LuSettings,
  LuX,
} from "react-icons/lu";

const recentResearch = [
  {
    id: "1",
    title: "How do AI agents use MCP?",
    group: "Today",
  },
  {
    id: "2",
    title: "Latest developments in RAG",
    group: "Today",
  },
  {
    id: "3",
    title: "Open-source LLMs for agents",
    group: "Today",
  },
  {
    id: "4",
    title: "AI agent architectures",
    group: "Yesterday",
  },
  {
    id: "5",
    title: "RAG vs fine-tuning",
    group: "Yesterday",
  },
  {
    id: "6",
    title: "FastAPI SSE streaming",
    group: "Yesterday",
  },
  {
    id: "7",
    title: "LangGraph state management",
    group: "Previous 7 days",
  },
  {
    id: "8",
    title: "Multi-agent systems",
    group: "Previous 7 days",
  },
  {
    id: "9",
    title: "Local LLM inference",
    group: "Previous 7 days",
  },
];

const historyGroups = ["Today", "Yesterday", "Previous 7 days"];

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
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 mt-16
          flex h-[calc(100vh-4rem)] flex-col
          border-r border-zinc-800/80
          bg-zinc-950
          transition-[width,transform] duration-200 ease-in-out

          md:static md:z-auto md:mt-0

          ${collapsed ? "md:w-[72px]" : "md:w-64"}

          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div
          className={`
            flex h-14 items-center
            border-b border-zinc-800/60
            px-3
            ${collapsed ? "justify-center" : "justify-between"}
          `}
        >
          {!collapsed && (
            <div className="flex items-center gap-2.5 px-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 text-zinc-400">
                <LuHistory size={15} strokeWidth={1.8} />
              </div>

              <span className="text-xs font-medium text-zinc-400">
                Research
              </span>
            </div>
          )}

          {/* Desktop collapse */}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="
              hidden h-8 w-8 items-center justify-center
              rounded-lg text-zinc-500
              transition-colors
              hover:bg-zinc-900 hover:text-zinc-200
              md:flex
            "
          >
            {collapsed ? (
              <LuChevronRight size={17} />
            ) : (
              <LuChevronLeft size={17} />
            )}
          </button>

          {/* Mobile close */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
            className="
              flex h-8 w-8 items-center justify-center
              rounded-lg text-zinc-500
              transition-colors
              hover:bg-zinc-900 hover:text-zinc-200
              md:hidden
            "
          >
            <LuX size={17} />
          </button>
        </div>

        {/* New research */}
        <div className="p-3">
          <button
            type="button"
            title="New Research"
            className={`
              flex h-10 w-full items-center
              rounded-lg
              bg-zinc-100
              text-sm font-medium text-zinc-950
              shadow-sm
              transition-all
              hover:bg-white
              active:scale-[0.98]

              ${collapsed ? "justify-center" : "gap-2.5 px-3"}
            `}
          >
            <LuPlus size={17} strokeWidth={2} />

            {!collapsed && <span>New Research</span>}
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-3">
          <Link
            href="/"
            title="Research"
            onClick={() => setMobileOpen(false)}
            className={`
              group flex h-10 items-center rounded-lg
              bg-zinc-900/80
              text-sm font-medium text-zinc-200
              transition-colors
              hover:bg-zinc-900

              ${collapsed ? "justify-center" : "gap-3 px-3"}
            `}
          >
            <LuFileSearch
              size={17}
              strokeWidth={1.8}
              className="text-zinc-400 transition-colors group-hover:text-zinc-200"
            />

            {!collapsed && <span>Research</span>}
          </Link>
        </nav>

        {/* History */}
        <div className="mt-5 flex min-h-0 flex-1 flex-col">
          {!collapsed && (
            <div className="flex items-center justify-between px-5 pb-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-600">
                Recent
              </span>

              <button
                type="button"
                aria-label="Search history"
                title="Search history"
                className="
                  flex h-7 w-7 items-center justify-center
                  rounded-md text-zinc-600
                  transition-colors
                  hover:bg-zinc-900 hover:text-zinc-300
                "
              >
                <LuSearch size={14} />
              </button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-3 pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800">
            {collapsed ? (
              <div className="flex flex-col items-center gap-1">
                {recentResearch.map((research) => (
                  <Link
                    key={research.id}
                    href={`/research/${research.id}`}
                    title={research.title}
                    onClick={() => setMobileOpen(false)}
                    className="
                      flex h-9 w-9 items-center justify-center
                      rounded-lg
                      text-xs font-medium text-zinc-500
                      transition-colors
                      hover:bg-zinc-900 hover:text-zinc-200
                    "
                  >
                    {research.title.charAt(0)}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-5">
                {historyGroups.map((group) => {
                  const items = recentResearch.filter(
                    (research) => research.group === group,
                  );

                  return (
                    <div key={group}>
                      <div className="mb-1 px-2">
                        <span className="text-[11px] font-medium text-zinc-600">
                          {group}
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        {items.map((research) => (
                          <Link
                            key={research.id}
                            href={`/research/${research.id}`}
                            title={research.title}
                            onClick={() => setMobileOpen(false)}
                            className="
                              group flex h-9 w-full items-center
                              gap-2.5 rounded-lg px-2.5
                              text-[13px] text-zinc-500
                              transition-colors
                              hover:bg-zinc-900
                              hover:text-zinc-200
                            "
                          >
                            <LuClock3
                              size={14}
                              strokeWidth={1.7}
                              className="
                                shrink-0 text-zinc-700
                                transition-colors
                                group-hover:text-zinc-500
                              "
                            />

                            <span className="truncate">
                              {research.title}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-zinc-800/60 p-3">
          <button
            type="button"
            title="Settings"
            className={`
              flex h-10 w-full items-center
              rounded-lg
              text-sm text-zinc-500
              transition-colors
              hover:bg-zinc-900
              hover:text-zinc-200

              ${collapsed ? "justify-center" : "gap-3 px-3"}
            `}
          >
            <LuSettings size={17} strokeWidth={1.8} />

            {!collapsed && <span>Settings</span>}
          </button>
        </div>
      </aside>
    </>
  );
}