// 1. Correct adding of expense with valid data
// 2. Validation - future date
// 3. Validation - less than current mileage
// 4. Validation - zero or negative number of liters
// 5. Validation - zero or negative total cost
// 6. Validation - more than 9999 liters
// 7. Validation - more than 1000000 total cost

import { expect, test } from "../utils/fixtures/pagesFixtures";
import GarageService from "../utils/api/services/GarageService";
import { getSidFromStorageState } from "../utils/storageState/storageState";
import { faker } from '@faker-js/faker';
import { generateExpenseData } from "../utils/api/factories/expences.factories";

test.describe('Fuel Expenses tests', () => {

    let garageService: GarageService;

    test.use({storageState: '.states/testuser2.json'});

    test.beforeEach(async ({ request }) => {
        garageService = new GarageService(request);
        const sid = getSidFromStorageState('.states/testuser2.json');
        await garageService.addCar(sid, 1, 1, 999);
    })

    test('TEST-1 - Correct adding of expense with valid data', async ({ app }) => {
        const { mileage, numberOfLiters, totalCost } = generateExpenseData();

        const currentDate = new Date().toISOString();
        
        const year = currentDate.slice(0, 4);
        const month = currentDate.slice(5, 7);
        const day = currentDate.slice(8, 10);

        const formattedDate = `${day}.${month}.${year}`;

        await app.expensesPage.navigate();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.addNewExpense(mileage, numberOfLiters, totalCost);

        await app.expensesPage.verifyLastExpense(formattedDate, mileage, numberOfLiters, totalCost);
    })

    test('TEST-2 - Validation - future date', async ({ app }) => {
        const futureDate = faker.date.future().toISOString();

        const year = futureDate.slice(0, 4);
        const month = futureDate.slice(5, 7);
        const day = futureDate.slice(8, 10);

        const { mileage, numberOfLiters, totalCost } = generateExpenseData();

        await app.expensesPage.navigate();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.addNewExpense(mileage, numberOfLiters, totalCost, undefined, `${day}.${month}.${year}`);
        
        await expect(app.addExpenseForm.futureDateErrorMessage).toBeVisible();
    })

    test('TEST-3 - Validation - adding expense with current number of mileage', async ({ app }) => {
        const { numberOfLiters, totalCost } = generateExpenseData();

        await app.expensesPage.navigate();
        await app.expensesPage.openAddExpenseForm();
        const newMileage = await app.addExpenseForm.mileageField.inputValue();
        await app.addExpenseForm.addNewExpense(newMileage, numberOfLiters, totalCost);
        
        await expect(app.addExpenseForm.lessOrEqualMileageErrorMessage).toBeVisible();
    })

    test('TEST-4 - Validation - zero or negative number of liters', async ({ app }) => {
        const { mileage, numberOfLiters, totalCost } = generateExpenseData({ litersMin: -10, litersMax: 0 });

        await app.expensesPage.navigate();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.enterMileage(mileage);
        await app.addExpenseForm.enterNumberOfLiters(numberOfLiters);
        await app.addExpenseForm.enterTotalCost(totalCost);
        
        await expect(app.addExpenseForm.wrongLitersErrorMessage).toBeVisible();
    })

    test('TEST-5 - Validation - zero or negative total cost', async ({ app }) => {
        const { mileage, numberOfLiters, totalCost } = generateExpenseData({ costMin: -10, costMax: 0 });

        await app.expensesPage.navigate();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.enterMileage(mileage);
        await app.addExpenseForm.enterNumberOfLiters(numberOfLiters);
        await app.addExpenseForm.enterTotalCost(totalCost);
        
        await expect(app.addExpenseForm.wrongCostErrorMessage).toBeVisible();
    })

    test('TEST-6 - Validation - more than 9999 liters', async ({ app }) => {
        const { mileage, numberOfLiters, totalCost } = generateExpenseData({ litersMin: 10000, litersMax: 50000 });

        await app.expensesPage.navigate();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.enterMileage(mileage);
        await app.addExpenseForm.enterNumberOfLiters(numberOfLiters);
        await app.addExpenseForm.enterTotalCost(totalCost);
        
        await expect(app.addExpenseForm.wrongLitersErrorMessage).toBeVisible();
    })

    test('TEST-7 - Validation - more than 1000000 total cost', async ({ app }) => {
        const { mileage, numberOfLiters, totalCost } = generateExpenseData({ costMin: 1000001, costMax: 10000000 });

        await app.expensesPage.navigate();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.enterMileage(mileage);
        await app.addExpenseForm.enterNumberOfLiters(numberOfLiters);
        await app.addExpenseForm.enterTotalCost(totalCost);
        
        await expect(app.addExpenseForm.wrongCostErrorMessage).toBeVisible();
    })
})
