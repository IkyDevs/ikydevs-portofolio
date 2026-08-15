import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 bg-[#09090b] text-zinc-100 px-4 text-center">
      <p className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 glow-text">
        404
      </p>
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="text-zinc-400 max-w-sm">
        The page you are looking for does not exist or was moved.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-indigo-500 text-white px-6 py-3 font-semibold text-sm shadow-[0_0_40px_-10px_rgba(99,102,241,0.8)] hover:shadow-[0_0_60px_-10px_rgba(99,102,241,1)] transition-shadow"
      >
        Back to Home
      </Link>
    </div>
  );
}