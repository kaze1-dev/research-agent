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
   const [isLoading, setIsLoading] = useState(false);

   async function handleSubmit() {
      const prompt = input.trim();

      if (!prompt || isLoading) return;

      const userMessage: Message = {
         id: Date.now(),
         role: "user",
         content: prompt,
      };

      const assistantMessageId = Date.now() + 1;

      setMessages((currentMessages) => [
         ...currentMessages,
         userMessage,
         {
            id: assistantMessageId,
            role: "assistant",
            content: "",
         },
      ]);

      setInput("");
      setIsLoading(true);

      try {
         const response = await fetch(
            `http://localhost:8000/research?query=${encodeURIComponent(prompt)}`,
            {
               method: "POST",
               headers: {
                  Accept: "text/event-stream",
               },
            }
         );

         if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
         }

         if (!response.body) {
            throw new Error("Response body is not available.");
         }

         const reader = response.body.getReader();
         const decoder = new TextDecoder();

         let buffer = "";

         while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            const events = buffer.split(/\r?\n\r?\n/);

            buffer = events.pop() ?? "";

            for (const event of events) {
               const lines = event.split(/\r?\n/);

               let eventType = "message";
               const dataLines: string[] = [];

               for (const line of lines) {
                  if (line.startsWith("event:")) {
                     eventType = line.slice("event:".length).trim();
                  }

                  if (line.startsWith("data:")) {
                     dataLines.push(line.slice("data:".length));
                  }
               }

               const data = dataLines.join("\n");

               if (eventType === "message" && data) {
                  setMessages((currentMessages) =>
                     currentMessages.map((message) =>
                        message.id === assistantMessageId
                           ? {
                              ...message,
                              content: message.content + data,
                           }
                           : message
                     )
                  );
               }
            }
         }
      } catch (error) {
         console.error("Research request failed:", error);

         setMessages((currentMessages) =>
            currentMessages.map((message) =>
               message.id === assistantMessageId
                  ? {
                     ...message,
                     content:
                        "Something went wrong while researching your query. Please try again.",
                  }
                  : message
            )
         );
      } finally {
         setIsLoading(false);
      }
   }

   function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
      if (e.key === "Enter" && !e.shiftKey) {
         e.preventDefault();
         handleSubmit();
      }
   }

   return (
      <section className="flex h-[calc(100vh-4rem)] min-w-0 flex-1 flex-col bg-zinc-950">
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

                  <p className="text-xs text-zinc-500">Research session</p>
               </div>
            </div>
         </div>

         {/* Messages */}
         <div className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-3xl space-y-8 px-4 py-8 sm:px-6">
               {messages.map((message) => {
                  const isUser = message.role === "user";

                  return (
                     <div
                        key={message.id}
                        className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"
                           }`}
                     >
                        <div
                           className={`
                    max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7
                    sm:max-w-[75%]
                    ${isUser
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

               {isLoading && (
                  <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-zinc-400" />
               )}
            </div>
         </div>

         {/* Input */}
         <div className="shrink-0 border-t border-zinc-800 bg-zinc-950 px-4 py-4 sm:px-6">
            <div className="mx-auto w-full max-w-3xl">
               <div className="relative rounded-2xl border border-zinc-700 bg-zinc-900 shadow-lg transition focus-within:border-zinc-500">
                  <textarea
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     onKeyDown={handleKeyDown}
                     placeholder="Ask something you want to research..."
                     rows={2}
                     disabled={isLoading}
                     className="w-full resize-none bg-transparent px-4 py-4 pr-14 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 disabled:opacity-50"
                  />

                  <button
                     type="button"
                     onClick={handleSubmit}
                     disabled={!input.trim() || isLoading}
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