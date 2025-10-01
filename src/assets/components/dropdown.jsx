import React from "react";
import "./dropdown.css";

function FilterBar() {
  return (
     <section className="filter-bar">
      <select>
        <option>Kategori</option>
        <option>#PenjahitBaju</option>
        <option>#ServiceAC</option>
        <option>#TukangKayu</option>
      </select>
      <select>
        <option>Lokasi</option>
        <option>Jakarta</option>
        <option>Bandung</option>
        <option>Semarang</option>
      </select>
      <select>
        <option>Gender</option>
        <option>Pria</option>
        <option>Wanita</option>
      </select>
    </section>
  );
}

export default FilterBar;
