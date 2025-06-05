import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center space-x-2 mb-6"
      role="search"
    >
      <div className="relative w-2/3">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm" />
        </span>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-gray-600 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}
