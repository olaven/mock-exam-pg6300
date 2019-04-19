const request = require("supertest");
const { app } = require("../../../src/server/app");

describe("the dish-api.", () => {

	it("retrieves status code 200 when asking for dishes", async () => {

		const response = await request(app)
			.get("/dishes")
			.send();

		expect(response.statusCode).toBe(200);
	});

	it("retrieves all dishes", async () => {

		const response = await request(app)
		    .get("/dishes")
		    .send();
            
		//some data is retrieved 
		expect(response.body).toBeGreaterThan(1);
	});

	it("retrieves dish by id", async () => {

		expect(true).toBe(false);
	});

	it("lets user create dish", async () => {

		expect(true).toBe(false);
	});

	it("if creating while not logged in, returns 403", async () => {

		expect(true).toBe(false);
	});

	it("lets user update dish", async () => {

		expect(true).toBe(false);
	});

	it("if updating while not logged in, returns 403", async () => {

		expect(true).toBe(false);
	});

	it("returns 404 if getting non-existent dish", async () => {

		expect(true).toBe(false);
	});

	it("returns 404 if deleting non-existent dish", async () => {

		expect(true).toBe(false);
	});
    
});