// Import the required libraries
import {Page} from 'playwright';
import path from "path";
import fs from "fs";
import {parse} from "csv-parse/sync";

class BasePage {
  constructor(page, url) {
    // Initialise the page and url properties
    this.page = page;
    this.url = url;

    // Initialise basic elements that are common to all pages
    this.endSessionBtn = this.page.getByRole('button', { name: 'Cerrar Sesión' });
    this.submitBtn = this.page.getByRole('button', { name: 'Guardar Cambios' });

    // Initialise the lists of elements that are not of type Text Input
    this.nonInputControls = [];
    this.checkboxControls = [];
  }

  loadCsv(csvFile) {
    const csvFilePath = path.join(__dirname, csvFile);
    const csvContent = fs.readFileSync(csvFilePath, 'utf-8');
    return parse(csvContent, {columns: true, skipEmptyLines: true, trim: true});
  }

  async fillInput(input, value) {
    await input.fill(value);
  }

  async selectOptionFromDropdown(selector, optionValue) {
    await selector.selectOption(optionValue);
  }

  async fillCheckbox(checkbox, value) {
    await checkbox.setChecked(value);
  }

  async clickBtn(btn) {
    await btn.click();
  }


  async submitNewItem(record, path = '/nuevo') {
    // First, navigate to the URL
    await this.page.goto(this.url + path);

    // Then, iterate over each property in the current record
    for (const [propertyName, propertyValue] of Object.entries(record)) {
      // Check if the property exists in our class and is a valid element
      if (this[propertyName]) {
        // Check whether the property is either a select element or a checkbox (it's in nonInputControls list)
        if (this.nonInputControls.includes(propertyName)) {
          // Check whether the property is a checkbox
          if (this.checkboxControls.includes(propertyName)) {
            // If it's a checkbox, use fillCheckbox
            await this.fillCheckbox(this[propertyName], propertyValue);
          } else {
            // Otherwise, it's a select element, use selectOptionFromDropdown
            await this.selectOptionFromDropdown(this[propertyName], propertyValue);
          }
        } else {
          // Otherwise use fillInput for text inputs
          await this.fillInput(this[propertyName], propertyValue);
        }
      }
    }

    // Submit the form
    await this.clickBtn(this.submitBtn);
  }

  async bulkSubmitNewItems(csvData) {

    // Process each item record from the CSV data
    for (const record of csvData) {
      await this.submitNewItem(record);
    }
  }

  async endSession() {
    await this.clickBtn(this.endSessionBtn);
  }
}

// Export the BasePage class for use in other files
export default BasePage;
