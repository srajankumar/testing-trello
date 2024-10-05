describe("API Test Suite", () => {
  const base_url = "https://reqres.in/api";

  // Test retrieval of a list of users
  it("Retrieve a list of users", () => {
    cy.request("GET", `${base_url}/users`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data").and.to.be.an("array");
      // Additional structure validation
      response.body.data.forEach((user) => {
        expect(user).to.have.all.keys(
          "id",
          "email",
          "first_name",
          "last_name",
          "avatar"
        );
      });
    });
  });

  // Test retrieval of a single user by ID
  it("Retrieve a single user by ID", () => {
    cy.request("GET", `${base_url}/users/2`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.have.all.keys(
        "id",
        "email",
        "first_name",
        "last_name",
        "avatar"
      );
    });
  });

  // Test retrieving a user with an invalid ID
  it("Retrieve single user with invalid ID", () => {
    cy.request({
      method: "GET",
      url: `${base_url}/users/999`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      cy.log("User Response Body:", JSON.stringify(response.body));
      expect(response.body).to.be.empty; // Check if the response body is empty
    });
  });

  // Test retrieval of a list of resources
  it("Retrieve a list of resources", () => {
    cy.request("GET", `${base_url}/unknown`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data").and.to.be.an("array");
      response.body.data.forEach((resource) => {
        expect(resource).to.have.all.keys(
          "id",
          "name",
          "year",
          "color",
          "pantone_value"
        );
      });
    });
  });

  // Test retrieving a single resource by ID
  it("Retrieve a single resource by ID", () => {
    cy.request("GET", `${base_url}/unknown/2`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.have.all.keys(
        "id",
        "name",
        "year",
        "color",
        "pantone_value"
      );
    });
  });

  // Test retrieving a resource with an invalid ID
  it("Retrieve single resource with invalid ID", () => {
    cy.request({
      method: "GET",
      url: `${base_url}/unknown/999`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      cy.log("Resource Response Body:", JSON.stringify(response.body));
      expect(response.body).to.be.empty; // Check if the response body is empty
    });
  });

  // Test creating a new user
  it("Create a new user", () => {
    cy.request({
      method: "POST",
      url: `${base_url}/users`,
      body: {
        name: "John Doe",
        job: "Developer",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.all.keys("name", "job", "id", "createdAt");
    });
  });

  // Test updating a user with PUT
  it("Update user data with PUT", () => {
    cy.request({
      method: "PUT",
      url: `${base_url}/users/2`,
      body: {
        name: "Jane Doe",
        job: "Senior Developer",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.all.keys("name", "job", "updatedAt");
      expect(response.body.name).to.eq("Jane Doe");
    });
  });

  // Test updating a user with PATCH
  it("Update user data with PATCH", () => {
    cy.request({
      method: "PATCH",
      url: `${base_url}/users/2`,
      body: {
        job: "Lead Developer",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.all.keys("job", "updatedAt");
      expect(response.body.job).to.eq("Lead Developer");
    });
  });

  // Test deleting a user
  it("Delete a user", () => {
    cy.request({
      method: "DELETE",
      url: `${base_url}/users/2`,
    }).then((response) => {
      expect(response.status).to.eq(204);
      expect(response.body).to.be.empty; // No content should be returned
    });
  });

  // Test successful registration
  it("Register a new user - Successful", () => {
    cy.request({
      method: "POST",
      url: `${base_url}/register`,
      body: {
        email: "eve.holt@reqres.in",
        password: "pistol",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id");
      expect(response.body).to.have.property("token");
    });
  });

  // Test unsuccessful registration
  it("Register a new user - Unsuccessful", () => {
    cy.request({
      method: "POST",
      url: `${base_url}/register`,
      body: {
        email: "sydney@fife.com",
        // Missing password
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("error");
      expect(response.body.error).to.eq("Missing password");
    });
  });

  // Test successful login
  it("Login - Successful", () => {
    cy.request({
      method: "POST",
      url: `${base_url}/login`,
      body: {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
    });
  });

  // Test unsuccessful login
  it("Login - Unsuccessful", () => {
    cy.request({
      method: "POST",
      url: `${base_url}/login`,
      body: {
        email: "peter@klaven",
        // Missing password
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("error");
      expect(response.body.error).to.eq("Missing password");
    });
  });

  // Test delayed response
  it("Delayed Response", () => {
    cy.request({
      method: "GET",
      url: `${base_url}/users?delay=3`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data").and.to.be.an("array");
      // Validate structure
      response.body.data.forEach((user) => {
        expect(user).to.have.all.keys(
          "id",
          "email",
          "first_name",
          "last_name",
          "avatar"
        );
      });
    });
  });
});
