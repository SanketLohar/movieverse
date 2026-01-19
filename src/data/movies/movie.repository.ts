import { MovieSchema, type Movie } from "./movie.schema";
import { moviesMock } from "./movie.mock";

/**

* Repository abstraction
* Can later be replaced with:
* * TMDb
* * Firestore
* * REST API
    */

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
