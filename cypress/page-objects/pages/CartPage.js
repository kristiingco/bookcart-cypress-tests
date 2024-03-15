/// <reference types = "cypress"/>

import BasePage from "./BasePage";

class CartPage extends BasePage {
    static get cartProducts() {
        return cy.get("tbody tr");
    }

    static get allCartProductTitles() {
        return cy.get(".mat-mdc-row > .cdk-column-title");
    }

    static getSpecificCartProduct(index) {
        return this.cartProducts.eq(index);
    }

    static getCartProductPrice(index) {
        return cy
            .get("td.cdk-column-price")
            .eq(index)
            .invoke("text")
            .then((text) => cy.convertPriceToNumber(text));
    }

    static getCartQuantity(index) {
        return cy
            .get("td.cdk-column-quantity div div:nth-child(2)")
            .eq(index)
            .invoke("text")
            .then((text) => Number(text.trim()));
    }

    static getCartProductTotalPrice(index) {
        return cy
            .get("td.cdk-column-total")
            .eq(index)
            .invoke("text")
            .then((text) => cy.convertPriceToNumber(text));
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
        return cy.get(".cdk-column-action > button").eq(index);
    }

    static get cartTotal() {
        return cy
            .get("td.cdk-column-action:nth-child(5) > strong")
            .invoke("text")
            .then((text) => cy.convertPriceToNumber(text));
    }

    static get checkOutButton() {
        return cy.contains("CheckOut");
    }

    static get clearCartButton() {
        return cy.contains("Clear cart");
    }

    static get cartEmptyText() {
        return cy.get(
            ".my-4 > .mat-mdc-card > .mat-mdc-card-header > .mat-mdc-card-header-text > .mat-mdc-card-title"
        );
    }

    static clickClearCart() {
        this.clearCartButton.click();
    }

    static clickCheckOut() {
        this.checkOutButton.click();
    }

    static getContinueShoppingButton() {
        return cy.contains("Continue shopping");
    }
}

export default CartPage;
