// Import required libraries
import BasePage from './Page.js';

// Declare class ProductsPage
class InvoicesPage extends BasePage {
    constructor(page, url) {
        // Initialise the parent's constructor
        super(page, url);

        // Initialise the Invoices page elements
        // First, the elements of the listing page
        this.listingPageHeading = this.page.getByRole('heading', { name: 'Listado de Facturas de Venta' });
        this.listingCreateInvoiceBtn = this.page.getByRole('button', { name: 'Crear Factura de Venta' });
        this.listingStartDateSearchInput = this.page.locator('#start-date');
        this.listingEndDateSearchInput = this.page.locator('#end-date');
        this.listingSearchInput = this.page.locator('#search-term');
        this.listingSearchBtn = this.page.getByRole('button', { name: 'Buscar' });
        this.listingFirstRowEditBtn = this.page.locator("//tbody/tr[1]/td[7]/div[1]/button[1]");
        this.listingFirstRowDeleteBtn = this.page.locator("//tbody/tr[1]/td[7]/div[1]/button[2]");

        // Then, the elements in the Add New Invoice page
        this.formPageHeading = this.page.getByRole('heading', { name: 'Crear Factura de Venta' });
        this.formOrderOriginCodeInput = this.page.locator("//div[@class='grid grid-cols-1 md:grid-cols-4 gap-6']//div[1]//div[1]//div[1]//div[1]");
        this.formOrderOriginNameSearchInput = this.page.locator("//div[@class='grid grid-cols-1 md:grid-cols-4 gap-6']//div[1]//div[1]//div[1]//div[2]//input[1]");
        this.formOrderOriginSearchBtn = this.page.locator("//div[@class='grid grid-cols-1 md:grid-cols-4 gap-6']//div[1]//div[1]//div[1]//div[2]//button[1]");
        this.formOrderSeriesSelect = this.page.locator('[name="series"]');
        this.formBuyerCodeInput = this.page.locator("//div[@class='grid grid-cols-1 md:grid-cols-4 gap-6']//div[1]//div[1]//div[1]//div[1]");
        this.formBuyerNameSearchInput = this.page.locator("//div[3]//div[1]//div[1]//div[2]//input[1]");
        this.formBuyerSearchBtn = this.page.locator("//div[3]//div[1]//div[1]//div[2]//button[1]");
        this.formPurchaseOrderNumberInput = this.page.locator('[name="purchase_order_number"]');
        this.formClientCodeInput = this.page.locator("//div//div//div//div//div//div[1]//div[2]//div[1]//div[1]//input[1]");
        this.formClientNameSearchInput = this.page.locator("//div[@class='grid grid-cols-1 md:grid-cols-4 gap-6']//div[1]//div[2]//div[1]//div[2]//input[1]");
        this.formClientSearchBtn = this.page.locator("//div[@class='grid grid-cols-1 md:grid-cols-4 gap-6']//div[1]//div[2]//div[1]//div[2]//button[1]");
        this.formDateInput = this.page.locator('[name="invoice_date"]');
        this.formDeliveryCodeInput = this.page.locator("//div[3]//div[2]//div[1]//div[1]//input[1]");
        this.formDeliveryNameSearchInput = this.page.locator("//div[3]//div[2]//div[1]//div[2]//input[1]");
        this.formDeliverySearchBtn = this.page.locator("//div[3]//div[2]//div[1]//div[2]//button[1]");
        this.formDeliveryAddressSelect = this.page.locator('[name="delivery_address_selector"]');
        this.formSalesmanCodeInput = this.page.locator("//div[3]//div[1]//div[1]//div[1]");
        this.formSalesmanNameSearchInput = this.page.locator("//div[@class='grid grid-cols-1 md:grid-cols-4 gap-6']//div[1]//div[3]//div[1]//div[2]//input[1]");
        this.formSalesmanSearchBtn = this.page.locator("//div[@class='grid grid-cols-1 md:grid-cols-4 gap-6']//div[1]//div[3]//div[1]//div[2]//button[1]");
        this.formDeliveryDateInput = this.page.locator('[name="delivery_date"]');
        this.formCurrencyCodeInput = this.page.locator("//div[3]//div[1]//div[1]//div[1]");
        this.formCurrencyNameSearchInput = this.page.locator("//div[3]//div[3]//div[1]//div[2]//input[1]");
        this.formCurrencySearchBtn = this.page.locator("//div[3]//div[3]//div[1]//div[2]//button[1]");
        this.formExchangeRateInput = this.page.locator('[name="exchange_rate"]');
        this.formShowDollarsCheckbox = this.page.locator("//input[@id='show_currency_equivalence']");
        this.formAddItemBtn = this.page.getByRole('button', { name: /Agregar Ítem/i });
        this.formItem1CodeInput = this.page.locator("//tbody/tr[1]/td[1]/div[1]/div[1]");
        this.formItem1NameSearchInput = this.page.locator("//tbody/tr[1]/td[1]/div[1]/div[2]/input[1]");
        this.formItem1SearchBtn = this.page.locator("//tbody/tr[1]/td[1]/div[1]/div[2]/button[1]");
        this.formItem1QuantityInput = this.page.locator("//tbody/tr[1]/td[2]/p[1]/input[1]");
        this.formItem1StockCell = this.page.locator("//tbody/tr[1]/td[3]");
        this.formItem1UnitPriceInput = this.page.locator("//tbody/tr[1]/td[4]/input[1]");
        this.formItem1SubtotalCell = this.page.locator("//tbody/tr[1]/td[7]");
        this.formItem1ProfitCell = this.page.locator("//tbody/tr[1]/td[8]");
        this.formItem1LineTotalCell = this.page.locator("//tbody/tr[1]/td[9]");
        this.formItem1PriceHistoryBtn = this.page.locator("//tbody/tr[1]/td[10]/button[1]");
        this.formItem1CostHistoryBtn = this.page.locator("//button[@title='Ver historial de costos']");
        this.formItem1DeleteBtn = this.page.locator("//button[@title='Eliminar ítem']");
        this.formNotesInput = this.page.locator('[name="notes"]');
        this.formCancelBtn = this.page.getByRole('button', { name: 'Cancelar' });

        // Override the submitBtn property from the parent class
        this.submitBtn = this.page.getByRole('button', { name: 'Guardar Factura' });

        // Alias the submitNewItem and the bulkSubmitNewItems methods from the parent class
        this.submitNewInvoice = super.submitNewItem;
        this.bulkSubmitNewInvoices = super.bulkSubmitNewItems;

        // Initialise the Client CSV files that will be used for bulk data upload
        this.validCsv = this.loadCsv('../../../bulk_data/invoices-valid.csv');
        this.invalidCsv = this.loadCsv('../../../bulk_data/invoices-invalid.csv');

        // Define the page elements that are not of type Input in the "Add New Invoice" form
        this.nonInputControls = [
            'formOrderSeriesSelect',
            'formDeliveryAddressSelect',
            'formShowDollarsCheckbox'
        ];
        this.checkboxControls = [
            'formShowDollarsCheckbox'
        ]
    }

    async createNewInvoice() {
    }

    async createBulkNewInvoices() {
    }

    async searchInvoice() {
    }

    async deleteInvoice() {
    }

    async deleteBulkInvoices() {
    }
}

//Export this class
export default InvoicesPage;
