import { ShoppingCart, shoppingCartIsEmpty } from "@luchsamapparat/shopping-cart-common";

describe('shoppingCartUtil', () => {
    describe('shoppingCartIsEmpty', () => {

        it('returns false if the shopping cart has shopping cart items', () => {
            const shoppingCart: ShoppingCart = {
                items: [{
                    description: '',
                    name: '',
                    price: 1,
                    product: '',
                    quantity: 1
                }],
                totalPrice: 1
            };

            expect(shoppingCartIsEmpty(shoppingCart)).toBe(false);
        });

        it('returns true if the shopping cart has no shopping cart items', () => {
            const shoppingCart: ShoppingCart = {
                items: [],
                totalPrice: 0
            };

            expect(shoppingCartIsEmpty(shoppingCart)).toBe(true);
        });

        it('returns true if null is given', () => {
            expect(shoppingCartIsEmpty(null)).toBe(true);
        });

    });
});
