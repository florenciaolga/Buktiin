import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./review.css";

export default function Review() {
  const [review, setReview] = useState("");

  return (
    <div className="review-page">
      <Header />

      <div className="review-container">
        {/* Info Banner */}
        <div className="thankyou-banner">
          TERIMAKASIH TELAH MENGGUNAKAN BUKTIIN!
        </div>

        {/* Card */}
        <div className="review-card">
          <h2 className="card-title">PEKERJAAN SELESAI!</h2>

          {/* Profile Summary */}
          <div className="profile-summary">
            <div className="profile-avatar"></div>
            <div>
              <h4>Florentina Olivia</h4>
              <p className="job-title">Jahitan Baju Santai</p>
              <p className="job-date">Selesai pada: 21 September 2026, 14:30</p>
            </div>
          </div>

          {/* Detail */}
          <div className="detail-info">
            <p>Lokasi: <span>Tangerang Selatan</span></p>
            <p>Status: <span className="status">Selesai</span></p>
            <p>Total Biaya: <span className="price">Rp82.500,00</span></p>
          </div>

          {/* Review Section */}
          <h3 className="subtitle">BERIKAN RATING DAN REVIEW ANDA</h3>
          <textarea
            className="review-input"
            placeholder="Tambahkan..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>

          {/* Buttons */}
          <div className="action-buttons">
            <button className="submit-btn" disabled>Lewati Review</button>
            <button className="submit-btn">Kirim Review</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
