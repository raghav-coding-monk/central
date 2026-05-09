const API_BASE_URL = "http://localhost:5005";

export const getImageUrl = (imagePath) => {
  if (!imagePath || imagePath.includes('undefined')) {
    return "https://via.placeholder.com/150?text=No+Image";
  }

  // If the path already starts with http, it's an absolute URL, return it
  if (imagePath.startsWith('http')) return imagePath;

  // The Big Fix: If the path already has "/uploads", don't add it again!
  const hasUploads = imagePath.includes('/uploads/');
  
  if (hasUploads) {
    // Just combine the Base URL with the path from DB
    // e.g., http://localhost:5005 + /uploads/image.jpg
    return `${API_BASE_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  } else {
    // If it's just "filename.jpg", then add the uploads folder
    return `${API_BASE_URL}/uploads/${imagePath}`;
  }
};