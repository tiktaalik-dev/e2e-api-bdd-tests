// Import required libraries
import BasePage from './Page.js';

// Declare class ClientsPage
class ClientsPage extends BasePage {
    constructor(page, url) {
        // Initialise the parent's constructor
        super(page, url);

        // Initialise the Clients page elements
        // First, the elements of the listing page
        this.listingPageHeading = this.page.getByRole('heading', { name: 'Listado de Clientes' });
        this.listingCreateClientBtn = this.page.getByRole('button', { name: 'Crear Cliente' });
        this.listingSearchInput = this.page.getByRole('textbox', { name: 'Buscar' })   ;
        this.listingSearchBtn = this.page.locator('button:has-text("Buscar")');
        this.listingAllRowsCheckbox = this.page.locator("//th[@class='w-10 px-3 py-3.5 text-left border-b border-gray-200']//input[@aria-label='Seleccionar todos los de la página']");
        this.listingFirstRowCheckbox = this.page.locator("//tbody/tr[1]/td[1]/input");
        this.listingFirstRowEditBtn = this.page.locator("//tbody/tr[1]/td[10]/div[1]/button[1]");
        this.listingFirstRowDeleteBtn = this.page.locator("//tbody/tr[1]/td[10]/div[1]/button[2]");

        // Then, the elements in the Add New Client page
        this.formCuitInput = this.page.locator('#cuit');
        this.formTaxSituationSelect = this.page.locator('#tax');
        this.formTaxSituationOptions = [
            'IVA Responsable Inscripto',
            'Monotributista',
            'Exento',
            'Consumidor Final',
            'No Responsable'
        ];
        this.formLegalNameInput = this.page.locator('#name');
        this.formTaxWitholderSelect = this.page.locator('#retieniva');
        this.formTaxWitholderOptions = ['SI', 'NO'];
        this.formExportsLawAppliesSelect = this.page.locator('#ley_exportacion_tdf');
        this.formExportsLawAppliesOptions = ['SI', 'NO'];
        this.formInvoiceSerialSelect = this.page.locator('#serie');
        this.formInvoiceSerialOptions = ['A', 'B', 'C']
        this.formSignUpDate = this.page.locator('#startdate');
        this.formCurrencyCodeInput = this.page.locator("//div[8]//div[1]//div[1]//div[1]//input[1]");
        this.formCurrencyNameSearchInput = this.page.locator("//div[8]//div[1]//div[1]//div[2]//input[1]");
        this.formCurrencyNameSearchBtn = this.page.locator("//div[8]//div[1]//div[1]//div[2]//button[1]");
        this.formCurrencyModalHeading = this.page.getByRole('heading', { name: 'Buscar Moneda' });
        this.formCurrencyModalSearchInput = this.page.getByRole('textbox', { name: 'Buscar por nombre, código...' });
        this.formCurrencyModalSearchBtn = this.page.locator('button.inline-flex.items-center.px-4.py-2.text-sm.font-medium.text-white.bg-indigo-600.border.border-transparent.rounded-r-md.hover\:bg-indigo-700');
        this.formCurrencyModalEditBtn = this.page.locator("button[title='Editar']");
        this.formCurrencyModalDeleteBtn = this.page.locator("button[title='Eliminar']");
        this.formCurrencyModalCloseBtn = this.page.locator('button.p-2.text-gray-500.rounded-full.hover\:bg-gray-200:visible');
        this.formAddressInput = this.page.locator('#address');
        this.formPostCodeInput = this.page.locator('#zip');
        this.formCityInput = this.page.locator('#city');
        this.formDistrictSelect = this.page.locator('#district');
        this.formDistrictOptions = [
            'BOLIVIA',
            'BUENOS AIRES',
            'C.A.B.A.',
            'CHACO',
            'CHUBUT',
            'CORDOBA',
            'CORRIENTES',
            'ENTRE RIOS',
            'FORMOSA',
            'JUJUY',
            'LA PAMPA',
            'LA RIOJA',
            'MENDOZA',
            'MISIONES',
            'NEUQUEN',
            'PARAGUAY',
            'RIO NEGRO',
            'SALTA',
            'SAN JUAN',
            'SAN LUIS',
            'SANTA CRUZ',
            'SANTA FE',
            'SANTIAGO DEL ESTERO',
            'T. DEL FUEGO',
            'TUCUMAN',
            'URUGUAY'
        ]
        this.formPhoneNumberInput = this.page.locator('#phone');
        this.formWhatsAppInput = this.page.getByLabel('WhatsApp');
        this.formEmailInput = this.page.getByLabel('email');
        this.formContactPersonInput = this.page.locator('#contact');
        this.formBusinessCategoryInput = this.page.locator('#rubro');
        this.formAssignedSalesmanCodeInput = this.page.locator("//div[10]//div[1]//div[1]//div[1]//input[1]");
        this.formAssignedSalesmanNameSearchInput = this.page.locator("//div[10]//div[1]//div[1]//div[2]//input[1]");
        this.formAssignedSalesmanNameSearchBtn = this.page.locator("//div[10]//div[1]//div[1]//div[2]//button[1]");
        this.formAssignedSalesmanModalHeading = this.page.locator('button.p-2.text-gray-500.rounded-full.hover\:bg-gray-200:visible');
        this.formAssignedSalesmanModalSearchInput = this.page.getByRole('textbox', { name: 'Buscar por nombre, código...' });
        this.formAssignedSalesmanModalSearchBtn = this.page.locator('button.inline-flex.items-center.px-4.py-2.text-sm.font-medium.text-white.bg-indigo-600.border.border-transparent.rounded-r-md.hover\:bg-indigo-700:visible');
        this.formAssignedSalesmanModalFirstResult = this.page.getByRole('cell', { name: 'VENDEDOR 01' });
        this.formAssignedSalesmanModalEditBtn = this.page.getByTitle('Editar');
        this.formAssignedSalesmanModalDeleteBtn = this.page.getByTitle('Eliminar');
        this.formAssignedSalesmanModalCloseBtn = this.page.locator('button.p-2.text-gray-500.rounded-full.hover\:bg-gray-200:visible');
        this.formCodeInput = this.page.locator("//div[11]//div[1]//div[1]//div[1]//input[1]");
        this.formNameSearchInput = this.page.locator("//div[11]//div[1]//div[1]//div[2]//input[1]");
        this.formNameSearchBtn = this.page.locator("//div[11]//div[1]//div[1]//div[2]//button[1]");
        this.formModalHeading = this.page.getByRole('heading', { name: 'Buscar Comprador' });
        this.formModalSearchInput = this.page.getByRole('textbox', { name: 'Buscar por nombre, código...' });
        this.formModalSearchBtn = this.page.locator('button.inline-flex.items-center.px-4.py-2.text-sm.font-medium.text-white.bg-indigo-600.border.border-transparent.rounded-r-md.hover\:bg-indigo-700');
        this.formModalFirstResultCell = this.page.getByRole('cell', { name: 'COMPRADOR' });
        this.formModalEditBtn = this.page.getByTitle('Editar');
        this.formModalDeleteBtn = this.page.getByTitle('Eliminar');
        this.formModalCloseBtn = this.page.locator('button.p-2.text-gray-500.rounded-full.hover\:bg-gray-200:visible');
        this.formAddAddressBtn = this.page.getByRole('button', { name: 'Agregar Dirección' });
        this.formDeliveryAddressInput = this.page.getByRole('textbox', { name: 'Calle, Número, Localidad' });
        this.formDeliveryAddressDeleteBtn = this.page.getByTitle('Eliminar fila');
        this.formDeliveryZoneSelect = this.page.locator('#zone');
        this.formDeliveryZoneOptions = ['undefined - ZONA 1']
        this.formDeliveryServiceCodeInput = this.page.locator("//div//div//div//div//div//div[3]//div[1]//div[1]//div[1]//input[1]");
        this.formDeliveryServiceNameSearchInput = this.page.locator("//div[3]//div[1]//div[1]//div[2]//input[1]");
        this.formDeliveryServiceNameSearchBtn = this.page.locator("//div[3]//div[1]//div[1]//div[2]//button[1]");
        this.formDeliveryServiceModalHeading = this.page.getByRole('heading', { name: 'Buscar Transporte' });
        this.formDeliveryServiceModalSearchInput = this.page.getByRole('textbox', { name: 'Buscar por nombre, código...' });
        this.formDeliveryServiceModalSearchBtn = this.page.locator('button.inline-flex.items-center.px-4.py-2.text-sm.font-medium.text-white.bg-indigo-600.border.border-transparent.rounded-r-md.hover\:bg-indigo-700');
        this.formDeliveryServiceModalFirstResultCell = this.page.getByRole('cell', { name: 'TRANSPORTE' });
        this.formDeliveryServiceModalEditBtn = this.page.getByTitle('Editar');
        this.formDeliveryServiceModalDeleteBtn = this.page.getByTitle('Eliminar');
        this.formDeliveryServiceModalCloseBtn = this.page.locator('button.p-2.text-gray-500.rounded-full.hover\:bg-gray-200:visible');
        this.formCollectionAddressInput = this.page.locator('#paymentaddress');
        this.formCollectionCityInput = this.page.locator('#paymentcity');
        this.formCollectionPostCodeInput = this.page.locator('#paymentzip');
        this.formCollectionContactPersonInput = this.page.locator('#paymentcontact');
        this.formCollectionPhoneNumberInput = this.page.locator('#paymentphone');
        this.formCollectionDaysInput = this.page.locator('#paymentdays');
        this.formCollectionTimeInput = this.page.locator('#paymenthour');
        this.formCollectionNotesInput = this.page.locator('#paymentobs');
        this.formCollectionTermInput = this.page.locator('#plazoreal');
        this.formCollectionContact2Input = this.page.locator('#collection_contact');
        this.formCollectionEmailInput = this.page.locator('#collection_email'); // It allows for several emails separated by commas
        this.formCollectionPhoneNumberInput = this.page.locator('#collection_phone');
        this.formCollectionPortalUrlInput = this.page.locator('#collection_portal_url');
        this.formCollectionPortalUsernameInput = this.page.locator('#collection_portal_username');
        this.formCollectionPortalPasswordInput = this.page.locator('#collection_portal_password');
        this.formCollectionGeneralNotesInput = this.page.locator('#observations');
        this.formCollectionPaydayInput = this.page.locator('#payday');
        this.formCollectionCreditLimitInput = this.page.locator('#credit');
        this.formCollectionTaxExemptionInput = this.page.locator('#freetax');
        this.formCollectionFceTaxSelect = this.page.locator('#fce');
        this.formCollectionFceTaxOptions = ['SI', 'NO'];
        this.formCollectionFrozenClientSelect = this.page.locator('#congelcli');
        this.formCollectionFrozenClientOptions = ['SI', 'NO'];
        this.formCollectionProspectSelect = this.page.locator('#prospect');
        this.formCollectionProspectOptions = ['SI', 'NO'];
        this.formCollectionVatSelect = this.page.locator('#pediriva');
        this.formCollectionVatOptions = ['SI', 'NO'];
        this.formTaxCat1Checkbox = this.page.locator('#tax-1');
        this.formTaxCat2Checkbox = this.page.locator('#tax-2');
        this.formTaxCat3Checkbox = this.page.locator('#tax-3');
        this.formTaxCatMisionesCheckbox = this.page.locator('#tax-12');
        this.formTaxCatMisionesCheckbox2 = this.page.locator('#tax-45');
        this.returnBtn = this.page.getByRole('button', { name: 'Volver' });

        // Override the submitBtn property from the parent class
        this.submitBtn = this.page.getByRole('button', { name: 'Guardar Cambios' });

        // Initialise the Client CSV files that will be used for bulk data upload
        this.validCsv = this.loadCsv('../../../bulk_data/clients-valid.csv');
        this.invalidCsv = this.loadCsv('../../../bulk_data/clients-invalid.csv');

        // Alias the submitNewItem and the bulkSubmitNewItems methods from the parent class
        this.submitNewClient = super.submitNewItem;
        this.bulkSubmitNewClients = super.bulkSubmitNewItems;

        // Define the page elements that are not of type Input in the "Add New Client" form
        this.nonInputControls = [
            'formTaxSituationSelect',
            'formTaxWitholderSelect',
            'formInvoiceSerialSelect',
            'formExportsLawAppliesSelect',
            'formTaxCat1Checkbox',
            'formTaxCat2Checkbox',
            'formTaxCat3Checkbox',
            'formTaxCatMisionesCheckbox',
            'formTaxCatMisiones2Checkbox'
        ];
        this.checkboxControls = [
            'formTaxCat1Checkbox',
            'formTaxCat2Checkbox',
            'formTaxCat3Checkbox',
            'formTaxCatMisionesCheckbox',
            'formTaxCatMisiones2Checkbox'
        ]
    }

    async createNewClient() {
    }

    async createBulkNewClients() {
    }

    async searchClient() {
    }

    async deleteClient() {
    }

    async deleteBulkClients() {
    }
}

//Export this class
export default ClientsPage;
