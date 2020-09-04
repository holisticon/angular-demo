const { I } = inject();

When('I enter {string} in the {string} field', (value: string, label: string) => {
    I.fillField(label, value)
});

When('I leave the {string} field empty', (label: string) => {
    I.fillField(label, '')
});

When('I click {string}', (label: string) => {
    I.click(label);
});

export { };

