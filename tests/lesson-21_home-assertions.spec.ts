import test, { expect } from "@playwright/test";

// TASK-19 - Actual results verification with Assertions


test.describe('Auto retrying assertions', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('');
    })

    // 19.1 -   Verify visibility of “Sign In” button
    //          Find "Sign In" button using 'getByRole'
    //          Use auto-retrying assertion' toBeVisible()'

    test('TEST-19.1 - toBeVisible', async ({page}) => {
        await expect(page.getByRole('button').filter({hasText: 'Sign In'})).toBeVisible;    
    })

    //----------------------------------------------------------//

    // 19.2 -   Verify header's text (toHaveText) - Check exact text main header on the page
    //          Find header 'hero' section with text "Do more!"
    //          Use 'toHaveText()'   

    test('TEST-19.2 - toHaveText', async ({page}) => {
        await expect(page.locator('h1')).toHaveText('Do more!')
    })
    
    //----------------------------------------------------------//

    // 19.3 -   Verify elements' qty (toHaveCount) - Check quantity of images with the same 'alt'
    //          Locate all images with 'alt="Instructions"'
    //          Use 'toHaveCount()'
    //          Expected count is 2

    test('TEST-19.3 - toHaveCount', async ({page}) => {
        await expect(page.getByAltText('Instructions')).toHaveCount(2);     
    })

})

