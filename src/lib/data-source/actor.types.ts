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
