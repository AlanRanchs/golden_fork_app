import React, { useState, useContext } from "react";
import "./Navbar.css"; 
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import Switch from "../Switch/Switch";

export const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Menú");

  const {getTotalCartAmount, token, setToken} = useContext(StoreContext);
  const {theme, toggleTheme} = useContext(ThemeContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/');
  }

  return (
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
        <Switch 
          checked={theme === 'dark'} 
          onChange={toggleTheme}
        />
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token ? <button onClick={() => setShowLogin(true)}>sign in</button> : 
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="navbar-profile-dropdown">
              <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        }
      </div>
    </div>
  );
};
