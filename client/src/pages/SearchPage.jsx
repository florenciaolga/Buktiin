import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';

export default function SearchPage() {
  const users = [
    {
      id: 1,
      name: 'Florentina Olivia',
      location: 'Batu Putu, Bandarlampung',
      price: 'Rp. 50.000++',
      tags: ['#PenjahitBajuAnak', '#PenjahitBaju', '#PenjahitBajuPernikahan', '#PenjahitBajuAnabul', '#PenjahitOtodidak'],
      profileImg: '/profile1.png',
    },
    {
      id: 2,
      name: 'Sisilia Surasi',
      location: 'Way Halim, Bandarlampung',
      price: 'Rp.150.000++',
      tags: ['#PenjahitBajuAnak', '#PenjahitBaju', '#PenjahitPayet', '#PenjahitBajuAnabul', '#PenjahitProfesional'],
      profileImg: '/profile2.png',
    },
    {
      id: 3,
      name: 'Albertus Widyanarko',
      location: 'Kemanggisan, Jakarta Barat',
      price: 'Rp.80.000++',
      tags: ['#PenjahitBajuAnak', '#PembeliKain', '#PenjahitPria', '#PenjahitOtodidak', '#PenjahitFullTime'],
      profileImg: '/profile3.png',
    },
    {
      id: 4,
      name: 'Maya Kartika',
      location: 'Cirebon',
      price: 'Rp.100.000++',
      tags: ['#PenjahitBajuAnak', '#PenjahitGaun', '#PenjahitModern', '#PenjahitPerempuan'],
      profileImg: '/profile4.png',
    },
    {
      id: 5,
      name: 'Johan Santoso',
      location: 'Yogyakarta',
      price: 'Rp.70.000++',
      tags: ['#PenjahitBajuAnak', '#PenjahitSantai', '#PenjahitOtodidak'],
      profileImg: '/profile5.png',
    },
    {
      id: 6,
      name: 'Anindya Laras',
      location: 'Lampung Utara',
      price: 'Rp.120.000++',
      tags: ['#PenjahitBajuAnak', '#PenjahitKebaya', '#PenjahitProfesional'],
      profileImg: '/profile6.png',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      <main className="flex-1">
        <SearchBar />
        <FilterDropdown />

        <div className="px-4 py-6 space-y-4 max-w-4xl mx-auto">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-start bg-indigo-500 text-white p-4 rounded-2xl shadow-md"
            >
              <img
                src={user.profileImg}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />

              <div className="flex-1">
                <h2 className="text-lg font-bold">{user.name}</h2>
                <p className="text-sm opacity-90">📍 {user.location}</p>
                <p className="font-semibold mt-1">{user.price}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-white/20 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 ml-2">
                <button className="text-2xl hover:scale-110 transition">💖</button>
                <Link to={`/profile/${user.id}`}>
                  <button className="text-2xl hover:scale-110 transition">💬</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}