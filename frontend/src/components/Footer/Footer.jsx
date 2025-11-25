import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

export const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo_footer} alt="" />
          <p>Sabores que conquistan, calidad que permanece.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
            <h2>GoldenFork Web App</h2>
            <ul>
                <li>Inicio</li>
                <li>Sobre Nosotros</li>
                <li>Delivery</li>
                <li>Politica de Privacidad</li>
            </ul>
        </div>
        <div className="footer-content-rigt">
            <h2>Contactanos</h2>
            <ul>
                <li>+52 812-419-2837</li>
                <li>contacto@goldenfork.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2025 © GoldenFork.com - All rights reserved.
      </p>
    </div>
  );
};
