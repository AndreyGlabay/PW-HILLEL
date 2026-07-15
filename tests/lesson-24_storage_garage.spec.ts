import { expect, test } from '@playwright/test';
import { GaragePage } from '../pom/pages/GaragePage';
import { HomePage } from '../pom/pages/HomePage';
import { SignInForm } from '../pom/forms/SignInForm';
import { AddCarForm } from '../pom/forms/AddCarForm';

test.describe('Garage tests', () => {

    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;
    let addCarForm: AddCarForm;

    test.use({ storageState: '.states/auth.json' })

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);
        addCarForm = new AddCarForm(page);

        await garagePage.navigate();
        await garagePage.openAddCarForm();
    })

    test('Add new car - BMW X5', async () => {
        await addCarForm.addNewCar('BMW', 'X5', '999');
        await garagePage.verifyCarIsAdded('BMW X5', '999');
    })

    test('Add new car - Audi Q7', async () => {
        test.step('Adding Audi Q7 to garage', async () => {
            await addCarForm.addNewCar('Audi', 'Q7', '777'); 
        })

        test.step('Verifying Audi Q7 is added to garage', async () => {
            await garagePage.verifyCarIsAdded('Audi Q7', '777');
            // await garagePage.verifyCarIsAdded('Audi Q7', '111'); // ❌ invalid - for fail the test
        })

    })

    test('Add new car without mileage', async () => {
        await addCarForm.selectBrand('BMW');
        await addCarForm.selectModel('X5');
        await expect(addCarForm.addCarButton).toBeDisabled();
    })

    test('Close "Add new car" form via "Cancel" button', async () => {
        await addCarForm.clickCancelButton();
        await expect(addCarForm.formTitle).not.toBeVisible();
    })

    test('Close "Add new car" form via close icon', async () => {
        await addCarForm.clickCloseIcon();
        await expect(addCarForm.formTitle).not.toBeVisible();
    })

})