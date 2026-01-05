'use client';

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-5xl font-extrabold text-zinc-900 dark:text-white sm:text-6xl">
          Elevate
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-4">
          Inicio
        </p>
        <Link
          href="/login"
          className="mt-8 rounded-md bg-zinc-900 px-6 py-3 text-white hover:bg-zinc-800"
        >
          Go to Login
        </Link>
      </main>
    </div>
  );
}
