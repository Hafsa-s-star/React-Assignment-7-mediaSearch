import React, { useState } from 'react';

const SearchBar = ({ onSearch, initialQuery = '' }) => {
  const [term, setTerm] = useState(initialQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto my-6 flex gap-3">
      <div className="relative flex-1">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search photos, GIFs, videos..."
          className="w-full px-5 py-3.5 rounded-full bg-white text-gray-800 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition"
        />
        {term && (
          <button
            type="button"
            onClick={() => setTerm('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
          >
            ✕
          </button>
        )}
      </div>
      <button
        type="submit"
        className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 font-medium text-white rounded-full shadow-md transition duration-200"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
