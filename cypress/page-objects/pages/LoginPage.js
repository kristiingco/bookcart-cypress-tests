import BasePage from "./BasePage";

class LoginPage extends BasePage {
    static get usernameField() {
        return cy.contains("Username");
    }

    static get passwordField() {
        return cy.contains("Password");
    }

    static get registerButton() {
        return cy.contains("Register");
    }

    static login(username, password) {
        this.usernameField.type(username);
        this.passwordField.type(password);
        this.registerButton.click();
    }
}

export default LoginPage;
