/// <reference types = "cypress"/>

import BasePage from "./BasePage";

class LoginPage extends BasePage {
    static get usernameField() {
        return cy.get("[placeholder='Username']");
    }

    static get passwordField() {
        return cy.get("[placeholder='Password']");
    }

    static get registerButton() {
        return cy.contains("Register");
    }

    static get loginButton() {
        return cy.contains(".mat-mdc-card-content button", "Login");
    }

    static get errorText() {
        return cy.get("#mat-mdc-error-0");
    }

    static getRequiredErrorFromSpecificField(fieldName) {
        this[fieldName].focus();
        this[fieldName].blur();
    }

    static clickRegister() {
        this.registerButton.click();
    }

    static login(username, password) {
        this.usernameField.type(username);
        this.passwordField.type(password);
        cy.wait(5000);
        this.loginButton.click();
    }
}

export default LoginPage;
