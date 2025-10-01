import React from "react";
import Header from "./assets/components/header.jsx";
import Home from "./assets/components/home.jsx";
import SearchPage from "./assets/components/searchpage.jsx";
import Profile from "./assets/components/profile.jsx";
import ProfilePenjual from "./assets/components/profilepenjual.jsx"
import Pembayaran from "./assets/components/pembayaran.jsx";

function App() {
  return (
    <div>
      <Header /> {/* Navbar */}
      <Home />   {/* Isi halaman + search bar */}
      <SearchPage />
      <Profile />
      <ProfilePenjual />
      <Pembayaran />
    </div>
  );
}

export default App;
