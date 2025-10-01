import React from "react";
import "./header.css";

function Header() {
  return (
    <header className="navbar">
      <div className="logo">BUKTIIN</div>
      <nav className="nav">
        <a href="#">Home</a>
        <a href="#">Cari</a>
        <a href="#">Chat</a>
        <a href="#">Profil</a>
      </nav>
    </header>
  );
}

export default Header;
