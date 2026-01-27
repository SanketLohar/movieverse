export type LocalizedText = {
  en: string;
  hi?: string;
};

export type FilmographyItem = {
  id: string;
  title: LocalizedText;
  year: number;
  role: LocalizedText;
  genre: string[];
};

export type Actor = {
  id: string;
  name: LocalizedText;
  bio: LocalizedText;
  profileImage: string;
  filmography: FilmographyItem[];
};

export const actors: Actor[] = [
  {
    id: "1",
    name: {
      en: "Leonardo DiCaprio",
      hi: "लियोनार्डो डिकैप्रियो",
    },

    bio: {
      en: "Leonardo DiCaprio is an American actor and film producer known for his work in biographical and period films. He has received numerous accolades, including an Academy Award, a British Academy Film Award, and three Golden Globe Awards.",
    },

    profileImage: "/actor/leonardo.jpg",

    filmography: [
      {
        id: "m1",
        title: { en: "Inception", hi: "इन्सेप्शन" },
        year: 2010,
        role: { en: "Cobb", hi: "कॉब" },
        genre: ["Sci-Fi", "Thriller"],
      },
      {
        id: "m2",
        title: { en: "Titanic", hi: "टाइटैनिक" },
        year: 1997,
        role: { en: "Jack Dawson", hi: "जैक डॉसन" },
        genre: ["Romance", "Drama"],
      },
    ],
  },
];
