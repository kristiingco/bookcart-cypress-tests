/// <reference types = "cypress"/>

import LoginPage from "../page-objects/pages/LoginPage";
import WishlistPage from "../page-objects/pages/WishlistPage";
import CartPage from "../page-objects/pages/CartPage";
import Navbar from "../page-objects/components/Navbar";
import BookCard from "../page-objects/components/BookCard";

describe("Manage Wishlist", () => {
    beforeEach(() => {
        cy.visit("/login");
        cy.fixture("loginData").then(({ username, password }) => {
            LoginPage.login(username, password);
        });
    });

    it("should add book to wishlist", () => {
        BookCard.getBookTitle(0).then((bookTitle) => {
            BookCard.getWishlistButton(0).click();
            cy.wait(2000);
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

    it("should clear wishlist", () => {
        BookCard.getWishlistButton(0).click();
        cy.wait(2000);
        Navbar.clickWishlist();
        WishlistPage.clickClearWishlist();
        WishlistPage.wishlist.should("not.exist");
    });

    it("should remove item from wishlist", () => {
        BookCard.getWishlistButton(0).click();
        cy.wait(2000);
        Navbar.clickWishlist();
        WishlistPage.getWishlistItemRemoveButton(0).click();
        WishlistPage.wishlist.should("not.exist");
    });

    it("should add book to wishlist", () => {
        BookCard.getBookTitle(4).then((bookTitle) => {
            BookCard.getWishlistButton(4).click();
            cy.wait(2000);
            Navbar.clickWishlist();
            WishlistPage.getWishlistItemAddToCartButton(0).click();
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
                    cy.visit("/wishlist");
                    WishlistPage.clickClearWishlist();
                });
        });
    });

    afterEach(() => {
        Navbar.clickLogout();
    });
});
