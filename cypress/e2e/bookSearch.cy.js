/// <reference types = "cypress"/>

import HomePage from "../page-objects/pages/HomePage";
import BookDetailsPage from "../page-objects/pages/BookDetailsPage";
import Navbar from "../page-objects/components/Navbar";
import BookCard from "../page-objects/components/BookCard";
import Categories from "../page-objects/components/Categories";
import PriceFilter from "../page-objects/components/PriceFilter";

describe("Searching and Filtering Books", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should return books with the search term present in the title", () => {
        Navbar.search("al");
        HomePage.booksList.each((_$el, index) => {
            BookCard.getBookTitle(index).should("contain", "al");
        });
    });

    it("should return books when filtering by the Biography category", () => {
        Categories.clickCategory("Biography");
        HomePage.booksList.each((_$el, index) => {
            BookCard.getSpecificCard(index).click();
            BookDetailsPage.bookCategory.should("equal", "Biography");
            cy.go("back");
        });
    });

    it("should return books when filtering by the Fiction category", () => {
        Categories.clickCategory("Fiction");
        HomePage.booksList.each((_$el, index) => {
            BookCard.getSpecificCard(index).click();
            BookDetailsPage.bookCategory.should("equal", "Fiction");
            cy.go("back");
        });
    });

    it("should return books when filtering by the Mystery category", () => {
        Categories.clickCategory("Mystery");
        HomePage.booksList.each((_$el, index) => {
            BookCard.getSpecificCard(index).click();
            BookDetailsPage.bookCategory.should("equal", "Mystery");
            cy.go("back");
        });
    });

    it("should return books when filtering by the Fantasy category", () => {
        Categories.clickCategory("Fantasy");
        HomePage.booksList.each((_$el, index) => {
            BookCard.getSpecificCard(index).click();
            BookDetailsPage.bookCategory.should("equal", "Fantasy");
            cy.go("back");
        });
    });

    it("should return books when filtering by the Romance category", () => {
        Categories.clickCategory("Romance");
        HomePage.booksList.each((_$el, index) => {
            BookCard.getSpecificCard(index).click();
            BookDetailsPage.bookCategory.should("equal", "Romance");
            cy.go("back");
        });
    });

    it.only("should return books with the price range depending on price filter", () => {
        cy.wait(2000);
        PriceFilter.filterPrice();
        PriceFilter.maximumPrice.then((maximumPrice) => {
            cy.log(maximumPrice);
            HomePage.booksList.each((_$el, index) => {
                BookCard.getBookPrice(index).should("be.lte", maximumPrice);
            });
        });
    });
});
