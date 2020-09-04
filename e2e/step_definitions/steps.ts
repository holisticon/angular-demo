const { I } = inject();

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

export { };

