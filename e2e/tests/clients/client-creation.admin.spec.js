// Import the required libraries and the ClientsPage class
import {test, expect} from '@playwright/test';
import ClientsPage from "../pom/ClientsPage.js";

// Define the required URLs
const clientsAreaUrl = process.env.BASE_URL + process.env.PATH_CLIENTS;
const newClientsUrl = process.env.BASE_URL + process.env.PATH_NEW_CLIENTS;

test.describe.serial('Testing the creation of new clients (single event and in bulk)', () => {

    // Set the global variables for the test run
    let clientArea;
    let allClients;
    let firstClientData;
    let createdClientsNames = [];

    // Prepare a new page for each test
    test.beforeEach(async ({ page }) => {
        clientArea = new ClientsPage(page, clientsAreaUrl);
    })

    // First, check whether the page is correctly loaded
    test('Checking the clients listing page is loaded: ', async ({page}) => {
        // Navigate to the Clients listing page
        await clientArea.goToURL();

        // Check the page URL is the expected one
        await expect(clientArea.page).toHaveURL(clientsAreaUrl);
    });

    test('Clicking on the Create Client button opens the form at the ' + newClientsUrl + ' URL: ', async ({page}) => {
        // Navigate to the Clients listing page
        await clientArea.goToURL();

        // Click on the Create Client button
        await clientArea.clickBtn(clientArea.listingCreateClientBtn);

        // Check the page URL is the expected one
        await expect(clientArea.page).toHaveURL(newClientsUrl);
    });

    test('Clicking on the Return button in the Create Client form returns to the Clients listing page: ', async ({page}) => {
        // Navigate to the Clients listing page
        await clientArea.goToURL();

        // Click on the Create Client button
        await clientArea.clickBtn(clientArea.listingCreateClientBtn);

        // Click on the Return button
        await clientArea.clickBtn(clientArea.formReturnBtn);

        // Check the page URL is the expected one
        await expect(clientArea.page).toHaveURL(clientsAreaUrl);
    });

    test('Creating a single new user successfully submits the data and returns to the Clients listing page: ', async ({page}) => {

        // Starting at the Clients listing page
        await clientArea.goToURL();

        // Load the CSV file and select only the first row, then store the client name in the global variable
        allClients = await clientArea.loadCsv(clientArea.validCsv);
        firstClientData = allClients[0];
        createdClientsNames.push(firstClientData.name);

        // Call the createNewClient method with the full client data object
        await clientArea.createNewClient(firstClientData);

        // Confirm that the page URL is the expected one
        await expect(clientArea.page).toHaveURL(clientsAreaUrl);
    });

    test('Search for, and find, the recently created client in the Clients listing page: ', async ({page}) => {
        // Starting at the Clients listing page
        await clientArea.goToURL();

        // Search for the client created in the previous test
        await clientArea.searchClient(createdClientsNames[0]);

        // confirm that the name in the listing result is the same as the one in createdClientsNames[0]
        await expect(clientArea.listingFirstResultCell).toHaveText(createdClientsNames[0]);
    });

    test('Create multiple clients in bulk and return to listing page: ', async ({page}) => {
        // Starting at the Clients listing page
        await clientArea.goToURL();

        // Call the bulkCreateClients method with the full client data object
        await clientArea.createBulkNewClients(allClients);

        // Store the names of the created clients in the global variable
        createdClientsNames.push(...allClients.map(client => client.name));

        // Confirm that the page URL is the expected one
        await expect(clientArea.page).toHaveURL(clientsAreaUrl);
    });

    test('Search for, and find, all the recently created clients in the Clients listing page: ', async ({page}) => {
        // Starting at the Clients listing page
        await clientArea.goToURL();

        // Iterate over the list of names in createdClientsNames
        let allClientsFound = true;
        for (let name of createdClientsNames) {
            // Search for the client name
            await clientArea.searchClient(name);

            // Get the name from the listing result and compare it against the search string
            allClientsFound = await clientArea.listingFirstResultCell.textContent() === name;

            // If allClientsFound is ever false, break out of the loop
            if (!allClientsFound) {
                break;
            }
        }

        // Confirm that all clients were found
        expect(allClientsFound).toBe(true);
    });
});
