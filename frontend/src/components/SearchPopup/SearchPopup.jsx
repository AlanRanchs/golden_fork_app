import React, { useContext, useState, useEffect, useRef } from 'react';
import './SearchPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

export const SearchPopup = ({ setShowSearch }) => {
  const { food_list, addToCart, url } = useContext(StoreContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFoods, setFilteredFoods] = useState([]);
  const searchInputRef = useRef(null);

  // Filtrar alimentos en tiempo real
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredFoods([]);
      return;
    }

    const results = food_list.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredFoods(results);
  }, [searchTerm, food_list]);

  // Auto-focus en el input al abrir
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // Atajos de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      // ESC para cerrar
      if (e.key === 'Escape') {
        setShowSearch(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setShowSearch]);

  // Cerrar al hacer click en el overlay
  const handleOverlayClick = (e) => {
    if (e.target.className === 'search-popup') {
      setShowSearch(false);
    }
  };

  const handleAddToCart = (itemId) => {
    addToCart(itemId);
  };

  return (
    <div className='search-popup' onClick={handleOverlayClick}>
      <div className="search-popup-container">
        <div className="search-popup-header">
          <h2>Buscar Platos</h2>
          <img 
            onClick={() => setShowSearch(false)} 
            src={assets.cross_icon} 
            alt="Cerrar" 
            className="search-close-icon"
          />
        </div>
        
        <div className="search-input-container">
          <img src={assets.search_icon} alt="Buscar" className="search-input-icon" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Busca por nombre, descripción o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <img 
              src={assets.cross_icon} 
              alt="Limpiar" 
              className="search-clear-icon"
              onClick={() => setSearchTerm('')}
            />
          )}
        </div>

        <div className="search-results">
          {searchTerm.trim() === '' ? (
            <div className="search-empty-state">
              <img src={assets.search_icon} alt="Buscar" />
              <p>Empieza a escribir para buscar platos</p>
            </div>
          ) : filteredFoods.length === 0 ? (
            <div className="search-no-results">
              <p>No se encontraron resultados para "{searchTerm}"</p>
              <span>Intenta con otro término de búsqueda</span>
            </div>
          ) : (
            <div className="search-results-grid">
              {filteredFoods.map((item) => (
                <div key={item._id} className="search-result-item">
                  <img 
                    src={url + "/images/" + item.image} 
                    alt={item.name} 
                    className="search-result-image"
                  />
                  <div className="search-result-info">
                    <div className="search-result-header">
                      <h3>{item.name}</h3>
                      <span className="search-result-category">{item.category}</span>
                    </div>
                    <p className="search-result-description">{item.description}</p>
                    <div className="search-result-footer">
                      <p className="search-result-price">
                        {new Intl.NumberFormat("es-MX", {
                          style: "currency",
                          currency: "MXN",
                        }).format(item.price)}
                      </p>
                      <button 
                        onClick={() => handleAddToCart(item._id)}
                        className="search-add-btn"
                      >
                        <img src={assets.add_icon_white} alt="Agregar" />
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="search-footer">
          <span className="search-keyboard-hint">
            Presiona <kbd>ESC</kbd> para cerrar
          </span>
          {filteredFoods.length > 0 && (
            <span className="search-results-count">
              {filteredFoods.length} {filteredFoods.length === 1 ? 'resultado' : 'resultados'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
