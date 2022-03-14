import { useContext, useMemo } from "react";

import { GlobalContext } from "../context/GlobalContext";
import { MovieCard } from "./MovieCard";

import '../styles/content.scss';

export function Content() {
  const { selectedGenre, moviesByGenre } = useContext(GlobalContext);

  const movies = useMemo(() => {
    return moviesByGenre.map((movie) => {
      const hours = Math.trunc(parseInt(movie.Runtime.replace(' min', '')) / 60);
      const minutes = parseInt(movie.Runtime.replace(' min', '')) % 60;

      movie.Runtime = `${hours < 10 ? `0${hours}` : hours}H ${minutes < 10 ? `0${minutes}` : minutes}m`;

      return movie;
    });
  }, [moviesByGenre])

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  )
}