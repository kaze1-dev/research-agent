"use client";

import { useState } from "react";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export default function ResearchWorkspace({
  onOpenSidebar,
}: {
  onOpenSidebar: () => void;
}) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  function handleSubmit() {
    const prompt = input.trim();

    if (!prompt) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: prompt,
    };

    const assistantMessage: Message = {
      id: Date.now() + 1,
      role: "assistant",
      content:
        "This is a hardcoded response for now. The research agent backend will be connected here later.",
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      assistantMessage,
    ]);

    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <section className="flex h-[calc(100vh-4rem)] min-w-0 flex-1 flex-col bg-zinc-950">
      {/* Workspace header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-800 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
  <button
    type="button"
    onClick={onOpenSidebar}
    aria-label="Open sidebar"
    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-900 hover:text-white md:hidden"
  >
    ☰
  </button>

  <div className="min-w-0">
    <h1 className="truncate text-sm font-semibold text-zinc-100">
      AI Agent Architectures
    </h1>

    <p className="text-xs text-zinc-500">
      Research session
    </p>
  </div>
</div>

        {/* <div className="flex items-center gap-2">
          <span className="hidden text-xs text-zinc-500 sm:inline">
            Ollama
          </span>

          <span className="h-2 w-2 rounded-full bg-emerald-500" />
        </div> */}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl space-y-8 px-4 py-8 sm:px-6">
          {messages.map((message) => {
            const isUser = message.role === "user";

            return (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!isUser && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-bold text-zinc-950">
                    ✦
                  </div>
                )}

                <div
                  className={`
                    max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7
                    sm:max-w-[75%]
                    ${
                      isUser
                        ? "bg-zinc-800 text-zinc-100"
                        : "text-zinc-300"
                    }
                  `}
                >
                  {message.content}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="shrink-0 border-t border-zinc-800 bg-zinc-950 px-4 py-4 sm:px-6">
        <div className="mx-auto w-full max-w-3xl">
          <div className="relative rounded-2xl border border-zinc-700 bg-zinc-900 shadow-lg transition focus-within:border-zinc-500">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something you want to research..."
              rows={2}
              className="w-full resize-none bg-transparent px-4 py-4 pr-14 text-sm text-zinc-100 outline-none placeholder:text-zinc-600"
            />

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!input.trim()}
              aria-label="Send research query"
              className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-30"
            >
              ↑
            </button>

            <div className="flex items-center gap-3 px-4 pb-3 text-xs text-zinc-600">
              <span>Enter to research</span>
              <span>•</span>
              <span>Shift + Enter for new line</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}