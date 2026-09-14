// Import the required libraries and the ProductsPage class
import {test, expect} from '@playwright/test';
import ProductsPage from "../pom/ProductsPage.js";

// Define the required URLs
const productsAreaUrl = process.env.BASE_URL + process.env.PATH_PRODUCTS;

test.describe.serial('Testing the edition of product data with valid and invalid values.', () => {

    // Set the global variables for the test run
    let productArea;
    let currentURL;
    let currentEditURL;
    let allProducts;
    let firstProductData;

    // Prepare a new page for each test
    test.beforeEach(async ({ page }) => {
        productArea = new ProductsPage(page, productsAreaUrl);
    })

    // First, check whether the page is correctly loaded
    test('Checking the products listing page is loaded: ', async ({page}) => {
        // Navigate to the Products listing page
        await productArea.goToURL();

        // Check the page URL is the expected one
        await expect(productArea.page).toHaveURL(productsAreaUrl);
    });

    test('Searching for the first product created leads to a page with Product Details: ', async ({page}) => {

        // Starting at the Products listing page
        await productArea.goToURL();

        // Load the CSV file and select only the first row, then store the product name in the global variable
        allProducts = await productArea.loadCsv(productArea.validCsv);
        firstProductData = allProducts[0];

        // Search for the first product created
        await productArea.searchProduct(firstProductData.prod_name);

        // Click on the first result
        await productArea.clickBtn(productArea.listingFirstRowNameCell);

        // Store the current URL
        currentURL = await productArea.page.url();

        // Check that the heading contains the name of the product
        await expect(productArea.viewProductDetailsHeading).toContainText(firstProductData.prod_name);
    });

    test('Clicking on the Return button in the Product Details page returns to the Products listing page: ', async ({page}) => {
        // Starting at the Product Details page
        await productArea.goToURL(currentURL);

        // Click on the Return link
        await productArea.clickBtn(productArea.viewProductDetailsReturnLink);

        // Check the page URL is the expected one
        await expect(productArea.page).toHaveURL(productsAreaUrl);
    });

    test('Clicking on the Stock Movements link in the Product Details page shows a form with the Filter button: ', async ({page}) => {
        // Starting at the Product Details page
        await productArea.goToURL(currentURL);

        // Click on the Stock Movements link
        await productArea.clickBtn(productArea.viewProductDetailsStockLink);

        // Check that the Filter button is visible
        await expect(productArea.viewProductDetailsStockFilterBtn).toBeVisible();
    });

    test('Clicking on the Edit button in the Product Details page leads to the Edit Product page: ', async ({page}) => {
        // Starting at the Product Details page
        await productArea.goToURL(currentURL);

        // Click on the Edit button
        await productArea.clickBtn(productArea.viewProductDetailsEditBtn);

        // Check the page URL is the expected one
        currentEditURL = currentURL + '/editar';
        await expect(productArea.page).toHaveURL(currentEditURL);
    });

    test('Edit existing product data, changing its name, returns to Products listing page: ', async ({page}) => {
        // Starting at the Edit Product page
        await productArea.goToURL(currentEditURL);

        // Alter the name and fill it in
        let productName = await productArea.formNameInput.textContent();
        await productArea.fillInput(productArea.formNameInput, productName + ' (Edited)');

        // Submit the form
        await productArea.clickBtn(productArea.submitBtn);

        // Confirm that the page URL is the expected one
        await expect(productArea.page).toHaveURL(productsAreaUrl);
    });

    test('Edit existing product data, changing its SKU to an invalid format, shows an error message: ', async ({page}) => {
        // Starting at the Edit Product page
        await productArea.goToURL(currentEditURL);

        // Fill in an invalid SKU
        await productArea.fillInput(productArea.formSkuCodeInput, '123');

        // Submit the form
        await productArea.clickBtn(productArea.submitBtn);

        // Confirm that the error message is visible
        await expect(productArea.formSkuErrorMsg).toBeVisible();
    });
});
