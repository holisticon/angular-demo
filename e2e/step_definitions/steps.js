const { I } = inject();

Given('I am on the homepage', () => {
    I.amOnPage('/')
});

When('I enter {string} in the {string} field', (queryString, fieldLabel) => {
    I.fillField(`input[placeholder="${fieldLabel}"`, queryString)
});

When('I leave the {string} field empty', (fieldLabel) => {
    // From "features\catalog_search.feature" {"line":14,"column":5}
    I.fillField(`input[placeholder="${fieldLabel}"`, '')
});

When('I click {string}', (buttonLabel) => {
    I.click(buttonLabel);
});

Then('I am redirected to a page with search results', () => {
    I.seeInCurrentUrl('/products');
    I.see('Search Results', 'h1');
});

Then('all search results contain {string}', (queryString) => {
    I.seeInEach({ css: 'ngxp-product-list-entry h2 > a' }, queryString);
});

Then('I get {int} search results', (searchResultSize) => {
    // From "features\catalog_search.feature" {"line":17,"column":5}
    I.seeNumberOfElements('ngxp-product-list-entry', searchResultSize);
});

Then('the search results contain all products', () => {
    // From "features\catalog_search.feature" {"line":18,"column":5}
    I.seeNumberOfElements('ngxp-product-list-entry', 30);
});
