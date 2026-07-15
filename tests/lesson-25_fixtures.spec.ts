import { chromium } from '@playwright/test';
import { test, expect } from '../utils/fixtures/screenSizesFixtures';

test.describe('Fixtures', () => {

    test.skip('Open Wiki without fixtures', async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://wikipedia.org')

    })

    test('Open Wiki with small screen', async ({ mediumScreen, bigScreen, smallScreen }) => {
        await smallScreen.goto('https://wikipedia.org')
        await smallScreen.waitForTimeout(1500);
    })

    test('Open Wiki with medium screen', async ({ mediumScreen}) => {
        await mediumScreen.goto('https://wikipedia.org')
        await mediumScreen.waitForTimeout(1500);        
    })

    test('Open Wiki with big screen', async ({ bigScreen}) => {
        await bigScreen.goto('https://wikipedia.org')
        await bigScreen.waitForTimeout(1500);
    })

})

