import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProfileCreation.css';

const ProfileCreation = () => {
  const [profilePicture, setProfilePicture] = useState('');
  const [about, setAbout] = useState('');
  const [favorites, setFavorites] = useState(['']);
  const [notifications, setNotifications] = useState(false);
  const [security, setSecurity] = useState('Private');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };
      try {
        const response = await axios.get('http://localhost:5003/api/profile', { headers });
        console.log('Profile fetch response:', response.data);
        const profile = response.data;
        setProfilePicture(profile.profilePicture);
        setAbout(profile.about);
        setFavorites(profile.favorites.length > 0 ? profile.favorites : ['']);
        setNotifications(profile.notifications);
        setSecurity(profile.security);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleAddFavorite = () => {
    setFavorites([...favorites, '']);
  };

  const handleRemoveFavorite = (index) => {
    const newFavorites = favorites.filter((_, i) => i !== index);
    setFavorites(newFavorites);
  };

  const handleFavoriteChange = (index, value) => {
    const newFavorites = favorites.map((fav, i) => (i === index ? value : fav));
    setFavorites(newFavorites);
  };

  const handleSaveProfile = async () => {
    if (window.confirm('Are you sure you want to save the changes?')) {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      const body = {
        profilePicture: profilePicture.name || '',
        about,
        favorites,
        notifications,
        security
      };

      console.log('Profile update body:', body);

      try {
        const response = await axios.put(
          'http://localhost:5003/api/profile',
          body,
          { headers }
        );
        console.log('Profile update response:', response.data);
        alert('Profile updated successfully');
        navigate('/home'); // Redirect to home page after save
      } catch (error) {
        console.error('Profile update error:', error);
        alert('Profile update failed');
      }
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      navigate('/home'); // Redirect to home page on cancel
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile Creation</h2>
      <div className="profile-form">
        <div className="form-section">
          <label>About You Page</label>
          <textarea value={about} onChange={(e) => setAbout(e.target.value)} />
        </div>
        <div className="form-section profile-picture">
          <label>Profile Picture</label>
          <input type="file" onChange={(e) => setProfilePicture(e.target.files[0])} />
        </div>
        <div className="form-section favorites">
          <label>Favorites</label>
          {favorites.map((favorite, index) => (
            <div key={index} className="favorite-item">
              <select value={favorite} onChange={(e) => handleFavoriteChange(index, e.target.value)}>
                <option value="">Select color</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Black">Black</option>
              </select>
              <button onClick={() => handleRemoveFavorite(index)}>-</button>
            </div>
          ))}
          <button className="add-favorite" onClick={handleAddFavorite}>+</button>
        </div>
        <div className="form-section notifications-security">
          <div className="notification-item">
            <label>Notifications</label>
            <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
          </div>
          <div className="security-item">
            <label>Security</label>
            <select value={security} onChange={(e) => setSecurity(e.target.value)}>
              <option value="Private">Private</option>
              <option value="Public">Public</option>
            </select>
          </div>
        </div>
        <button className="save-button" onClick={handleSaveProfile}>Save</button>
        <button className="cancel-button" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ProfileCreation;
