import React from "react";
import "./SearchBar.css";

export default function SearchBar({ placeholder = "Cari sesuatu..." }) {
  return (
    <div className="search-bar">
      <input type="text" placeholder={placeholder} />
      <button className="search-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
          />
        </svg>
      </button>
    </div>
  );
}
