import React from "react";
import MovieCard from "./MovieCard";

export default function FavoritesList({ favorites, onRemove }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
      {favorites.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          isFavorite={true}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
