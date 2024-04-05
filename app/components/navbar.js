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
    <nav className="py-5 px-16 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-10">
      <Link href='/'> 
        <h1 className="text-lg font-bold text-white">Totoro</h1>
      </Link>
      <div className="relative">
        <input
          value={input}
          className="appearance-none bg-[#242428]  w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:shadow-outline border-b-2"
          id="search"
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
