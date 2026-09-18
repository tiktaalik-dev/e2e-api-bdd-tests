// Import required libraries
import BasePage from './Page.js';

// Declare class ProductsPage
class ProductsPage extends BasePage {
    constructor(page, url) {
        // Initialise the parent's constructor
        super(page, url);

        // Initialise the Products page elements
        // First, the elements of the listing page
        this.listingPageHeading = this.page.getByRole('heading', { name: 'Listado de Artículos' });
        this.listingAdjustPriceBtn = this.page.getByRole('button', { name: 'Ajustar Precio' });
        this.listingCreateProductBtn = this.page.getByRole('button', { name: 'Crear Producto' });
        this.listingSearchInput = this.page.getByRole('textbox', { name: 'Buscar Producto' })   ;
        this.listingSearchBtn = this.page.locator('button:has-text("Buscar Producto")');
        this.listingAllRowsCheckbox = this.page.locator("//th[@class='w-10 px-3 py-3.5 text-left border-b border-gray-200']//input[@aria-label='Seleccionar todos los de la página']");
        this.listingFirstRowNameCell = this.page.locator("tbody tr:nth-child(1) td:nth-child(3)");
        this.listingFirstRowCheckbox = this.page.locator("//tbody/tr[1]/td[1]/input");
        this.listingFirstRowEditBtn = this.page.locator("//tbody/tr[1]/td[10]/div[1]/button[1]");
        this.listingFirstRowDeleteBtn = this.page.locator("//tbody/tr[1]/td[10]/div[1]/button[2]");
        this.listingFilterLineSelect = this.page.locator('button').filter({ hasText: 'Todas' }).first();
        this.listingFilterCategorySelect = this.page.locator('button').filter({ hasText: 'Todas' }).last();

        // Then the elements in the View Product Details page
        this.viewProductDetailsHeading = this.page.locator('h3:visible');
        this.viewProductDetailsStockLink = this.page.getByRole('button', { name: 'Movimientos de Stock' });
        this.viewProductDetailsStockFilterBtn = this.page.getByRole('button', { name: 'Filtrar' });
        this.viewProductDetailsEditBtn = this.page.getByRole('button', { name: 'Editar' });
        this.viewProductDetailsReturnLink = this.page.locator('button.p-1.mr-2.text-gray-600.rounded-full.hover\:bg-gray-100');

        // Then, the elements in the Add New Product page
        this.formSkuCodeInput = this.page.locator('#sku');
        this.formSkuErrorMsg = this.page.getByText('El SKU debe tener el formato XXXX.XXXX.XXXX (12 dígitos)', { exact: true });
        this.formNameInput = this.page.locator('#name');
        this.formDescriptionInput = this.page.locator('#description');
        this.formLineSelect = this.page.locator('#line');
        this.formLineOptions = ['LINEA 1'];
        this.formCategorySelect = this.page.locator('#category');
        this.formCategoryOptions = ['CATEGORIA 1'];
        this.formMeasurementUnitInput = this.page.locator('#unit');
        this.formStatusSelect = this.page.locator('#is_active');
        this.formStatusOptions = ['Activo', 'Inactivo'];
        this.formLegacyNumberInput = this.page.locator('#legacy_numart');
        this.formOwnBrandInput = this.page.locator('#owner_manufacturing');
        this.formSalePriceInput = this.page.locator('#sale_price');
        this.formCostPriceInput = this.page.locator('#cost_price');
        this.formCostPriceDateInput = this.page.locator('#cost_date');
        this.formPurchasePriceInput = this.page.locator('#purchase_price');
        this.formPriceMultiplierInput = this.page.locator('#multiplier');
        this.formCostCurrencyInput = this.page.locator('#cost_currency');
        this.formCostCurrencyOptions = ['Pesos (ARS)', 'Dólares (USD)'];
        this.formStockQuantityInput = this.page.locator('#stock_quantity');
        this.formStockMinLevelInput = this.page.locator('#stock_min_level');
        this.formOnOrderQuantityInput = this.page.locator('#on_order_quantity');
        this.formSupplierDelayInput = this.page.locator('#supplier_delay_days');
        this.formBundleQuantityInput = this.page.locator('#bundle_quantity');
        this.formTaxCat1Checkbox = this.page.locator('#tax-1');
        this.formTaxCat2Checkbox = this.page.locator('#tax-2');
        this.formTaxCat3Checkbox = this.page.locator('#tax-3');
        this.returnBtn = this.page.getByRole('button', { name: 'Volver' });

        // Override the submitBtn property from the parent class
        this.submitBtn = this.page.getByRole('button', { name: 'Guardar Cambios' });

        // Alias the submitNewItem and the bulkSubmitNewItems methods from the parent class
        this.submitNewProduct = super.submitNewItem;
        this.bulkSubmitNewProducts = super.bulkSubmitNewItems;
        
        // Initialise the Client CSV files that will be used for bulk data upload
        this.validCsv = '../../../bulk_data/products-valid.csv';
        this.invalidCsv = '../../../bulk_data/products-invalid.csv';

        // Define the page elements that are not of type Input in the "Add New Product" form
        this.nonInputControls = [
            'formLineSelect',
            'formCategorySelect',
            'formStatusSelect',
            'formTaxCat1Checkbox',
            'formTaxCat2Checkbox',
            'formTaxCat3Checkbox'
        ];
        this.checkboxControls = [
            'formTaxCat1Checkbox',
            'formTaxCat2Checkbox',
            'formTaxCat3Checkbox'
        ]
    }

