import { ButtonHTMLAttributes, ReactNode, SetStateAction } from "react";

export interface ContextProps {
  selectedGenreId: number;
  setSelectedGenreId: React.Dispatch<SetStateAction<number>>;
  genres: Genre[];
  setGenres: React.Dispatch<SetStateAction<Genre[]>>;
  moviesByGenre: Movie[];
  setMoviesByGenre: React.Dispatch<SetStateAction<Movie[]>>;
  selectedGenre: Genre;
  setSelectedGenre: React.Dispatch<SetStateAction<Genre>>;
}

export interface Genre {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

export interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export interface ChildrenProps {
  children: ReactNode;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  iconName: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  selected: boolean;
}

export interface MovieCardProps {
  title: string;
  poster: string;
  rating: string;
  runtime: string;
}

export interface IconProps {
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  color: string;
}
