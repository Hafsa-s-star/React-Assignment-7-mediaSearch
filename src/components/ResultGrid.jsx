import React from 'react';
import ResultCard from './ResultCard';

const ResultGrid = ({ items, mediaType, status, error }) => {
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="text-center py-12 text-red-400">
        <p className="text-lg font-semibold">Error fetching media</p>
        <p className="text-sm">{error || 'Something went wrong. Please try again.'}</p>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p className="text-xl">No media found</p>
        <p className="text-sm text-gray-500 mt-1">Try searching for something else!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {items.map((item) => (
        <ResultCard key={item.id} item={item} mediaType={mediaType} />
      ))}
    </div>
  );
};

export default ResultGrid;
