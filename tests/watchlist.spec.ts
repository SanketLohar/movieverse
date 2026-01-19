import { test, expect } from "@playwright/test";

test("watchlist persists after refresh", async ({ page }) => {
  await page.goto("/movies");

  // open first movie
  await page.locator("text=View Details").first().click();

  const toggle = page.locator("button[data-state]");

  // wait until hydrated
  await expect(toggle).toBeVisible({ timeout: 15000 });

  // add if not already added
  if (
    (await toggle.getAttribute("data-state")) ===
    "inactive"
  ) {
    await toggle.click();
  }

  // assert active
  await expect(toggle).toHaveAttribute(
    "data-state",
    "active"
  );

  // refresh
  await page.reload();

  const toggleAfterReload =
    page.locator("button[data-state]");

  await expect(toggleAfterReload).toHaveAttribute(
    "data-state",
    "active"
  );
});

test("undo restores removed item", async ({ page }) => {
  await page.goto("/movies");

  await page.locator("text=View Details").first().click();

  const toggle = page.locator("button[data-state]");

  // wait for hydration
  await expect(toggle).toBeVisible({ timeout: 15000 });

  // ensure added
  if (
    (await toggle.getAttribute("data-state")) ===
    "inactive"
  ) {
    await toggle.click();
  }

  await expect(toggle).toHaveAttribute(
    "data-state",
    "active"
  );

  // remove
  await toggle.click();

  await expect(toggle).toHaveAttribute(
    "data-state",
    "inactive"
  );

  // undo
  const undo = page.locator("text=Undo");
  await expect(undo).toBeVisible();
  await undo.click();

  // restored
  await expect(toggle).toHaveAttribute(
    "data-state",
    "active",
    { timeout: 10000 }
  );

  // persists after refresh
  await page.reload();

  const toggleAfterReload =
    page.locator("button[data-state]");

  await expect(toggleAfterReload).toHaveAttribute(
    "data-state",
    "active",
    { timeout: 10000 }
  );
});
