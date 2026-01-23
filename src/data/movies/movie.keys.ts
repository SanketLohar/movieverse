export const movieKeys = {
  all: ["movies"] as const,
  popular: () => [...movieKeys.all, "popular"] as const,
  page: (page: number) =>
    [...movieKeys.popular(), page] as const,
};
