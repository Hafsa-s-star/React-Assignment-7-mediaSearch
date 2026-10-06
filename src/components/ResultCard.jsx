import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { addToCollection, removeFromCollection } from '../redux/features/CollectionSlice';

const ResultCard = ({ item, mediaType }) => {
  const dispatch = useDispatch();
  const collectionItems = useSelector((state) => state.collection.items);

  const isSaved = collectionItems.some((c) => c.id === item.id);

  const handleToggleSave = () => {
    if (isSaved) {
      dispatch(removeFromCollection(item.id));
      Swal.fire({
        icon: 'info',
        title: 'Removed from Collection',
        text: 'The item has been removed from your saved collection.',
        timer: 1800,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
      });
    } else {
      const mediaItem = {
        id: item.id,
        type: mediaType || item.type || 'photos',
        previewUrl: item.videos ? item.videos.tiny.url : item.webformatURL || item.previewURL || item.previewUrl,
        tags: item.tags,
        pageURL: item.pageURL,
        user: item.user,
        videoUrl: item.videos?.small?.url || item.videos?.medium?.url || item.videoUrl,
      };
      dispatch(addToCollection(mediaItem));
      Swal.fire({
        icon: 'success',
        title: 'Saved Successfully!',
        text: 'Item added to your collection.',
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
      });
    }
  };

  const isVideo = mediaType === 'videos' || item.type === 'videos' || !!item.videos;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        {isVideo ? (
          <video
            src={item.videos?.small?.url || item.videos?.medium?.url || item.videoUrl}
            controls
            preload="metadata"
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={item.webformatURL || item.previewUrl || item.previewURL}
            alt={item.tags || 'media item'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        )}
      </div>

      <div className="p-4 flex items-center justify-between gap-2 border-t border-gray-50">
        <div className="truncate text-xs text-gray-500">
          By <span className="font-medium text-gray-700">{item.user || 'Unknown'}</span>
        </div>
        
        <button
          onClick={handleToggleSave}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition duration-200 flex items-center gap-1.5 shadow-sm ${
            isSaved
              ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          <span>{isSaved ? '✓ Saved' : '+ Save'}</span>
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
