import { test, expect } from "@playwright/test";
import { testUser2 } from "../../test-data/validUsers";
import { request } from "node:http";

test.describe('Public requests', () => {

    test('TEST-01 - GET all brands', async ({ request }) => {
        const response = await request.get('/api/cars/brands'); 
        const responseJson = await response.json();
        const brands = responseJson.data;
        console.log('---------- All Car Brands: ----------')
        console.log(responseJson);

        expect(response.status()).toBe(200);
        expect(brands).toHaveLength(5);
    })

    test('TEST-02 - GET all models', async ({ request }) => {
        const response = await request.get('/api/cars/models'); 
        const responseJson = await response.json();
        const models = responseJson.data;
        console.log('---------- All Car Models: ----------')
        console.log(responseJson);

        expect(response.status()).toBe(200);
        expect(models).toHaveLength(23);
    })

    test('TEST-03 - GET model by id #10', async ({ request }) => {
        const response = await request.get('/api/cars/models/10'); 
        const responseJson = await response.json();
        const model = responseJson.data;
        console.log('---------- Car model ID #10: ----------')
        console.log(responseJson);

        expect(model.carBrandId).toBe(2);
        expect(model.title).toBe('Z3');
    })

        test('TEST-04 - GET model by id #20', async ({ request }) => {
        const response = await request.get('/api/cars/models/20'); 
        const responseJson = await response.json();
        const model = responseJson.data;
        console.log('---------- Car model ID #20: ----------')
        console.log(responseJson);

        expect(model.carBrandId).toBe(5);
        expect(model.title).toBe('Ducato');
    })

    test('TEST-05 - GET model by invalid id', async ({ request }) => {
        const response = await request.get('/api/cars/models/77'); 
        const responseJson = await response.json();
        console.log('---------- Car model ID #77 (invalid): ----------')
        console.log(responseJson);

        expect(response.status()).toBe(404);
        expect(responseJson.message).toBe('No car models found with this id')
    })

})


test.describe('Private requests', () => {
     let sid: string;

     test.beforeAll(async ({ request }) => {
            const responseAuth = await request.post('api/auth/signin', { 
                data: {
                    "email": testUser2.email,
                    "password": testUser2.password
                } 
            });

        sid = responseAuth.headers()['set-cookie'].split(';')[0];

        expect(responseAuth.status()).toBe(200);
        expect(sid).toContain('sid=');

    })

    test.describe('Removing cars', () => {
        let carToRemoveId: string;

        test.beforeAll(async ({ request }) => {
            const newCar = {
                "carBrandId": 1,
                "carModelId": 4,
                "mileage": 433             
            }

            const response = await request.post('/api/cars/',  { 
                data: newCar,
                headers: {
                    'cookie': sid
                }
            });
            const responseJson = await response.json();
            const addedCar = responseJson.data;
            carToRemoveId = addedCar.id;
            console.log('----- Added car info: -----')
            console.log(`Added car info: ${JSON.stringify(addedCar)}`);

            expect(response.status()).toBe(201);
        })

        test('TEST-06 - Remove a car', async ({ request }) => {
            const response = await request.delete(`/api/cars/${carToRemoveId}`, {
                headers: {
                    'cookie': sid
                }
            });
            console.log(`----- Remove a car ID ${carToRemoveId}: -----`)
            console.log(response);

            expect(response.status()).toBe(200);
        })

        test('TEST-07 - Remove a car with invalid id', async ({ request }) => {
            const response = await request.delete(`/api/cars/1002223333999`, {
                headers: {
                    'cookie': sid
                }
            });
            const responseJson = await response.json();
            console.log('----- Try to remove a car model ID #1002223333999 (invalid): -----')
            console.log(responseJson);

            expect(response.status()).toBe(404);
            expect(responseJson.message).toBe('Car not found');
        })

    })


    test.describe('Adding new cars', () => {
        let addedCarsToRemove:number[] = [];
        
        test('TEST-08 - Add new car - BMW 5', async ({ request }) => {
            const newCar = {
                "carBrandId": 2,
                "carModelId": 7,
                "mileage": 555             
            }

            const response = await request.post('/api/cars/',  { 
                data: newCar,
                headers: {
                    'cookie': sid
                }
            });
            const responseJson = await response.json();
            const addedCar = responseJson.data;

            console.log('---------- Add new car - BMW 5: ----------')
            console.log(responseJson.data);

            expect(response.status()).toBe(201);
            expect(addedCar.carBrandId).toBe(newCar.carBrandId);
            expect(addedCar.carModelId).toBe(newCar.carModelId);
            expect(addedCar.initialMileage).toBe(newCar.mileage);
            expect(addedCar.id).toBeDefined();

            addedCarsToRemove.push(addedCar.id);


        })

        test('TEST-09 - Add new car - Ford Focus', async ({ request }) => {
            const newCar = {
                "carBrandId": 3,
                "carModelId": 12,
                "mileage": 312             
            }

            const response = await request.post('/api/cars/',  { 
                data: newCar,
                headers: {
                    'cookie': sid
                }
            });
            const responseJson = await response.json();
            const addedCar = responseJson.data;

            console.log('---------- Add new car - Ford Focus: ----------')
            console.log(responseJson.data);

            expect(response.status()).toBe(201);
            expect(addedCar.carBrandId).toBe(newCar.carBrandId);
            expect(addedCar.carModelId).toBe(newCar.carModelId);
            expect(addedCar.initialMileage).toBe(newCar.mileage);
            expect(addedCar.id).toBeDefined();

            addedCarsToRemove.push(addedCar.id);
        })

        test.afterAll(async ({ request }) => {
            for (const id of addedCarsToRemove) {
                const response = await request.delete(`/api/cars/${id}`, {
                    headers: {
                        'cookie': sid
                    }
                });

                expect(response.status()).toBe(200);
            }
        })
    })

    test.describe('Editing cars', () => {
    let carToEditId: string;

        test.beforeAll(async ({ request }) => {
            const newCar = {
                "carBrandId": 1,
                "carModelId": 4,
                "mileage": 755             
            }

            const response = await request.post('/api/cars/',  { 
                data: newCar,
                headers: {
                    'cookie': sid
                }
            });
            const responseJson = await response.json();
            const addedCar = responseJson.data;
            carToEditId = addedCar.id;
            console.log('----- Added car info: -----')
            console.log(`Added car info: ${JSON.stringify(addedCar)}`);

            expect(response.status()).toBe(201);
        })

        test('TEST-10 - Edit a car', async ({ request }) => {
            const response = await request.put(`/api/cars/${carToEditId}`, {
                data: {
                    "carBrandId": 1,
                    "carModelId": 4,
                     "mileage": 1000
                },
                headers: {
                    'cookie': sid
                }
            });

            const responseJson = await response.json();
            const EditedCar = responseJson.data;
            carToEditId = EditedCar.id;

            console.log(`----- Edit a car ID ${carToEditId}: -----`)
            console.log(responseJson);

            expect(response.status()).toBe(200);
        })

        test('TEST-11 - Edit a car with invalid id', async ({ request }) => {
            const response = await request.put(`/api/cars/1002223333999`, {
                data: {
                    "carBrandId": 1,
                    "carModelId": 4,
                     "mileage": 2000
                },
                headers: {
                    'cookie': sid
                }
            });
            const responseJson = await response.json();
            console.log('----- Try to edit a car ID #1002223333999 (invalid): -----')
            console.log(responseJson);

            expect(response.status()).toBe(404);
            expect(responseJson.message).toBe('Car not found');
        })
    })
})

