import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SellerProfilePage() {
  const photos = [
    '/photo1.jpg',
    '/photo2.jpg',
    '/photo3.jpg',
    '/photo4.jpg',
    '/photo5.jpg',
    '/photo6.jpg',
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-start gap-6 p-8 max-w-6xl mx-auto">
          <img
            src="/profile1.png"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          
          <div className="flex-1">
            <h2 className="text-3xl font-bold">Florentina Olivia</h2>
            <p className="text-gray-600 mt-1">📍 Batu Putu, Bandarlampung</p>
            <p className="font-semibold text-lg mt-1">💰 Rp. 50.000++</p>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-4">
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  #PenjahitBajuAnak
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  #PenjahitBaju
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  #PenjahitBajuPernikahan
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  #PenjahitBajuAnabul
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  #PenjahitOtodidak
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  #SharingMoms
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  #MomOfThree
                </span>
              </div>
              
              <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition whitespace-nowrap">
                Edit Profil
              </button>
            </div>
          </div>
        </div>

        {/* Photos Section */}
        <div className="px-8 py-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {photos.map((photo, i) => (
              <div
                key={i}
                className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
              >
                <img
                  src={photo}
                  alt={`photo-${i}`}
                  className="w-full h-full object-cover hover:scale-110 transition"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Add Photo Button */}
        <div className="flex justify-center py-6">
          <button className="bg-primary text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition text-lg font-medium w-full max-w-md mx-4">
            Tambahkan Foto/Video
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}