describe("Test", () => {
  it("OrangeHRMTest", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    // cy.get(".oxford").type("admin");
    // cy.get("#txtPassword").type("admin123");
    cy.get("input[name='username']").type("Admin");
    cy.get("input[name='password']").type("admin123");
    cy.get('button[type="submit"]').click();

    // go to admin section
    cy.contains("Admin").click();
    cy.get(".oxd-autocomplete-text-input > input").type("Tim");
    cy.wait(3000);
    cy.get(".oxd-autocomplete-option span").each(($el, index, list) => {
      if ($el.text() == "Timothy Lewis Amiano") {
        cy.wrap($el).click();
      }
    });
  });
});
