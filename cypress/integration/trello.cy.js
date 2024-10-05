require("dotenv").config();

describe("Test suite", () => {
  const base_url = "https://api.trello.com";
  const api_key = process.env.TRELLO_API_KEY;
  const api_token = process.env.TRELLO_API_TOKEN;
  const board_name = process.env.TRELLO_BOARD_NAME;
  let id;

  // Create a new Trello board
  it("Creating a new Trello Board", () => {
    cy.request({
      method: "POST",
      url: `${base_url}/1/boards/`,
      qs: {
        name: board_name,
        key: api_key,
        token: api_token,
      },
    }).then((response) => {
      const res = response.body;
      id = res.id;
      expect(response.status).to.eq(200);
      cy.log("Board ID:", id);
    });
  });

  // Get board details
  it("Fetching the board details", () => {
    cy.request({
      method: "GET",
      url: `${base_url}/1/boards/${id}`,
      qs: {
        key: api_key,
        token: api_token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log("Board Details:", response.body);
    });
  });

  // Update the board's name
  it("Updating the board name", () => {
    cy.request({
      method: "PUT",
      url: `${base_url}/1/boards/${id}`,
      qs: {
        name: "Cosmos Updated",
        key: api_key,
        token: api_token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq("Cosmos Updated");
    });
  });

  // Add a list to the board
  it("Creating a list in the board", () => {
    cy.request({
      method: "POST",
      url: `${base_url}/1/lists`,
      qs: {
        name: "To-Do",
        idBoard: id,
        key: api_key,
        token: api_token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log("List Created:", response.body);
    });
  });

  // Delete the board
  it("Deleting the Trello Board", () => {
    cy.request({
      method: "DELETE",
      url: `${base_url}/1/boards/${id}`,
      qs: {
        key: api_key,
        token: api_token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
