import '@percy/cypress'

const ROOT_URL = 'https://oss-uat.clients.squiz.net'

describe('Homepage snapshot', function() {
    it('Loads the homepage', function() {
        cy.visit(ROOT_URL);
        cy.percySnapshot();
    });
});

describe('Search page snapshot', function() {
    it('Loads the Search page', function() {
        cy.visit(`${ROOT_URL}/search`);
        cy.percySnapshot();
    });
});

describe('Services page snapshot', function() {
    it('Loads the Services page', function() {
        cy.visit(`${ROOT_URL}/services`);
        cy.percySnapshot();
    });
});
