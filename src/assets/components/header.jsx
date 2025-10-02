import React from "react";
import "./header.css";

function Header({ active }) {
  return (
    <header className="navbar">
      <div className="logo">BUKTIIN</div>
      <nav className="nav">
        <a href="/" className={active === "home" ? "active" : ""}>Home</a>
        <a href="/search" className={active === "cari" ? "active" : ""}>Cari</a>
        <a href="/chat" className={active === "chat" ? "active" : ""}>Chat</a>
        <a href="/profile" className={active === "profil" ? "active" : ""}>Profil</a>
      </nav>
    </header>
  );
}

export default Header;
