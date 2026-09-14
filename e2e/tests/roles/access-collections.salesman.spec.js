// Import the required libraries and the CollectionsPage class
import {test, expect} from '@playwright/test';
import CollectionsPage from "../pom/CollectionsPage.js";

// Define the required URL
const collectionsAreaUrl = process.env.BASE_URL + process.env.PATH_COLLECTIONS;

test.describe.serial('Testing access restrictions to collections page for salesman role', () => {

    // Set the global variables for the test run
    let collectionArea;

    // Prepare a new page for each test
    test.beforeEach(async ({ page }) => {
        collectionArea = new CollectionsPage(page, collectionsAreaUrl);
    })

    // First, check whether trying to access the collections page shows access denied
    test('Salesman user cannot access collections page and sees "Acceso Denegado" heading: ', async ({page}) => {
        // Navigate to the Collections listing page
        await collectionArea.goToURL();

        // Check the access denied heading is visible
        await expect(collectionArea.accessDeniedHeading).toBeVisible();

        // Check the heading contains the exact text "Acceso Denegado"
        await expect(collectionArea.accessDeniedHeading).toHaveText("Acceso Denegado");
    });

    // Additional test to verify we stay on the access denied page (no redirection)
    test('Page URL remains the collections URL after accessing: ', async ({page}) => {
        // Navigate to the Collections listing page
        await collectionArea.goToURL();

        // Check the page URL is still the collections URL (we didn't get redirected away)
        await expect(collectionArea.page).toHaveURL(collectionsAreaUrl);
    });
});
