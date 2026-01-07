export type Movie = {
  id: string;
  title: string;
  description: string;
  year: number;
};

export const movies: Movie[] = [
  {
    id: "1",
    title: "Inception",
    description:
      "A thief who steals corporate secrets through dream-sharing technology.",
    year: 2010,
  },
  {
    id: "2",
    title: "Interstellar",
    description:
      "A team travels through a wormhole in space to ensure humanity’s survival.",
    year: 2014,
  },
  {
    id: "3",
    title: "The Dark Knight",
    description:
      "Batman faces the Joker, a criminal mastermind who plunges Gotham into chaos.",
    year: 2008,
  },
];
