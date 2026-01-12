import type { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-50">
      <Sidebar />
      <main className="ml-56 min-h-screen p-8">
        {children}
      </main>
    </div>
  );
}
