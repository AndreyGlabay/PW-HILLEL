import test, { expect } from '@playwright/test';
import { beforeEach } from 'node:test';

test.describe('CodeGen SignIn tests', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
        await page.getByRole('button', { name: 'Sign In' }).click();
    })

    test('Successful sign in', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Email' }).fill('rishelevsky+hillel@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('Hillel-2026');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByRole('heading')).toContainText('Garage');
    })

    test('Sign in with empty email', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Email' }).focus();
        await page.getByRole('textbox', { name: 'Email' }).blur();
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill('1234567890');
        await expect(page.getByText('Email required')).toBeVisible();
    })

    test('Sign in with empty password', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Password' }).focus();
        await page.getByRole('textbox', { name: 'Password' }).blur();
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
        await expect(page.getByText('Password required')).toBeVisible();
    })

    test('Sign incorrect email', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Email' }).fill('test');
        await page.getByRole('textbox', { name: 'Password' }).fill('12345');
        await expect(page.getByText('Email is incorrect')).toBeVisible();
    })

    test('Sign in with wrong credentials', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Email' }).fill('test@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('00009987');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('Wrong email or password')).toBeVisible();
    })

});