const { I } = inject();

Given('I am on the search results page', () => {
    I.amOnPage('/');
    I.click('Catalog');
});

When('I click {string} for the first product', (buttonLabel: string) => {
    const firstProduct = locate('ngxp-product-list-entry').first();
    I.waitForElement(firstProduct);
    within(firstProduct, () => {
        I.click(buttonLabel);
    });
});

Then('I am redirected to the search results page', () => {
    I.seeInCurrentUrl('/products');
    I.see('Search Results', 'h1');
});

Then('all search results contain {string}', (queryString: string) => {
    I.seeInEach(
        locate('a')
            .inside('h2')
            .inside('ngxp-product-list-entry'),
        queryString
    );
});

Then('I get {int} search results', (searchResultSize: number) => {
    I.seeNumberOfElements('ngxp-product-list-entry', searchResultSize);
});

Then('the search results contain all products', () => {
    I.seeNumberOfElements('ngxp-product-list-entry', 30);
});

export { };

