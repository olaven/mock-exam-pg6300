const request = require("supertest");

const { app } = require("../../../src/server/app");
const { isValid } = require("../../../src/shared/validator");
const { day } = require("../../../src/shared/day");

describe("the dish-api.", () => {

	it("retrieves status code 200 when asking for menus", async () => {

		const response = await request(app)
		    .get("/api/menus")
			.send();

		expect(response.statusCode).toBe(200);
	});
    
	it("retrieves some menus", async () => {

		const response = await request(app)
			.get("/api/menus")
			.send();

		// assuming demo-data
		expect(response.body.length).toBeGreaterThan(1); 
	});
});