'use client';

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6">
      <main className="app-surface w-full max-w-3xl flex flex-col gap-6 p-8 sm:p-10 sm:items-start">
        <div className="space-y-3 justify-center text-justify-center flex flex-col items-center">
          <h5 className="text-5xl font-extrabold sm:text-6xl items-center flex justify-center">
            React Elevate App
          </h5>
          <p className="text-lg app-muted text-center">
            Page created by Nicolás Barbosa using Next, React and Tailwind CSS.
          </p>
          <p className="text-lg app-muted text-center">
            This application contains references to two public APIs and an Employees API.
          </p>
        </div>
        <div className="w-full flex justify-center">
          <Link
            href="/login"
            className="app-btn app-btn-primary w-fit flex items-center justify-center"
          >
            Go to Login
          </Link>
        </div>
      </main>
    </div>
  );
}
