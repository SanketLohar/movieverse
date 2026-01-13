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
      en: "An American actor and film producer known for his work in biographical and period films.",
      hi: "एक अमेरिकी अभिनेता और फिल्म निर्माता।",
    },
    profileImage: "/actors/leonardo.jpg", // ✅ LOCAL IMAGE
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
