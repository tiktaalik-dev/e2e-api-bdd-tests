// Import the required libraries and the CollectionsPage class
import {test, expect} from '@playwright/test';
import CollectionsPage from "../pom/CollectionsPage.js";

// Define the required URLs
const collectionsAreaUrl = process.env.BASE_URL + process.env.PATH_COLLECTIONS;

test.describe.serial('Testing the edition of collection data with valid and invalid values.', () => {

    // Set the global variables for the test run
    let collectionArea;
    let currentURL;
    let currentEditURL;
    let allCollections;
    let firstCollectionData;

    // Prepare a new page for each test
    test.beforeEach(async ({ page }) => {
        collectionArea = new CollectionsPage(page, collectionsAreaUrl);
    })

    // First, check whether the page is correctly loaded
    test('Checking the collections listing page is loaded: ', async ({page}) => {
        // Navigate to the Collections listing page
        await collectionArea.goToURL();

        // Check the page URL is the expected one
        await expect(collectionArea.page).toHaveURL(collectionsAreaUrl);
    });

    test('Searching for the first collection created leads to a page with Collection Details: ', async ({page}) => {

        // Starting at the Collections listing page
        await collectionArea.goToURL();

        // Load the CSV file and select only the first row, then store the collection name in the global variable
        allCollections = await collectionArea.loadCsv(collectionArea.validCsv);
        firstCollectionData = allCollections[0];

        // Search for the first collection created
        await collectionArea.searchCollection(firstCollectionData.client_name);

        // Click on the first result
        await collectionArea.clickBtn(collectionArea.listingFirstResultCell);

        // Store the current URL
        currentURL = await collectionArea.page.url();

        // Check that the heading contains the name of the collection
        await expect(collectionArea.viewCollectionDetailsClientNameCell).toContainText(firstCollectionData.client_name);
    });

    test('Clicking on the Return button in the Collection Details page returns to the Collections listing page: ', async ({page}) => {
        // Starting at the Collection Details page
        await collectionArea.goToURL(currentURL);

        // Click on the Return link
        await collectionArea.clickBtn(collectionArea.viewCollectionDetailsReturnLink);

        // Check the page URL is the expected one
        await expect(collectionArea.page).toHaveURL(collectionsAreaUrl);
    });

    test('Clicking on the Edit button in the Collection Details page leads to the Edit Collection page: ', async ({page}) => {
        // Starting at the Collection Details page
        await collectionArea.goToURL(currentURL);

        // Click on the Edit button
        await collectionArea.clickBtn(collectionArea.viewCollectionDetailsEditBtn);

        // Check the page URL is the expected one
        currentEditURL = currentURL + '/editar';
        await expect(collectionArea.page).toHaveURL(currentEditURL);
    });

    test('Edit existing collection data, changing the amount to be invoiced, returns to Collections listing page: ', async ({page}) => {
        // Starting at the Edit Collection page
        await collectionArea.goToURL(currentEditURL);

        // Fill it in with an amount equal to 1
        await collectionArea.fillInput(collectionArea.formAmountInput, '1');

        // Submit the form
        await collectionArea.clickBtn(collectionArea.submitBtn);

        // Confirm that the page URL is the expected one
        await expect(collectionArea.page).toHaveURL(collectionsAreaUrl);
    });

    test('Edit existing collection data, changing its quantity to a number much higher than the original, shows an error message: ', async ({page}) => {
        // Starting at the Edit Collection page
        await collectionArea.goToURL(currentEditURL);

        // Fill in an invalid name
        await collectionArea.fillInput(collectionArea.pendingInvoicesListingAmountInput, 1000000000);

        // Submit the form
        await collectionArea.clickBtn(collectionArea.submitBtn);

        // Confirm that the error message is visible
        await expect(collectionArea.pendingInvoicesListingAmountErrorMsg).toBeVisible();
    });
});
