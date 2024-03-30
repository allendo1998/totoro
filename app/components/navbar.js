"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import Link from "next/link";

export function Navbar({ search = "", page = 1 }) {
  const [input, setInput] = useState(search);
  const [query] = useDebounce(input, 750);
  const router = useRouter();

  useEffect(() => {
    if (query) {
      router.push(`/search?query=${query}&page=${page}`);
    }
  }, [query, router]);

  return (
    <nav className="py-10 flex flex-col md:flex-row justify-center items-center gap-5">
      <Link href='/'> 
        <h1 className="text-2xl font-bold">Totoro</h1>
      </Link>
      <div className="relative">
        <input
          value={input}
          className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Search..."
          onChange={(e) => setInput(e.target.value)}
        />

        <div
          className="absolute right-0 inset-y-0 flex items-center"
          onClick={() => setInput("")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <div className="absolute left-0 inset-y-0 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-3 text-gray-400 hover:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
}
