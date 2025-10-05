import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          BUKTIIN
        </Link>
        
        <nav className="flex gap-6">
          <Link 
            to="/" 
            className={`font-medium hover:underline transition ${
              isActive('/') ? 'underline' : ''
            }`}
          >
            Home
          </Link>
          <Link 
            to="/search" 
            className={`font-medium hover:underline transition ${
              isActive('/search') ? 'underline' : ''
            }`}
          >
            Cari
          </Link>
          <Link 
            to="/chat" 
            className={`font-medium hover:underline transition ${
              isActive('/chat') ? 'underline' : ''
            }`}
          >
            Chat
          </Link>
          <Link 
            to="/seller-profile" 
            className={`font-medium hover:underline transition ${
              isActive('/seller-profile') ? 'underline' : ''
            }`}
          >
            Profil
          </Link>
        </nav>
      </div>
    </header>
  );
}