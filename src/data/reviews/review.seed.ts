import type { ReviewEntity } from "./review.types";

/* ---------------------------------------
   Fake users (stable identities)
---------------------------------------- */

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
  {
    id: "seed-u3",
    name: "Karan Verma",
    avatar: "/avatars/karan.png",
  },
  {
    id: "seed-u4",
    name: "Priya Patel",
    avatar: "/avatars/priya.png",
  },
];

/* ---------------------------------------
   Helper
---------------------------------------- */

function user(id: string) {
  return seedUsers.find((u) => u.id === id)!;
}

/* ---------------------------------------
   Dummy reviews
---------------------------------------- */

export const dummyReviews: ReviewEntity[] = [
  {
    id: "seed-r1",
    movieId: "1",
    userId: "seed-u1",

    content: {
      text: "Mind-blowing concept and brilliant execution. Nolan at his best.",
      rating: 5,
    },

    votes: { up: 18, down: 2 },

    moderation: {
      isHidden: false,
      abuseFlags: 0,
      profanityDetected: false,
    },

    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
    deletedAt: null,
  },

  {
    id: "seed-r2",
    movieId: "1",
    userId: "seed-u2",

    content: {
      text: "The visuals were stunning and soundtrack was unforgettable.",
      rating: 5,
    },

    votes: { up: 14, down: 1 },

    moderation: {
      isHidden: false,
      abuseFlags: 0,
      profanityDetected: false,
    },

    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
    deletedAt: null,
  },

  {
    id: "seed-r3",
    movieId: "2",
    userId: "seed-u3",

    content: {
      text: "Emotional, scientific, and visually powerful. A masterpiece.",
      rating: 5,
    },

    votes: { up: 22, down: 3 },

    moderation: {
      isHidden: false,
      abuseFlags: 0,
      profanityDetected: false,
    },

    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    deletedAt: null,
  },
];
