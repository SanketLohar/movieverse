import type { Movie } from "./movie.schema";

export const moviesMock: Movie[] = [
  {
    id: "1",
    title: "Inception",
    year: 2010,
    description:
      "A thief who steals corporate secrets through dream-sharing technology.",
    media: {
      trailer: "YoHD9XEInc0",
      stills: [
        "/stills/inception-1.jpg",
        "/stills/inception-2.jpg",
        "/stills/inception-3.jpg",
      ],
    },
  },
  {
    id: "2",
    title: "Interstellar",
    year: 2014,
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    media: {
      trailer: "zSWdZVtXT7E",
      stills: [
        "/stills/interstellar-1.jpg",
        "/stills/interstellar-2.jpg",
        "/stills/interstellar-3.jpg",
      ],
    },
  },
];
