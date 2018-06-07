import { ShoppingCart, shoppingCartIsEmpty } from '@luchsamapparat/shopping-cart-common';
import { ShoppingCartIsEmptyPipe } from './shopping-cart-is-empty.pipe';

describe('ShoppingCartIsEmptyPipe', () => {
    let pipe: ShoppingCartIsEmptyPipe;

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

    const emptyShoppingCart: ShoppingCart = {
        items: [],
        totalPrice: 0
    };

    beforeEach(() => {
        pipe = new ShoppingCartIsEmptyPipe();
    });

    it('delegates to the shoppingCartIsEmpty utility method', () => {
        [
            null,
            shoppingCart,
            emptyShoppingCart
        ]
            .forEach(value => {
                expect(pipe.transform(value)).toBe(shoppingCartIsEmpty(value));

            });
    });

});
