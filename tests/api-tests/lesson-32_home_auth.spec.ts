import { test, expect } from "@playwright/test";
import { testUser2 } from "../../test-data/validUsers";


test.describe('Auth', () => {
    test('Sign in', async ({ request }) => {
        const response = await request.post('api/auth/signin', { 
            data: {
                "email": testUser2.email,
                "password": testUser2.password
            } 
        });
        const sid = response.headers()['set-cookie'].split(';')[0];
        
        expect(response.status()).toBe(200);
        expect(sid).toContain('sid=');
    })
})


