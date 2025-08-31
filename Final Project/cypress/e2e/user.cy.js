describe("Normal User Flow", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("input[type=email]").type("normal@normal.com");
    cy.get("input[type=password]").type("normal123");
    cy.get("button[type=submit]").click();
    cy.url({ timeout: 10000 }).should("include", "/main");
  });

  it("should open available car details and see Rent button only", () => {
    cy.get('.card[data-status="available"]').first().click();
    cy.wait(2000);
    cy.contains("Edit").should("not.exist");
    cy.contains("Delete").should("not.exist");
    cy.contains("Rent").should("exist");
  });


    it("should rent an available car and update status in main list", () => {
    cy.get('.card[data-status="available"]').first().click();
    cy.url({ timeout: 10000 }).should('include', '/car/');
    cy.contains("Rent Now").click();

    cy.get(".modal").within(() => {
      cy.get("input[type=date]").eq(0).type("2025-08-31");
      cy.get("input[type=date]").eq(1).type("2025-09-03");
      cy.contains("Confirm").click();
    });

    cy.wait(1500);
    cy.visit("/main");
    cy.get('.card').first().should('have.attr', 'data-status', 'unavailable');
    cy.get('.card').first().trigger('mouseover');
    cy.get('.tooltip').should('contain.text', 'Not Available');
  });


  it("should not open unavailable car and show tooltip", () => {
    cy.get('.card[data-status="unavailable"]').first().trigger('mouseover');
    cy.get('.tooltip').should('contain.text', 'Not Available');

    cy.get('.card[data-status="unavailable"]').first().click();
    cy.url().should('include', '/main'); 
  });

  it("should allow booking if dates do not overlap", () => {
    cy.get('.card[data-status="available"]').first().click();
    cy.url({ timeout: 10000 }).should('include', '/car/');
    cy.contains("Rent Now").click();

    cy.get(".modal").within(() => {
   cy.get("input[type=date]").eq(0).type("2025-09-09");
      cy.get("input[type=date]").eq(1).type("2025-09-10");
      cy.contains("Confirm").click();
    });

    cy.wait(1500);
    cy.visit("/main");
    cy.get('.card').first().should('have.attr', 'data-status', 'unavailable');
  });
});
