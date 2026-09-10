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
        this.listingFirstRowCheckbox = this.page.locator("//tbody/tr[1]/td[1]/input");
        this.listingFirstRowEditBtn = this.page.locator("//tbody/tr[1]/td[10]/div[1]/button[1]");
        this.listingFirstRowDeleteBtn = this.page.locator("//tbody/tr[1]/td[10]/div[1]/button[2]");
        this.listingFilterLineSelect = this.page.locator('button').filter({ hasText: 'Todas' }).first();
        this.listingFilterCategorySelect = this.page.locator('button').filter({ hasText: 'Todas' }).last();

        // Then, the elements in the Add New Product page
        this.formSkuCodeInput = this.page.locator('#sku');
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
        this.validCsv = this.loadCsv('../../../bulk_data/products-valid.csv');
        this.invalidCsv = this.loadCsv('../../../bulk_data/products-invalid.csv');

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

    async createNewProduct() {
    }

    async createBulkNewProducts() {
    }

    async searchProduct() {
    }

    async deleteProduct() {
    }

    async deleteBulkProducts() {
    }
}

//Export this class
export default ProductsPage;
