'use client';
import Link from "next/link";
import { Button } from "./Button";
import { logout } from "@/lib/auth";

export function Sidebar() {
  return (
    <aside className="app-sidebar fixed left-0 top-0 h-screen w-56 flex flex-col gap-4 p-4">
      <div className="app-sidebar-title text-lg font-bold">Menú</div>
      <nav className="flex flex-col gap-2 text-sm">
        <Link className="app-navlink rounded-md px-3 py-2" href="/home">
          Home
        </Link>
        <Link className="app-navlink rounded-md px-3 py-2" href="/italian-jokes">
          Italian Jokes API
        </Link>
        <Link className="app-navlink rounded-md px-3 py-2" href="/harry-potter">
          Harry Potter API
        </Link>
        <Link className="app-navlink rounded-md px-3 py-2" href="/employees">
          Employees API
        </Link>
      </nav>
      <div className="mt-auto">
        <Button variant="ghost" className="text-left" onClick={logout}>
          Logout
        </Button>
      </div>
    </aside>
  );
}
