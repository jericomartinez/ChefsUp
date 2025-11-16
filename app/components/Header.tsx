'use client';

import { ChangeEvent } from 'react';

type HeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export default function Header({ search, onSearchChange }: HeaderProps) {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <header className="bg-white/95 shadow-sm ring-1 ring-gray-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center">
        <div className="flex min-w-[180px] flex-col">
          <span className="text-3xl font-black tracking-tight text-gray-900">
            ChefsUp
          </span>
          <span className="text-sm text-gray-500">
            Vancouver&apos;s favourite home chefs
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:flex-1 md:justify-end">
          <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
            <span className="text-lg text-orange-500">⌖</span>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-gray-900">Deliver now</span>
              <span className="text-xs text-gray-500">
                1234 W Georgia St, Vancouver
              </span>
            </div>
          </div>

          <div className="flex min-w-[220px] flex-1 items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-2 focus-within:border-orange-500">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-5 text-gray-400"
            >
              <path
                d="M11 4a7 7 0 1 1-4.95 11.95L4 18l2.05-2.05A7 7 0 0 1 11 4z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
              />
            </svg>
            <input
              aria-label="Search chefs"
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search home chefs, dishes, or cuisines"
              className="ml-3 w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3 text-sm font-semibold">
            <button className="rounded-full border border-gray-200 px-4 py-2 text-gray-700 transition hover:border-gray-300 hover:text-orange-500">
              Sort
            </button>
            <button className="rounded-full bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-600">
              Filters
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white">
              MB
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
