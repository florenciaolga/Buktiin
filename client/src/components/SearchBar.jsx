export default function SearchBar({ placeholder = "Cari sesuatu..." }) {
  return (
    <div className="flex justify-center px-4 my-5">
      <div className="flex items-center bg-gray-100 border border-gray-300 rounded-full w-full max-w-2xl px-4 py-2 shadow-sm">
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500"
        />
        <button className="p-1 hover:bg-gray-200 rounded-full transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}