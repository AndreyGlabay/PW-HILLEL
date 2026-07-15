import { expect } from '@playwright/test';
import { test } from '../utils/fixtures/pagesFixtures';


test.describe('Garage tests', () => {

    test.use({ storageState: '.states/testuser1.json' })

    test.beforeEach(async ({ app }) => {
        await app.garagePage.navigate();
        await app.garagePage.openAddCarForm();
    })

    test.describe('Adding cars', () => {

        test('Add new car - BMW X5', async ({ app }) => {
            // await app.addCarFormWithRemovingCar.addNewCar('BMW', 'X5', '999');
            await app.addCarForm.addNewCar('BMW', 'X5', '999');
            await app.garagePage.verifyCarIsAdded('BMW X5', '999');
        })

        test('Add new car - Audi Q7', async ({ app }) => {
            await app.addCarForm.addNewCar('Audi', 'Q7', '777');
            await app.garagePage.verifyCarIsAdded('Audi Q7', '777');
            // await expect(app.page).toHaveScreenshot('garage-page.png');
            // await app.addCarForm.addNewCar('Audi', 'Q7', '444'); // ❌ negative test - diff screenshot
            // await app.garagePage.verifyCarIsAdded('Audi Q7', '444'); // ❌ negative test - diff screenshot
            // await expect(app.page.locator('.car-item').first()).toHaveScreenshot('last-added-car-audi-q7.png');
            // ℹ️ for compare with a new expected screenshots - in terminal use flag '--update-snapshots'
            // await expect(app.page.locator('.car-item').first()).toHaveScreenshot('last-added-car-audi-q7.png', { mask: [app.page.locator('[name="miles"]')]}); // masking, hide specific locator behind solid color
            // await expect(app.page.locator('.car-item').first()).toHaveScreenshot('last-added-car-audi-q7.png', {maxDiffPixels: 88}); // accepted diff in pixels
            // await expect(app.page.locator('.car-item').first()).toHaveScreenshot('last-added-car-audi-q7.png', {maxDiffPixelRatio: 0.03}); // accepted diff in percents 

            // await app.page.screenshot({ path: 'garage-page.png' }); // screenshot for docs, viewport only
            // await app.page.screenshot({ path: 'garage-page2.png', fullPage: true }); // full page including viewport
            await app.page.locator('.car-item').first().screenshot({ path: 'last-added-car.png' }); // specific element only
        })

        test.afterEach( async ({ app }) => {
            await app.garagePage.openEditCarForm(0);
            await app.editCarForm.removeOpenCar();
            await app.garagePage.verifyCarIsRemoved();
        })

    })

    test('Add new car without mileage', async ({ app }) => {
        await app.addCarForm.selectBrand('BMW');
        await app.addCarForm.selectModel('X5');
        await expect(app.addCarForm.addCarButton).toBeDisabled();
    })

    test('Close "Add new car" form via "Cancel" button', async ({ app }) => {
        await app.addCarForm.clickCancelButton();
        await expect(app.addCarForm.formTitle).not.toBeVisible();
    })

    test('Close "Add new car" form via close icon', async ({ app}) => {
        await app.addCarForm.clickCloseIcon();
        await expect(app.addCarForm.formTitle).not.toBeVisible();
    })

})