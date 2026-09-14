// Import the required libraries and the InvoicesPage class
import {test, expect} from '@playwright/test';
import InvoicesPage from "../pom/InvoicesPage.js";

// Define the required URLs
const invoicesAreaUrl = process.env.BASE_URL + process.env.PATH_INVOICES;
const newInvoicesUrl = process.env.BASE_URL + process.env.PATH_NEW_INVOICES;

test.describe.serial('Testing the creation of new invoices (single event and in bulk)', () => {

    // Set the global variables for the test run
    let invoiceArea;
    let allInvoices;
    let firstInvoiceData;
    let createdInvoicesNames = [];

    // Prepare a new page for each test
    test.beforeEach(async ({ page }) => {
        invoiceArea = new InvoicesPage(page, invoicesAreaUrl);
    })

    // First, check whether the page is correctly loaded
    test('Checking the invoices listing page is loaded: ', async ({page}) => {
        // Navigate to the Invoices listing page
        await invoiceArea.goToURL();

        // Check the page URL is the expected one
        await expect(invoiceArea.page).toHaveURL(invoicesAreaUrl);
    });

    test('Clicking on the Create Invoice button opens the form at the ' + newInvoicesUrl + ' URL: ', async ({page}) => {
        // Navigate to the Invoices listing page
        await invoiceArea.goToURL();

        // Click on the Create Invoice button
        await invoiceArea.clickBtn(invoiceArea.listingCreateInvoiceBtn);

        // Check the page URL is the expected one
        await expect(invoiceArea.page).toHaveURL(newInvoicesUrl);
    });

    test('Clicking on the Return button in the Create Invoice form returns to the Invoices listing page: ', async ({page}) => {
        // Navigate to the Invoices listing page
        await invoiceArea.goToURL();

        // Click on the Create Invoice button
        await invoiceArea.clickBtn(invoiceArea.listingCreateInvoiceBtn);

        // Click on the Return button
        await invoiceArea.clickBtn(invoiceArea.formReturnBtn);

        // Check the page URL is the expected one
        await expect(invoiceArea.page).toHaveURL(invoicesAreaUrl);
    });

    test('Creating a single new invoice successfully submits the data and returns to the Invoices listing page: ', async ({page}) => {

        // Starting at the Invoices listing page
        await invoiceArea.goToURL();

        // Load the CSV file and select only the first row, then store the invoice name in the global variable
        allInvoices = await invoiceArea.loadCsv(invoiceArea.validCsv);
        firstInvoiceData = allInvoices[0];
        createdInvoicesNames.push(firstInvoiceData.name);

        // Call the createNewInvoice method with the full invoice data object
        await invoiceArea.createNewInvoice(firstInvoiceData);

        // Confirm that the page URL is the expected one
        await expect(invoiceArea.page).toHaveURL(invoicesAreaUrl);
    });

    test('Search for, and find, the recently created invoice in the Invoices listing page: ', async ({page}) => {
        // Starting at the Invoices listing page
        await invoiceArea.goToURL();

        // Search for the invoice created in the previous test
        await invoiceArea.searchInvoice(createdInvoicesNames[0]);

        // confirm that the name in the listing result is the same as the one in createdInvoicesNames[0]
        expect(await invoiceArea.listingFirstResultCell).toHaveText(createdInvoicesNames[0]);
    });

    // test('Create multiple invoices in bulk and return to listing page: ', async ({page}) => {
    //     // Starting at the Invoices listing page
    //     await invoiceArea.goToURL();
    //
    //     // Call the bulkCreateInvoices method with the full invoice data object
    //     await invoiceArea.bulkCreateInvoices(allInvoices);
    //
    //     // Store the names of the created invoices in the global variable
    //     createdInvoicesNames.push(...allInvoices.map(invoice => invoice.name));
    //
    //     // Confirm that the page URL is the expected one
    //     await expect(invoiceArea.page).toHaveURL(invoicesAreaUrl);
    // });

    // test('Search for, and find, all the recently created invoices in the Invoices listing page: ', async ({page}) => {
    //     // Starting at the Invoices listing page
    //     await invoiceArea.goToURL();
    //
    //     // Iterate over the list of names in createdInvoicesNames
    //     let allInvoicesFound = true;
    //     for (let name of createdInvoicesNames) {
    //         // Search for the invoice name
    //         await invoiceArea.searchInvoice(name);
    //
    //         // Get the name from the listing result and compare it against the search string
    //         allInvoicesFound = await invoiceArea.listingFirstResultCell.textContent() === name;
    //
    //         // If allInvoicesFound is ever false, break out of the loop
    //         if (!allInvoicesFound) {
    //             break;
    //         }
    //     }
    //
    //     // Confirm that all invoices were found
    //     expect(allInvoicesFound).toBe(true);
    // });
});
