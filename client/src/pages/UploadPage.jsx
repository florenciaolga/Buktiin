import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function UploadPage() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    console.log('Upload:', { title, description, image });
    // Handle upload logic
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 p-5 bg-[#f9f9ff]">
        <h2 className="text-xl font-bold mb-4">#SkillNyataPeluangNyata</h2>

        {/* Upload Box */}
        <div className="relative flex gap-5 bg-[#d9d9ff] p-5 rounded-xl h-[300px] items-center">
          {/* Image Upload Section */}
          <div className="flex flex-col items-center">
            <label htmlFor="file-upload" className="cursor-pointer">
              {image ? (
                <img
                  src={image}
                  alt="preview"
                  className="w-[200px] h-[250px] object-cover rounded-lg mb-3"
                />
              ) : (
                <div className="w-[200px] h-[250px] border-2 border-dashed border-gray-400 flex justify-center items-center rounded-lg mb-3 bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V3.75m0 12.75L7.5 12m4.5 4.5l4.5-4.5M4.5 19.5h15a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25h-2.25"
                    />
                  </svg>
                </div>
              )}
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              onClick={handleUpload}
              className="bg-black text-white px-4 py-1.5 border-none rounded-md cursor-pointer hover:bg-gray-800 transition"
            >
              Upload
            </button>
          </div>

          {/* Text Input Section */}
          <div className="flex-1 flex flex-col gap-3 p-5">
            <input
              type="text"
              placeholder="Tulis judul disini..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 rounded-lg border-none w-[90%] focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <textarea
              placeholder="Tulis deskripsi disini..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-3 rounded-lg border-none w-[90%] min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Settings Button */}
          <button className="absolute top-3 right-3 cursor-pointer hover:opacity-75 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-800"
            >
              <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
              <path
                d="M3.66 10.64C4.13 10.94 4.44 11.44 4.44 12c0 .56-.31 1.06-.78 1.36-.32.2-.53.38-.68.57-.32.42-.46.95-.39 1.49.05.39.29.8.75 1.6.46.81.69 1.21 1.01 1.46.42.32.95.46 1.49.39.24-.03.49-.12.82-.29.49-.26 1.09-.27 1.57.01.48.28.77.79.79 1.34.01.37.04.62.11.82.16.41.51.75.95.93.37.16.83.16 1.76.16.93 0 1.39 0 1.76-.16.44-.18.79-.52.95-.93.07-.2.1-.45.11-.82.02-.55.31-1.06.79-1.34.48-.28 1.08-.27 1.57-.01.33.17.58.26.82.29.54.07 1.07-.07 1.49-.39.32-.25.55-.65 1.01-1.46.46-.8.7-1.21.75-1.6.07-.54-.07-1.07-.39-1.49-.15-.19-.36-.37-.68-.57-.47-.3-.78-.8-.78-1.36 0-.56.31-1.06.78-1.36.32-.2.53-.38.68-.57.32-.42.46-.95.39-1.49-.05-.39-.29-.8-.75-1.6-.46-.81-.69-1.21-1.01-1.46-.42-.32-.95-.46-1.49-.39-.24.03-.49.12-.82.29-.49.26-1.09.27-1.57-.01-.48-.28-.77-.79-.79-1.34-.01-.37-.04-.62-.11-.82-.16-.41-.51-.75-.95-.93C13.39 2 12.93 2 12 2c-.93 0-1.39 0-1.76.16-.44.18-.79.52-.95.93-.07.2-.1.45-.11.82-.02.55-.31 1.06-.79 1.34-.48.28-1.08.27-1.57.01-.33-.17-.58-.26-.82-.29-.54-.07-1.07.07-1.49.39-.32.25-.55.65-1.01 1.46-.46.8-.7 1.21-.75 1.6-.07.54.07 1.07.39 1.49.15.19.36.37.68.57z"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Hashtags */}
        <div className="mt-4 flex gap-3">
          <button className="bg-primary text-white px-3 py-1.5 rounded-lg border-none cursor-pointer text-sm hover:bg-indigo-700 transition">
            #RekomendasiHashtag
          </button>
          <button className="bg-primary text-white px-3 py-1.5 rounded-lg border-none cursor-pointer text-sm hover:bg-indigo-700 transition">
            #Tag1
          </button>
          <button className="bg-primary text-white px-3 py-1.5 rounded-lg border-none cursor-pointer text-sm hover:bg-indigo-700 transition">
            #TrendingTags
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}