import test from "@playwright/test";

test.beforeEach(async({page}) => {
    await page.goto('');
})

test('filter hasText', ({page}) => {
    page.locator('//button').filter({hasText: 'Sign Up'});
    page.getByRole('button').filter({hasText: 'Sign Up'});
    page.locator('//button', {hasText: 'Sign Up'});
    page.getByRole('button', {name: 'Sign Up'});
})

test('filter hasNotText', ({page}) => {
    page.locator('//button').filter({hasNotText: 'Sign Up'});
    page.getByRole('button').filter({hasNotText: 'Sign Up'});
})

test('filter has', async ({page}) => {
    await page.locator('//a').filter({ has: page.locator('span.icon-telegram') }).highlight();
})

test('filter hasNot', async ({page}) => {
    await page.locator('//a').filter({ hasNot: page.locator('span.icon-telegram') }).highlight();
})





