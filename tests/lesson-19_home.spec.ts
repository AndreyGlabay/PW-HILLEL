import test from "@playwright/test";

test.beforeEach(async({page}) => {
    await page.goto('');
})


// TASK-19.1 - Count all buttons on the page
//             Find all elements with Role 'button' using 'getByRole('button')'
//             Print out the count using 'count()'

test('TEST-19.1 - count buttons on the page', async ({page}) => {
    const buttonsCount = page.getByRole('button');
    console.log('Buttons count on the page: there are ', await buttonsCount.count(), ' buttons found');
})


// TASK-19.2 - Buttons filtering by text (hasText)
//             Find all elements with Role 'button' using 'getByRole('button')'
//             Filter out button with text "Sign In" using 'filter({ hasText: '...' })'
//             Highlight the button using '.highlight()'


test('TEST-19.2.a - filter hasText', async ({page}) => {
    await page.getByRole('button').filter({hasText: 'Sign In'}).highlight();
})

test('TEST-19.2.b - filter hasText', async ({page}) => {
    await page.getByRole('button', {name: 'Sign In'}).highlight();
})





