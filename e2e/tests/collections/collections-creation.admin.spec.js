// Import the required libraries and the CollectionsPage class
import {test, expect} from '@playwright/test';
import CollectionsPage from "../pom/CollectionsPage.js";

// Define the required URLs
const collectionsAreaUrl = process.env.BASE_URL + process.env.PATH_COLLECTIONS;
const newCollectionsUrl = process.env.BASE_URL + process.env.PATH_NEW_COLLECTIONS;

test.describe.serial('Testing the creation of new collections (single event and in bulk)', () => {

    // Set the global variables for the test run
    let collectionArea;
    let allCollections;
    let firstCollectionData;
    let createdCollectionsNames = [];

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

    test('Clicking on the Create Collection button opens the form at the ' + newCollectionsUrl + ' URL: ', async ({page}) => {
        // Navigate to the Collections listing page
        await collectionArea.goToURL();

        // Click on the Create Collection button
        await collectionArea.clickBtn(collectionArea.listingCreateCollectionBtn);

        // Check the page URL is the expected one
        await expect(collectionArea.page).toHaveURL(newCollectionsUrl);
    });

    test('Clicking on the Return button in the Create Collection form returns to the Collections listing page: ', async ({page}) => {
        // Navigate to the Collections listing page
        await collectionArea.goToURL();

        // Click on the Create Collection button
        await collectionArea.clickBtn(collectionArea.listingCreateCollectionBtn);

        // Click on the Return button
        await collectionArea.clickBtn(collectionArea.formReturnBtn);

        // Check the page URL is the expected one
        await expect(collectionArea.page).toHaveURL(collectionsAreaUrl);
    });

    test('Creating a single new collection successfully submits the data and returns to the Collections listing page: ', async ({page}) => {

        // Starting at the Collections listing page
        await collectionArea.goToURL();

        // Load the CSV file and select only the first row, then store the collection name in the global variable
        allCollections = await collectionArea.loadCsv(collectionArea.validCsv);
        firstCollectionData = allCollections[0];
        createdCollectionsNames.push(firstCollectionData.name);

        // Call the createNewCollection method with the full collection data object
        await collectionArea.createNewCollection(firstCollectionData);

        // Confirm that the page URL is the expected one
        await expect(collectionArea.page).toHaveURL(collectionsAreaUrl);
    });

    test('Search for, and find, the recently created collection in the Collections listing page: ', async ({page}) => {
        // Starting at the Collections listing page
        await collectionArea.goToURL();

        // Search for the collection created in the previous test
        await collectionArea.searchCollection(createdCollectionsNames[0]);

        // confirm that the name in the listing result is the same as the one in createdCollectionsNames[0]
        expect(await collectionArea.listingFirstResultCell).toHaveText(createdCollectionsNames[0]);
    });

    test('Create multiple collections in bulk and return to listing page: ', async ({page}) => {
        // Starting at the Collections listing page
        await collectionArea.goToURL();

        // Call the bulkCreateCollections method with the full collection data object
        await collectionArea.bulkCreateCollections(allCollections);

        // Store the names of the created collections in the global variable
        createdCollectionsNames.push(...allCollections.map(collection => collection.name));

        // Confirm that the page URL is the expected one
        await expect(collectionArea.page).toHaveURL(collectionsAreaUrl);
    });

    test('Search for, and find, all the recently created collections in the Collections listing page: ', async ({page}) => {
        // Starting at the Collections listing page
        await collectionArea.goToURL();

        // Iterate over the list of names in createdCollectionsNames
        let allCollectionsFound = true;
        for (let name of createdCollectionsNames) {
            // Search for the collection name
            await collectionArea.searchCollection(name);

            // Get the name from the listing result and compare it against the search string
            allCollectionsFound = await collectionArea.listingFirstResultCell.textContent() === name;

            // If allCollectionsFound is ever false, break out of the loop
            if (!allCollectionsFound) {
                break;
            }
        }

        // Confirm that all collections were found
        expect(allCollectionsFound).toBe(true);
    });
});
