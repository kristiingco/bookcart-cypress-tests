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

    static isCategoryActive(categoryName) {
        this.getCategory(categoryName).should("have.class", ".active-category");
    }
}

export default Categories;
