import { test, expect } from "@playwright/test";
import { testUser1 } from "../test-data/validUsers";

// https://qauto.forstudy.space/api-docs/#/ - SWAGGER

test('GET all brands', async ({ request }) => {
    const response = await request.get('api/cars/brands'); // EP -find in the swagger
    const responseJson = await response.json();
    const brands = responseJson.data;
    console.log(response);
    console.log(brands);
    expect(response.status()).toBe(200);
    expect(brands).toHaveLength(5);
})

test('GET all models', async ({ request }) => {
    const response = await request.get('api/cars/models'); // EP -find in the swagger
    const responseJson = await response.json();
    const models = responseJson.data;
    console.log(response);
    console.log(models);
    expect(response.status()).toBe(200);
    expect(models).toHaveLength(23);
})

test('Sign in (RND var.)', async ({ request }) => {

    console.log('----------- Storage State Before ------------');
    console.log(await request.storageState());
    console.log('----------- Storage State Before ------------');

    const responseAuth = await request.post('api/auth/signin', { 
        data: {
            "email": testUser1.email,
            "password": testUser1.password
        } 
    });

    console.log();
    
    console.log('----------- Storage State After ------------');
    console.log(await request.storageState());
    console.log('----------- Storage State After ------------');

    // console.log(responseAuth); // after test execution, in Terminal observe response, desired 'sid' is in 'Set-Cookie' header;
    // console.log(responseAuth.headers()); // get only headers; locate 'set-cookie' header and get 'sid' value;
    // console.log(responseAuth.headers()['set-cookie']); // get full value of 'set-cookie' header (sid included);
    // console.log(responseAuth.headers()['set-cookie'].split(';')); // split full value of 'set-cookie' - use ';' as delimiter;
    console.log(responseAuth.headers()['set-cookie'].split(';')[0]); // get the 1st split element (index 0) = sid;

    const responseAddingCar = await request.post('api/cars/',  { 
        data: {
            "carBrandId": 3,
            "carModelId": 11,
            "mileage": 123 
        }
    });
   
    console.log(responseAddingCar);


});


test('Sign in', async ({ request }) => {
    const response = await request.post('api/auth/signin', { 
        data: {
            "email": testUser1.email,
            "password": testUser1.password
        } 
    });
    const sid = response.headers()['set-cookie'].split(';')[0];
    expect(response.status()).toBe(200);
    expect(sid).toContain('sid=');
});

// test('Add new car', async ({ request }) => {
//     const response = await request.post('api/cars/',  { 
//         data: {
//             "carBrandId": 3,
//             "carModelId": 11,
//             "mileage": 123 
//         }
//     });
//     console.log(response);
// })





