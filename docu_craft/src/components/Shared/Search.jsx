"use client";

import searchImage from "@/asserts/search.svg";
import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchResult from "./SearchResult";

const Search = ({ docs }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    doSearch(value);
  };

  const doSearch = useDebounce(() => {
    const found = docs.filter((doc) => {
      return doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setSearchResult(found);
  }, 600);

  const handleCloseSearchResults = (e) => {
    e.preventDefault();

    router.push(e.target.href);
    setSearchTerm("");
  };

  return (
    <>
      <div class=" lg:block lg:max-w-md lg:flex-auto">
        <button
          type="button"
          class="focus:[&amp;:not(:focus-visible)]:outline-none hidden h-8 w-full items-center gap-2 rounded-full bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 lg:flex"
        >
          <Image
            src={searchImage}
            alt="search"
            width={50}
            height={50}
            class="h-5 w-5"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search..."
            class="flex-1 focus:border-none focus:outline-none"
          />
        </button>
      </div>

      {searchTerm && searchTerm.trim().length > 0 && (
        <SearchResult
          results={searchResult}
          searchTerm={searchTerm}
          onCloseSearchResults={handleCloseSearchResults}
        />
      )}
    </>
  );
};

export default Search;
