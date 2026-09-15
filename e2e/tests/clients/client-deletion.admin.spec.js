// Import the required libraries and the ClientsPage class
import {test, expect} from '@playwright/test';
import ClientsPage from "../pom/ClientsPage.js";

// Define the required URLs
const clientsAreaUrl = process.env.BASE_URL + process.env.PATH_CLIENTS;

test.describe.serial('Testing the deletion of existing clients (single event and in bulk)', () => {

    // Set the global variables for the test run
    let clientArea;
    let allClients;
    let firstClientData;
    let clientNamesToDelete = [];

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

    test('Can search for an existing client in the Clients listing page: ', async ({page}) => {
        // Navigate to the Clients listing page
        await clientArea.goToURL();

        // Load the CSV file and select only the first row, then store the client name in the global variable
        allClients = await clientArea.loadCsv(clientArea.validCsv);
        firstClientData = allClients[0];
        clientNamesToDelete.push(firstClientData.name);

        // Search for the client we want to delete
        await clientArea.searchClient(clientNamesToDelete[0]);

        // confirm that the name in the listing result is the same as the one in clientNamesToDelete[0]
        await expect(clientArea.listingFirstResultCell).toHaveText(clientNamesToDelete[0]);
    });

    test('Delete a single client successfully via the delete button and confirmation modal: ', async ({page}) => {
        // Starting at the Clients listing page
        await clientArea.goToURL();

        // Search for the client to delete
        await clientArea.searchClient(clientNamesToDelete[0]);

        // Call the deleteClient method to handle the deletion flow
        await clientArea.deleteClient(clientNamesToDelete[0]);

        // Confirm that the page URL is the expected one (stays on listing page)
        await expect(clientArea.page).toHaveURL(clientsAreaUrl);
    });

    test('Search returns no results after deleting the single client: ', async ({page}) => {
        // Starting at the Clients listing page
        await clientArea.goToURL();

        // Search for the deleted client
        await clientArea.searchClient(clientNamesToDelete[0]);

        // Verify the client is no longer in the listing
        const rowCount = await clientArea.page.locator('tbody tr').count();
        expect(rowCount).toBe(0);
    });

    test('Can find all clients to delete in bulk in the Clients listing page: ', async ({page}) => {
        // Starting at the Clients listing page
        await clientArea.goToURL();

        // Store the names of the bulk clients to delete
        clientNamesToDelete.push(...allClients.slice(1).map(client => client.name));

        // Iterate over the list of names in clientNamesToDelete to confirm they all exist
        let allClientsFound = true;
        for (let name of clientNamesToDelete) {
            // Search for the client name
            await clientArea.searchClient(name);

            // Get the name from the listing result and compare it against the search string
            allClientsFound = await clientArea.listingFirstResultCell.textContent() === name;

            // If allClientsFound is ever false, break out of the loop
            if (!allClientsFound) {
                break;
            }
        }

        // Confirm that all clients were found before deletion
        expect(allClientsFound).toBe(true);
    });

    test('Delete multiple clients in bulk successfully: ', async ({page}) => {
        // Starting at the Clients listing page
        await clientArea.goToURL();

        // Call the bulkDeleteClients method with the full client data object
        await clientArea.deleteBulkClients(allClients.slice(1));

        // Confirm that the page URL is the expected one (stays on listing page)
        await expect(clientArea.page).toHaveURL(clientsAreaUrl);
    });

    test('Search returns no results after deleting all bulk clients: ', async ({page}) => {
        // Starting at the Clients listing page
        await clientArea.goToURL();

        // Iterate over all deleted client names to confirm none are found
        let anyClientsFound = false;
        for (let name of clientNamesToDelete) {
            // Search for the client name
            await clientArea.searchClient(name);

            // Check if the client still exists
            const rowCount = await clientArea.page.locator('tbody tr').count();
            if (rowCount > 0) {
                anyClientsFound = true;
                break;
            }
        }

        // Confirm that no clients were found after bulk deletion
        expect(anyClientsFound).toBe(false);
    });
});
