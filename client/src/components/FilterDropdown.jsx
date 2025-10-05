export default function FilterDropdown() {
  return (
    <section className="flex justify-center gap-3 px-4 my-5">
      <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm cursor-pointer hover:border-primary hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-primary">
        <option>Kategori</option>
        <option>#PenjahitBaju</option>
        <option>#ServiceAC</option>
        <option>#TukangKayu</option>
      </select>
      
      <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm cursor-pointer hover:border-primary hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-primary">
        <option>Lokasi</option>
        <option>Jakarta</option>
        <option>Bandung</option>
        <option>Semarang</option>
      </select>
      
      <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm cursor-pointer hover:border-primary hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-primary">
        <option>Gender</option>
        <option>Pria</option>
        <option>Wanita</option>
      </select>
    </section>
  );
}