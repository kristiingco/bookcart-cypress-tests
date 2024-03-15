/// <reference types = "cypress"/>

class BookCard {
    static getSpecificCard(index) {
        return cy.get(".col > .d-flex > div").eq(index);
    }

    static getBookTitle(index) {
        return cy.get(".card-title").eq(index).invoke("text");
    }

    static getBookPrice(index) {
        return cy
            .get("p")
            .eq(index)
            .invoke("text")
            .then((text) => cy.convertPriceToNumber(text));
    }

    static getAddToCart(index) {
        return this.getSpecificCard(index).contains("Add to Cart");
    }

    static getWishlistButton(index) {
        return cy.get(".favourite").eq(index);
    }
}

export default BookCard;
