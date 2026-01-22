import { openDB, type IDBPDatabase } from "idb";
import type { ReviewDraft } from "./review.types";

type DraftRecord = ReviewDraft & {
  key: string;
};

const DB_NAME = "movieverse-review-drafts";
const STORE_NAME = "drafts";

async function getDb(): Promise<
  IDBPDatabase<unknown>
> {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "key"
        });
      }
    }
  });
}

function draftKey(movieId: string, userId: string) {
  return `${movieId}:${userId}`;
}

/* ---------------------------------------
   Draft repository
---------------------------------------- */

export async function saveDraft(
  draft: ReviewDraft
) {
  const db = await getDb();

  const record: DraftRecord = {
    key: draftKey(draft.movieId, draft.userId),
    ...draft
  };

  await db.put(STORE_NAME, record);
}

export async function getDraft(
  movieId: string,
  userId: string
): Promise<ReviewDraft | null> {
  const db = await getDb();

  const record = (await db.get(
    STORE_NAME,
    draftKey(movieId, userId)
  )) as DraftRecord | undefined;

  if (!record) return null;

  const { key, ...draft } = record;
  return draft;
}

export async function deleteDraft(
  movieId: string,
  userId: string
) {
  const db = await getDb();

  await db.delete(
    STORE_NAME,
    draftKey(movieId, userId)
  );
}
