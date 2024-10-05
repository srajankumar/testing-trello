///<reference types='cypress'/>
///<reference types='@cypress/xpath'/>

describe("Test-collection", () => {
  // if i dont want to use cy.visit everytime, then use this:
  beforeEach("Visit website", () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
  });

  // afterEach("Logout", ()=>{
  //   // here perform logout function
  // })

  it("checkbox", () => {
    // cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    // for checking
    cy.get('input[name="checkBoxOption1"]').check();
    cy.get('input[name="checkBoxOption2"]').check();
    cy.get('input[name="checkBoxOption3"]').check();

    // for uncheck
    cy.get('input[name="checkBoxOption1"]').uncheck();
    cy.get('input[name="checkBoxOption2"]').uncheck();
    cy.get('input[name="checkBoxOption3"]').uncheck();

    // checking multiple options using arrays
    cy.get('[type="checkbox"]').check(["option1", "option2", "option3"]);
  });

  it("radioButton", () => {
    // cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.get('[type="radio"]').check(["radio1", "radio3"]);
  });

  it("dropdown", () => {
    // cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    // assertion (.should)
    cy.get("#dropdown-class-example")
      .select(["option3"])
      .should("have.value", "option3");
  });

  // it.only will runn only this test

  it("Dynamic-dropdown", () => {
    cy.get("#autocomplete").type("IND");
    cy.get(".ui-menu-item > div").each(($el, index, $list) => {
      if ($el.text() == "India") {
        cy.wrap($el).click();
      }
    });
    cy.get("#autocomplete").should("have.value", "India");
  });

  //  for alert thingie
  it("Alert", () => {
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal(
        "Hello , share this practice page and share your knowledge"
      );
    });

    cy.get("#alertbtn").click();
  });

  // for confirm button
  it.only("confirm btn", () => {
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("Hello , Are you sure you want to confirm?");
      return false;
    });
  });
});
