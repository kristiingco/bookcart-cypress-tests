/// <reference types = "cypress"/>

class PriceFilter {
    static get priceSlider() {
        return cy.get("input[type='range']");
    }

    static get priceSliderThumb() {
        return cy.get("mat-slider-visual-thumb");
    }

    static get minimumPrice() {
        return cy.get(".d-flex > :nth-child(1) > strong").invoke("text");
    }

    static get maximumPrice() {
        return cy
            .get(":nth-child(3) > strong")
            .invoke("text")
            .then((text) => cy.convertPriceToNumber(text));
    }

    static filterPrice() {
        this.priceSlider.click({ multiple: true, force: true });
        this.priceSlider.type("{rightArrow}{enter}", { force: true });
        this.priceSlider.blur();
    }
}

export default PriceFilter;
