import React, { useState, useContext } from "react";
import "./Navbar.css"; 
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import Switch from "../Switch/Switch";
import { SearchPopup } from "../SearchPopup/SearchPopup";

export const Navbar = ({ setShowLogin, onStartTour }) => {
  const [menu, setMenu] = useState("Menú");
  const [showSearch, setShowSearch] = useState(false);

  const {getTotalCartAmount, token, setToken} = useContext(StoreContext);
  const {theme, toggleTheme} = useContext(ThemeContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/');
  }

  return (
    <>
      {showSearch && <SearchPopup setShowSearch={setShowSearch} />}
      <div className="navbar">
        <Link to='/'>
          <img 
            src={theme === 'dark' ? assets.logo_footer : assets.logo} 
            alt="" 
            className="logo" 
          />
        </Link>
        <ul className="navbar-menu">
          <Link
            to="/"
            onClick={() => setMenu("Inicio")}
            className={menu === "Inicio" ? "active" : ""}
          >
            Inicio
          </Link>
          <a
            href="#explore-menu"
            onClick={() => setMenu("Menú")}
            className={menu === "Menú" ? "active" : ""}
          >
            Menú
          </a>
          <a
            href="#app-download"
            onClick={() => setMenu("App")}
            className={menu === "App" ? "active" : ""}
          >
            App
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("Contactanos")}
            className={menu === "Contactanos" ? "active" : ""}
          >
            Contactanos 
          </a>
        </ul>
        <div className="navbar-right">
          <div id="theme-switch">
            <Switch 
              checked={theme === 'dark'} 
              onChange={toggleTheme}
            />
          </div>
          <img 
            id="search-icon"
            src={assets.search_icon} 
            alt="Buscar" 
            onClick={() => setShowSearch(true)}
            style={{ cursor: 'pointer' }}
          />
          <div className="navbar-search-icon">
            <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
            <div className={getTotalCartAmount()===0?"":"dot"}></div>
          </div>
          <button 
            onClick={onStartTour}
            className="help-button"
            title="Ver tour de ayuda"
            style={{ 
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '30px',
              height: '30px'
            }}
          >
            <svg 
              width="30" 
              height="30" 
              viewBox="0 0 24 24" 
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="#49557e" 
                strokeWidth="2"
                fill="none"
              />
              <path 
                d="M12 17v-1M12 14c0-1.5 2-1.5 2-3 0-1.1-.9-2-2-2s-2 .9-2 2" 
                stroke="#49557e" 
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          {!token ? <button onClick={() => setShowLogin(true)}>sign in</button> : 
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="" />
              <ul className="navbar-profile-dropdown">
                <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
            </div>
          }
        </div>
      </div>
    </>
  );
};
