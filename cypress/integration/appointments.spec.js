/* eslint-disable no-undef */

describe('Appointment', () => {
  beforeEach(() => {
    // reset database
    cy.request('GET', '/api/debug/reset');
    cy.visit('/');
  });

  it('should book an interview', () => {
    // go to Tuesday
    cy.contains('li', 'Tuesday').click();

    // click add button on the first slot of Tuesday
    cy.get('[alt=Add]').eq(0).click();

    // input student's name
    cy.get('[data-testid=student-name-input]').type('Lydia Miller-Jones');

    // choose interviewer
    cy.get("[alt='Sylvia Palmer']").click();

    // click save
    cy.contains('Save').click();

    // appointment has been made
    cy.contains('.appointment__card--show', 'Lydia Miller-Jones').should(
      'exist'
    );
    cy.contains('.appointment__card--show', 'Sylvia Palmer').should('exist');
  });

  it('should edit an interview', () => {
    // go to Monday
    cy.contains('li', 'Monday').click();

    // click eidt button on the first appointment of Monday
    cy.get('[alt=Edit]').click({ force: true });

    // change student's name
    cy.get('[data-testid=student-name-input]').clear().type('JefFoo');
    // choose interviewer
    cy.get("[alt='Tori Malcolm']").click();

    // click save
    cy.contains('Save').click();

    // appointment has been made
    cy.contains('.appointment__card--show', 'JefFoo').should('exist');
    cy.contains('.appointment__card--show', 'Tori Malcolm').should('exist');
  });

  it('should delete an interview', () => {
    // go to Monday
    cy.contains('li', 'Monday').click();

    // click eidt button on the first appointment of Monday
    cy.get('[alt=Delete]').click({ force: true });

    // click confirm
    cy.contains('button', 'Confirm').click();

    // appointment has been deleted
    cy.contains('.appointment__card--show', 'Lydia Miller-Jones').should(
      'not.exist'
    );
    cy.contains('.appointment__card--show', 'Sylvia Palmer').should(
      'not.exist'
    );
  });
});
