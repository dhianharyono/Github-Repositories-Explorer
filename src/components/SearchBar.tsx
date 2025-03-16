import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2 p-4">
      <input
        type="text"
        placeholder="Search GitHub users..."
        className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg w-full bg-white text-black 
                   placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 
                   focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        disabled={query.trim() === ""}
        onClick={handleSearch}
        className="px-4 py-2 rounded-lg text-white font-medium transition-all 
                   bg-blue-500 hover:bg-blue-600 active:scale-95 
                   disabled:bg-gray-400 dark:disabled:bg-gray-700
                   dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:scale-95"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
