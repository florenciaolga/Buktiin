import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ReviewPage() {
  const navigate = useNavigate();
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    // Handle review submission
    console.log('Review submitted:', review);
    navigate('/');
  };

  const handleSkip = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="flex-1 flex flex-col items-center p-5">
        {/* Thank You Banner */}
        <div className="bg-green-500 text-white text-center font-bold py-3 px-5 rounded-lg mb-5 w-full max-w-3xl">
          TERIMAKASIH TELAH MENGGUNAKAN BUKTIIN!
        </div>

        {/* Review Card */}
        <div className="bg-white p-5 rounded-xl w-full max-w-3xl shadow-md">
          <h2 className="text-center text-primary text-xl font-bold mb-5">
            PEKERJAAN SELESAI!
          </h2>

          {/* Profile Summary */}
          <div className="flex items-center gap-4 bg-gray-100 p-3 rounded-lg mb-5">
            <div className="w-12 h-12 rounded-full bg-black flex-shrink-0" />
            <div>
              <h4 className="font-bold">Florentina Olivia</h4>
              <p className="text-sm text-gray-600">Jahitan Baju Santai</p>
              <p className="text-xs text-gray-500">
                Selesai pada: 21 September 2026, 14:30
              </p>
            </div>
          </div>

          {/* Job Details */}
          <div className="text-sm text-gray-600 mb-5 space-y-1">
            <p>
              Lokasi: <span className="font-medium text-gray-800">Tangerang Selatan</span>
            </p>
            <p>
              Status: <span className="font-bold text-green-500">Selesai</span>
            </p>
            <p>
              Total Biaya: <span className="font-bold text-primary">Rp82.500,00</span>
            </p>
          </div>

          {/* Review Section */}
          <h3 className="text-primary mb-3 font-semibold">
            BERIKAN RATING DAN REVIEW ANDA
          </h3>
          <textarea
            className="w-full min-h-[100px] rounded-lg border-none bg-gray-100 p-3 text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Tambahkan..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          {/* Action Buttons */}
          <div className="flex justify-between gap-5">
            <button
              onClick={handleSkip}
              className="flex-1 bg-gray-300 text-primary border-none rounded-full py-3 font-medium cursor-pointer hover:bg-gray-400 transition"
            >
              Lewati Review
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-primary text-white border-none rounded-full py-3 font-medium cursor-pointer hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Kirim Review
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}