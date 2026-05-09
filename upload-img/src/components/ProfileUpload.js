import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProfileUpload.css';

const ProfileUpload = () => {
 // const { id } = useParams();
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('/default-avatar.png'); 
  const [loading, setLoading] = useState(false);
  const BACKEND_URL = 'http://localhost:5005';

  // 1. Get the 'id' from the URL (e.g., /profile/evam -> id is "evam")
const { id } = useParams(); 
useEffect(() => {
  const fetchUserData = async () => {
    try {
      // Use 'id' from line 14
      const response = await fetch(`http://localhost:5005/api/user/${id}`); 
      const data = await response.json();
      
      if (data && data.profileImage) {
        setPreviewUrl(`http://localhost:5005${data.profileImage}`);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  if (id) fetchUserData();
}, [id]); // Match line 14

// 1. Load the existing profile picture from the database
  useEffect(() => {
    let isMounted = true;

    const loadSavedImage = async () => {
      try {
        const response = await fetch(`http://localhost:5005/api/user-profile/${id}`);
        const result = await response.json(); // Changed name to 'result' to avoid confusion
        
        if (result.profileImage) {
            // If the DB has "/uploads/image.jpg", we add the base URL
            setPreviewUrl(`http://localhost:5005${result.profileImage}`);
        }
        // Use the property name your backend actually sends (profileImage or imagePath)
        const imagePath = result.profileImage || result.imagePath;

        if (isMounted && imagePath) {
          // Construct the URL: Ensure there is a slash between backend URL and path
          const finalUrl = imagePath.startsWith('http') 
            ? imagePath 
            : `${BACKEND_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
          
          setPreviewUrl(finalUrl); 
        }
      } catch (err) {
        console.error("Could not fetch user profile:", err);
      }
    };

    loadSavedImage();
    return () => { isMounted = false; };
  }, [id]);

  // 2. Handle selecting a file from the computer (local preview)
 const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setSelectedFile(file);
    // ✅ This creates a temporary local blob URL for instant preview
    setPreviewUrl(URL.createObjectURL(file));
  }
};

  // 3. Upload the file to the server
 const handleUpload = async () => {
  if (!selectedFile) return;
  
  console.log("DEBUG: The ID from useParams is currently:", id); // Check this!

  if (!id || id === "undefined") {
    alert("User ID not found in URL. Cannot upload.");
    return;
  }

  const formData = new FormData();
  formData.append('profilePic', selectedFile);
  formData.append("userId", id); // Ensure this matches what your backend expects (e.g., "username" or "userId")
  try {
    setLoading(true);
    const response = await fetch('http://localhost:5005/upload-profile-pic', {
      method: 'POST',
      body: formData,
    });
    
    const result = await response.json();
    if (result.success) {
      alert("Profile updated!");
      // The backend returns the new URL, so we update the preview
      setPreviewUrl(result.imageUrl); 
      window.location.href = `/profile-display/${id}`;
    }
  } catch (error) {
    console.error("Upload error:", error);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="upload-container">
      <div className="avatar-wrapper">
        {/* Unified Image Display */}
       <img 
  src={previewUrl ? encodeURI(previewUrl) : '/default-avatar.png'} 
  alt="Profile" 
  className="avatar-image" 
  onError={(e) => { 
    console.log("Image load failed, using default");
    e.target.src = '/default-avatar.png'; 
  }} 
/>
        
        <label className="upload-btn">
          <span>Change Photo</span>
          <input 
            type="file" 
            onChange={handleFileChange} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />
        </label>
      </div>

      {selectedFile && (
        <button 
          onClick={handleUpload} 
          disabled={loading} 
          className="save-btn"
        >
          {loading ? 'Processing...' : 'Confirm Upload'}
        </button>
      )}
    </div>
  );
};

export default ProfileUpload;