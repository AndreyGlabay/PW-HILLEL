import test from "@playwright/test";

test.describe('Actions with elements', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('');
    })

    test('click', async ({page}) => {
        await page.getByText('Sign In').click({force: true, button: 'right'});
        await page.getByText('Sign In').dblclick();
    })

    test('text', async ({page}) => {
        await page.getByText('Sign In').click();
        await page.locator('#signinEmail').fill('test@test.com');
        await page.locator('#signinPassword').pressSequentially('test-123', {delay: 500});
    })

    test('press', async ({page}) => {
        await page.getByText('Sign In').click();
        await page.locator('#signinEmail').fill('test@test.com');
        await page.locator('#signinPassword').press('Tab');
    })

    // test('check, uncheck, isChecked', async({page}) => {
    //     await page.goto('https://www.tutorialspoint.com/selenium/practice/check-box.php');
    //     await page.locator('#c_bs_1').check();
    //     console.log(await page.locator('#c_bs_1').isChecked());
    //     console.log(await page.locator('#c_bs_2').isChecked());
    //     await page.locator('#c_bs_1').uncheck();
    //     console.log(await page.locator('#c_bs_1').isChecked());
    // })

    test('focus, blur', async({page}) => {
        await page.getByText('Sign Up').click();
        await page.locator('#signupLastName').focus();
        await page.locator('#signupLastName').blur();
    })

    test('scrollInto', async({page}) => {
        await page.locator('.contacts_socials').scrollIntoViewIfNeeded();
    })

    test('dropdowns by option name', async({page}) => {
        await page.getByText('Sign In').click();
        await page.locator('#signinEmail').fill('rishelevsky+hillel@gmail.com');
        await page.locator('#signinPassword').fill('Hillel-2026');
        await page.getByText('Login').click();
        await page.getByText('Add car').click();
        await page.locator('#addCarBrand').selectOption('Ford');
    })

    test('dropdowns by option num', async({page}) => {
        await page.getByText('Sign In').click();
        await page.locator('#signinEmail').fill('rishelevsky+hillel@gmail.com');
        await page.locator('#signinPassword').fill('Hillel-2026');
        await page.getByText('Login').click();
        await page.getByText('Add car').click();
        await page.locator('#addCarBrand').selectOption('2: 3');
    })

    test('dropdowns by label', async({page}) => {
        await page.getByText('Sign In').click();
        await page.locator('#signinEmail').fill('rishelevsky+hillel@gmail.com');
        await page.locator('#signinPassword').fill('Hillel-2026');
        await page.getByText('Login').click();
        await page.getByText('Add car').click();
        await page.locator('#addCarBrand').selectOption({label: 'Fiat'});
        await page.locator('#addCarModel').selectOption({label: 'Panda'});
        await page.locator('#addCarMileage').fill('500');
        await page.locator('.modal-footer .btn-primary').click();
    })


});



test.describe('Actions with page', () => {

    test('page.goto', async ({page}) => {
        await page.goto('/');
    })

});





