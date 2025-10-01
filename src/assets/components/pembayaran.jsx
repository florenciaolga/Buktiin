import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "./pembayaran.css";

export default function Pembayaran() {
  return (
    <div className="pembayaran-page">
      <Header />

      {/* Progress Steps */}
      <div className="progress-container">
        <div className="step active">1</div>
        <span className="step-label">Pilih Pekerja</span>
        <div className="line"></div>
        <div className="step active">2</div>
        <span className="step-label">Detail Layanan</span>
        <div className="line"></div>
        <div className="step">3</div>
        <span className="step-label">Pembayaran</span>
        <div className="line"></div>
        <div className="step">4</div>
        <span className="step-label">Konfirmasi</span>
      </div>

      {/* Pilih Metode Pembayaran */}
      <div className="card">
        <h3>PILIH METODE PEMBAYARAN</h3>
        <div className="info-green">
          <strong>Pembayaran Aman:</strong> Dana Anda Akan Ditahan Hingga
          Pekerjaan Selesai Dan Anda Memberikan Konfirmasi.
        </div>

        <div className="payment-methods">
          <label className="payment-option">
            <input type="radio" name="payment" /> Transfer Bank
          </label>
          <label className="payment-option">
            <input type="radio" name="payment" /> E-wallet
          </label>
          <label className="payment-option">
            <input type="radio" name="payment" /> COD
          </label>
          <label className="payment-option">
            <input type="radio" name="payment" /> Lainnya
          </label>
        </div>
      </div>

      {/* Ringkasan Pesanan */}
      <div className="card">
        <h3>RINGKASAN PESANAN</h3>
        <div className="profile-summary">
          <img
            src="/profile1.png"
            alt="profile"
            className="profile-avatar"
          />
          <div>
            <h4>Florentina Olivia</h4>
            <p className="job-title">Jahitan Baju Santai</p>
            <p className="location">📍 Batu Putu, Bandarlampung</p>
          </div>
        </div>

        <div className="price-detail">
          <p>Biaya Servis <span>75.000</span></p>
          <p>Biaya Platform <span>7.500</span></p>
          <p>Subtotal <span>82.500</span></p>
          <hr />
          <p className="total">Total Pembayaran <span>82.500</span></p>
        </div>

        <div className="action-buttons">
          <button className="back-btn">Kembali</button>
          <button className="pay-btn">Bayar Sekarang</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
