import { useEffect, useState } from "react";

import { api } from "../services/api";

import { MovieCard } from "./MovieCard";

import '../styles/content.scss';

interface ContentProps {
  selected: number;
}

interface Genre {
  title: string;
}

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Value: string;
  }>;
  Runtime: string;
}

export function Content({ selected }: ContentProps) {
  const [movies, setMovies] = useState<Movie[]>([]);

  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);

  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${selected}`).then(response => {
      setMovies(
        response.data.map((movie) => {
          const hours = Math.trunc(parseInt(movie.Runtime.replace(' min', '')) / 60);
          const minutes = parseInt(movie.Runtime.replace(' min', '')) % 60;

          movie.Runtime = `${hours < 10 ? `0${hours}` : hours}h${minutes < 10 ? `0${minutes}` : minutes}m`;

          return movie;
        })
      );
    });

    api.get<Genre>(`genres/${selected}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selected]);

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