import { MovieSchema, type Movie } from "./movie.schema";
import { moviesMock } from "./movie.mock";
import type {
  MovieBundle,
  MovieCredit,
  MovieReview,
} from "./movie.types";

/* --------------------------------
   Core movie queries
-------------------------------- */

export async function getAllMovies(): Promise<Movie[]> {
  return moviesMock.map((m) => MovieSchema.parse(m));
}

export async function getMovieById(
  id: string
): Promise<Movie | null> {
  const movie = moviesMock.find((m) => m.id === id);
  if (!movie) return null;

  return MovieSchema.parse(movie);
}

/* --------------------------------
   Composite bundle (streamed)
-------------------------------- */

export async function getMovieBundle(
  movieId: string
): Promise<MovieBundle> {
  const credits: MovieCredit[] = [
    {
      id: "c1",
      name: "Leonardo DiCaprio",
      role: "Cobb",
    },
    {
      id: "c2",
      name: "Joseph Gordon-Levitt",
      role: "Arthur",
    },
  ];

  const reviews: MovieReview[] = [
    {
      id: "r1",
      author: "Film Critic",
      rating: 5,
      content: "A masterpiece of modern cinema.",
    },
  ];

  return {
    credits,
    reviews,
  };
}
