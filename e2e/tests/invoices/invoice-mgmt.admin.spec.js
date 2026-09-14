// Import the required libraries and the InvoicePage class
import {test, expect} from '@playwright/test';
import InvoicesPage from "../pom/InvoicesPage.js";

// Define the required URLs
const invoicesAreaUrl = process.env.BASE_URL + process.env.PATH_INVOICES;

test.describe.serial('Testing the edition of invoice data with valid and invalid values.', () => {

    // Set the global variables for the test run
    let invoiceArea;
    let currentURL;
    let currentEditURL;
    let allInvoices;
    let firstInvoiceData;

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

    test('Searching for the first invoice created leads to a page with Invoice Details: ', async ({page}) => {

        // Starting at the Invoices listing page
        await invoiceArea.goToURL();

        // Load the CSV file and select only the first row, then store the invoice name in the global variable
        allInvoices = await invoiceArea.loadCsv(invoiceArea.validCsv);
        firstInvoiceData = allInvoices[0];

        // Search for the first invoice created
        await invoiceArea.searchInvoice(firstInvoiceData.name);

        // Click on the first result
        await invoiceArea.clickBtn(invoiceArea.listingFirstResultCell);

        // Store the current URL
        currentURL = await invoiceArea.page.url();

        // Check that the heading contains the name of the invoice
        await expect(invoiceArea.viewInvoiceDetailsHeading).toContainText('Factura: ');
    });

    test('Clicking on the Return button in the Invoice Details page returns to the Invoices listing page: ', async ({page}) => {
        // Starting at the Invoice Details page
        await invoiceArea.goToURL(currentURL);

        // Click on the Return link
        await invoiceArea.clickBtn(invoiceArea.viewInvoiceDetailsReturnLink);

        // Check the page URL is the expected one
        await expect(invoiceArea.page).toHaveURL(invoicesAreaUrl);
    });

    test('Clicking on the Edit button in the Invoices listing page leads to the Edit Invoice page: ', async ({page}) => {
        // Starting at the Invoices listing page
        await invoiceArea.goToURL(currentURL);

        // Click on the Edit button
        await invoiceArea.clickBtn(invoiceArea.listingFirstResultEditBtn);

        // Check the page URL is the expected one
        currentEditURL = currentURL + '/editar';
        await expect(invoiceArea.page).toHaveURL(currentEditURL);
    });

    test('Edit existing invoice data, changing the item price, returns to Invoices listing page: ', async ({page}) => {
        // Starting at the Edit Invoice page
        await invoiceArea.goToURL(currentEditURL);

        // Alter the item price and fill it in
        let invoicePrice = await invoiceArea.formItem1UnitPriceInput.textContent();
        await invoiceArea.fillInput(invoiceArea.formItem1UnitPriceInput, invoicePrice + '000');

        // Submit the form
        await invoiceArea.clickBtn(invoiceArea.submitBtn);

        // Confirm that the page URL is the expected one
        await expect(invoiceArea.page).toHaveURL(invoicesAreaUrl);
    });

    test('Edit existing invoice data, emptying its quantity and trying to submit the form, shows an error message: ', async ({page}) => {
        // Starting at the Edit Invoice page
        await invoiceArea.goToURL(currentEditURL);

        // Fill in an invalid CUIT
        await invoiceArea.fillInput(invoiceArea.formItem1QuantityInput, '');

        // Submit the form
        await invoiceArea.clickBtn(invoiceArea.submitBtn);

        // Confirm that the error message is visible
        await expect(invoiceArea.formItem1QuantityErrorMsg).toBeVisible();
    });
});
