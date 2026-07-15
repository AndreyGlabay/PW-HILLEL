import { defineConfig, devices } from '@playwright/test';
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, 'tests/.env') });
// require('dotenv').config({
//   path: `.env.${process.env.ENV || 'local'}`
// });

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  // reporter: 'list',
  reporter: [['list'], ['html', {open: 'never'}], ['allure-playwright']],
  // reporter: [['list'], ['html', {open: 'never'}]],
  // reporter: [['list'], ['allure-playwright']],
  // reporter: [['list'], ['html']],
  // reporter: 'allure-playwright',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  snapshotDir:'./test-data/screenshots',
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    baseURL: 'https://qauto.forstudy.space/',

    httpCredentials: {
      username: process.env.HTTP_USERNAME!,
      password: process.env.HTTP_PASSWORD!,
    },

    // testIdAttribute: "test-id",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // trace: 'on-first-retry',
    // trace: 'on',
    // video: 'on',
    // screenshot: 'on'
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'on-first-failure' 
    // launchOptions: {
    //   slowMo: 3000
    // }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: '**/setup/**.setup.ts',
      workers: 1 // protection from parallel run;
    },
    {
      name: 'api',
      testMatch: '/tests/api-tests/**.spec.ts'
      // testMatch: '**/*api.spec.ts'
      // API tests run independently without setup/e2e dependencies
    },
    {
      name: 'e2e',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],  // turn off for lesson-28 env vars
      testIgnore: '**/*api.spec.ts'  // exclude API tests from e2e
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
