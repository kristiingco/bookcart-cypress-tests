/// <reference types = "cypress"/>

import BasePage from "./BasePage";

class CartPage extends BasePage {
    static get cartProducts() {
        return cy.get("tbody tr");
    }

    static getSpecificCartProduct(index) {
        return this.cartProducts.eq(index);
    }

    static getCartProductPrice(index) {
        return this.getSpecificCartProduct(index)
            .get(".cdk-column-price")
            .invoke("text");
    }

    static getCartSubtractQuantityButton(index) {
        return this.getSpecificCartProduct(index)
            .get(".cdk-column-quantity > .d-flex button")
            .eq(0);
    }

    static getCartAddQuantityButton(index) {
        return this.getSpecificCartProduct(index)
            .get(".cdk-column-quantity > .d-flex button")
            .eq(1);
    }

    static getCartRemoveProductButton(index) {
        return this.getSpecificCartProduct(index).get(
            ".cdk-column-action > button"
        );
    }

    static get totalPrice() {
        return cy
            .get("td.cdk-column-action:nth-child(5) > strong")
            .invoke("text");
    }

    static get checkOutButton() {
        return cy.contains("Checkout");
    }

    static get clearCartButton() {
        return cy.contains("Clear cart");
    }

    static get cartEmptyText() {
        return cy.get(
            ".my-4 > .mat-mdc-card > .mat-mdc-card-header > .mat-mdc-card-header-text > .mat-mdc-card-title"
        );
    }

    static getContinueShoppingButton() {
        return cy.contains("Continue shopping");
    }
}

export default CartPage;
