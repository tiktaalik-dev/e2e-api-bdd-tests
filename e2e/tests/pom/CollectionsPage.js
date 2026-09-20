// Import required libraries
import BasePage from './Page.js';

// Declare class ProductsPage
class CollectionsPage extends BasePage {
    constructor(page, url) {
        // Initialise the parent's constructor
        super(page, url);

        // Initialise the collections page elements
        // First, the elements of the listing page
        this.listingPageHeading = this.page.getByRole('heading', { name: 'Listado de Cobranzas' });
        this.listingCreateCollectionBtn = this.page.getByRole('button', { name: 'Crear Cobranza' });
        this.listingStartDateSearchInput = this.page.locator('#start-date');
        this.listingEndDateSearchInput = this.page.locator('#end-date');
        this.listingSearchInput = this.page.locator('#search-term');
        this.listingSearchBtn = this.page.getByRole('button', { name: 'Buscar' });
        this.listingFirstResultCell = this.page.locator("td:nth-child(2)").first();
        this.listingFirstRowEditBtn = this.page.locator("//tbody/tr[1]/td[7]/div[1]/button[1]");
        this.listingFirstRowDeleteBtn = this.page.locator("//tbody/tr[1]/td[7]/div[1]/button[2]");

        // The access denied page element
        this.accessDeniedHeading = this.page.getByRole('heading', { name: 'Acceso Denegado' });

        // Then the elements in the View Collection Details page
        this.viewCollectionDetailsClientNameCell = this.page.locator("body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > main:nth-child(2) > div:nth-child(1) > dl:nth-child(2) > div:nth-child(1) > dd:nth-child(2)");
        this.viewCollectionDetailsEditBtn = this.page.getByRole('button', { name: 'Editar' });
        this.viewCollectionDetailsReturnLink = this.page.locator('button.p-1.mr-2.text-gray-600.rounded-full.hover\:bg-gray-100');


        // Then, the elements from the modal dialogue that shows up when clicking on the Collection Name Search button
        this.listingSearchModalInput = this.page.getByPlaceholder('Buscar por nombre, código...');
        this.listingSearchModalBtn = this.page.locator("//button[@type='submit']");
        this.listingSearchModalFirstResult = this.page.locator("tbody tr:nth-child(1) td:nth-child(2)");

        // Then, the elements in the first row of the invoices listed for the client
        this.pendingInvoicesListingAmountInput = this.page.locator("//input[@placeholder='0.00']");
        this.pendingInvoicesListingAmountErrorMsg = this.page.getByText('El monto aplicado ($ 159,00) no puede superar el saldo ($ 158,50)', { exact: true });
        this.pendingInvoicesListingFillTotalAmountBtn = this.page.locator("button[title='Llenar con saldo pendiente']");

        // Then, the elements in the Payment Methods section
        this.formPaymentMeansAddMeanBtn = this.page.getByRole('button', { name: 'Añadir Medio' });
        this.formPaymentMeansTypeSelect = this.page.locator('#payment_method_0');
        this.formPaymentMeansTypeOptions = [
            'Efectivo',
            'Cheque',
            'Transferencia',
            'Documento',
            'Retención',
            'Ajuste'
        ]
        this.formPaymentMeansAccountNumberInput = this.page.locator("//div[@class='col-span-12 md:col-span-3']//div[@class='flex w-full space-x-2 mt-1']//div[1]");
        this.formPaymentMeansAccountNameInput = this.page.locator("div[class='col-span-12 md:col-span-3'] input[placeholder='Nombre...']");
        this.formPaymentMeansAccountNameSearchBtn = this.page.locator("div[class='col-span-12 md:col-span-3'] button[aria-label='Buscar']");
        this.formPaymentMeansAccountNameSearchModalFirstResultCell = this.page.locator("div[class='col-span-12 md:col-span-3'] div[class='flex flex-col space-y-2']");
        this.formPaymentMeansCashAmountInput = this.page.locator("input[class='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-right flex-1 min-w-0']");
        this.formPaymentMeansCashFillBalanceBtn = this.page.getByRole('button', { name: 'Completar valor con el faltante respecto al total aplicado' });
        this.formPaymentMeansCashDeleteRowBtn = this.page.getByRole('button', { name: 'Eliminar ítem' });

        // Override the submitBtn property from the parent class
        this.submitBtn = this.page.getByRole('button', { name: 'Guardar Cobranza' });

        // Alias the submitNewItem and the bulkSubmitNewItems methods from the parent class
        this.submitNewCollection = super.submitNewItem;
        this.bulkSubmitNewCollections = super.bulkSubmitNewItems;

        // Initialise the Client CSV files that will be used for bulk data upload
        this.validCsv = '../../../bulk_data/collections-valid.csv';
        this.invalidCsv = '../../../bulk_data/collections-invalid.csv';

        // Define the page elements that are not of type Input in the "Add New collection" form
        this.nonInputControls = [
            'formPaymentMeansTypeSelect'
        ];
        this.checkboxControls = [];
    }

