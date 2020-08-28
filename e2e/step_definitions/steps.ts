
const { I } = inject();

Given('I am on the homepage', () => {
    I.amOnPage('/');
});

When('I enter {string} in the {string} field', (queryString: string, fieldLabel: string) => {
    I.fillField(`input[title="${fieldLabel}"`, queryString)
});

When('I leave the {string} field empty', (fieldLabel: string) => {
    // From "features\catalog_search.feature" {"line":14,"column":5}
    I.fillField(`input[title="${fieldLabel}"`, '');
});

When('I click {string}', (buttonLabel: string) => {
    I.click(buttonLabel);
});

Then('I am redirected to a page with search results', () => {
    I.seeInCurrentUrl('/products');
    I.see('Search Results', 'h1');
});

Then('all search results contain {string}', (queryString: string) => {
    I.seeInEach({ css: 'ngxp-product-list-entry h2 > a' }, queryString);
});

Then('I get {int} search results', (searchResultSize: number) => {
    I.seeNumberOfElements('ngxp-product-list-entry', searchResultSize);
});

Then('the search results contain all products', () => {
    I.seeNumberOfElements('ngxp-product-list-entry', 30);
});

Given('the shopping cart is empty', async () => {
    I.amOnPage('/shopping-cart');

    const placeOrderButtonVisible = (await I.grabNumberOfVisibleElements({ css: 'button.place-order' }) === 1);
    if (placeOrderButtonVisible) {
        I.click({ css: 'button.place-order' });
    }
});

Given('I am on the search results page', () => {
    I.amOnPage('/products');
});

When('I click {string} for the first product', (buttonLabel: string) => {
    I.click(buttonLabel);
});

Then('the shopping cart contains an item with quantity {int}', (quantity: number) => {
    I.amOnPage('/shopping-cart');
    I.seeInField({ css: 'input[title="Quantity"]' }, quantity.toString());
});

Given('I am on the product details page', () => {
    I.amOnPage('/products');
    I.click('ngxp-product-list-entry h2 > a');
});
