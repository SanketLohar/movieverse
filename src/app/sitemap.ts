import type { MetadataRoute } from "next";
import { getAllMovies } from "../data/movies/movie.repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const movies = await getAllMovies();

  const baseUrl = "https://movieverse.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/movies`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/actor`,
      lastModified: new Date(),
    },

    ...movies.map((movie) => ({
      url: `${baseUrl}/movies/${movie.id}`,
      lastModified: new Date(),
    })),
  ];
}
