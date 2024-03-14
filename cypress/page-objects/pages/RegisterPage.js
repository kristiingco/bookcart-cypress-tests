/// <reference types = "cypress"/>

import BasePage from "./BasePage";

class RegisterPage extends BasePage {
    static get firstNameField() {
        return cy.get("[placeholder='First name']");
    }

    static get lastNameField() {
        return cy.get("[placeholder='Last Name']");
    }

    static get usernameField() {
        return cy.get("[placeholder='User name']");
    }

    static get passwordField() {
        return cy.get("[placeholder='Password']");
    }

    static get confirmPasswordField() {
        return cy.get("[placeholder='Confirm Password']");
    }

    static getGender(gender) {
        return cy.contains(gender);
    }

    static get loginButton() {
        return cy.contains(".mat-mdc-card-header button", "Login");
    }

    static get registerButton() {
        return cy.contains("button", "Register");
    }

    static get errorText() {
        return cy.get("#mat-mdc-error-0");
    }

    static getRequiredErrorFromSpecificField(fieldName) {
        this[fieldName].focus();
        this[fieldName].blur();
    }

    static getPasswordError(fieldName) {
        this[fieldName].type("1");
        this[fieldName].blur();
    }

    static register(firstName, lastName, username, password, gender) {
        this.firstNameField.type(firstName);
        this.lastNameField.type(lastName);
        this.usernameField.type(username);
        this.passwordField.type(password);
        this.confirmPasswordField.type(password);
        this.getGender(gender).click();
        cy.wait(5000);
        this.registerButton.click();
    }

    static clickLogin() {
        this.loginButton.click();
    }
}

export default RegisterPage;
