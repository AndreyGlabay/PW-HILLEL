import test from "@playwright/test";

test.beforeEach(async({page}) => {
    await page.goto('');
})

test('Site access', async ({page}) => {
})


test('page.locator - Xpath', async ({page}) => {
    const title = page.locator('//h1');
    const allButton = page.locator('//button');
    // const allButtonXpath = page.locator('xpath=//button');
})

test('page.locator - CSS', async ({page}) => {
    const title = page.locator('h1');
    const button = page.locator('.btn-primary');
    await button.click();
})

test('getByRole', async ({page}) => {
    page.getByRole('button')
})

test('getByText', async ({page}) => {
    page.getByText('Do more!');
})

test('getByPlaceholder', async ({page}) => {
    page.getByPlaceholder('');
})

test('getByAltText', async ({page}) => {
    page.getByAltText('Instructions');
})

test('getByLabel', async ({page}) => {
    page.getByLabel('Email');
})

test('getBTitle', async ({page}) => {
    page.getByTitle('');
})

test('getBTestId', async ({page}) => {
    page.getByTestId('');
})



