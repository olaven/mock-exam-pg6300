const request = require("supertest");

const { app } = require("../../../src/server/app");
const { getLoggedInAgent } = require("../../mytest-utils");
const { isValid } = require("../../../src/shared/validator");
const { day } = require("../../../src/shared/day");

const createDishWith = async (agent) => {

	const response = await agent
		.post("/api/dishes")
		.set("Content-Type", "application/json")
		.send({
			name: "Some test name",
			price: 2,
			allergies: [],
			info: "some info"
		});

	return response.body.id;
};

const createMenuOn = async day => {

	const agent = await getLoggedInAgent(app);
	const dishId = await createDishWith(agent);

	const response = await agent
		.post("/api/menus")
		.send({
			dishId,
			day
		});

	return response; 
}

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

	it("retrieves menu on a given day", async () => {

		await createMenuOn(day.MONDAY);
		const path = "/api/menus/" + day.MONDAY;
		const response = await request(app)
			.get(path)
			.send();

		expect(response.statusCode).toBe(200);
		expect(isValid.menuItem(response.body)).toBe(true);
	});

	it("returns 400 if day is not valid", async () => {

		const response = await createMenuOn("INVALID DAY");
		expect(response.statusCode).toBe(400);
	});
});