    async createNewProduct(productData) {
        // Click on the "Create New Product" button
        await this.listingCreateProductBtn.click();

        // Fill in the form fields with the provided product data.
        // First, fill in the Main Information section
        await this.fillInput(this.formSkuCodeInput, productData.sku_code);
        await this.fillInput(this.formNameInput, productData.prod_name);
        await this.fillInput(this.formDescriptionInput, productData.prod_description);
        await this.selectOptionFromDropdown(this.formLineSelect, productData.prod_line);
        await this.selectOptionFromDropdown(this.formCategorySelect, productData.prod_category);
        await this.fillInput(this.formMeasurementUnitInput, productData.measurement_unit);
        await this.selectOptionFromDropdown(this.formStatusSelect, productData.prod_status);
        await this.fillInput(this.formLegacyNumberInput, productData.legacy_number);
        await this.selectOptionFromDropdown(this.formOwnBrandInput, productData.own_brand);

        // Then fill in the Prices and Costs section
        await this.fillInput(this.formSalePriceInput, productData.sale_price);
        await this.fillInput(this.formCostPriceInput, productData.cost_price);
        await this.fillInput(this.formCostPriceDateInput, productData.cost_price_date);
        await this.fillInput(this.formPurchasePriceInput, productData.purchase_price);
        await this.fillInput(this.formPriceMultiplierInput, productData.price_multiplier);
        await this.selectOptionFromDropdown(this.formCostCurrencyInput, productData.cost_currency);

        // Then fill in the Stock Data section.
        await this.fillInput(this.formStockQuantityInput, productData.stock_quantity);
        await this.fillInput(this.formStockMinLevelInput, productData.stock_min_level);
        await this.fillInput(this.formOnOrderQuantityInput, productData.on_order_quantity);
        await this.fillInput(this.formSupplierDelayInput, productData.supplier_delay_days);
        await this.fillInput(this.formBundleQuantityInput, productData.bundle_quantity);

        // Fill in the Specific Product Taxes section
        await this.clickBtn(this.formTaxCat1Checkbox);
        await this.clickBtn(this.formTaxCat2Checkbox);
        await this.clickBtn(this.formTaxCat3Checkbox);

        // Finally, submit the form
        await this.clickBtn(this.submitBtn);
    }

    async createBulkNewProducts(csvData) {
        // Iterate over the CSV data and send each row to the createNewProduct method
        for (const productData of csvData) {
            await this.createNewProduct(productData);
        }
    }

    async searchProduct(productName) {
        // Fill in the Product Name in the listing Name Search input and press the Search button
        await this.fillInput(this.listingSearchInput, productName);
        await this.clickBtn(this.listingSearchBtn);
    }

    async viewFirstResultProductDetails() {
        // Then click on the first result
        await this.clickBtn(this.listingFirstResultCell);
    }

    async deleteProduct(productName) {
        // First, search for the product name
        await this.searchProduct(productName);

        // Then click on the Delete Product button
        await this.clickBtn(this.listingFirstResultDeleteBtn);

        // Then confirm the action in the modal dialogue
        await this.clickBtn(this.deleteProductModalDeleteBtn);
    }

    async deleteBulkProducts(csvData) {
        // Iterate over the CSV data and send each row to the deleteProduct method
        for (const productData of csvData) {
            await this.deleteProduct(productData.name);
        }
    }
}

//Export this class
export default ProductsPage;
