import React from "react";

export default function MovieCard({ movie, isFavorite, onAdd, onRemove }) {
  const handleClick = () => {
    console.log("MovieCard handleClick - movie:", movie);
    if (isFavorite) onRemove(movie.imdbID);
    else onAdd(movie);
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden mb-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
      {/* Gradient overlay for depth */}

      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="flex">
        {/* Movie Poster */}

        <div className="relative flex-shrink-0">
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/100x150?text=No+Image"
            }
            alt={movie.Title}
            className="w-28 sm:w-36 h-40 sm:h-48 object-cover"
          />
          {/* Poster overlay effect */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-5 flex-1 min-h-40 sm:min-h-48">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
              {movie.Title}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {movie.Year}
              </span>
              {movie.Type && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                  {movie.Type}
                </span>
              )}
            </div>
            
          </div>

          {/* Action Button */}
          
          <button
            onClick={handleClick}
            className={`relative cursor-pointer overflow-hidden px-5 py-2.5 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transform active:scale-95 transition-all duration-200 ${
              isFavorite
                ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500 shadow-lg shadow-red-500/25"
                : "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 focus:ring-emerald-500 shadow-lg shadow-emerald-500/25"
            }`}
          >
            {/* Button shine effect */}

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            <span className="relative flex items-center justify-center gap-2">
              {isFavorite ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Remove from Favorites
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                  Add to Favorites
                </>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Favorite indicator */}

      {isFavorite && (
        <div className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-1.5 shadow-lg">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
          </svg>
        </div>
      )}
    </div>
  );
}