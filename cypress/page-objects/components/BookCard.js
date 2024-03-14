/// <reference types = "cypress"/>

class BookCard {
    static getSpecificCard(index) {
        return cy.get(".col > .d-flex > div").eq(index);
    }

    static getBookTitle(index) {
        return this.getSpecificCard(index).get(".card-title").invoke("text");
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

    static wishlistButton(index) {
        return this.getSpecificCard(index).get(".favourite");
    }
}

export default BookCard;
