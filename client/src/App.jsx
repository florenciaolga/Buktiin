import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import SellerProfilePage from './pages/SellerProfilePage';
import PaymentPage from './pages/PaymentPage';
import ReviewPage from './pages/ReviewPage';
import UploadPage from './pages/UploadPage';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/seller-profile" element={<SellerProfilePage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </div>
  );
}

export default App;