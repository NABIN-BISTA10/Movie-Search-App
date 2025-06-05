import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import FavoritesList from "./components/FavoritesList";

const API_KEY = "1392d91c";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState(() => {

    // Load favorites from localStorage initially
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("results");

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });



  useEffect(() => {
    // Save favorites to localStorage whenever page refreshes
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (term) => {
    if (!term.trim()) return;

    setLoading(true);
    setError(null);
    setSearchResults([]);

    try {
      let allResults = [];
      let page = 1;
      const maxPages = 5;

      while (page <= maxPages) {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(term)}&page=${page}`
        );
        const data = await res.json();

        if (data.Response === "True") {
          allResults = [...allResults, ...data.Search];
          if (allResults.length >= parseInt(data.totalResults)) break;
          page++;
        } else {
          if (page === 1) setError(data.Error || "No results found.");
          break;
        }
      }

      setSearchResults(allResults);
      setActiveTab("results");
    } catch (err) {
      setError("Network error, please try again.");
    }

    setLoading(false);
  };

  const addToFavorites = (movie) => {
    if (!movie?.imdbID) return;
    if (!favorites.some((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = (imdbID) => {
    setFavorites(favorites.filter((fav) => fav.imdbID !== imdbID));
  };


  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode 
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white" 
          : "bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900"
      }`}
    >

      {/* Header  */}

      <header className={`backdrop-blur-sm border-b ${
        darkMode 
          ? "bg-gray-900/50 border-gray-700" 
          : "bg-white/80 border-gray-200"
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🎬 Movie Search & Favorites App
          </h1>
          
          <button
            onClick={() => {
              const newMode = !darkMode;
              setDarkMode(newMode);
              localStorage.setItem("darkMode", JSON.stringify(newMode));
            }}
            className={`p-3 rounded-full transition-all duration-200 ${
              darkMode 
                ? "bg-gray-800 hover:bg-gray-700 text-yellow-400" 
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            } hover:scale-105`}
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      {/* Main Content */}

      <main className="max-w-6xl mx-auto px-6 py-8">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
          darkMode={darkMode}
        />

        {/* Search Navigation */}

        <div className="flex justify-center gap-1 mt-8 mb-8">
          <button
            onClick={() => setActiveTab("results")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
              activeTab === "results"
                ? darkMode
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-blue-500 text-white shadow-lg"
                : darkMode
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                : "bg-white text-gray-600 hover:bg-gray-50 shadow-sm"
            }`}
          >
            Results ({searchResults.length})
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
              activeTab === "favorites"
                ? darkMode
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-purple-500 text-white shadow-lg"
                : darkMode
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                : "bg-white text-gray-600 hover:bg-gray-50 shadow-sm"
            }`}
          >
            Favorites ({favorites.length})
          </button>
        </div>

        {/* Loading State */}

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-lg">Loading...</span>
          </div>
        )}

        {/* Error State */}

        {error && (
          <div className={`text-center py-8 px-4 rounded-lg mx-auto max-w-md ${
            darkMode ? "bg-red-900/20 text-red-400" : "bg-red-50 text-red-600"
          }`}>
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Content */}

        {activeTab === "results" && searchResults.length > 0 && (
          <MovieList
            movies={searchResults}
            favorites={favorites}
            onAdd={addToFavorites}
            onRemove={removeFromFavorites}
          />
        )}
        
        {activeTab === "favorites" && favorites.length > 0 && (
          <FavoritesList
            favorites={favorites}
            onRemove={removeFromFavorites}
          />
        )}

        {/* Empty States */}

        {activeTab === "results" && searchResults.length === 0 && !loading && !error && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎬</div>
            <p className="text-xl text-gray-500 mb-2">Ready to discover movies?</p>
            <p className="text-gray-400">Search for your favorite films above</p>
          </div>
        )}
        
        {activeTab === "favorites" && favorites.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">♡</div>
            <p className="text-xl text-gray-500 mb-2">No favorites yet</p>
            <p className="text-gray-400">Add movies to your favorites to see them here</p>
          </div>
        )}
      </main>

      {/* Footer */}

      <footer className={`mt-30 border-t ${
        darkMode ? "border-gray-700 bg-gray-900/50" : "border-gray-200 bg-white/80"
      } backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto px-6 py-4 text-center ">
          <p className="text-sm text-gray-500">
            © 2025 Movie Search — Discover & Save Your Favorite Movies
          </p>
        </div>
      </footer>
    </div>
  );
}