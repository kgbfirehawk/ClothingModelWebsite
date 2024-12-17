import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';

const Home = () => {
  const [headIndex, setHeadIndex] = useState(0);
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [shoesIndex, setShoesIndex] = useState(0);
  const [profilePicture, setProfilePicture] = useState('');
  const [outfits, setOutfits] = useState([]);
  const navigate = useNavigate();

  // Separate state for filtered outfits by category
  const [headwear, setHeadwear] = useState([]);
  const [shirts, setShirts] = useState([]);
  const [pants, setPants] = useState([]);
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        const response = await axios.get('http://localhost:5002/outfit');
        const updatedOutfits = response.data.map(outfit => ({
          ...outfit,
          image: outfit.image ? `${process.env.PUBLIC_URL}/outfits/${outfit.image}` : `${process.env.PUBLIC_URL}/outfits/blank.jpg`,
        }));

        setOutfits(updatedOutfits);

        // Filter outfits by category and include blank
        setHeadwear(updatedOutfits.filter(outfit => outfit.category === 'Headwear' || outfit.name === 'Blank'));
        setShirts(updatedOutfits.filter(outfit => outfit.category === 'Shirts' || outfit.name === 'Blank'));
        setPants(updatedOutfits.filter(outfit => outfit.category === 'Pants' || outfit.name === 'Blank'));
        setShoes(updatedOutfits.filter(outfit => outfit.category === 'Shoes' || outfit.name === 'Blank'));
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

  const changeItem = (indexSetter, currentIndex, direction, items) => {
    const newIndex = (currentIndex + direction + items.length) % items.length;
    indexSetter(newIndex);
  };

  const handleClear = () => {
    setHeadIndex(0);
    setTopIndex(0);
    setBottomIndex(0);
    setShoesIndex(0);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleShare = async () => {
    const email = prompt('Enter the email to share with:');
    if (!email) return;

    const outfitDetails = `
      Head: ${headwear[headIndex].image}
      Top: ${shirts[topIndex].image}
      Bottom: ${pants[bottomIndex].image}
      Shoes: ${shoes[shoesIndex].image}
    `;

    try {
      const outfitContainer = document.querySelector('.outfit-images-container');
      const buttons = document.querySelectorAll('.category-section button');

      // Hide buttons before capturing
      buttons.forEach(button => (button.style.display = 'none'));

      // Use html2canvas to capture only the clothing images
      const canvas = await html2canvas(outfitContainer, { backgroundColor: null });
      const outfitImage = canvas.toDataURL('image/png');

      // Show buttons again after capturing
      buttons.forEach(button => (button.style.display = 'block'));

      const response = await axios.post('http://localhost:3002/send-outfit', {
        email: email,
        outfitImage: outfitImage,
        outfitDetails: outfitDetails
      });

      console.log('Outfit shared:', response.data);
      alert('Outfit shared successfully!');
    } catch (error) {
      console.error('Error sharing outfit:', error);
      alert('Failed to share outfit.');
    }
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-links">
          <button onClick={() => navigate('/browse')}>Browse Outfits</button>
          <button onClick={() => navigate('/profile')}>View Profile</button>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </nav>
      <div className="outfit-container">
        <h2>Outfit Creation</h2>
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleShare}>Share Outfit</button>

        <div className="outfit-images-container">
          {outfits.length > 0 ? (
            <>
              <div className="category-section">
                <button onClick={() => changeItem(setHeadIndex, headIndex, -1, headwear)}>{'<'}</button>
                <img src={headwear[headIndex]?.image} alt="Head" />
                <button onClick={() => changeItem(setHeadIndex, headIndex, 1, headwear)}>{'>'}</button>
              </div>
              <div className="category-section">
                <button onClick={() => changeItem(setTopIndex, topIndex, -1, shirts)}>{'<'}</button>
                <img src={shirts[topIndex]?.image} alt="Top" />
                <button onClick={() => changeItem(setTopIndex, topIndex, 1, shirts)}>{'>'}</button>
              </div>
              <div className="category-section">
                <button onClick={() => changeItem(setBottomIndex, bottomIndex, -1, pants)}>{'<'}</button>
                <img src={pants[bottomIndex]?.image} alt="Bottom" />
                <button onClick={() => changeItem(setBottomIndex, bottomIndex, 1, pants)}>{'>'}</button>
              </div>
              <div className="category-section">
                <button onClick={() => changeItem(setShoesIndex, shoesIndex, -1, shoes)}>{'<'}</button>
                <img src={shoes[shoesIndex]?.image} alt="Shoes" />
                <button onClick={() => changeItem(setShoesIndex, shoesIndex, 1, shoes)}>{'>'}</button>
              </div>
            </>
          ) : (
            <div className="no-data">No outfits available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
