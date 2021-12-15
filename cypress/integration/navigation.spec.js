/* eslint-disable no-undef */

describe('Navigation', () => {
  it('should visit root', () => {
    cy.visit('/');
  });

  it('should navigate to Tuesday', () => {
    // visit app
    cy.visit('/');

    // click on Tuesday button
    cy.get('li').contains('Tuesday').click();

    cy.contains('li', 'Tuesday').should(
      'have.css',
      'background-color',
      'rgb(242, 242, 242)'
    );
  });
});
