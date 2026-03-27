import { expect, test } from "@playwright/test";

test("slice 1 remains usable at 360px width", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Core Arithmetic Execution" }),
  ).toBeVisible();
  await expect(page.getByLabel("Calculator display")).toHaveText("0");
  await page.getByRole("button", { name: "9" }).click();
  await page.getByRole("button", { name: "." }).click();
  await page.getByRole("button", { name: "5" }).click();

  await expect(page.getByLabel("Calculator display")).toHaveText("9.5");
  await expect(page.getByText("Entering number 5")).toBeVisible();
});
