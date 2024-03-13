/// <reference types="cypress"/>

class MyOrdersPage extends BasePage {
    static get orderList() {
        return cy.get(".mdc-data-table__content tr");
    }

    static getSpecificOrder(index) {
        return this.orderList.eq(index);
    }

    static getSpecificOrderTotalPrice(index) {
        return this.getSpecificOrder(index)
            .get(".cdk-column-orderTotal")
            .invoke("text");
    }

    static getSpecificOrderDetails(index) {
        return this.getSpecificOrder(index).get(
            ".mat-mdc-card > .mat-mdc-card-content:visible"
        );
    }
}

export default MyOrdersPage;
