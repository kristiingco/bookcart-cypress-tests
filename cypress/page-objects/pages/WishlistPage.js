/// <reference types="cypress"/>

import BasePage from "./BasePage";

class WishlistPage extends BasePage {
    static get wishlist() {
        return cy.get(".mdc-data-table__content > tr");
    }

    static getSpecificWishlistItem(index) {
        return this.wishlist.eq(index);
    }

    static getWishlistItemAddToCartButton(index) {
        return this.getSpecificWishlistItem(index).contains("Add to Cart");
    }

    static getWishlistItemRemoveButton(index) {
        return this.getSpecificWishlistItem(index).contains(
            "Remove from Wishlist"
        );
    }

    static get clearWishlistButton() {
        return cy.contains("Clear Wishlist");
    }

    static get emptyWishlistText() {
        return cy
            .get(".my-4 > .mat-mdc-card > .mat-mdc-card-header")
            .invoke("text");
    }

    static get continueShoppingButton() {
        return cy.contains("Continue shopping");
    }
}

export default WishlistPage;
