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

    static get registerButton() {
        return cy.contains("button", "Register");
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
}

export default RegisterPage;
