import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProfileCreation.css';

const ProfileCreation = () => {
  const [about, setAbout] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [notifications, setNotifications] = useState(false);
  const [security, setSecurity] = useState('Private');
  const [outfits, setOutfits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };
      try {
        const response = await axios.get('http://localhost:5003/api/profile', { headers });
        const profile = response.data;

        setAbout(profile.about);
        setFavorites(profile.favorites ? profile.favorites.map(fav => JSON.parse(fav)) : []);
        setNotifications(profile.notifications);
        setSecurity(profile.security);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchOutfits = async () => {
      try {
        const response = await axios.get('http://localhost:5002/outfit');
        setOutfits(response.data);
      } catch (error) {
        console.error('Error fetching outfits:', error);
      }
    };

    fetchProfile();
    fetchOutfits();
  }, []);

  const handleAddFavorite = () => {
    setFavorites([...favorites, { type: 'Color', value: '' }]);
  };

  const handleRemoveFavorite = (index) => {
    const newFavorites = favorites.filter((_, i) => i !== index);
    setFavorites(newFavorites);
  };

  const handleFavoriteChange = (index, key, value) => {
    const newFavorites = favorites.map((fav, i) =>
      i === index ? { ...fav, [key]: value } : fav
    );
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
        about,
        favorites: favorites.map(fav => JSON.stringify(fav)),
        notifications,
        security
      };

      try {
        const response = await axios.put(
          'http://localhost:5003/api/profile',
          body,
          { headers }
        );
        alert('Profile updated successfully');
        navigate('/home');
      } catch (error) {
        console.error('Profile update error:', error);
        alert('Profile update failed');
      }
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      navigate('/home');
    }
  };

  const getOptions = (type) => {
    if (!outfits || outfits.length === 0) return [];

    switch (type) {
      case 'Color':
        return [...new Set(outfits.map(outfit => outfit.color).filter(Boolean))];
      case 'Brand':
        return [...new Set(outfits.map(outfit => outfit.brand).filter(Boolean))];
      case 'Material':
        return [...new Set(outfits.map(outfit => outfit.material).filter(Boolean))];
      case 'Category':
        return [...new Set(outfits.map(outfit => outfit.category).filter(Boolean))];
      default:
        return [];
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile Creation</h2>
      <div className="profile-form">
        <div className="form-section">
          <label>About You</label>
          <textarea value={about} onChange={(e) => setAbout(e.target.value)} />
        </div>
        <div className="form-section favorites">
          <label>Favorites</label>
          {favorites.map((favorite, index) => (
            <div key={index} className="favorite-item">
              <select
                value={favorite.type}
                onChange={(e) => handleFavoriteChange(index, 'type', e.target.value)}
              >
                <option value="Color">Color</option>
                <option value="Brand">Brand</option>
                <option value="Material">Material</option>
                <option value="Category">Category</option>
              </select>
              <select
                value={favorite.value || ""}
                onChange={(e) => handleFavoriteChange(index, 'value', e.target.value)}
              >
                <option value="">Select {favorite.type ? favorite.type.toLowerCase() : ''}</option>
                {getOptions(favorite.type).map((option, optIndex) => (
                  <option key={optIndex} value={option}>{option}</option>
                ))}
              </select>
              <button onClick={() => handleRemoveFavorite(index)}>-</button>
            </div>
          ))}
          <button className="add-favorite" onClick={handleAddFavorite}>+</button>
        </div>
        <div className="form-section notifications-security">
          <div className="notification-item">
            <label>Notifications</label>
            <p>Warning: when checked notifications will be sent to your email on account</p>
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
