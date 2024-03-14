/// <reference types="cypress"/>

import BasePage from "./BasePage";

class BookDetailsPage extends BasePage {
    static get bookTitle() {
        return cy.get("tbody > :nth-child(1) > :nth-child(2)").invoke("text");
    }

    static get bookAuthor() {
        return cy.get("tbody > :nth-child(2) > :nth-child(2)").invoke("text");
    }

    static get bookCategory() {
        return cy.get("tbody > :nth-child(3) > :nth-child(2)").invoke("text");
    }

    static get price() {
        return cy.get("tbody > :nth-child(4) > :nth-child(2)").invoke("text");
    }

    static get addToCartButton() {
        return cy.get("Add to Cart");
    }

    static get addToWishlistButton() {
        return cy.get("Add to Wishlist");
    }
}

export default BookDetailsPage;
