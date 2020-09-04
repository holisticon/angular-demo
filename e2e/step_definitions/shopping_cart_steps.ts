const { I } = inject();

Given('the shopping cart is empty', async () => {
    I.amOnPage('/shopping-cart');

    const placeOrderButtonVisible = (await I.grabNumberOfVisibleElements({ css: 'button.place-order' }) === 1);
    if (placeOrderButtonVisible) {
        I.click('Place Order');
    }
});

Then('the shopping cart contains an item with quantity {int}', (quantity: number) => {
    I.amOnPage('/shopping-cart');
    I.seeInField({ css: 'input[title="Quantity"]' }, quantity.toString());
});

Then('I am redirected to the shopping cart page', () => {
    I.seeInCurrentUrl('/shopping-cart');
    I.see('Shopping Cart', 'h1');
});

export { };

