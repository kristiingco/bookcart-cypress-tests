/// <reference types="cypress"/>

import BasePage from "./BasePage";
class CheckoutPage extends BasePage {
    static get nameField() {
        return cy.get("[placeholder='Name']");
    }

    static get address1Field() {
        return cy.get("[placeholder='Address Line 1']");
    }

    static get address2Field() {
        return cy.get("[placeholder='Address Line 2']");
    }

    static get pincodeField() {
        return cy.get("[placeholder='Pincode']");
    }

    static get stateField() {
        return cy.get("[placeholder='State']");
    }

    static get placeOrderButton() {
        return cy.contains("Place Order");
    }

    static get cancelButton() {
        return cy.contains("Cancel");
    }

    static get orderItems() {
        return cy.get("tbody > tr");
    }

    static getOrderItem(index) {
        return this.orderItems.eq(index);
    }

    static getOrderItemQuantity(index) {
        return cy
            .get("td:nth-child(2)")
            .eq(index)
            .invoke("text")
            .then((text) => Number(text.trim()));
    }

    static getOrderItemPrice(index) {
        return cy
            .get("td:nth-child(3)")
            .eq(index)
            .invoke("text")
            .then((text) => cy.convertPriceToNumber(text));
    }

    static getOrderItemTotalPrice(index) {
        return cy
            .get("td:nth-child(4)")
            .eq(index)
            .invoke("text")
            .then((text) => cy.convertPriceToNumber(text));
    }

    static get grandTotal() {
        return cy
            .get(".table > tr > :nth-child(4)")
            .invoke("text")
            .then((text) => cy.convertPriceToNumber(text));
    }

    static get errorText() {
        return cy.get("#mat-mdc-error-0");
    }

    static getRequiredErrorFromSpecificField(fieldName) {
        this[fieldName].focus();
        this[fieldName].blur();
    }

    static placeOrder(name, address1, address2, pincode, state) {
        this.nameField.type(name);
        this.address1Field.type(address1);
        this.address2Field.type(address2);
        this.pincodeField.type(pincode);
        this.stateField.type(state);
        this.placeOrderButton.click();
    }
}

export default CheckoutPage;
