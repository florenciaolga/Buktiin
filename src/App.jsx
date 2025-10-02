import React from "react";
import Header from "./assets/components/Header.jsx";
import Home from "./assets/components/home.jsx";
import SearchPage from "./assets/components/searchpage.jsx";
import Profile from "./assets/components/profile.jsx";
import ProfilePenjual from "./assets/components/profilepenjual.jsx"
import Pembayaran from "./assets/components/pembayaran.jsx";
import Upload from "./assets/components/upload.jsx";
import Review from "./assets/components/review.jsx";

function App() {
  return (
    <div>
      <Home />   {/* Isi halaman + search bar */}
      <SearchPage />
      <Profile />
      <ProfilePenjual />
      <Pembayaran />
      <Upload />
      <Review />
    </div>
  );
}

export default App;
