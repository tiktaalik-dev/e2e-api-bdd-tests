// Import required libraries
import BasePage from './Page.js';

// Declare class ProductsPage
class CollectionPage extends BasePage {
    constructor(page, url) {
        // Initialise the parent's constructor
        super(page, url);

        // Initialise the collections page elements
        // First, the elements of the listing page
        this.listingPageHeading = this.page.getByRole('heading', { name: 'Listado de Cobranzas' });
        this.createCollectionBtn = this.page.getByRole('button', { name: 'Crear Cobranza' });
        this.startDateSearchInput = this.page.locator('#start-date');
        this.endDateSearchInput = this.page.locator('#end-date');
        this.searchInput = this.page.locator('#search-term');
        this.searchBtn = this.page.getByRole('button', { name: 'Buscar' });
        this.firstRowEditBtn = this.page.locator("//tbody/tr[1]/td[7]/div[1]/button[1]");
        this.firstRowDeleteBtn = this.page.locator("//tbody/tr[1]/td[7]/div[1]/button[2]");

        // Then, the elements in the Add New Collection page
        this.formPageHeading = this.page.getByRole('heading', { name: 'Crear Cobranza' });
        this.formClientCodeInput = this.page.locator("//div[@class='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 border rounded-md']//div[@class='flex w-full space-x-2 mt-1']//div[1]");
        this.formClientNameSearchInput = this.page.locator("//div[@class='md:col-span-2']//input[@placeholder='Nombre...']");
        this.formClientNameSearchBtn = this.page.locator("//div[@class='md:col-span-2']//button[@aria-label='Buscar']");
        this.formClientCollectionDateInput = this.page.locator('#collection_date');
        this.formPendingInvoiceNumberFirstRowCell = this.page.locator("tbody tr:nth-child(1) td:nth-child(1)");
        this.formPendingInvoiceDateFirstRowCell = this.page.locator("tbody tr:nth-child(1) td:nth-child(2)");
        this.formPendingInvoiceAmountFirstRowCell = this.page.locator("tbody tr:nth-child(1) td:nth-child(3)");
        this.formPendingInvoiceBalanceFirstRowCell = this.page.locator("tbody tr:nth-child(1) td:nth-child(4)");
        this.formPendingInvoiceAmortisationFirstRowInput = this.page.locator("//tbody/tr[1]/td[5]/div[1]/input[1]");
        this.formPendingInvoiceFullAmortisationFirstRowBtn = this.page.locator("tbody tr:first-child button[title='Llenar con saldo pendiente']");
        this.formPaymentMeansAddMeanBtn = this.page.getByRole('button', { name: 'Añadir Medio' });
        this.formPaymentMeansTypeSelect = this.page.locator('#payment_method_0');
        this.formPaymentMeansTypeOptions = [
            'Efectivo',
            'Cheque',
            'Transferencia Bancaria',
            'Documento',
            'Retención',
            'Ajuste',
            'Saldo Anticipado ($n)'  // Replace 'n' for the actual number
        ]
        this.formPaymentMeansAccountInput = this.page.locator("//div[@class='col-span-12 md:col-span-3']//div[@class='flex w-full space-x-2 mt-1']//div[1]");
        this.formPaymentMeansNameSearchInput = this.page.locator("div[class='col-span-12 md:col-span-3'] input[placeholder='Nombre...']");
        this.formPaymentMeansNameSearchBtn = this.page.locator("div[class='col-span-12 md:col-span-3'] button[aria-label='Buscar']");
        this.formPaymentMeansAmountInput = this.page.locator('input.w-full.px-3.py-2.mt-1.border.border-gray-300.rounded-md.shadow-sm.focus\:outline-none.focus\:ring-indigo-500.focus\:border-indigo-500.sm\:text-sm.text-right.flex-1.min-w-0');
        this.formPaymentMeansCompleteBalanceBtn = this.page.getByRole('button', { name: /Completar valor con el faltante respecto al total aplicado/i });
        this.formPaymentMeansDeleteRowBtn = this.page.getByRole('button', { name: 'Eliminar ítem' });
        this.formCancelBtn = this.page.getByRole('button', { name: 'Cancelar' });

        // Override the submitBtn property from the parent class
        this.submitBtn = this.page.getByRole('button', { name: 'Guardar Cobranza' });

        // Alias the submitNewItem and the bulkSubmitNewItems methods from the parent class
        this.submitNewCollection = super.submitNewItem;
        this.bulkSubmitNewCollections = super.bulkSubmitNewItems;

        // Initialise the Client CSV files that will be used for bulk data upload
        this.validCsv = this.loadCsv('../../../bulk_data/collections-valid.csv');
        this.invalidCsv = this.loadCsv('../../../bulk_data/collections-invalid.csv');

        // Define the page elements that are not of type Input in the "Add New collection" form
        this.nonInputControls = [
            'formPaymentMeansTypeSelect'
        ];
        this.checkboxControls = [];
    }

    async createNewCollection() {
    }

    async createBulkNewCollections() {
    }

    async searchCollection() {
    }

    async deleteCollection() {
    }

    async deleteBulkCollections() {
    }
}

//Export this class
export default CollectionPage;
