/// <reference types = "cypress"/>

import BasePage from "./BasePage";

class RegisterPage extends BasePage {
    static get firstNameField() {
        return cy.contains("First name");
    }

    static get lastNameField() {
        return cy.contains("Last name");
    }

    static get usernameField() {
        return cy.contains("User name");
    }

    static get passwordField() {
        return cy.contains("Password");
    }

    static get confirmPasswordField() {
        return cy.contains("confirmPassword");
    }

    static getGender(gender) {
        return cy.contains(gender);
    }

    static get registerButton() {
        return cy.contains("Register");
    }

    static register(firstName, lastName, username, password, gender) {
        this.firstNameField.type(firstName);
        this.lastNameField.type(lastName);
        this.usernameField.type(username);
        this.passwordField.type(password);
        this.confirmPasswordField.type(password);
        this.getGender(gender).click();
        this.registerButton.click();
    }
}

export default RegisterPage;
