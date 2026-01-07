export type FilmographyItem = {
  id: string;
  title: string;
  year: number;
  role: string;
};

export type Actor = {
  id: string;
  name: string;
  bio: string;
  profileImage: string;
  filmography: FilmographyItem[];
};

export const actors: Actor[] = [
  {
    id: "1",
    name: "Leonardo DiCaprio",
    bio: "An American actor and film producer known for his work in biographical and period films.",
    profileImage: "https://via.placeholder.com/300x400",
    filmography: [
      { id: "m1", title: "Inception", year: 2010, role: "Cobb" },
      { id: "m2", title: "Titanic", year: 1997, role: "Jack Dawson" },
      { id: "m3", title: "The Revenant", year: 2015, role: "Hugh Glass" },
    ],
  },
  {
    id: "2",
    name: "Matthew McConaughey",
    bio: "An American actor known for his performances in drama and science fiction films.",
    profileImage: "https://via.placeholder.com/300x400",
    filmography: [
      { id: "m4", title: "Interstellar", year: 2014, role: "Cooper" },
      { id: "m5", title: "Dallas Buyers Club", year: 2013, role: "Ron Woodroof" },
    ],
  },
];
