// api/user.js
export const fetchUserData = async () => {
    const response = await fetch('/api/user', {
      credentials: 'include' // For cookies
    });
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  };
  
  export const updateUserData = async (updates) => {
    const response = await fetch('/api/user', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(updates)
    });
    if (!response.ok) throw new Error('Failed to update user');
    return response.json();
  };
  
  // For profile image upload
  export const uploadProfileImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch('/api/user/avatar', {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    
    if (!response.ok) throw new Error('Upload failed');
    return response.json();
  };