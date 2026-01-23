/* ---------------------------------------
   Movie listing types (Phase 5.4.8)
---------------------------------------- */

export type Movie = {
  id: string;
  title: string;
  poster: string | null;
  overview: string;
  releaseDate: string;
  rating: number;
};

export type MoviePage = {
  page: number;
  totalPages: number;
  results: Movie[];
};

/* ---------------------------------------
   Movie detail bundle types (existing)
---------------------------------------- */

export type MovieCredit = {
  id: string;
  name: string;
  role: string;
};

export type MovieReview = {
  id: string;
  author: string;
  rating: number;
  content: string;
};

export type MovieBundle = {
  credits: MovieCredit[];
  reviews: MovieReview[];
};
