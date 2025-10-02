import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./profile.css";

export default function Profile() {
  const photos = [
    "/photo1.jpg",
    "/photo2.jpg",
    "/photo3.jpg",
    "/photo4.jpg",
    "/photo5.jpg",
    "/photo6.jpg",
  ];

  return (
    <div className="profile-page">
   
      <Header active="profil" />

      
      <div className="profile-container">
        <img
          src="/profile1.jpg"
          alt="Profile"
          className="profile-avatar"
        />
        <div className="profile-info">
          <h2>Florentina Olivia</h2>
          <p className="location">📍 Batu Putu, Bandarlampung</p>
          <p className="price">💰 Rp. 50.000++</p>
          <div className="tags">
            <span>#PenjahitBajuAnak</span>
            <span>#PenjahitBaju</span>
            <span>#PenjahitBajuPernikahan</span>
            <span>#PenjahitBajuAnabul</span>
            <span>#PenjahitOtodidak</span>
            <span>#SharingMoms</span>
            <span>#MomOfThree</span>
          </div>
          <div className="profile-actions">
            <button className="follow-btn">Follow</button>
            <button className="contact-btn">Hubungi</button>
          </div>
        </div>
      </div>

      <div className="photo-grid">
        {photos.map((p, i) => (
          <div key={i} className="photo-card">
            <img src={p} alt={`photo-${i}`} />
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
