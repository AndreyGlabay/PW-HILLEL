import { expect } from "@playwright/test";
// import { HomePage } from "../../pom/pages/HomePage";
// import { SignInForm } from "../../pom/forms/SignInForm";
// import { GaragePage } from "../../pom/pages/GaragePage";
// import { AddCarForm } from "../../pom/forms/AddCarForm";
import { newTestUser, testUser1, testUser2 } from "../../test-data/validUsers";
import { test } from "../../utils/fixtures/pagesFixtures";
import AuthService from "../../utils/api/services/AuthService";
import { request } from "node:http";


test.describe('Get storage state for test users', () => {
    test('Log in as testuser1 and save storage state', async ({ request }) => {
        const authService = new AuthService(request);
        const response = await authService.signIn(testUser1.email, testUser1.password)
        expect(response.status()).toBe(200);

        await request.storageState({path: '.states/testuser1.json'})
    })


    test('Log in as testuser2 and save storage state', async ({ request }) => {
        const authService = new AuthService(request);
        const response = await authService.signIn(testUser2.email, testUser2.password)
        expect(response.status()).toBe(200);

        await request.storageState({path: '.states/testuser2.json'})

    })
})

test.describe('UI - Get storage state for a fresh users', () => {
    test('Sign up a fresh user and save auth storage state', async ({ context, app }) => {
        await app.homePage.navigate();
        await app.homePage.openSignUpForm();
        await app.signUpForm.signUpWithCredentials(
            newTestUser.firstName,
            newTestUser.lastName,
            newTestUser.email,
            newTestUser.password,
            newTestUser.repeatPassword
        );

        await expect(app.garagePage.pageHeading).toContainText('Garage');

        await context.storageState({path: '.states/auth.json'});
        await context.close();
    })
})








//---------------------------------------------------------------------//

/*

    // let homePage: HomePage;
    // let signInForm: SignInForm;
    // let garagePage: GaragePage;
    // let addCarForm: AddCarForm;




test.describe('Get storage state for test users', () => {
    test('Log in as testuser1 and save storage state', async ({ context, app }) => {
       
        // homePage = new HomePage(page);
        // signInForm = new SignInForm(page);
        // garagePage = new GaragePage(page);
        // addCarForm = new AddCarForm(page);

        await app.homePage.navigate();
        await app.homePage.openSignInForm();
        await app.signInForm.signInWithCredentials(testUser1.email, testUser1.password);
        await expect(app.garagePage.pageHeading).toContainText('Garage');

        await context.storageState({path: '.states/auth.json'});
        await context.storageState({path: '.states/testuser1.json'});
        await context.close();

    })

    test('Sign up a fresh user and save auth storage state', async ({ context, app }) => {
        await app.homePage.navigate();
        await app.homePage.openSignUpForm();
        await app.signUpForm.signUpWithCredentials(
            newTestUser.firstName,
            newTestUser.lastName,
            newTestUser.email,
            newTestUser.password,
            newTestUser.repeatPassword
        );

        await expect(app.garagePage.pageHeading).toContainText('Garage');

        await context.storageState({path: '.states/auth.json'});
        await context.close();
    })

    test('Log in as testuser2 and save storage state', async ({ context, app }) => {
        await app.homePage.navigate();
        await app.homePage.openSignInForm();
        await app.signInForm.signInWithCredentials(testUser2.email, testUser2.password);
        await expect(app.garagePage.pageHeading).toContainText('Garage');

        await context.storageState({path: '.states/testuser2.json'});
        await context.close();

    })
})

*/