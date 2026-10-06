import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ResultCard from '../components/ResultCard';
import { clearCollection } from '../redux/features/CollectionSlice';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const CollectionPage = () => {
  const dispatch = useDispatch();
  const collectionItems = useSelector((state) => state.collection.items);

  const handleClearAll = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to clear your entire saved collection?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, clear all!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCollection());
        Swal.fire({
          icon: 'success',
          title: 'Cleared!',
          text: 'Your collection has been emptied.',
          timer: 1800,
          showConfirmButton: false,
          toast: true,
          position: 'top-end',
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
            ← Back to Search
          </Link>
          <h1 className="text-lg font-bold text-gray-800">
            My Saved Collection ({collectionItems.length})
          </h1>
          {collectionItems.length > 0 ? (
            <button
              onClick={handleClearAll}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-red-600 border border-red-200 hover:bg-red-50 transition"
            >
              Clear All
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        {collectionItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 max-w-md mx-auto shadow-xs">
            <span className="text-4xl">📂</span>
            <p className="text-xl font-semibold text-gray-800 mt-3">Your collection is empty</p>
            <p className="text-gray-500 text-sm mt-1">
              Save photos, GIFs, and videos while searching to view them here.
            </p>
            <Link
              to="/"
              className="inline-block mt-5 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-full transition"
            >
              Explore Media
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {collectionItems.map((item) => (
              <ResultCard key={item.id} item={item} mediaType={item.type} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
