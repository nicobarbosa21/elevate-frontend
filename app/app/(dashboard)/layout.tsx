import type { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="ml-56 min-h-screen p-8">
        <div className="app-surface p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
