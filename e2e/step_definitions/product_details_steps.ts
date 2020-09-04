const { I } = inject();

Given('I am on the product details page', () => {
    I.amOnPage('/products');
    I.click('ngxp-product-list-entry h2 > a');
});

export { };
