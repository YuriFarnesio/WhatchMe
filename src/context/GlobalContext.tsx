import { createContext, useEffect, useState } from "react";

import { ChildrenProps, ContextProps, Genre, Movie } from "../utils/interfaces";
import { api } from "../services/api";

export const GlobalContext = createContext({} as ContextProps)

export const GlobalProvider = ({ children }: ChildrenProps) => {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [moviesByGenre, setMoviesByGenre] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);

  useEffect(() => {
    api.get<Genre[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMoviesByGenre(response.data);
    });

    api.get<Genre>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId])

  return (
    <GlobalContext.Provider value={{
      selectedGenreId,
      setSelectedGenreId,
      genres,
      setGenres,
      moviesByGenre,
      setMoviesByGenre,
      selectedGenre,
      setSelectedGenre
    }}>
      {children}
    </GlobalContext.Provider>
  )
}
