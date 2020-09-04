const { I } = inject();

Given('I am on the product details page', () => {
    I.amOnPage('/');
    I.click('Catalog');
    I.click('Handcrafted Steel Mouse');
});

export { };

