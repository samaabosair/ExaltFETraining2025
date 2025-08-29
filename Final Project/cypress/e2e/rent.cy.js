describe('Rent a Car', () => {
  it('should open rent modal and select dates', () => {
    cy.visit('/');
    cy.get('.card').first().click();
    cy.contains('Rent').click();

    cy.get('.modal').should('be.visible');
    cy.get('input[name="startDate"]').type('2025-09-01');
    cy.get('input[name="endDate"]').type('2025-09-05');

    cy.contains('Confirm').click();
    cy.contains('Rental History'); 
  });
});
