/// <reference types = "cypress"/>

import LoginPage from "../page-objects/pages/LoginPage";
import Navbar from "../page-objects/components/Navbar";

describe("Logging into the Application", () => {
    beforeEach(() => {
        cy.visit("/login");
    });

    it("should successfully log in", () => {
        cy.fixture("loginData").then(({ username, password }) => {
            LoginPage.login(username, password);
            Navbar.username.should("contain", username);
        });

        // cleaning up
        Navbar.clickLogout();
    });

    it("should show an error when username field is empty", () => {
        LoginPage.getRequiredErrorFromSpecificField("usernameField");
        LoginPage.errorText.should("contain", "Username is required");
    });

    it("should show an error when password field is empty", () => {
        LoginPage.getRequiredErrorFromSpecificField("passwordField");
        LoginPage.errorText.should("contain", "Password is required");
    });

    it.only("should show error when username does not exist", () => {
        LoginPage.usernameField.type("jd100");
        LoginPage.passwordField.type("Password123!");
        LoginPage.loginButton.click();
        LoginPage.errorText.should("be.visible");
    });

    it.only("should show error when password is incorrect", () => {
        LoginPage.usernameField.type("jd12");
        LoginPage.passwordField.type("Password789!");
        LoginPage.loginButton.click();
        LoginPage.errorText.should("be.visible");
    });
});
