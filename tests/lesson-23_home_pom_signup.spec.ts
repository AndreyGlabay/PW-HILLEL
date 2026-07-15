import test, { expect } from '@playwright/test';
import { GaragePage } from '../pom/pages/GaragePage';
import { HomePage } from '../pom/pages/HomePage';
import { SignUpForm } from '../pom/forms/SignUpForm';
import { newTestUser } from '../test-data/validUsers';
import { generateRandomEmail, generateRandomPassword, generateWrongEmailFormat, randomEnMixed, randomUaMixed } from '../utils/data/credentials';

test.describe(' POM CodeGen SignUp tests', () => {

    let homePage: HomePage;
    let signUpForm: SignUpForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        signUpForm = new SignUpForm(page);
        garagePage = new GaragePage(page);

        await homePage.navigate();
        await homePage.openSignUpForm();
    })

    test('TEST-00 - Happy path - Sign up new user', async () => {
        await signUpForm.signUpWithCredentials(
            newTestUser.firstName, 
            newTestUser.lastName, 
            newTestUser.email, 
            newTestUser.password, 
            newTestUser.repeatPassword);
        await expect(garagePage.pageHeading).toContainText('Garage');
    });

    // ------------------------- FIRST NAME CHECKS - TEST COUNT: 02-07 ------------------------- //
    test('TEST-01(A) POS - Reg form, Name - Minimum length (min)', async () => {
        await signUpForm.enterNewName(randomEnMixed(2));
        await signUpForm.triggerErrorOnField('firstName');
        await expect(signUpForm.nameLengthMessage).not.toBeVisible();
        await signUpForm.expectNameHasDefaultBorder();
    });

    test('TEST-01(B) POS - Reg form, Name - Maximum length (max)', async () => {
        await signUpForm.enterNewName(randomEnMixed(20));
        await signUpForm.triggerErrorOnField('firstName');
        await expect(signUpForm.nameLengthMessage).not.toBeVisible();
        await signUpForm.expectNameHasDefaultBorder();
    });

    test('TEST-01(C) NEG - Reg form, Name - Empty field', async () => {
        await signUpForm.triggerErrorOnField('firstName');
        await expect(signUpForm.emptyNameMessage).toBeVisible();
        await signUpForm.expectNameHasRedBorder();
    });

    test('TEST-01(D) NEG - Reg form, Name - Wrong data', async () => {
        await signUpForm.enterNewName(randomUaMixed(10));
        await signUpForm.triggerErrorOnField('firstName');
        await expect(signUpForm.invalidNameMessage).toBeVisible();
        await signUpForm.expectNameHasRedBorder();
    });

    test('TEST-01(E) NEG - Reg form, Name - Wrong length (less than min)', async () => {
        await signUpForm.enterNewName(randomEnMixed(1));
        await signUpForm.triggerErrorOnField('firstName');
        await expect(signUpForm.nameLengthMessage).toBeVisible();
        await signUpForm.expectNameHasRedBorder();
    });

    test('TEST-01(F) NEG - Reg form, Name - Wrong length (greater than max)', async () => {
        await signUpForm.enterNewName(randomEnMixed(21));
        await signUpForm.triggerErrorOnField('firstName');
        await expect(signUpForm.nameLengthMessage).toBeVisible();
        await signUpForm.expectNameHasRedBorder();
    });   

    // ------------------------- LAST NAME CHECKS - TEST COUNT: 08-13 ------------------------- //
    test('TEST-02(A) POS - Reg form, Last Name - Minimum length (min)', async () => {
        await signUpForm.enterNewLastName(randomEnMixed(2));
        await signUpForm.triggerErrorOnField('lastName');
        await expect(signUpForm.lastNameLengthMessage).not.toBeVisible();
        await signUpForm.expectLastNameHasDefaultBorder();
    });

    test('TEST-02(B) POS - Reg form, Last Name - Maximum length (max)', async ({ page }) => {
        await signUpForm.enterNewLastName(randomEnMixed(20));
        await signUpForm.triggerErrorOnField('lastName');
        await expect(signUpForm.lastNameLengthMessage).not.toBeVisible();
        await signUpForm.expectLastNameHasDefaultBorder();
    });

    test('TEST-02(C) NEG - Reg form, Last Name - Empty', async () => {
        await signUpForm.triggerErrorOnField('lastName');
        await expect(signUpForm.emptyLastNameMessage).toBeVisible();
        await signUpForm.expectLastNameHasRedBorder();
    });

    test('TEST-02(D) NEG - Reg form, Last Name - Wrong data', async () => {
        await signUpForm.enterNewLastName(randomUaMixed(10));
        await signUpForm.triggerErrorOnField('lastName');
        await expect(signUpForm.invalidLastNameMessage).toBeVisible();
        await signUpForm.expectLastNameHasRedBorder();
    });

    test('TEST-02(E) NEG - Reg form, Last Name - Wrong length (less than min)', async () => {
        await signUpForm.enterNewLastName(randomEnMixed(1));
        await signUpForm.triggerErrorOnField('lastName');
        await expect(signUpForm.lastNameLengthMessage).toBeVisible();
        await signUpForm.expectLastNameHasRedBorder();
    });

    test('TEST-02(F) NEG - Reg form, Last Name - Wrong length (greater than max)', async () => {
        await signUpForm.enterNewLastName(randomEnMixed(21));
        await signUpForm.triggerErrorOnField('lastName');
        await expect(signUpForm.lastNameLengthMessage).toBeVisible();
        await signUpForm.expectLastNameHasRedBorder();
    });   

    // ------------------------- EMAIL CHECKS - TEST COUNT: 14-16 ------------------------- //
    test('TEST-03(A) POS - Reg form, Email - Valid data', async () => {
        await signUpForm.enterRegEmail(generateRandomEmail());
        await signUpForm.triggerErrorOnField('email');
        await expect(signUpForm.invalidEmailMessage).not.toBeVisible();
        await signUpForm.expectEmailHasDefaultBorder();
    });

    test('TEST-03(B) NEG - Reg form, Email - Empty', async () => {
        await signUpForm.triggerErrorOnField('email');
        await expect(signUpForm.emptyEmailMessage).toBeVisible();
        await signUpForm.expectEmailHasRedBorder();
    });

    test('TEST-03(C) NEG - Reg form, Email - Wrong data', async () => {
        await signUpForm.enterRegEmail(generateWrongEmailFormat());
        await signUpForm.triggerErrorOnField('email');
        await expect(signUpForm.invalidEmailMessage).toBeVisible();
        await signUpForm.expectEmailHasRedBorder();
    });

    // ------------------------- PASSWORD CHECKS - TEST COUNT: 17-25 ------------------------- //
    test('TEST-04(A) POS - Reg form, Password - Valid data, minimum length', async () => {
        await signUpForm.enterRegPassword(generateRandomPassword(8));
        await signUpForm.triggerErrorOnField('password');
        await expect(signUpForm.invalidPasswordMessage).not.toBeVisible();
        await signUpForm.expectPasswordHasDefaultBorder();
    });

    test('TEST-04(B) POS - Reg form, Password - Valid data, maximum length', async () => {
        await signUpForm.enterRegPassword(generateRandomPassword(15));
        await signUpForm.triggerErrorOnField('password');
        await expect(signUpForm.invalidPasswordMessage).not.toBeVisible();
        await signUpForm.expectPasswordHasDefaultBorder();
    });  

    test('TEST-04(C) NEG - Reg form, Password - Empty', async () => {
        await signUpForm.triggerErrorOnField('password');
        await expect(signUpForm.emptyPasswordMessage).toBeVisible();
        await signUpForm.expectPasswordHasRedBorder();
    });

    test('TEST-04(D) NEG - Reg form, Password - Wrong data, alphas missed', async () => {
        await signUpForm.enterRegPassword('1234567890');
        await signUpForm.triggerErrorOnField('password');
        await expect(signUpForm.invalidPasswordMessage).toBeVisible();
        await signUpForm.expectPasswordHasRedBorder();
    });

    test('TEST-04(E) NEG - Reg form, Password - Wrong data, numbers missed', async ({ page }) => {
        await signUpForm.enterRegPassword('TestTestTest');
        await signUpForm.triggerErrorOnField('password');
        await expect(signUpForm.invalidPasswordMessage).toBeVisible();
        await signUpForm.expectPasswordHasRedBorder();
    });

    test('TEST-04(F) NEG - Reg form, Password - Wrong data, capital missed', async ({ page }) => {
        await signUpForm.enterRegPassword('testpassword10');
        await signUpForm.triggerErrorOnField('password');
        await expect(signUpForm.invalidPasswordMessage).toBeVisible();
        await signUpForm.expectPasswordHasRedBorder();
    });   

    test('TEST-04(G) NEG - Reg form, Password - Wrong data, small missed', async ({ page }) => {
        await signUpForm.enterRegPassword('TESTPASSWORD20');
        await signUpForm.triggerErrorOnField('password');
        await expect(signUpForm.invalidPasswordMessage).toBeVisible();
        await signUpForm.expectPasswordHasRedBorder();
    });   

    test('TEST-04(H) NEG - Reg form, Password - Wrong data, length less than min', async () => {
        await signUpForm.enterRegPassword('TesT567');
        await signUpForm.triggerErrorOnField('password');
        await expect(signUpForm.invalidPasswordMessage).toBeVisible();
        await signUpForm.expectPasswordHasRedBorder();
    }); 

    test('TEST-04(I) NEG - Reg form, Password - Wrong data, length greater than max', async ({ page }) => {
        await signUpForm.enterRegPassword('TesT567890123456');
        await signUpForm.triggerErrorOnField('password');
        await expect(signUpForm.invalidPasswordMessage).toBeVisible();
        await signUpForm.expectPasswordHasRedBorder();
    });  

    // -------------------- RE-ENTER PASSWORD CHECKS - TEST COUNT: 26-30 -------------------- //
    test('TEST-05(A) POS - Reg form, Repeat password - Fully match', async () => {
        const password = generateRandomPassword(10);
        const repeatPassword = password;
        await signUpForm.enterRegPassword(password);
        await signUpForm.enterRegRepeatSamePassword(repeatPassword);
        await signUpForm.triggerErrorOnField('repeatPassword');
        await expect(signUpForm.notMatchRepeatPasswordMessage).not.toBeVisible();
        await signUpForm.expectRepeatPasswordHasDefaultBorder();
    });

    test('TEST-05(B) NEG - Reg form, Repeat password - Empty', async () => {
        await signUpForm.enterRegPassword(generateRandomPassword(10));
        await signUpForm.triggerErrorOnField('repeatPassword');
        await expect(signUpForm.emptyRepeatPasswordMessage).toBeVisible();
        await signUpForm.expectRepeatPasswordHasRedBorder();
    });

    test('TEST-05(C) NEG - Reg form, Repeat password - Do not match (partly, 1 char less)', async () => {
        const password = generateRandomPassword(10);
        const wrongRepeatPassword = password.slice(0, -1);
        await signUpForm.enterRegPassword(password);
        await signUpForm.enterRegRepeatSamePassword(wrongRepeatPassword);
        await signUpForm.triggerErrorOnField('repeatPassword');
        await expect(signUpForm.notMatchRepeatPasswordMessage).toBeVisible();
        await signUpForm.expectRepeatPasswordHasRedBorder();
    });

    test('TEST-05(D) NEG - Reg form, Repeat password - Do not match (partly, 1 char greater)', async () => {
        const password = generateRandomPassword(10);
        const wrongRepeatPassword = password + 'x';
        await signUpForm.enterRegPassword(password);
        await signUpForm.enterRegRepeatSamePassword(wrongRepeatPassword);
        await signUpForm.triggerErrorOnField('repeatPassword');
        await expect(signUpForm.notMatchRepeatPasswordMessage).toBeVisible();
        await signUpForm.expectRepeatPasswordHasRedBorder();
    });

    test('TEST-05(E) NEG - Reg form, Repeat password - Do not match (partly, 1 char invalid)', async () => {
        const password = generateRandomPassword(10);
        const wrongRepeatPassword = password.slice(0, 4) + 'x' + password.slice(5);

        await signUpForm.enterRegPassword(password);
        await signUpForm.enterRegRepeatSamePassword(wrongRepeatPassword);
        await signUpForm.triggerErrorOnField('repeatPassword');

        await expect(signUpForm.notMatchRepeatPasswordMessage).toBeVisible();
        await signUpForm.expectRepeatPasswordHasRedBorder();
    });


    // ------------------------- REGISTER CHECKS - TEST COUNT: 31-33 ------------------------- //
    test('TEST-06(A) POS - Reg form, Register button - Enabled when all fields contain valid data', async () => {
        await signUpForm.fillInWithCredentials(
            newTestUser.firstName,
            newTestUser.lastName,
            newTestUser.email,
            newTestUser.password,
            newTestUser.repeatPassword
        );
        await expect(signUpForm.registerButton).toBeEnabled();
    });

    test('TEST-06(B) NEG - Reg form, Register button - Disabled when all fields empty', async () => {
        await expect(signUpForm.registerButton).toBeDisabled();
    });

    test('TEST-06(C) NEG - Reg form, Register button - Disabled when at least one field contains invalid data', async () => {
        const password = generateRandomPassword(10);
        await signUpForm.fillInWithCredentials(
            'x',
            'TestLastName',
            generateRandomEmail(),
            password,
            password
        );
        await expect(signUpForm.registerButton).toBeDisabled();
    });
});
