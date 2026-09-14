// Import the required libraries and the ClientsPage class
import {test, expect} from '@playwright/test';
import ProductsPage from "../pom/ProductsPage.js";

// Define the required URLs
const productsAreaUrl = process.env.BASE_URL + process.env.PATH_PRODUCTS;
const newProductsUrl = process.env.BASE_URL + process.env.PATH_NEW_PRODUCTS;

test.describe.serial('Testing the creation of new products (single event and in bulk)', () => {

    // Set the global variables for the test run
    let productArea;
    let allProducts;
    let firstProductData;
    let createdProductsNames = [];

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

    test('Clicking on the Create Product button opens the form at the ' + newProductsUrl + ' URL: ', async ({page}) => {
        // Navigate to the Products listing page
        await productArea.goToURL();

        // Click on the Create Product button
        await productArea.clickBtn(productArea.listingCreateProductBtn);

        // Check the page URL is the expected one
        await expect(productArea.page).toHaveURL(newProductsUrl);
    });

    test('Clicking on the Return button in the Create Product form returns to the Products listing page: ', async ({page}) => {
        // Navigate to the Products listing page
        await productArea.goToURL();

        // Click on the Create Product button
        await productArea.clickBtn(productArea.listingCreateProductBtn);

        // Click on the Return button
        await productArea.clickBtn(productArea.formReturnBtn);

        // Check the page URL is the expected one
        await expect(productArea.page).toHaveURL(productsAreaUrl);
    });

    test('Creating a single new product successfully submits the data and returns to the Products listing page: ', async ({page}) => {

        // Starting at the Products listing page
        await productArea.goToURL();

        // Load the CSV file and select only the first row, then store the product name in the global variable
        allProducts = await productArea.loadCsv(productArea.validCsv);
        firstProductData = allProducts[0];
        createdProductsNames.push(firstProductData.name);

        // Call the createNewProduct method with the full product data object
        await productArea.createNewProduct(firstProductData);

        // Confirm that the page URL is the expected one
        await expect(productArea.page).toHaveURL(productsAreaUrl);
    });

    test('Search for, and find, the recently created product in the Products listing page: ', async ({page}) => {
        // Starting at the Products listing page
        await productArea.goToURL();

        // Search for the product created in the previous test
        await productArea.searchProduct(createdProductsNames[0]);

        // confirm that the name in the listing result is the same as the one in createdProductsNames[0]
        expect(await productArea.listingFirstResultCell).toHaveText(createdProductsNames[0]);
    });

    test('Create multiple products in bulk and return to listing page: ', async ({page}) => {
        // Starting at the Products listing page
        await productArea.goToURL();

        // Call the bulkCreateProducts method with the full product data object
        await productArea.bulkCreateProducts(allProducts);

        // Store the names of the created products in the global variable
        createdProductsNames.push(...allProducts.map(product => product.name));

        // Confirm that the page URL is the expected one
        await expect(productArea.page).toHaveURL(productsAreaUrl);
    });

    test('Search for, and find, all the recently created products in the Products listing page: ', async ({page}) => {
        // Starting at the Products listing page
        await productArea.goToURL();

        // Iterate over the list of names in createdProductsNames
        let allProductsFound = true;
        for (let name of createdProductsNames) {
            // Search for the product name
            await productArea.searchProduct(name);

            // Get the name from the listing result and compare it against the search string
            allProductsFound = await productArea.listingFirstResultCell.textContent() === name;

            // If allProductsFound is ever false, break out of the loop
            if (!allProductsFound) {
                break;
            }
        }

        // Confirm that all products were found
        expect(allProductsFound).toBe(true);
    });
});
