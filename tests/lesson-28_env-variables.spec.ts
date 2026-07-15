// LESSON-28 - Env variables setup

/* 

COMMANDS:

(WINDOWS)
$env:VARIABLE_NAME="value" - setup temporary env var

npm install dotenv - instal dotenv lib


*/

import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test.only("Get env variable", async () => {
    console.log('Env variable:')
    console.log(process.env.VARIABLE_NAME)
});