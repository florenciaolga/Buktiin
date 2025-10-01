import React from "react";
import "./home.css"; 


import banner1 from "../banner1.jpg";
import banner2 from "../banner2.jpg";
import banner3 from "../banner3.jpeg";
import banner4 from "../banner4.jpeg";
import banner5 from "../banner1.jpg";
import banner6 from "../banner2.jpg";
import banner7 from "../banner3.jpeg";
import banner8 from "../banner4.jpeg";

import profile1 from "../profile1.jpg";
import profile2 from "../profile2.jpeg";
import profile3 from "../profile3.jpeg";
import profile4 from "../profile4.jpeg";

import Dropdown from "./dropdown";
import Footer from "./footer";
import SearchBar from "./searchbar";

function Home() {
  const banners = [banner1, banner2, banner3, banner4, banner5,banner6,banner7,banner8];

  const skills = [
    { tag: "#PenjahitBaju", count: "100+" },
    { tag: "#ServiceAC", count: "200+" },
    { tag: "#TukangKayu", count: "150+" },
    { tag: "#Fotografer", count: "120+" },
    { tag: "#DesainGrafis", count: "180+" },
    { tag: "#LesPrivate", count: "300+" },
  ];

  const workers = [
    { name: "Nama Pekerja 1", location: "Jakarta", img: profile1 },
    { name: "Nama Pekerja 2", location: "Bandung", img: profile2 },
    { name: "Nama Pekerja 3", location: "Surabaya", img: profile3 },
    { name: "Nama Pekerja 4", location: "Medan", img: profile4 },
  ];


  return (
    <div className="homepage">
      
      <SearchBar />
      <Dropdown />

      <section className="banner-scroll">
        {banners.map((img, i) => (
          <img key={i} src={img} alt={`banner-${i}`} />
        ))}
      </section>

      <section className="skill-category">
        <h2>Kategori Skill Populer</h2>
        <div className="skill-grid">
          {skills.map((s, i) => (
            <div key={i} className="skill-card">
              <div className="circle" />
              <p>{s.tag}</p>
              <span>{s.count} pekerja tersedia</span>
            </div>
          ))}
        </div>
      </section>

      <section className="workers">
        <h2>Pekerja Terpercaya</h2>
        <div className="worker-grid">
          {workers.map((w, i) => (
            <div key={i} className="worker-card">
              <img src={w.img} alt={w.name} className="profile-img" />
              <h3>{w.name}</h3>
              <p>📍 {w.location}</p>
              <div className="tags">
                <span>#PenjahitBaju</span>
                <span>#PenjahitBajuAnak</span>
              </div>
              <div className="info">
                <span>⭐ 4.9</span>
                <span>80 Jobs</span>
                <span>Rp50.000++</span>
              </div>
            </div>
          ))}
        </div>
      </section>
        <Footer />
    </div>
  );
}

export default Home;
