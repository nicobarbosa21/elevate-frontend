'use client';
import Link from "next/link";
import { Button } from "./Button";
import { logout } from "@/lib/auth";

export function Sidebar() {
  return (
    <aside className="
      fixed left-0 top-0
      h-screen w-56
      flex flex-col gap-4
      border-r border-gray-200
      bg-white p-4
    ">
      <div className="text-lg font-bold text-neutral-800">Menú</div>
      <nav className="flex flex-col gap-2 text-sm text-neutral-700">
        <Link className="rounded-md px-3 py-2 hover:bg-gray-100" href="/home">
          Home
        </Link>
        <Link className="rounded-md px-3 py-2 hover:bg-gray-100" href="/italian-jokes">
          Italian Jokes API
        </Link>
        <Link className="rounded-md px-3 py-2 hover:bg-gray-100" href="/harry-potter">
          Harry Potter API
        </Link>
        <Link className="rounded-md px-3 py-2 hover:bg-gray-100" href="/employees">
          Employees API
        </Link>
      </nav>
      <div className="mt-auto">
        <Button variant="ghost" className="text-left" onClick={logout}>Logout</Button>
      </div>
    </aside>
  );
}
