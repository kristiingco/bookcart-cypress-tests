/// <reference types = "cypress"/>

class Categories {
    static get categoriesList() {
        return cy.get("mat-list-item");
    }

    static getCategory(categoryName) {
        return this.categoriesList.contains(categoryName);
    }

    static clickCategory(categoryName) {
        this.getCategory(categoryName).click();
    }
}

export default Categories;
