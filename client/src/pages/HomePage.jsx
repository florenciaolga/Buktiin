import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';

export default function HomePage() {
  const banners = [
    '/banner1.jpg',
    '/banner2.jpg',
    '/banner3.jpeg',
    '/banner4.jpeg',
    '/banner1.jpg',
    '/banner2.jpg',
    '/banner3.jpeg',
    '/banner4.jpeg',
  ];

  const skills = [
    { tag: '#PenjahitBaju', count: '100+' },
    { tag: '#ServiceAC', count: '200+' },
    { tag: '#TukangKayu', count: '150+' },
    { tag: '#Fotografer', count: '120+' },
    { tag: '#DesainGrafis', count: '180+' },
    { tag: '#LesPrivate', count: '300+' },
  ];

  const workers = [
    { id: 1, name: 'Nama Pekerja 1', location: 'Jakarta', img: '/profile1.jpg', rating: '4.9', jobs: '80', price: 'Rp50.000++' },
    { id: 2, name: 'Nama Pekerja 2', location: 'Bandung', img: '/profile2.jpeg', rating: '4.8', jobs: '65', price: 'Rp45.000++' },
    { id: 3, name: 'Nama Pekerja 3', location: 'Surabaya', img: '/profile3.jpeg', rating: '4.9', jobs: '92', price: 'Rp55.000++' },
    { id: 4, name: 'Nama Pekerja 4', location: 'Medan', img: '/profile4.jpeg', rating: '4.7', jobs: '58', price: 'Rp40.000++' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <SearchBar />
        <FilterDropdown />

        {/* Banner Scroll Section */}
        <section className="flex overflow-x-auto gap-3 px-4 py-3 snap-x snap-mandatory scrollbar-hide">
          {banners.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`banner-${i}`}
              className="h-[500px] w-[250px] rounded-xl flex-shrink-0 snap-center object-cover"
            />
          ))}
        </section>

        {/* Skill Categories */}
        <section className="px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">Kategori Skill Populer</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {skills.map((s, i) => (
              <div
                key={i}
                className="bg-secondary text-white rounded-xl p-5 text-center hover:-translate-y-1 transition cursor-pointer"
              >
                <div className="w-12 h-12 bg-black rounded-full mx-auto mb-3" />
                <p className="font-medium">{s.tag}</p>
                <span className="text-sm opacity-90">{s.count} pekerja tersedia</span>
              </div>
            ))}
          </div>
        </section>

        {/* Trusted Workers */}
        <section className="px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">Pekerja Terpercaya</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {workers.map((w) => (
              <Link
                key={w.id}
                to={`/profile/${w.id}`}
                className="bg-indigo-400 text-white rounded-xl p-5 text-center hover:-translate-y-1 transition"
              >
                <img
                  src={w.img}
                  alt={w.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                />
                <h3 className="font-bold text-lg">{w.name}</h3>
                <p className="text-sm mb-2">📍 {w.location}</p>
                <div className="flex flex-wrap justify-center gap-1 mb-3">
                  <span className="bg-white text-primary text-xs px-2 py-1 rounded-lg">
                    #PenjahitBaju
                  </span>
                  <span className="bg-white text-primary text-xs px-2 py-1 rounded-lg">
                    #PenjahitBajuAnak
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>⭐ {w.rating}</span>
                  <span>{w.jobs} Jobs</span>
                  <span>{w.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}