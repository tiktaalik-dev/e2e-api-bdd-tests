// Import the required libraries and the ClientsPage class
import {test, expect} from '@playwright/test';
import ClientsPage from "../pom/ClientsPage.js";

// Define the required URLs
const clientsAreaUrl = process.env.BASE_URL + process.env.PATH_CLIENTS;

test.describe.serial('Testing the edition of client data with valid and invalid values.', () => {

    // Set the global variables for the test run
    let clientArea;
    let currentURL;
    let currentEditURL;
    let allClients;
    let firstClientData;

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

    test('Searching for the first client created leads to a page with Client Details: ', async ({page}) => {

        // Starting at the Clients listing page
        await clientArea.goToURL();

        // Load the CSV file and select only the first row, then store the client name in the global variable
        allClients = await clientArea.loadCsv(clientArea.validCsv);
        firstClientData = allClients[0];

        // Search for the first client created
        await clientArea.searchClient(firstClientData.name);

        // Click on the first result
        await clientArea.clickBtn(clientArea.searchResultsFirstResultBtn);

        // Store the current URL
        currentURL = await clientArea.page.url();

        // Check that the heading contains the name of the client
        await expect(clientArea.viewClientDetailsHeading).toContainText(firstClientData.name);
    });

    test('Clicking on the Return button in the Client Details page returns to the Clients listing page: ', async ({page}) => {
        // Starting at the Client Details page
        await clientArea.goToURL(currentURL);

        // Click on the Return link
        await clientArea.clickBtn(clientArea.viewClientDetailsReturnLink);

        // Check the page URL is the expected one
        await expect(clientArea.page).toHaveURL(clientsAreaUrl);
    });

    test('Clicking on the Account link in the Client Details page shows a form with the Filter button: ', async ({page}) => {
        // Starting at the Client Details page
        await clientArea.goToURL(currentURL);

        // Click on the Account link
        await clientArea.clickBtn(clientArea.viewClientDetailsAccountLink);

        // Check that the Filter button is visible
        await expect(clientArea.viewClientDetailsAccountFormFilterBtn).toBeVisible();
    });

    test('Clicking on the History link in the Client Details page shows a table with the SKU column: ', async ({page}) => {
        // Starting at the Client Details page
        await clientArea.goToURL(currentURL);

        // Click on the History link
        await clientArea.clickBtn(clientArea.viewClientDetailsHistoryLink);

        // Check that the SKU column is visible
        await expect(clientArea.viewClientDetailsHistorySKUColumn).toBeVisible();
    });
    
    test('Clicking on the Edit button in the Client Details page leads to the Edit Client page: ', async ({page}) => {
        // Starting at the Client Details page
        await clientArea.goToURL(currentURL);

        // Click on the Edit button
        await clientArea.clickBtn(clientArea.viewClientDetailsEditBtn);

        // Check the page URL is the expected one
        currentEditURL = currentURL + '/editar';
        await expect(clientArea.page).toHaveURL(currentEditURL);
    });

    test('Edit existing client data, changing its name, returns to Clients listing page: ', async ({page}) => {
        // Starting at the Edit Client page
        await clientArea.goToURL(currentEditURL);

        // Alter the name and fill it in
        let clientName = await clientArea.formNameInput.textContent();
        await clientArea.fillInput(clientArea.formNameInput, clientName + ' (Edited)');

        // Submit the form
        await clientArea.clickBtn(clientArea.submitBtn);

        // Confirm that the page URL is the expected one
        await expect(clientArea.page).toHaveURL(clientsAreaUrl);
    });

    test('Edit existing client data, changing its CUIT to an invalid number, shows an error message: ', async ({page}) => {
        // Starting at the Edit Client page
        await clientArea.goToURL(currentEditURL);

        // Fill in an invalid CUIT
        await clientArea.fillInput(clientArea.formCuitInput, 12);

        // Submit the form
        await clientArea.clickBtn(clientArea.submitBtn);

        // Confirm that the error message is visible
        await expect(clientArea.formCuitErrorMsg).toBeVisible();
    });
});
