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
        this.listingFirstResultCell = this.page.locator("td:nth-child(2)");
        this.listingFirstResultViewDetailsHeading = this.page.locator('h3:visible');
        this.listingFirstResultEditBtn = this.page.locator("//tbody/tr[1]/td[10]/div[1]/button[1]");
        this.listingFirstResultDeleteBtn = this.page.locator("//tbody/tr[1]/td[10]/div[1]/button[2]");

        // Then the elements in the View Client Details page
        this.viewClientDetailsHeading = this.page.locator('h3:visible');
        this.viewClientDetailsAccountLink = this.page.getByRole('button', { name: 'Cuenta Corriente' });
        this.viewClientDetailsAccountFormFilterBtn = this.page.getByRole('button', { name: 'Filtrar' });
        this.viewClientDetailsHistoryLink = this.page.getByRole('button', { name: 'Histórico ventas' });
        this.viewClientDetailsHistorySKUColumn = this.page.getByRole('columnheader', { name: 'SKU' });
        this.viewClientDetailsEditBtn = this.page.getByRole('button', { name: 'Editar' });
        this.viewClientDetailsReturnLink = this.page.locator('button.p-1.mr-2.text-gray-600.rounded-full.hover\:bg-gray-100');

        // Then the elements in the Delete Client modal dialogue
        this.deleteClientModalHeading = this.page.locator('h3:visible');
        this.deleteClientModalCancelBtn = this.page.locator('button:has-text("Cancelar")');
        this.deleteClientModalDeleteBtn = this.page.locator('button:has-text("Confirmar")');

        // Then, the elements in the Add New Client page
        this.formCuitInput = this.page.locator('#cuit');
        this.formCuitErrorMsg = this.page.getByText('El CUIT debe tener 11 dígitos y un dígito verificador válido (formato XX-XXXXXXXX-X)', { exact: true });
        this.formTaxSituationSelect = this.page.locator('#tax');
        this.formTaxSituationOptions = [
            'IVA Responsable Inscripto',
            'Monotributista',
            'Exento',
            'Consumidor Final',
            'No Responsable'
        ];
        this.formLegalNameInput = this.page.locator('#name');
        this.formVatWithholderSelect = this.page.locator('#retieniva');
        this.formVatWithholderOptions = ['SI', 'NO'];
        this.formExportsLawAppliesSelect = this.page.locator('#ley_exportacion_tdf');
        this.formExportsLawAppliesOptions = ['SI', 'NO'];
        this.formInvoiceSerialSelect = this.page.locator('#serie');
        this.formInvoiceSerialOptions = ['A', 'B', 'C']
        this.formSignUpDateInput = this.page.locator('#startdate');
        this.formCurrencyCodeInput = this.page.locator("//div[8]//div[1]//div[1]//div[1]//input[1]");
        this.formCurrencyNameSearchInput = this.page.locator("//div[8]//div[1]//div[1]//div[2]//input[1]");
        this.formCurrencyNameSearchBtn = this.page.locator("//div[8]//div[1]//div[1]//div[2]//button[1]");
        this.formCurrencyModalHeading = this.page.getByRole('heading', { name: 'Buscar Moneda' });
        this.formCurrencyModalSearchInput = this.page.getByRole('textbox', { name: 'Buscar por nombre, código...' });
        this.formCurrencyModalSearchBtn = this.page.locator('button.inline-flex.items-center.px-4.py-2.text-sm.font-medium.text-white.bg-indigo-600.border.border-transparent.rounded-r-md.hover\:bg-indigo-700');
        this.formCurrencyModalFirstResultCell = this.page.locator("td:nth-child(2)");
        this.formCurrencyModalEditBtn = this.page.locator("button[title='Editar']");
        this.formCurrencyModalDeleteBtn = this.page.locator("button[title='Eliminar']");
        this.formCurrencyModalCloseBtn = this.page.locator('button.p-2.text-gray-500.rounded-full.hover\:bg-gray-200:visible');
        this.formLegalAddressInput = this.page.locator('#address');
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
        this.formAssignedSalesmanModalFirstResultCell = this.page.locator("td:nth-child(2)");
        this.formAssignedSalesmanModalEditBtn = this.page.getByTitle('Editar');
        this.formAssignedSalesmanModalDeleteBtn = this.page.getByTitle('Eliminar');
        this.formAssignedSalesmanModalCloseBtn = this.page.locator('button.p-2.text-gray-500.rounded-full.hover\:bg-gray-200:visible');
        this.formCodeInput = this.page.locator("//div[11]//div[1]//div[1]//div[1]//input[1]");
        this.formBuyerNameSearchInput = this.page.locator("//div[11]//div[1]//div[1]//div[2]//input[1]");
        this.formBuyerNameSearchBtn = this.page.locator("//div[11]//div[1]//div[1]//div[2]//button[1]");
        this.formBuyerModalHeading = this.page.getByRole('heading', { name: 'Buscar Comprador' });
        this.formBuyerModalSearchInput = this.page.getByRole('textbox', { name: 'Buscar por nombre, código...' });
        this.formBuyerModalSearchBtn = this.page.locator('button.inline-flex.items-center.px-4.py-2.text-sm.font-medium.text-white.bg-indigo-600.border.border-transparent.rounded-r-md.hover\:bg-indigo-700');
        this.formBuyerModalFirstResultCell = this.page.locator("td:nth-child(2)");
        this.formBuyerModalEditBtn = this.page.getByTitle('Editar');
        this.formBuyerModalDeleteBtn = this.page.getByTitle('Eliminar');
        this.formBuyerModalCloseBtn = this.page.locator('button.p-2.text-gray-500.rounded-full.hover\:bg-gray-200:visible');
        this.formDeliveryAddAddressBtn = this.page.getByRole('button', { name: 'Agregar Dirección' });
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
        this.formDeliveryServiceModalFirstResultCell = this.page.locator("td:nth-child(2)");
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
        this.formCollectionPhoneNumber2Input = this.page.locator('#collection_phone');
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
        this.formCollectionVatCertificateSelect = this.page.locator('#pediriva');
        this.formCollectionVatCertificateOptions = ['SI', 'NO'];
        this.formTaxCat1Checkbox = this.page.locator('#tax-1');
        this.formTaxCat2Checkbox = this.page.locator('#tax-2');
        this.formTaxCat3Checkbox = this.page.locator('#tax-3');
        this.formTaxCatMisionesCheckbox = this.page.locator('#tax-12');
        this.formTaxCatMisiones2Checkbox = this.page.locator('#tax-45');
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

    async createNewClient(clientData) {
        // Click on the "Create New Client" button
        await this.clickBtn(this.listingCreateClientBtn);

        // Fill in the form fields with the provided client data.
        // First, fill in the Basic Data section
        await this.fillInput(this.formCuitInput, clientData.cuit);
        await this.selectOptionFromDropdown(this.formTaxSituationSelect, clientData.tax_situation);
        await this.fillInput(this.formLegalNameInput, clientData.client_name);
        await this.selectOptionFromDropdown(this.formVatWithholderSelect, clientData.vat_witholder);
        await this.selectOptionFromDropdown(this.formExportsLawAppliesSelect, clientData.exports_law_applies);
        await this.selectOptionFromDropdown(this.formInvoiceSerialSelect, clientData.invoice_serial);
        await this.fillInput(this.formSignUpDateInput, clientData.signup_date);

        // Then click on the Search Currency button and select the first one on the modal form that appears then
        await this.clickBtn(this.formCurrencyNameSearchBtn);
        await this.clickBtn(this.formCurrencyModalFirstResultCell);

        // Then fill in the Contact Data section
        await this.fillInput(this.formLegalAddressInput, clientData.legal_address);
        await this.fillInput(this.formPostCodeInput, clientData.post_code);
        await this.fillInput(this.formCityInput, clientData.city);
        await this.selectOptionFromDropdown(this.formDistrictSelect, clientData.district);
        await this.fillInput(this.formPhoneNumberInput,clientData.phone_number);
        await this.fillInput(this.formWhatsAppInput,clientData.whatsapp);
        await this.fillInput(this.formEmailInput,clientData.email);
        await this.fillInput(this.formContactPersonInput, clientData.contact_person);
        await this.fillInput(this.formBusinessCategoryInput, clientData.business_category);

        // Click on the Assigned Salesman Search button and select the first one on the modal form that appears then
        await this.clickBtn(this.formAssignedSalesmanNameSearchBtn);
        await this.clickBtn(this.formAssignedSalesmanModalFirstResultCell);

        // Click on the Buyer Name Search button and select the first one on the modal form that appears then
        await this.clickBtn(this.form);
        await this.clickBtn(this.formBuyerModalFirstResultCell);

        // Then fill in the Delivery Data section. First click on the Add Address button and input data
        await this.clickBtn(this.formDeliveryAddAddressBtn);
        await this.fillInput(this.formDeliveryAddressInput, clientData.delivery_address);
        await this.selectOptionFromDropdown(this.formDeliveryZoneSelect, clientData.delivery_city);

        // Click on the Delivery Name Search button and select the first result
        await this.clickBtn(this.formDeliveryServiceNameSearchBtn);
        await this.clickBtn(this.formDeliveryServiceModalFirstResultCell);

        // Then fill the Collection Data section
        await this.fillInput(this.formCollectionAddressInput, clientData.collection_address);
        await this.fillInput(this.formCollectionCityInput, clientData.collection_city);
        await this.fillInput(this.formCollectionPostCodeInput, clientData.collection_post_code);
        await this.fillInput(this.formCollectionContactPersonInput, clientData.collection_contact_person);
        await this.fillInput(this.formCollectionPhoneNumberInput, clientData.collection_phone);
        await this.fillInput(this.formCollectionDaysInput, clientData.collection_days);
        await this.fillInput(this.formCollectionTimeInput, clientData.collection_time);
        await this.fillInput(this.formCollectionNotesInput, clientData.collection_notes);
        await this.fillInput(this.formCollectionTermInput, clientData.collection_term);
        await this.fillInput(this.formCollectionContact2Input, clientData.collection_contact2);
        await this.fillInput(this.formCollectionEmailInput, clientData.collection_email);
        await this.fillInput(this.formCollectionPhoneNumber2Input, clientData.collection_phone2);
        await this.fillInput(this.formCollectionPortalUrlInput, clientData.collection_portal_url);
        await this.fillInput(this.formCollectionPortalUsernameInput, clientData.collection_portal_username);
        await this.fillInput(this.formCollectionPortalPasswordInput, clientData.collection_portal_pwd);

        // Then fill in the Other Collection Data section
        await this.fillInput(this.formCollectionGeneralNotesInput, clientData.collection_general_notes);
        await this.fillInput(this.formCollectionPaydayInput, clientData.collection_payday);
        await this.fillInput(this.formCollectionCreditLimitInput, clientData.collection_credit_limit);
        await this.fillInput(this.formCollectionTaxExemptionInput, clientData.collection_tax_exemption);
        await this.selectOptionFromDropdown(this.formCollectionFceTaxSelect, clientData.collection_fce_tax);
        await this.selectOptionFromDropdown(this.formCollectionFrozenClientSelect, clientData.collection_frozen_client);
        await this.selectOptionFromDropdown(this.formCollectionProspectSelect, clientData.collection_prospect);
        await this.selectOptionFromDropdown(this.formCollectionVatCertificateSelect, clientData.collection_vat_certificate);

        // Fill in the Taxes and Client Withholding section
        await this.selectOptionFromDropdown(this.formTaxCat1Checkbox, clientData.tax_cat_1);
        await this.selectOptionFromDropdown(this.formTaxCat2Checkbox, clientData.tax_cat_2);
        await this.selectOptionFromDropdown(this.formTaxCat3Checkbox, clientData.tax_cat_3);
        await this.selectOptionFromDropdown(this.formTaxCatMisionesCheckbox, clientData.tax_cat_misiones);
        await this.selectOptionFromDropdown(this.formTaxCatMisiones2Checkbox, clientData.tax_cat_misiones2);

        // Finally, submit the form
        await this.clickBtn(this.submitBtn);
    }

    async createBulkNewClients(csvData) {
        // Iterate over the CSV data and send each row to the createNewClient method
        for (const clientData of csvData) {
            await this.createNewClient(clientData);
        }
    }

    async searchClient(clientName) {
        // Fill in the Client Name in the listing Name Search input and press the Search button
        await this.fillInput(this.listingSearchInput, clientName);
        await this.clickBtn(this.listingSearchBtn);
    }

    async viewFirstResultClientDetails() {
        // Then click on the first result
        await this.clickBtn(this.listingFirstResultCell);
    }

    async deleteClient(clientName) {
        // First, search for the client name
        await this.searchClient(clientName);

        // Then click on the Delete Client button
        await this.clickBtn(this.listingFirstResultDeleteBtn);

        // Then confirm the action in the modal dialogue
        await this.clickBtn(this.deleteClientModalDeleteBtn);
    }

    async deleteBulkClients(csvData) {
        // Iterate over the CSV data and send each row to the deleteClient method
        for (const clientData of csvData) {
            await this.deleteClient(clientData.name);
        }
    }
}

//Export this class
export default ClientsPage;
