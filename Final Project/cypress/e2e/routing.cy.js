describe("Routing", () => {
  it("should redirect unauthenticated user to login", () => {
    cy.visit("/main");
    cy.url().should("include", "/");
    cy.contains("Login");
  });

  it("should navigate between pages for user", () => {
    cy.visit("/");
    cy.get("input[type=email]").type("normal@normal.com");
    cy.get("input[type=password]").type("normal123");
    cy.get("button[type=submit]").click();

    cy.contains("History").click();
    cy.url().should("include", "/main");
    cy.contains("Rental History");
  });
});
