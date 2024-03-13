/// <reference types="cypress"/>

class CheckoutPage extends BasePage {
    static get nameField() {
        return cy.contains("Name");
    }

    static get address1Field() {
        return cy.contains("Address Line 1");
    }

    static get address2Field() {
        return cy.contains("Address Line 2");
    }

    static get pincodeField() {
        return cy.contains("Pincode");
    }

    static get stateField() {
        return cy.contains("State");
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
        return this.getOrderItem(index).get("td:nth-child(2)").invoke("text");
    }

    static getOrderItemPrice(index) {
        return this.getOrderItem(index).get("td:nth-child(3)").invoke("text");
    }

    static getOrderItemTotalPrice(index) {
        return this.getOrderItem(index).get("td:nth-child(4)").invoke("text");
    }

    static get grandTotal() {
        return cy.get(".table > tr > :nth-child(4)").invoke("text");
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
