/// <reference types = "cypress"/>

import LoginPage from "../page-objects/pages/LoginPage";
import CartPage from "../page-objects/pages/CartPage";
import CheckoutPage from "../page-objects/pages/CheckoutPage";
import MyOrdersPage from "../page-objects/pages/MyOrdersPage";
import Navbar from "../page-objects/components/Navbar";
import BookCard from "../page-objects/components/BookCard";

describe("Checking Out and Placing an Order", () => {
    beforeEach(() => {
        cy.visit("/login");
        cy.fixture("loginData").then(({ username, password }) => {
            LoginPage.login(username, password);
        });
    });

    it("should place an order", () => {
        BookCard.getAddToCart(1).click();
        BookCard.getAddToCart(4).click();
        Navbar.clickCart();
        CartPage.clickCheckOut();

        cy.fixture("checkoutData").then(
            ({ name, address1, address2, pincode, state }) => {
                CheckoutPage.placeOrder(
                    name,
                    address1,
                    address2,
                    pincode,
                    state
                );
            }
        );

        cy.url().should("contain", "myorders");
        MyOrdersPage.orderList.should("have.length.above", 0);
    });

    it("should clear cart", () => {
        BookCard.getAddToCart(1).click();
        Navbar.clickCart();
        CartPage.clickClearCart();
        CartPage.cartProducts.should("not.exist");
        CartPage.cartEmptyText.should(
            "contain",
            "Your shopping cart is empty."
        );
    });

    it("should remove item from cart", () => {
        BookCard.getAddToCart(0).click();
        BookCard.getAddToCart(1).click();
        Navbar.clickCart();
        CartPage.getCartRemoveProductButton(0).click();
        CartPage.cartProducts.should("have.length", 1);

        // clean up
        CartPage.clickClearCart();
    });

    it("should have the correct total price for a cart product", () => {
        BookCard.getAddToCart(1).click();
        cy.wait(1000);
        BookCard.getAddToCart(1).click();
        cy.wait(1000);
        Navbar.clickCart();
        cy.wait(1000);
        CartPage.getCartProductPrice(0).then((productPrice) => {
            CartPage.getCartQuantity(0).then((productQuantity) => {
                const totalCartProductPrice = productPrice * productQuantity;
                CartPage.getCartProductTotalPrice(0).should(
                    "eq",
                    totalCartProductPrice
                );
            });
        });

        //cleanup
        CartPage.clickClearCart();
    });

    it("should have correct cart total", () => {
        BookCard.getAddToCart(1).click();
        BookCard.getAddToCart(2).click();
        Navbar.clickCart();

        let sum = 0;
        CartPage.cartProducts.each((_$el, index) => {
            CartPage.getCartProductTotalPrice(index).then((price) => {
                sum += price;
            });
        });
        CartPage.cartTotal.then((cartTotal) => expect(cartTotal).to.equal(sum));

        //cleanup
        CartPage.clickClearCart();
    });

    it("should increase quantity", () => {
        BookCard.getAddToCart(1).click();
        Navbar.clickCart();
        CartPage.getCartAddQuantityButton(0).click();
        cy.wait(2000);
        CartPage.getCartQuantity(0).should("eq", 2);

        //cleanup
        CartPage.clickClearCart();
    });

    it("should decrease quantity", () => {
        BookCard.getAddToCart(1).click();
        Navbar.clickCart();
        CartPage.getCartAddQuantityButton(0).click();
        cy.wait(2000);
        CartPage.getCartSubtractQuantityButton(0).click();
        cy.wait(2000);
        CartPage.getCartQuantity(0).should("eq", 1);

        //cleanup
        CartPage.clickClearCart();
    });

    it("should have correct product total price in order summary", () => {
        BookCard.getAddToCart(1).click();
        BookCard.getAddToCart(1).click();
        Navbar.clickCart();
        CartPage.clickCheckOut();

        CheckoutPage.getOrderItemPrice(0).then((orderItemPrice) => {
            CheckoutPage.getOrderItemQuantity(0).then((orderItemQuantity) => {
                const totalOrderItemPrice = orderItemPrice * orderItemQuantity;
                CheckoutPage.getOrderItemTotalPrice(0).should(
                    "eq",
                    totalOrderItemPrice
                );
            });
        });

        // clean up
        cy.visit("/shopping-cart");
        CartPage.clickClearCart();
    });

    it("should have correct grand total price in order summary", () => {
        BookCard.getAddToCart(1).click();
        BookCard.getAddToCart(4).click();
        Navbar.clickCart();
        CartPage.clickCheckOut();

        let sum = 0;
        CheckoutPage.orderItems.each((_$el, index) => {
            CheckoutPage.getOrderItemTotalPrice(index).then((price) => {
                sum += price;
            });
        });
        CheckoutPage.grandTotal.then((grandTotal) =>
            expect(grandTotal).to.equal(sum)
        );

        // clean up
        cy.visit("/shopping-cart");
        CartPage.clickClearCart();
    });

    it("should show an error when name field is empty", () => {
        BookCard.getAddToCart(1).click();
        Navbar.clickCart();
        CartPage.clickCheckOut();
        CheckoutPage.getRequiredErrorFromSpecificField("nameField");
        CheckoutPage.errorText.should("contain", "Name is required");

        // clean up
        cy.visit("/shopping-cart");
        CartPage.clickClearCart();
    });

    it("should show an error when address line 1 field is empty", () => {
        BookCard.getAddToCart(1).click();
        Navbar.clickCart();
        CartPage.clickCheckOut();
        CheckoutPage.getRequiredErrorFromSpecificField("address1Field");
        CheckoutPage.errorText.should("contain", "Address is required");

        // clean up
        cy.visit("/shopping-cart");
        CartPage.clickClearCart();
    });

    it("should show an error when address line 2 field is empty", () => {
        BookCard.getAddToCart(1).click();
        Navbar.clickCart();
        CartPage.clickCheckOut();
        CheckoutPage.getRequiredErrorFromSpecificField("address2Field");
        CheckoutPage.errorText.should("contain", "Address is required");

        // clean up
        cy.visit("/shopping-cart");
        CartPage.clickClearCart();
    });

    it("should show an error when pincode field is empty", () => {
        BookCard.getAddToCart(1).click();
        Navbar.clickCart();
        CartPage.clickCheckOut();
        CheckoutPage.getRequiredErrorFromSpecificField("pincodeField");
        CheckoutPage.errorText.should("contain", "Pincode is required");

        // clean up
        cy.visit("/shopping-cart");
        CartPage.clickClearCart();
    });

    it("should show an error when state field is empty", () => {
        BookCard.getAddToCart(1).click();
        Navbar.clickCart();
        CartPage.clickCheckOut();
        CheckoutPage.getRequiredErrorFromSpecificField("stateField");
        CheckoutPage.errorText.should("contain", "State is required");

        // clean up
        cy.visit("/shopping-cart");
        CartPage.clickClearCart();
    });

    it("should show an error in pincode field if input starts with 0 and/or is less than 6 characters", () => {
        BookCard.getAddToCart(1).click();
        Navbar.clickCart();
        CartPage.clickCheckOut();
        CheckoutPage.pincodeField.type("12345");
        CheckoutPage.pincodeField.blur();
        CheckoutPage.errorText.should(
            "contain",
            "Pincode must have 6 digits only and cannot start with 0"
        );

        // clean up
        cy.visit("/shopping-cart");
        CartPage.clickClearCart();
    });

    afterEach(() => {
        Navbar.clickLogout();
    });
});
