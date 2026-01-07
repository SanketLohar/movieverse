export type Actor = {
  id: string;
  name: string;
  bio: string;
  profileImage: string;
  knownFor: string[];
};

export const actors: Actor[] = [
  {
    id: "1",
    name: "Leonardo DiCaprio",
    bio: "An American actor and film producer known for his work in biographical and period films.",
    profileImage: "https://via.placeholder.com/300x400",
    knownFor: ["Inception", "The Revenant", "Titanic"],
  },
  {
    id: "2",
    name: "Matthew McConaughey",
    bio: "An American actor known for his performances in drama and science fiction films.",
    profileImage: "https://via.placeholder.com/300x400",
    knownFor: ["Interstellar", "Dallas Buyers Club"],
  },
];
