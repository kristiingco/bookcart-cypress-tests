/// <reference types = "cypress"/>

import Navbar from "../page-objects/components/Navbar";
import LoginPage from "../page-objects/pages/LoginPage";
import RegisterPage from "../page-objects/pages/RegisterPage";

describe("User Registration and Account Creation", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should successfully register an account and login", () => {
        Navbar.clickLogin();
        LoginPage.clickRegister();

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
    });
});
