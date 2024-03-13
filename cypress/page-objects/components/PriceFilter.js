/// <reference types = "cypress"/>

class PriceFilter {
    static get priceSlider() {
        return cy.get(".mdc-slider__input");
    }

    static get minimumPrice() {
        return cy.get(".d-flex > :nth-child(1) > strong").invoke("text");
    }

    static get maximumPrice() {
        return cy.get(":nth-child(3) > strong").invoke("text");
    }
}

export default PriceFilter;
