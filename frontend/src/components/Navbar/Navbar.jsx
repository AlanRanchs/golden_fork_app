import React, { useState, useContext } from "react";
import "./Navbar.css"; 
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

export const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Menú");

  const {getTotalCartAmount} = useContext(StoreContext);

  return (
    <div className="navbar">
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
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
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        <button onClick={() => setShowLogin(true)}>sign in</button>
      </div>
    </div>
  );
};
