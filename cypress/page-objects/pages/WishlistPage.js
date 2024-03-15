/// <reference types="cypress"/>

import BasePage from "./BasePage";

class WishlistPage extends BasePage {
    static get wishlist() {
        return cy.get(".mdc-data-table__content > tr");
    }

    static get allWishlistTitles() {
        return cy.get(".mdc-data-table__content > tr > .cdk-column-title");
    }

    static getSpecificWishlistItem(index) {
        return this.wishlist.eq(index);
    }

    static getWishlistItemTitle(index) {
        return cy
            .get(".mat-mdc-row > .cdk-column-title")
            .eq(index)
            .invoke("text");
    }

    static getWishlistItemAddToCartButton(index) {
        return cy.contains("Add to Cart").eq(index);
    }

    static getWishlistItemRemoveButton(index) {
        return cy.contains("Remove from Wishlist").eq(index);
    }

    static get clearWishlistButton() {
        return cy.contains("Clear Wishlist");
    }

    static clickClearWishlist() {
        this.clearWishlistButton.click();
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
