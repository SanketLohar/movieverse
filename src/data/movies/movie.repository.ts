import { MovieSchema, type Movie } from "./movie.schema";
import { moviesMock } from "./movie.mock";
import type {
  MovieBundle,
  MovieCredit,
  MovieReview,
} from "./movie.types";
import { fetchPopularMovies } from "./movie.api";
/* --------------------------------
   Cache configuration
-------------------------------- */

const MOVIE_TTL = 30_000;
const BUNDLE_TTL = 15_000;

/* --------------------------------
   In-flight request deduplication
-------------------------------- */

const movieByIdRequests = new Map<
  string,
  Promise<Movie | null>
>();

const movieBundleRequests = new Map<
  string,
  Promise<MovieBundle>
>();

/* --------------------------------
   Stale-while-revalidate cache
-------------------------------- */

type CacheEntry<T> = {
  data: T;
  expires: number;
  refreshing?: boolean;
};

const movieCache = new Map<
  string,
  CacheEntry<Movie | null>
>();

const bundleCache = new Map<
  string,
  CacheEntry<MovieBundle>
>();

/* --------------------------------
   Core movie queries
-------------------------------- */

export async function getAllMovies(): Promise<Movie[]> {
  return moviesMock.map((m) => MovieSchema.parse(m));
}

export async function getMovieById(
  id: string
): Promise<Movie | null> {
  const now = Date.now();
  const cached = movieCache.get(id);

  // ✅ Fresh cache
  if (cached && cached.expires > now) {
    return cached.data;
  }

  // ✅ Stale cache → return immediately + refresh
  if (cached && cached.expires <= now) {
    if (!cached.refreshing) {
      cached.refreshing = true;

      void refreshMovie(id);
    }

    return cached.data;
  }

  // ✅ No cache → normal request
  return fetchMovie(id);
}

async function fetchMovie(
  id: string
): Promise<Movie | null> {
  if (movieByIdRequests.has(id)) {
    return movieByIdRequests.get(id)!;
  }

  const request = (async () => {
    const movie = moviesMock.find((m) => m.id === id);
    const parsed = movie
      ? MovieSchema.parse(movie)
      : null;

    movieCache.set(id, {
      data: parsed,
      expires: Date.now() + MOVIE_TTL,
    });

    return parsed;
  })();

  movieByIdRequests.set(id, request);

  try {
    return await request;
  } finally {
    movieByIdRequests.delete(id);
  }
}

/* --------------------------------
   Background refresh
-------------------------------- */

async function refreshMovie(id: string) {
  try {
    const movie = moviesMock.find((m) => m.id === id);
    const parsed = movie
      ? MovieSchema.parse(movie)
      : null;

    movieCache.set(id, {
      data: parsed,
      expires: Date.now() + MOVIE_TTL,
    });
  } catch {
    // swallow background errors
  }
}

/* --------------------------------
   Composite bundle (streamed)
-------------------------------- */

export async function getMovieBundle(
  movieId: string
): Promise<MovieBundle> {
  const now = Date.now();
  const cached = bundleCache.get(movieId);

  // fresh
  if (cached && cached.expires > now) {
    return cached.data;
  }

  // stale → return immediately + refresh
  if (cached && cached.expires <= now) {
    if (!cached.refreshing) {
      cached.refreshing = true;
      void refreshBundle(movieId);
    }

    return cached.data;
  }

  return fetchBundle(movieId);
}

async function fetchBundle(
  movieId: string
): Promise<MovieBundle> {
  if (movieBundleRequests.has(movieId)) {
    return movieBundleRequests.get(movieId)!;
  }

  const request = (async () => {
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

    const bundle: MovieBundle = {
      credits,
      reviews,
    };

    bundleCache.set(movieId, {
      data: bundle,
      expires: Date.now() + BUNDLE_TTL,
    });

    return bundle;
  })();

  movieBundleRequests.set(movieId, request);

  try {
    return await request;
  } finally {
    movieBundleRequests.delete(movieId);
  }
}

async function refreshBundle(movieId: string) {
  try {
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

    bundleCache.set(movieId, {
      data: { credits, reviews },
      expires: Date.now() + BUNDLE_TTL,
    });
  } catch {
    // background failure ignored
  }
}
export async function getPopularMovies(page: number) {
  const data = await fetchPopularMovies(page);

  return {
    page: data.page,
    totalPages: data.total_pages,
    results: data.results.map((m: any) => ({
      id: String(m.id),
      title: m.title,
      overview: m.overview,
      poster: m.poster_path
        ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
        : null,
      rating: m.vote_average,
      releaseDate: m.release_date,
    })),
  };
}
