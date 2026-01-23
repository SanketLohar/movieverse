import type { ReviewEntity } from "./review.types";

export const seedUsers = [
  {
    id: "seed-u1",
    name: "Rahul Mehta",
    avatar: "/avatars/rahul.png",
  },
  {
    id: "seed-u2",
    name: "Ananya Sharma",
    avatar: "/avatars/ananya.png",
  },
];

export const dummyReviews: ReviewEntity[] = [
  {
    id: "seed-r1",
    movieId: "1",
    userId: "seed-u1",

    content: {
      text: "Mind-blowing concept and brilliant execution.",
      rating: 5,
    },

    votes: { up: 10, down: 1 },

    userVotes: {},

    moderation: {
      isHidden: false,
      abuseFlags: 0,
      profanityDetected: false,
    },

    createdAt: Date.now() - 100000,
    updatedAt: Date.now() - 100000,
    deletedAt: null,
  },
];
