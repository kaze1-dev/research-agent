"use client"
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ResearchWorkspace from "@/components/research-workspace";
import { useState } from "react"

export default function Home() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />

      <div className="flex">
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          setMobileOpen={setMobileSidebarOpen}
        />

        <ResearchWorkspace
          onOpenSidebar={() => setMobileSidebarOpen(true)}
        />
      </div>
    </div>
  );
}