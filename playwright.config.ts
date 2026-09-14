// Import basic libraries required for the test configuration
import { defineConfig, devices } from '@playwright/test';
import { fileURLToPath } from 'url';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, 'secrets/.env.development') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e/tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI 
    ? [['list']]
    : [
        ['html', { outputFolder: 'e2e/reports/html' }],
        ['json', { outputFile: 'e2e/reports/results.json' }]
      ],
  
  /* Output directory for test artefacts (including videos) */
  outputDir: 'e2e/reports/videos',

  /* Directory for screenshots taken on test failure */
  snapshotDir: 'e2e/reports/screenshots',

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Capture screenshot on failure */
    screenshot: 'only-on-failure',

    /* Record video on failure */
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
     // 1. Setup project to log in
      { name: 'setup-admin', testMatch: /auth\.admin\.setup\.js/ },
      { name: 'setup-salesman', testMatch: /auth\.salesman\.setup\.js/ },

    // 2. Main tests that use the saved state
    // Salesman-specific tests (only run these in projects that have salesman state)
    {
      name: 'chromium-salesman',
      testMatch: /.*\.salesman\.spec\.js$/, // Matches files like client-creation.salesman.spec.js
      use: {
        storageState: 'secrets/.auth/salesman.json',
        ...devices['Desktop Chrome']
      },
      dependencies: ['setup-salesman'],
    },
    {
      name: 'firefox-salesman',
      testMatch: /.*\.salesman\.spec\.js$/,
      use: {
        storageState: 'secrets/.auth/salesman.json',
        ...devices['Desktop Firefox']
      },
      dependencies: ['setup-salesman'],
    },
    {
      name: 'webkit-salesman',
      testMatch: /.*\.salesman\.spec\.js$/,
      use: {
        storageState: 'secrets/.auth/salesman.json',
        ...devices['Desktop Safari']
      },
      dependencies: ['setup-salesman'],
    },
    // Admin-specific tests (only run these in projects that have admin state)
    {
      name: 'chromium-admin-creation',
      testMatch: /.*-creation\.admin\.spec\.js$/, // Matches files like client-creation.admin.spec.js
      use: {
        storageState: 'secrets/.auth/admin.json',
        ...devices['Desktop Chrome']
      },
      dependencies: ['setup-admin'],
    },
    {
      name: 'chromium-admin-management',
      testMatch: /.*-mgmt\.admin\.spec\.js$/, // Matches files like client-creation.admin.spec.js
      use: {
        storageState: 'secrets/.auth/admin.json',
        ...devices['Desktop Chrome']
      },
      dependencies: ['setup-admin', 'chromium-admin-creation'],
    },
    {
      name: 'chromium-admin-deletion',
      testMatch: /.*-deletion\.admin\.spec\.js$/, // Matches files like client-creation.admin.spec.js
      use: {
        storageState: 'secrets/.auth/admin.json',
        ...devices['Desktop Chrome']
      },
      dependencies: ['setup-admin', 'chromium-admin-creation', 'chromium-admin-mgmt'],
    },
    {
      name: 'firefox-admin-creation',
      testMatch: /.*-creation\.admin\.spec\.js$/,
      use: {
        storageState: 'secrets/.auth/admin.json',
        ...devices['Desktop Firefox']
      },
      dependencies: ['setup-admin'],
    },
    {
      name: 'firefox-admin-management',
      testMatch: /.*-mgmt\.admin\.spec\.js$/,
      use: {
        storageState: 'secrets/.auth/admin.json',
        ...devices['Desktop Firefox']
      },
      dependencies: ['setup-admin', 'firefox-admin-creation'],
    },
    {
      name: 'firefox-admin-deletion',
      testMatch: /.*-deletion\.admin\.spec\.js$/,
      use: {
        storageState: 'secrets/.auth/admin.json',
        ...devices['Desktop Firefox']
      },
      dependencies: ['setup-admin', 'firefox-admin-creation', 'firefox-admin-mgmt'],
    },
    {
      name: 'webkit-admin-creation',
      testMatch: /.*-creation\.admin\.spec\.js$/,
      use: {
        storageState: 'secrets/.auth/admin.json',
        ...devices['Desktop Safari']
      },
      dependencies: ['setup-admin'],
    },
    {
      name: 'webkit-admin-management',
      testMatch: /.*-mgmt\.admin\.spec\.js$/,
      use: {
        storageState: 'secrets/.auth/admin.json',
        ...devices['Desktop Safari']
      },
      dependencies: ['setup-admin', 'webkit-admin-creation'],
    },
    {
      name: 'webkit-admin-deletion',
      testMatch: /.*-deletion\.admin\.spec\.js$/,
      use: {
        storageState: 'secrets/.auth/admin.json',
        ...devices['Desktop Safari']
      },
      dependencies: ['setup-admin', 'webkit-admin-creation', 'webkit-admin-mgmt'],
    },

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
