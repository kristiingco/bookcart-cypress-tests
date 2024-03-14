/// <reference types = "cypress"/>

import Navbar from "../page-objects/components/Navbar";
import LoginPage from "../page-objects/pages/LoginPage";
import RegisterPage from "../page-objects/pages/RegisterPage";

describe("User Registration and Account Creation", () => {
    beforeEach(() => {
        cy.visit("/");
        Navbar.clickLogin();
        LoginPage.clickRegister();
    });

    it("should successfully register an account and login", () => {
        cy.fixture("registerData").then(
            ({ firstName, lastName, username, password, gender }) => {
                RegisterPage.register(
                    firstName,
                    lastName,
                    username,
                    password,
                    gender
                );
            }
        );

        cy.fixture("loginData").then(({ username, password }) => {
            LoginPage.login(username, password);
            Navbar.username.should("contain", username);
        });

        Navbar.clickLogout();
    });

    it("should show an error when first name field is empty", () => {
        RegisterPage.getRequiredErrorFromSpecificField("firstNameField");
        RegisterPage.errorText.should("contain", "First Name is required");
    });

    it("should show an error when last name field is empty", () => {
        RegisterPage.getRequiredErrorFromSpecificField("lastNameField");
        RegisterPage.errorText.should("contain", "Last Name is required");
    });

    it("should show an error when username field is empty", () => {
        RegisterPage.getRequiredErrorFromSpecificField("usernameField");
        RegisterPage.errorText.should("contain", "User Name is required");
    });

    it("should show an error when password field is empty", () => {
        RegisterPage.getRequiredErrorFromSpecificField("passwordField");
        RegisterPage.errorText.should("contain", "Password is required");
    });

    it("should show an error when confirm password field is empty", () => {
        RegisterPage.getRequiredErrorFromSpecificField("confirmPasswordField");
        RegisterPage.errorText.should("contain", "Password is required");
    });

    it("should show an error when password has invalid format", () => {
        RegisterPage.getPasswordError("passwordField");
        RegisterPage.errorText.should(
            "contain",
            "Password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number"
        );
    });

    it("should show an error when confirm password does not match", () => {
        RegisterPage.getPasswordError("confirmPasswordField");
        RegisterPage.errorText.should("contain", "Password do not match");
    });

    it("should go to login page after clicking the log in button", () => {
        RegisterPage.clickLogin();
        cy.url().should("include", "login");
    });
});
