// Import required libraries
import BasePage from './Page.js';

// Declare class ProductsPage
class LoginPage extends BasePage {
    constructor(page, url) {
        // Initialise the parent's constructor
        super(page, url);

        // Initialise the login page elements
        this.emailAddress = this.page.locator('#email');
        this.password = this.page.locator("#password");
        this.passwordRecovery = this.page.getByRole('link', { name: /¿Olvidaste tu contraseña\?/i });

        // Override the submitBtn property from the parent class
        this.submitBtn = this.page.getByRole('button', { name: /Ingresar/i });

    }

    async login(emailValue, passwordValue) {
        // Navigate to the login page
        await this.page.goto(this.url);

        // Fill in the email and password fields
        await this.fillInput(this.emailAddress, emailValue);
        await this.fillInput(this.password, passwordValue);

        // Submit the login form
        await this.clickBtn(this.submitBtn);
    }

    async attemptPasswordRecovery() {
        await this.clickBtn(this.passwordRecovery);
    }
}

export default LoginPage;
