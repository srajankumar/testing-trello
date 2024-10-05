describe("Test-suite", () => {
  //collection of test cases
  it("login-test", () => {
    cy.visit("https://the-internet.herokuapp.com/login");
    // cy.get("input[name='username']").type
    // cy.get('input[id="username"]').type("tomsmith");
    //cy.get('input[id="password"]').type("SuperSecretPassword!");

    //using the id
    cy.get("#username").type("tomsmith");
    cy.get("#password").type("SuperSecretPassword!");

    //using the class
    // cy.get(".radius").click();
    cy.get('button[type="submit"]').click();
    // cy.get(".radius").click();

    //usijjng contains
    cy.contains("Logout").click();
  });
});