    async createNewCollection(collectionData) {
        // Click on the "Create New Collection" button
        await this.listingCreateCollectionBtn.click();

        // Fill in the form fields with the provided collection data
        // First, click on the Name Search button and select the first result in the modal dialogue
        await this.fillInput(this.formCuitInput, collectionData.cuit);
        await this.selectOptionFromDropdown(this.formTaxSituationSelect, collectionData.tax_situation);
        await this.fillInput(this.formLegalNameInput, collectionData.client_name);
        await this.selectOptionFromDropdown(this.formVatWithholderSelect, collectionData.vat_witholder);
        await this.selectOptionFromDropdown(this.formExportsLawAppliesSelect, collectionData.exports_law_applies);
        await this.selectOptionFromDropdown(this.formInvoiceSerialSelect, collectionData.invoice_serial);
        await this.fillInput(this.formSignUpDateInput, collectionData.signup_date);

        // Then click on the Search Currency button and select the first one on the modal form that appears then
        await this.clickBtn(this.formCurrencyNameSearchBtn);
        await this.clickBtn(this.formCurrencyModalFirstResultCell);

        // Then, click on the "Fill with remaining balance" button
        await this.clickBtn(this.pendingInvoicesListingFillTotalAmountBtn);

        // Then, add a Payment Method
        await this.clickBtn(this.formPaymentMeansAddMeanBtn);
        await this.selectOptionFromDropdown(this.formPaymentMeansTypeSelect, this.formPaymentMeansTypeOptions[0]);
        await this.clickBtn(this.formPaymentMeansAccountNameSearchBtn);
        await this.clickBtn(this.formPaymentMeansAccountNameSearchModalFirstResultCell);
        await this.clickBtn(this.formPaymentMeansCashFillBalanceBtn);

        // Finally, submit the form
        await this.clickBtn(this.submitBtn);
    }

    async createBulkNewCollections(csvData) {
        // Iterate over the CSV data and send each row to the createNewCollection method
        for (const collectionData of csvData) {
            await this.createNewCollection(collectionData);
        }
    }

    async searchCollection(collectionName) {
        // Fill in the Collection Name in the listing Name Search input and press the Search button
        await this.fillInput(this.listingSearchInput, collectionName);
        await this.clickBtn(this.listingSearchBtn);
    }

    async searchClientInModal(clientName) {
        // Fill in the Client Name in the listing Modal Name Search dialogue
        await this.fillInput(this.listingSearchModalInput, clientName);
        await this.clickBtn(this.listingSearchModalFirstResult);
    }

    async viewFirstResultCollectionDetails() {
        // Then click on the first result
        await this.clickBtn(this.listingFirstResultCell);
    }

    async deleteCollection(collectionName) {
        // First, search for the collection name
        await this.searchCollection(collectionName);

        // Then click on the Delete Collection button
        await this.clickBtn(this.listingFirstResultDeleteBtn);

        // Then confirm the action in the modal dialogue
        await this.clickBtn(this.deleteCollectionModalDeleteBtn);
    }

    async deleteBulkCollections(csvData) {
        // Iterate over the CSV data and send each row to the deleteCollection method
        for (const collectionData of csvData) {
            await this.deleteCollection(collectionData.name);
        }
    }
}

//Export this class
export default CollectionsPage;
