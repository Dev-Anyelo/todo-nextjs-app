"use client";

export default function Error({ error, reset }) {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center text-xl">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-800 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
}
