import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Browse.css';
import { useNavigate } from 'react-router-dom';

const Browse = () => {
  const [outfits, setOutfits] = useState([]);
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [selectedSize, setSelectedSize] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    color: '',
    price: '',
    brand: ''
  });
  const [currency, setCurrency] = useState('USD');
  const [convertedPrices, setConvertedPrices] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        const response = await axios.get('http://localhost:5002/outfit');
        const filteredOutfits = response.data.filter(outfit => outfit.id !== 0); // Filter out the blank outfit with id 0
        setOutfits(filteredOutfits || []);
      } catch (error) {
        console.error('Error fetching outfits:', error);
      }
    };

    const fetchFavorites = async () => {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };
      try {
        const response = await axios.get('http://localhost:5003/api/profile', { headers });
        const profile = response.data;
        if (profile && profile.favorites) {
          setFavorites(profile.favorites.map(fav => JSON.parse(fav)));
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchOutfits();
    fetchFavorites();
  }, []);

  useEffect(() => {
    const convertPrices = async (currency) => {
      try {
        const response = await axios.post('http://localhost:3001/convert', {
          amounts: outfits.map(outfit => outfit.price),
          currency: currency
        });
        setConvertedPrices(response.data.convertedAmounts || []);
      } catch (error) {
        console.error('Error converting prices:', error);
      }
    };

    if (outfits.length > 0) {
      convertPrices(currency);
    }
  }, [currency, outfits]);

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleOutfitClick = (id) => {
    setSelectedOutfit(prev => (prev === id ? null : id));
  };

  const handleSizeClick = (outfitId, size) => {
    setSelectedSize(prev => ({ ...prev, [outfitId]: size }));
  };

  const handleFilterChange = (e) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const prioritizeFavorites = (outfitList) => {
    if (favorites.length === 0) return outfitList;

    const favoriteOutfits = [];
    const nonFavoriteOutfits = [];

    outfitList.forEach(outfit => {
      const isFavorite = favorites.some(fav => {
        return (
          (fav.type === 'Color' && outfit.color === fav.value) ||
          (fav.type === 'Brand' && outfit.brand === fav.value) ||
          (fav.type === 'Material' && outfit.material === fav.value) ||
          (fav.type === 'Category' && outfit.category === fav.value)
        );
      });

      if (isFavorite) {
        favoriteOutfits.push(outfit);
      } else {
        nonFavoriteOutfits.push(outfit);
      }
    });

    return [...favoriteOutfits, ...nonFavoriteOutfits];
  };

  const prioritizedOutfits = prioritizeFavorites(outfits);

  const filteredOutfits = prioritizedOutfits
    .filter(outfit => (
      (filters.color ? outfit.color.toLowerCase() === filters.color.toLowerCase() : true) &&
      (filters.price ? convertedPrices[outfits.findIndex(o => o.id === outfit.id)] <= parseFloat(filters.price) : true) &&
      (filters.brand ? outfit.brand.toLowerCase().includes(filters.brand.toLowerCase()) : true) &&
      (searchTerm ? outfit.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
    ));

  const uniqueBrands = [...new Set(outfits.map(outfit => outfit.brand))];
  const uniqueColors = [...new Set(outfits.map(outfit => outfit.color))];

  return (
    <div className="browse-container">
      <div className="navigation-buttons">
        <button onClick={() => navigate('/home')}>Home</button>
      </div>
      <h2>Browse Outfits</h2>
      <p>Click on the picture for further information</p>

      <div className="currency-selection">
        <label htmlFor="currency">Choose Currency: </label>
        <select id="currency" value={currency} onChange={handleCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="JPY">JPY</option>
        </select>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filters">
        <select name="brand" value={filters.brand} onChange={handleFilterChange}>
          <option value="">Filter by brand...</option>
          {uniqueBrands.map((brand, index) => (
            <option key={index} value={brand}>{brand}</option>
          ))}
        </select>
        <select name="color" value={filters.color} onChange={handleFilterChange}>
          <option value="">Filter by color...</option>
          {uniqueColors.map((color, index) => (
            <option key={index} value={color}>{color}</option>
          ))}
        </select>
        <input
          type="number"
          name="price"
          placeholder="Max price..."
          value={filters.price}
          onChange={handleFilterChange}
        />
      </div>

      <div className="outfit-grid">
        {filteredOutfits.length > 0 ? (
          filteredOutfits.map((outfit, index) => (
            <div key={outfit.id} className="outfit-card">
              <img
                src={`/outfits/${outfit.image}`} // Adjusted to ensure proper path
                alt={outfit.name}
                className="outfit-image"
                onClick={() => handleOutfitClick(outfit.id)}
              />
              <h3>{outfit.name}</h3>
              <p>Brand: {outfit.brand}</p>
              <p>Price: {convertedPrices.length > 0 && convertedPrices[outfits.findIndex(o => o.id === outfit.id)] ? `${currency} ${convertedPrices[outfits.findIndex(o => o.id === outfit.id)].toFixed(currency === 'JPY' ? 0 : 2)}` : 'N/A'}</p>
              <p>Color: {outfit.color}</p>

              {selectedOutfit === outfit.id && (
                <>
                  <p>Category: {outfit.category}</p>
                  <p>Material: {outfit.material}</p>
                </>
              )}

              <div className="size-selection">
                <p>Size:</p>
                <div className="size-buttons">
                  {outfit.sizes && outfit.sizes.length > 1 ? (
                    outfit.sizes.map(size => (
                      <button
                        key={size}
                        className={`size-button ${selectedSize[outfit.id] === size ? 'selected' : ''}`}
                        onClick={() => handleSizeClick(outfit.id, size)}
                      >
                        {size}
                      </button>
                    ))
                  ) : (
                    <p>{outfit.sizes[0]}</p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-data">No outfits available</div>
        )}
      </div>
    </div>
  );
};

export default Browse;
