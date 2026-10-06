import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMedia, setQuery, setActiveTab } from '../redux/features/searchSlice';
import SearchBar from '../components/SearchBar';
import Tabs from '../components/Tabs';
import ResultGrid from '../components/ResultGrid';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const dispatch = useDispatch();
  const { query, activeTab, items, status, error } = useSelector((state) => state.search);
  const collectionCount = useSelector((state) => state.collection.items.length);

  useEffect(() => {
    dispatch(fetchMedia({ query, mediaType: activeTab }));
  }, [dispatch, query, activeTab]);

  const handleSearch = (newQuery) => {
    dispatch(setQuery(newQuery));
  };

  const handleTabChange = (newTab) => {
    dispatch(setActiveTab(newTab));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-12">
      {/* Header Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Media Hub
            </h1>
          </div>

          <Link
            to="/collection"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full transition"
          >
            <span>My Collection</span>
            <span className="px-2 py-0.5 text-xs bg-indigo-600 text-white font-bold rounded-full">
              {collectionCount}
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="text-center max-w-xl mx-auto mb-2">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Find Photos, GIFs & Videos
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Search millions of high-quality free media assets seamlessly.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} initialQuery={query} />
        <Tabs activeTab={activeTab} onTabChange={handleTabChange} />

        <main className="mt-6">
          <ResultGrid items={items} mediaType={activeTab} status={status} error={error} />
        </main>
      </div>
    </div>
  );
};

export default SearchPage;
