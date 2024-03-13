/// <reference types="cypress"/>

import BasePage from "./BasePage";

class HomePage extends BasePage {
    static get booksList() {
        return cy.get(".col > .d-flex > div");
    }
}

export default HomePage;
