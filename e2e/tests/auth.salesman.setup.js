// Import basic libraries
import { test as setup, expect } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, 'secrets/.env.development') });

// Define basic variables
const loginUrl = process.env.PATH_LOGIN;
const dashboardUrl = process.env.PATH_DASHBOARD;
const salesmanUsername = process.env.USERNAME_SALESMAN;
const salesmanPwd = process.env.PWD_SALESMAN;
setup('Authenticate as Admin', async ({ page }) => {
    // Go to your login page
    await page.goto(loginUrl);

    // Fill in username and password
    await page.fill('#username', salesmanUsername);
    await page.fill('#password', salesmanPwd);
    await page.click('button[type="submit"]');

    // Wait for successful login (e.g., dashboard URL or element)
    await expect(page).toHaveURL(dashboardUrl);

    // Save the cookies and local storage
    await page.context().storageState({ path: 'secrets/.auth/salesman.json' });
});
