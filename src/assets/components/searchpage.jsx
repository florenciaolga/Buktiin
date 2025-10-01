import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Dropdown from "../components/dropdown";
import SearchBar from "./searchbar";
import "./SearchPage.css";

const users = [
  {
    name: "Florentina Olivia",
    location: "Batu Putu, Bandarlampung",
    price: "Rp. 50.000++",
    tags: ["#PenjahitBajuAnak", "#PenjahitBaju", "#PenjahitBajuPernikahan", "#PenjahitBajuAnabul", "#PenjahitOtodidak"],
    profileImg: "/profile1.png",
  },
  {
    name: "Sisilia Surasi",
    location: "Way Halim, Bandarlampung",
    price: "Rp.150.000++",
    tags: ["#PenjahitBajuAnak", "#PenjahitBaju", "#PenjahitPayet", "#PenjahitBajuAnabul", "#PenjahitProfesional"],
    profileImg: "/profile2.png",
  },
  {
    name: "Albertus Widyanarko",
    location: "Kemanggisan, Jakarta Barat",
    price: "Rp.80.000++",
    tags: ["#PenjahitBajuAnak", "#PembeliKain", "#PenjahitPria", "#PenjahitOtodidak", "#PenjahitFullTime"],
    profileImg: "/profile3.png",
  },
  {
    name: "Maya Kartika",
    location: "Cirebon",
    price: "Rp.100.000++",
    tags: ["#PenjahitBajuAnak", "#PenjahitGaun", "#PenjahitModern", "#PenjahitPerempuan"],
    profileImg: "/profile4.png",
  },
  {
    name: "Johan Santoso",
    location: "Yogyakarta",
    price: "Rp.70.000++",
    tags: ["#PenjahitBajuAnak", "#PenjahitSantai", "#PenjahitOtodidak"],
    profileImg: "/profile5.png",
  },
  {
    name: "Anindya Laras",
    location: "Lampung Utara",
    price: "Rp.120.000++",
    tags: ["#PenjahitBajuAnak", "#PenjahitKebaya", "#PenjahitProfesional"],
    profileImg: "/profile6.png",
  },
];

export default function SearchPage() {
  return (
    <div className="search-page">
        <Header />
        
        <SearchBar />

        <Dropdown />

      <div className="user-list">
        {users.map((user, idx) => (
          <div key={idx} className="user-card">
            {/* Profile */}
            <img src={user.profileImg} alt={user.name} className="profile-img" />

            {/* Info */}
            <div className="user-info">
              <h2>{user.name}</h2>
              <p className="location">📍 {user.location}</p>
              <p className="price">{user.price}</p>
              <div className="tags">
                {user.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            </div>

            {/* Icons */}
            <div className="user-icons">
              <button>💖</button>
              <button>💬</button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
