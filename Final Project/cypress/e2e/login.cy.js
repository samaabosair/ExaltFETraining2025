describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should login as normal user and see sidebar", () => {
    // Type normal user credentials
    cy.get("input[type=email]").type("normal@normal.com");
    cy.get("input[type=password]").type("normal123");
    cy.get("button[type=submit]").click();

    // Assert redirected to /main
    cy.url().should("include", "/main");
    // Normal user should see sidebar (history tab for example)
    cy.contains("History").should("exist");
        cy.wait(4000);

  });

  it("should login as admin and NOT see sidebar", () => {
    // Type admin credentials
    cy.get("input[type=email]").type("admin@admin.com");
    cy.get("input[type=password]").type("admin123");
    cy.get("button[type=submit]").click();

    // Assert redirected to /main
    cy.url().should("include", "/main");

    // Admin should NOT see sidebar
    cy.contains("History").should("not.exist");
             cy.wait(4000);

  });

  it("should show error for wrong credentials", () => {
    // Type invalid credentials
    cy.get("input[type=email]").type("wrong@wrong.com");
    cy.get("input[type=password]").type("wrongpass");
    cy.get("button[type=submit]").click();

    // Assert error message is displayed
    cy.contains("Login failed").should("exist");
  });
});
