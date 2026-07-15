import { test, expect } from "@playwright/test";
import { testUser1 } from "../../test-data/validUsers";
import GarageService from "../../utils/api/services/GarageService"; 
import AuthService from "../../utils/api/services/AuthService";
import { request } from "node:http";
import { generateNewCar } from "../../utils/api/factories/cars,factory";

let garageService: GarageService;
let authService: AuthService;

test.beforeEach(({ request }) => {
    garageService = new GarageService(request);
    authService = new AuthService(request);
})

test.describe('Get brands and models', () => {

    test('GET all brands', async () => {
        const brands = await garageService.getAllBrands();

        expect(brands).toHaveLength(5);
    })

    test('GET all models', async () => {
        const models = await garageService.getAllModels();

        expect(models).toHaveLength(23);
    })

    test('GET model by id', async () => {
        const model = await garageService.getModel(2);

        expect(model.carBrandId).toBe(1);
        expect(model.title).toBe('R8');
    })

    test('GET model by invalid id', async () => {
        const response = await garageService.getModel(23006445756, false);
        const responseJson = await response.json();

        expect(response.status()).toBe(404);
        expect(responseJson.message).toBe('No car models found with this id')
    })

})