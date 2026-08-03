import { test, expect } from '@playwright/test';

test('Clicking the button increases the coins', async ({ page }) => {
  await page.goto('http://localhost:8080');

  await page.evaluate(() => localStorage.clear());
  await page.reload();

  const clickButton = page.locator('#clickButton');
  await clickButton.click();
  await clickButton.click();
  await clickButton.click();
  
  await expect(page.locator('#coinDisplay')).toHaveText('3');
});
