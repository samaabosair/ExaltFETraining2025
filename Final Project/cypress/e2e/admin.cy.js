describe("Admin Flow", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("input[type=email]").type("admin@admin.com");
    cy.get("input[type=password]").type("admin123");
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/main");
  cy.wait(3000);
  });

  it("should see cars list", () => {
    cy.get(".card").should("exist");
  });

  it("should add a new car", () => {
    cy.contains("+").click();
    cy.get(".modal").within(() => {
      cy.get("input").eq(0).type("Test Car");
      cy.get("input").eq(1).type("100");
      cy.get("textarea").type("This is a test car description.");
      cy.get("input[placeholder='Enter image URL']").type("https://www.mbusa.com/content/dam/mb-nafta/us/bodystyle-class-thumbnails/XXL-BODYSTYLELANDING-SEDAN-EQS.jpg");
      cy.contains("Add Car").click();
    });
    cy.contains("Test Car").should("exist");
  });

  it("should edit a car with all fields", () => {
    cy.contains("Test Car").click(); 
    cy.contains("Edit").should("exist").click();

    cy.get(".modal").within(() => {
      cy.get("input").first().clear().type("Edited Car");
      cy.get("input[type=number]").clear().type("150");
      cy.get("textarea").clear().type("Updated description for the edited car.");

      cy.get("select").select("Unavailable");

      cy.contains("+ Add another image").click();
      cy.get("input[placeholder='Enter image URL']").last()
        .type("https://www.mbusa.com/content/dam/mb-nafta/us/myco/my24/bodystyles/sedans-and-wagons/XXL-BODYSTYLELANDING-E-SEDAN.jpg");

      cy.get("button").contains("Remove").last().click();

      cy.wait(500);

      cy.contains("Update Car").click();
    });

    cy.contains("Edited Car").should("exist");
    cy.contains("unavailable").should("exist");
          cy.wait(1000);
  });

  it("should delete a car", () => {
    cy.contains("Edited Car").click();
    cy.contains("Delete").click();
    cy.contains("Edited Car").should("not.exist");
  });
});
