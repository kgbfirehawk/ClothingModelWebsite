import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [headIndex, setHeadIndex] = useState(0);
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [shoesIndex, setShoesIndex] = useState(0);
  const [profilePicture, setProfilePicture] = useState('');
  const [outfits, setOutfits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        const response = await axios.get('http://localhost:5002/outfit');
        setOutfits(response.data);

        const blankIndex = response.data.findIndex(
          outfit =>
            outfit.head === 'blank.jpg' &&
            outfit.top === 'blank.jpg' &&
            outfit.bottom === 'blank.jpg' &&
            outfit.shoes === 'blank.jpg'
        );

        if (blankIndex !== -1) {
          setHeadIndex(blankIndex);
          setTopIndex(blankIndex);
          setBottomIndex(blankIndex);
          setShoesIndex(blankIndex);
        }
      } catch (error) {
        console.error('Error fetching outfits:', error);
      }
    };

    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };
      try {
        const response = await axios.get('http://localhost:5003/api/profile', { headers });
        const profile = response.data;
        setProfilePicture(profile.profilePicture);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchOutfits();
    fetchProfile();
  }, []);

  const changeItem = (indexSetter, currentIndex, direction) => {
    indexSetter((currentIndex + direction + outfits.length) % outfits.length);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleClear = () => {
    const blankIndex = outfits.findIndex(
      outfit =>
        outfit.head === 'blank.jpg' &&
        outfit.top === 'blank.jpg' &&
        outfit.bottom === 'blank.jpg' &&
        outfit.shoes === 'blank.jpg'
    );

    if (blankIndex !== -1) {
      setHeadIndex(blankIndex);
      setTopIndex(blankIndex);
      setBottomIndex(blankIndex);
      setShoesIndex(blankIndex);
    }
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-links">
          <button onClick={() => navigate('/profile')}>View Profile</button>
          <button onClick={handleSignOut}>Sign Out</button>
          {profilePicture && (
            <div className="profile-picture">
              <img src={profilePicture} alt="Profile" />
            </div>
          )}
        </div>
      </nav>
      <div className="outfit-container">
        <h2>Outfit Creation</h2>
        <button onClick={handleClear}>Clear</button>
        {outfits.length > 0 ? (
          <>
            <div className="category-section">
              <button onClick={() => changeItem(setHeadIndex, headIndex, -1)}>{'<'}</button>
              {outfits[headIndex].head !== 'blank.jpg' && <img src={`/outfits/${outfits[headIndex].head}`} alt="Head" />}
              <button onClick={() => changeItem(setHeadIndex, headIndex, 1)}>{'>'}</button>
            </div>
            <div className="category-section">
              <button onClick={() => changeItem(setTopIndex, topIndex, -1)}>{'<'}</button>
              {outfits[topIndex].top !== 'blank.jpg' && <img src={`/outfits/${outfits[topIndex].top}`} alt="Top" />}
              <button onClick={() => changeItem(setTopIndex, topIndex, 1)}>{'>'}</button>
            </div>
            <div className="category-section">
              <button onClick={() => changeItem(setBottomIndex, bottomIndex, -1)}>{'<'}</button>
              {outfits[bottomIndex].bottom !== 'blank.jpg' && <img src={`/outfits/${outfits[bottomIndex].bottom}`} alt="Bottom" />}
              <button onClick={() => changeItem(setBottomIndex, bottomIndex, 1)}>{'>'}</button>
            </div>
            <div className="category-section">
              <button onClick={() => changeItem(setShoesIndex, shoesIndex, -1)}>{'<'}</button>
              {outfits[shoesIndex].shoes !== 'blank.jpg' && <img src={`/outfits/${outfits[shoesIndex].shoes}`} alt="Shoes" />}
              <button onClick={() => changeItem(setShoesIndex, shoesIndex, 1)}>{'>'}</button>
            </div>
          </>
        ) : (
          <div className="no-data">No outfits available</div>
        )}
      </div>
    </div>
  );
};

export default Home;
