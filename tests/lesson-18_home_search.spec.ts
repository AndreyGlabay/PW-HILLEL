import test from "@playwright/test";
import { setTimeout } from "timers/promises";

// TASK #18 - LOCATORS

// 18.1 - Search 'Sign In' button with different options

// 18.1a - Open page 'https://qauto.forstudy.space/'
//         Before that - add to 'playwright.config.ts' for website access:
/*
httpCredentials: {
  username: 'guest',
  password: 'welcome2qauto',
},
*/


// Done - added to use{} - ref. 'playwright.config.ts' L30 & L32
/*

  use: {

    baseURL: 'https://qauto.forstudy.space/',

    httpCredentials: {
      username: 'guest',
      password: 'welcome2qauto',
    },

    ...

*/




// 18.1b - Find button 'Sing In' 
//         * by CSS selector
//         * by Xpath selector
//         * by 'getByRole()' method

// 18.1c - for each element call '.highlight()'

test.beforeEach(async ({page}) => {
    await page.goto('');
})

test('TEST-18.1 - Find "Sign In" button by CSS, Xpath, getByRole()', async ({page}) => {
    const buttonSignInCSS = page.locator('.btn btn-outline-white header_signin');
    await buttonSignInCSS.highlight();

    const buttonSignInXpath = page.locator("//div[contains(@class, 'btn btn-outline-white header_signin')]");
    await buttonSignInXpath.highlight();

    const buttonSignInGetByRole = page.getByRole('button', {name: 'Sign In'});
    await buttonSignInGetByRole.highlight();
})



// 18.2 - Search of nav elements in header_signin
//        Find all menu options in the top header 

// 18.2a - find in header elements with text: "Home", "About", "Contacts";
// 18.2b - for location use 'getByText()' only;
// 18.2c - for each located element call '.highlight()'

test('TEST-18.2 - Find all menu options in top header', async ({page}) => {
    const header = page.locator('header');
    await header.getByText('Home').highlight();
    await setTimeout(2000);
    await header.getByText('About').highlight();
    await setTimeout(2000);
    await header.getByText('Contacts').highlight();
    await setTimeout(2000);
})

// ANG 16-May-2026
