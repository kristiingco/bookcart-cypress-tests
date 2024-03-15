/// <reference types = "cypress"/>

import BookDetailsPage from "../page-objects/pages/BookDetailsPage";
import LoginPage from "../page-objects/pages/LoginPage";
import CartPage from "../page-objects/pages/CartPage";
import WishlistPage from "../page-objects/pages/WishlistPage";
import BookCard from "../page-objects/components/BookCard";
import Navbar from "../page-objects/components/Navbar";

describe("Browsing Book Details", () => {
    beforeEach(() => {
        cy.visit("/");
        BookCard.getSpecificCard(3).click();
    });

    it("should have a title", () => {
        BookDetailsPage.bookTitle.should("exist");
    });

    it("should have an author", () => {
        BookDetailsPage.bookAuthor.should("exist");
    });

    it("should have a category", () => {
        BookDetailsPage.bookCategory.should("exist");
    });

    it("should have a price", () => {
        BookDetailsPage.price.should("exist");
    });

    it("should not show wishlist button when logged out", () => {
        BookDetailsPage.addToWishlistButton.should("not.exist");
    });
});

describe("Browsing Book Details when logged in", () => {
    beforeEach(() => {
        cy.visit("/login");
        cy.fixture("loginData").then(({ username, password }) => {
            LoginPage.login(username, password);
            BookCard.getSpecificCard(3).click();
        });
    });

    it("should add to wishlist", () => {
        BookDetailsPage.addToWishlistButton.click();
        cy.wait(2000);
        BookDetailsPage.removeFromWishlistButton.should("exist");
        BookDetailsPage.bookTitle.then((bookTitle) => {
            Navbar.clickWishlist();
            const textValues = [];
            WishlistPage.allWishlistTitles
                .each(($el) => {
                    cy.wrap($el)
                        .invoke("text")
                        .then((text) => {
                            textValues.push(text.trim());
                        });
                })
                .then(() => {
                    expect(textValues).to.include(bookTitle);

                    // cleaning up
                    WishlistPage.clickClearWishlist();
                });
        });
    });

    it("should add to cart", () => {
        BookDetailsPage.addToCartButton.click();
        cy.wait(2000);
        BookDetailsPage.bookTitle.then((bookTitle) => {
            Navbar.clickCart();
            const textValues = [];
            CartPage.allCartProductTitles
                .each(($el) => {
                    cy.wrap($el)
                        .invoke("text")
                        .then((text) => {
                            textValues.push(text.trim());
                        });
                })
                .then(() => {
                    expect(textValues).to.include(bookTitle);

                    // cleaning up
                    CartPage.clickClearCart();
                });
        });
    });

    afterEach(() => {
        Navbar.clickLogout();
    });
});
