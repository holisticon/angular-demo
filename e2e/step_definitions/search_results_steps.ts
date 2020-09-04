const { I } = inject();

Given('I am on the search results page', () => {
    I.amOnPage('/products');
});

When('I click {string} for the first product', (buttonLabel: string) => {
    // TODO
    I.click(buttonLabel);
});

Then('I am redirected to the search results page', () => {
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

export { };

