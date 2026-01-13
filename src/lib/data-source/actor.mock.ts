import { Actor } from "./actor.types";

export const ACTORS: Actor[] = [
  {
    id: "1",
    name: {
      en: "Leonardo DiCaprio",
      hi: "लियोनार्डो डिकैप्रियो",
    },
    bio: {
      en: "An American actor and film producer known for biographical and period films.",
    },
    profileImage: "/actors/leonardo.jpg",
    filmography: [
      {
        id: "m1",
        title: { en: "Inception" },
        year: 2010,
        role: { en: "Cobb" },
        genre: ["Sci-Fi", "Thriller"],
      },
      {
        id: "m2",
        title: { en: "Titanic" },
        year: 1997,
        role: { en: "Jack Dawson" },
        genre: ["Romance", "Drama"],
      },
    ],
  },
];
