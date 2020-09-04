const { I } = inject();

Given('the shopping cart is empty', async () => {
    I.amOnPage('/');
    I.click('Shopping Cart');

    const placeOrderButton = locate('button').withText('Place Order');

    const placeOrderButtonVisible = (await I.grabNumberOfVisibleElements(placeOrderButton) === 1);

    if (placeOrderButtonVisible) {
        I.click(placeOrderButton);
    }
});

Then('the shopping cart contains an item with quantity {int}', (quantity: number) => {
    I.amOnPage('/');
    I.click('Shopping Cart');

    I.seeInField('Update Quantity', quantity.toString());
});

Then('I am redirected to the shopping cart page', () => {
    I.seeInCurrentUrl('/shopping-cart');
    I.see('Shopping Cart', 'h1');
});

export { };

