/// <reference types = "cypress"/>

class BookCard {
    static getSpecificCard(index) {
        return cy.get(".col > .d-flex > div").eq(index);
    }

    static getbookTitle(index) {
        return this.getSpecificCard(index).get(".card-title");
    }

    static getBookPrice(index) {
        return this.getSpecificCard(index).get("p").invoke("text");
    }

    static getAddToCart(index) {
        return this.getSpecificCard(index).contains("Add to Cart");
    }
}
