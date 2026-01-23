const PREFIX = "movieverse:review-draft:";

export function saveDraft(
  movieId: string,
  text: string
) {
  localStorage.setItem(
    PREFIX + movieId,
    text
  );
}

export function loadDraft(
  movieId: string
): string | null {
  return localStorage.getItem(
    PREFIX + movieId
  );
}

export function clearDraft(
  movieId: string
) {
  localStorage.removeItem(
    PREFIX + movieId
  );
}
