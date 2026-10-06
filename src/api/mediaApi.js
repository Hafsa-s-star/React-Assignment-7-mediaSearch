import axios from 'axios';

const PIXABAY_KEY = import.meta.env.VITE_PIXABAY_KEY;
const GIPHY_KEY = import.meta.env.VITE_GIF_KEY;

export async function fetchPhotos(query = 'popular', page = 1) {
  const searchQuery = encodeURIComponent(query.trim() || 'popular');
  const res = await axios.get(
    `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${searchQuery}&image_type=photo&per_page=30&page=${page}`
  );
  return res.data?.hits || [];
}

export async function fetchGifs(query = 'popular', offset = 0) {
  const searchQuery = encodeURIComponent(query.trim() || 'trending');
  const endpoint = query.trim()
    ? `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${searchQuery}&limit=30&offset=${offset}`
    : `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_KEY}&limit=30&offset=${offset}`;
  
  const res = await axios.get(endpoint);
  
  // Format Giphy response to match application model structure
  return (res.data?.data || []).map((gif) => ({
    id: gif.id,
    type: 'gifs',
    webformatURL: gif.images?.fixed_height?.url || gif.images?.original?.url,
    previewUrl: gif.images?.fixed_height?.url || gif.images?.original?.url,
    tags: gif.title || 'GIF',
    pageURL: gif.url,
    user: gif.username || gif.user?.display_name || 'Giphy User',
  }));
}

export async function fetchVideos(query = 'popular', page = 1) {
  const searchQuery = encodeURIComponent(query.trim() || 'popular');
  const res = await axios.get(
    `https://pixabay.com/api/videos/?key=${PIXABAY_KEY}&q=${searchQuery}&per_page=30&page=${page}`
  );
  return res.data?.hits || [];
}