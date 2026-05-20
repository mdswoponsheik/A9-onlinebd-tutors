"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col bg-red-50 items-center justify-center h-screen text-center">
      <h1 className="text-7xl font-bold text-red-500">404</h1>

      <p className="text-2xl mt-4 font-semibold">
        Oops! Page Not Found
      </p>

      <p className="text-gray-500 mt-2">
        This page doesn't exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
      >
        Back to Home
      </Link>
    </div>
  );
}