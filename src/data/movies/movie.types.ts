export type MovieCredit = {
  id: string;
  name: string;
  role: string;
};

export type MovieReview = {
  id: string;
  author: string;
  rating: number;
  content: string;
};

export type MovieBundle = {
  credits: MovieCredit[];
  reviews: MovieReview[];
};
