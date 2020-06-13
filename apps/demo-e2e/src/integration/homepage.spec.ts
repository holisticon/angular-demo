import { getTitle } from '../support/app.po';

describe('homepage', () => {
    beforeEach(() => cy.visit('/'));

    it('displays a welcome message', () => {
        getTitle().contains('Welcome');
    });

    // it('displays a catalog search form', () => {
    //     getTitle().contains('Welcome');
    // });
});
