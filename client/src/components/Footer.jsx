export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="text-lg font-bold mb-4">UNTUK PEKERJA</h4>
            <ul className="space-y-2">
              <li className="text-sm hover:text-accent cursor-pointer transition">
                Cara Upload Skill
              </li>
              <li className="text-sm hover:text-accent cursor-pointer transition">
                Tips Video Profile
              </li>
              <li className="text-sm hover:text-accent cursor-pointer transition">
                Tingkatkan Rating
              </li>
              <li className="text-sm hover:text-accent cursor-pointer transition">
                Keamanan Pembayaran
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">UNTUK PELANGGAN</h4>
            <ul className="space-y-2">
              <li className="text-sm hover:text-accent cursor-pointer transition">
                Cara Mencari Pekerja
              </li>
              <li className="text-sm hover:text-accent cursor-pointer transition">
                Tips Memilih
              </li>
              <li className="text-sm hover:text-accent cursor-pointer transition">
                Perlindungan Transaksi
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">BANTUAN</h4>
            <ul className="space-y-2">
              <li className="text-sm hover:text-accent cursor-pointer transition">
                FAQ
              </li>
              <li className="text-sm hover:text-accent cursor-pointer transition">
                Syarat & Ketentuan
              </li>
              <li className="text-sm hover:text-accent cursor-pointer transition">
                Kebijakan Privasi
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}