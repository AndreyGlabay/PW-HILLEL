import test, { expect } from '@playwright/test';


// ℹ️ Please note: test data, such as password values, has not been moved to separate file due to 
//     make the tests easier for the reading/review. 

test.describe('CodeGen SignUp tests', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
        await page.getByRole('button', { name: 'Sign up' }).click();
    })

    test.afterEach(async ({page}) => {
        await page.getByRole('button', { name: 'Close' }).click();
        await expect(page.getByRole('heading', { name: 'Registration' })).not.toBeVisible();
    })

    // ------------------------- HAPPY PATH CHECK - TEST COUNT: 01 ------------------------- //

    test('TEST-00 - Happy path - Sign up new user', async ({ page }) => {
        await page.locator('#signupName').fill('Andriy '.trim());
        await page.locator('#signupLastName').fill('Glabay'.trim());
        await page.getByRole('textbox', { name: 'Name Last name Email' }).fill(`rishelevsky+aqa${Date.now()}@gmail.com`);
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill('TesT-11235');
        await page.getByRole('textbox', { name: 'Re-enter password' }).fill('TesT-11235');
        await page.getByRole('button', { name: 'Register' }).click();
        await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible();
        await page.getByRole('button', { name: 'User photo My profile' }).click();
        await page.getByRole('link', { name: 'Profile', exact: true }).click();
        await expect(page.locator('app-profile')).toContainText('Andriy Glabay');
        await page.getByText('Log out').click();
        await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
        await page.getByRole('button', { name: 'Sign up' }).click();
    });

    // ------------------------- FIRST NAME CHECKS - TEST COUNT: 02-07 ------------------------- //
    test('TEST-01(A) POS - Reg form, Name - Minimum length (min)', async ({ page }) => {
        await page.locator('#signupName').fill('Io');
        await page.locator('#signupName').blur();
        await expect(page.getByText('Name has to be from 2 to 20')).not.toBeVisible();
        await expect(page.locator('#signupName')).not.toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TEST-01(B) POS - Reg form, Name - Maximum length (max)', async ({ page }) => {
        await page.locator('#signupName').fill('AppolinariyMarkovich');
        await page.locator('#signupName').blur();
        await expect(page.getByText('Name has to be from 2 to 20')).not.toBeVisible();
        await expect(page.locator('#signupName')).not.toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TEST-01(C) NEG - Reg form, Name - Empty field', async ({ page }) => {
        await page.locator('#signupName').focus();
        await page.locator('#signupName').blur();
        await expect(page.getByText('Name required', { exact: true })).toBeVisible();
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TEST-01(D) NEG - Reg form, Name - Wrong data', async ({ page }) => {
        await page.locator('#signupName').fill('Андрій');
        await page.locator('#signupName').blur();
        await expect(page.getByText('Name is invalid')).toBeVisible();
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TEST-01(E) NEG - Reg form, Name - Wrong length (less than min)', async ({ page }) => {
        await page.locator('#signupName').fill('a');
        await page.locator('#signupName').blur();
        await expect(page.getByText('Name has to be from 2 to 20')).toBeVisible();
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TEST-01(F) NEG - Reg form, Name - Wrong length (greater than max)', async ({ page }) => {
        await page.locator('#signupName').fill('AppolinariyMarkovichV');
        await page.locator('#signupName').blur();
        await expect(page.getByText('Name has to be from 2 to 20')).toBeVisible();
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });   

    // ------------------------- LAST NAME CHECKS - TEST COUNT: 08-13 ------------------------- //
    test('TEST-02(A) POS - Reg form, Last Name - Minimum length (min)', async ({ page }) => {
        await page.locator('#signupLastName').fill('Io');
        await page.locator('#signupLastName').blur();
        await expect(page.getByText('Last name has to be from 2 to 20 characters long')).not.toBeVisible();
        await expect(page.locator('#signupLastName')).not.toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TEST-02(B) POS - Reg form, Last Name - Maximum length (max)', async ({ page }) => {
        await page.locator('#signupLastName').fill('NeperejdyHataYarovuy');
        await page.locator('#signupLastName').blur();
        await expect(page.getByText('Last name has to be from 2 to 20 characters long')).not.toBeVisible();
        await expect(page.locator('#signupLastName')).not.toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TEST-02(C) NEG - Reg form, Last Name - Empty', async ({ page }) => {
        await page.locator('#signupLastName').focus();
        await page.locator('#signupLastName').blur();
        await expect(page.getByText('Last name required')).toBeVisible();
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TEST-02(D) NEG - Reg form, Last Name - Wrong data', async ({ page }) => {
        await page.locator('#signupLastName').fill('Українець');
        await page.locator('#signupLastName').blur();
        await expect(page.getByText('Last name is invalid')).toBeVisible();
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TEST-02(E) NEG - Reg form, Last Name - Wrong length (less than min)', async ({ page }) => {
        await page.locator('#signupLastName').fill('b');
        await page.locator('#signupLastName').blur();
        await expect(page.getByText('Last name has to be from 2 to 20 characters long')).toBeVisible();
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TEST-02(F) NEG - Reg form, Last Name - Wrong length (greater than max)', async ({ page }) => {
        await page.locator('#signupLastName').fill('NeperejdyHataYarovuyX');
        await page.locator('#signupLastName').blur();
        await expect(page.getByText('Last name has to be from 2 to 20 characters long')).toBeVisible();
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });   

    // ------------------------- EMAIL CHECKS - TEST COUNT: 14-16 ------------------------- //
    test('TEST-03(A) POS - Reg form, Email - Valid data', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Name Last name Email' }).fill('test@myserver.com');
        await page.getByRole('textbox', { name: 'Name Last name Email' }).blur();
        await expect(page.getByText('Email is incorrect')).not.toBeVisible();
        await expect(page.locator('#signupEmail')).not.toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TEST-03(B) NEG - Reg form, Email - Empty', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Name Last name Email' }).focus();
        await page.getByRole('textbox', { name: 'Name Last name Email' }).blur();
        await expect(page.getByText('Email required')).toBeVisible();
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TEST-03(C) NEG - Reg form, Email - Wrong data', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Name Last name Email' }).fill('testtesttest.com');
        await page.getByRole('textbox', { name: 'Name Last name Email' }).blur();
        await expect(page.getByText('Email is incorrect')).toBeVisible();
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    // ------------------------- PASSWORD CHECKS - TEST COUNT: 17-25 ------------------------- //
    test('TEST-04(A) POS - Reg form, Password - Valid data, minimum length', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill('TesT5678');
        await page.getByRole('textbox', { name: 'Password', exact: true }).blur();
        await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).not.toBeVisible();
        await expect(page.locator('#signupPassword')).not.toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TEST-04(B) POS - Reg form, Password - Valid data, maximum length', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill('TesT56789012345');
        await page.getByRole('textbox', { name: 'Password', exact: true }).blur();
        await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).not.toBeVisible();
        await expect(page.locator('#signupPassword')).not.toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });  

    test('TEST-04(C) NEG - Reg form, Password - Empty', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Password', exact: true }).focus();
        await page.getByRole('textbox', { name: 'Password', exact: true }).blur();
        await expect(page.getByText('Password required')).toBeVisible();
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TEST-04(D) NEG - Reg form, Password - Wrong data, alphas missed', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill('1234567890');
        await page.getByRole('textbox', { name: 'Password', exact: true }).blur();
        await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TEST-04(E) NEG - Reg form, Password - Wrong data, numbers missed', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill('Abcdefghij');
        await page.getByRole('textbox', { name: 'Password', exact: true }).blur();
        await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TEST-04(F) NEG - Reg form, Password - Wrong data, capital missed', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill('abcde12345');
        await page.getByRole('textbox', { name: 'Password', exact: true }).blur();
        await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });   

    test('TEST-04(G) NEG - Reg form, Password - Wrong data, small missed', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill('ABCD1234EF56');
        await page.getByRole('textbox', { name: 'Password', exact: true }).blur();
        await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });   

    test('TEST-04(H) NEG - Reg form, Password - Wrong data, length less than min', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill('TesT567');
        await page.getByRole('textbox', { name: 'Password', exact: true }).blur();
        await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });  

    test('TEST-04(I) NEG - Reg form, Password - Wrong data, length greater than max', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill('TesT567890123456');
        await page.getByRole('textbox', { name: 'Password', exact: true }).blur();
        await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });  

    // -------------------- RE-ENTER PASSWORD CHECKS - TEST COUNT: 26-30 -------------------- //
    test('TEST-05(A) POS - Reg form, Repeat password - Fully match', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill('Test567890');
        await page.getByRole('textbox', { name: 'Re-enter password' }).fill('Test567890');
        await page.getByRole('textbox', { name: 'Re-enter password' }).blur(); 
        await expect(page.getByText('Passwords do not match')).not.toBeVisible();
        await expect(page.locator('#signupRepeatPassword')).not.toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TEST-05(B) NEG - Reg form, Repeat password - Empty', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill('Test567890');
        await page.getByRole('textbox', { name: 'Re-enter password' }).focus();
        await page.getByRole('textbox', { name: 'Re-enter password' }).blur();
        await expect(page.getByText('Re-enter password required')).toBeVisible();
        await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TEST-05(C) NEG - Reg form, Repeat password - Do not match (partly, 1 char less)', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill('Test567890');
        await page.getByRole('textbox', { name: 'Re-enter password' }).fill('Test56789');
        await page.getByRole('textbox', { name: 'Re-enter password' }).blur(); 
        await expect(page.getByText('Passwords do not match')).toBeVisible();
        await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TEST-05(D) NEG - Reg form, Repeat password - Do not match (partly, 1 char greater)', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill('Test567890');
        await page.getByRole('textbox', { name: 'Re-enter password' }).fill('Test567890x');
        await page.getByRole('textbox', { name: 'Re-enter password' }).blur(); 
        await expect(page.getByText('Passwords do not match')).toBeVisible();
        await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TEST-05(E) NEG - Reg form, Repeat password - Do not match (partly, 1 char invalid)', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill('Test567890');
        await page.getByRole('textbox', { name: 'Re-enter password' }).fill('Test56x890');
        await page.getByRole('textbox', { name: 'Re-enter password' }).blur(); 
        await expect(page.getByText('Passwords do not match')).toBeVisible();
        await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });


    // ------------------------- REGISTER CHECKS - TEST COUNT: 31-33 ------------------------- //
    test('TEST-06(A) POS - Reg form, Register button - Enabled when all fields contain valid date', async ({ page }) => {
        await page.locator('#signupName').fill('   Andriy  '.trim());
        await page.locator('#signupLastName').fill(' Glabay'.trim());
        await page.getByRole('textbox', { name: 'Name Last name Email' }).fill(`rishelevsky+aqa${Date.now()}@gmail.com`);
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill('TesT567890');
        await page.getByRole('textbox', { name: 'Re-enter password' }).fill('TesT567890');
        await expect(page.getByRole('button', { name: 'Register' })).toBeEnabled();
    });

    test('TEST-06(B) NEG - Reg form, Register button - Disabled when all fields empty', async ({ page }) => {
        await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
    });

    test('TEST-06(C) NEG - Reg form, Register button - Disabled when at least one fields contains invalid date', async ({ page }) => {
        await page.locator('#signupName').fill('x'.trim());
        await page.locator('#signupLastName').fill(' Glabay'.trim());
        await page.getByRole('textbox', { name: 'Name Last name Email' }).fill(`rishelevsky+aqa${Date.now()}@gmail.com`);
        await page.getByRole('textbox', { name: 'Password', exact: true }).fill('TesT567890');
        await page.getByRole('textbox', { name: 'Re-enter password' }).fill('TesT567890');
        await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
    });

});
