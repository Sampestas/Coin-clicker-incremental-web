import { test, expect } from '@playwright/test';

test('Clicking increases player coins based on variable change', async ({ page }) => {
  await page.goto('http://localhost:8080');
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  const coinsBefore = await page.evaluate(() => window.playerDataForTest.coins);

  const clickButton = page.locator('#clickButton');
  await clickButton.click();
  await clickButton.click();
  await clickButton.click();

  const coinsAfter = await page.evaluate(() => window.playerDataForTest.coins);

  expect(coinsAfter).toBeGreaterThan(coinsBefore);
});
