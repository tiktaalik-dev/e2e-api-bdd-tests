// Import basic libraries and the LoginPage class
import { test as setup, expect } from '@playwright/test';
import fs from 'fs';
import LoginPage from './pom/LoginPage.js';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, 'secrets/.env.development') });

// Define basic variables
const loginUrl = process.env.BASE_URL + process.env.PATH_LOGIN;
const dashboardUrl = process.env.BASE_URL + process.env.PATH_DASHBOARD;
const adminUsername = process.env.USERNAME_ADMIN;
const adminPwd = process.env.PWD_ADMIN;
setup('Authenticate as Admin', async ({ page }) => {
    // Instantiate the LoginPage class
    const loginPage = new LoginPage(page, loginUrl);

    // Fill in the form and submit it
    await loginPage.login(adminUsername, adminPwd);

    // Wait for successful login (e.g., dashboard URL or element)
    await expect(page).toHaveURL(dashboardUrl);

    // Create the directory if it doesn't already exist
    if (!fs.existsSync('secrets/.auth')) {
        fs.mkdirSync('secrets/.auth', {recursive: true});
    }

    // Save the cookies and local storage
    await page.context().storageState({ path: 'secrets/.auth/admin.json' });
});
