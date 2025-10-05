import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PaymentPage() {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('');

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="flex-1 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 px-4 mb-8">
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              1
            </div>
            <span className="text-xs text-gray-700 hidden sm:inline">Pilih Pekerja</span>
          </div>
          
          <div className="flex-1 h-0.5 bg-gray-300 max-w-[60px]"></div>
          
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              2
            </div>
            <span className="text-xs text-gray-700 hidden sm:inline">Detail Layanan</span>
          </div>
          
          <div className="flex-1 h-0.5 bg-gray-300 max-w-[60px]"></div>
          
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-sm">
              3
            </div>
            <span className="text-xs text-gray-700 hidden sm:inline">Pembayaran</span>
          </div>
          
          <div className="flex-1 h-0.5 bg-gray-300 max-w-[60px]"></div>
          
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-sm">
              4
            </div>
            <span className="text-xs text-gray-700 hidden sm:inline">Konfirmasi</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 space-y-6">
          {/* Payment Method Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-primary mb-4">
              PILIH METODE PEMBAYARAN
            </h3>
            
            <div className="bg-green-500 text-white p-3 rounded-lg text-sm mb-6">
              <strong>Pembayaran Aman:</strong> Dana Anda Akan Ditahan Hingga
              Pekerjaan Selesai Dan Anda Memberikan Konfirmasi.
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={selectedPayment === 'bank'}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="font-medium">Transfer Bank</span>
              </label>
              
              <label className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                <input
                  type="radio"
                  name="payment"
                  value="ewallet"
                  checked={selectedPayment === 'ewallet'}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="font-medium">E-wallet</span>
              </label>
              
              <label className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={selectedPayment === 'cod'}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="font-medium">COD</span>
              </label>
              
              <label className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                <input
                  type="radio"
                  name="payment"
                  value="other"
                  checked={selectedPayment === 'other'}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="font-medium">Lainnya</span>
              </label>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-primary mb-4">
              RINGKASAN PESANAN
            </h3>
            
            <div className="flex items-center gap-4 mb-6">
              <img
                src="/profile1.png"
                alt="profile"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h4 className="font-bold text-lg">Florentina Olivia</h4>
                <p className="text-sm text-gray-600">Jahitan Baju Santai</p>
                <p className="text-xs text-gray-500">📍 Batu Putu, Bandarlampung</p>
              </div>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span>Biaya Servis</span>
                <span>75.000</span>
              </div>
              <div className="flex justify-between">
                <span>Biaya Platform</span>
                <span>7.500</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>82.500</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between font-bold text-primary text-base">
                <span>Total Pembayaran</span>
                <span>82.500</span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-full hover:bg-gray-300 transition font-medium"
              >
                Kembali
              </button>
              <button
                className="flex-[2] bg-primary text-white py-2 rounded-full hover:bg-indigo-700 transition font-medium"
                disabled={!selectedPayment}
              >
                Bayar Sekarang
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}