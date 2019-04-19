const request = require("supertest");
const { app } = require("../../../src/server/app");
const { isValid } = require("../../../src/shared/validator"); 



let counter = 0; 


const getLoggedInAgent = async () => {

	const agent = await request.agent(app);
	let response = await agent
		.post("/api/signup")
		.send({
			username: ("foo_" + counter++),
			password: "bar"
		})
		.set("Content-Type", "application/json");

	expect(response.statusCode).toBe(201);
	return agent; 
};

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

	return response;
};


const resourceExists = async (id) => {

	const response = await request(app)
		.get("/api/dishes/" + id)
		.send(); 

	if (response.statusCode === 200) return true; 
	else if (response.statusCode === 404) return false;  
	else throw "Neihter 200 or 404. This should not happen."; 
}; 

describe("the dish-api.", () => {

	it("retrieves status code 200 when asking for dishes", async () => {

		const response = await request(app)
			.get("/api/dishes")
			.send();

		expect(response.statusCode).toBe(200);
	});

	it("retrieves all dishes", async () => {

		const response = await request(app)
			.get("/api/dishes")
			.send();
            
		//expect the demo data to be present 
		expect(response.body.length).toEqual(10);
	});

	it("retrieves dish by id", async () => {

		const agent = await getLoggedInAgent(); 

		const name = "Test Dish Name";
		let response = await agent
			.post("/api/dishes")
			.set("Content-Type", "application/json")
			.send({
				name, 
				price: 2, 
				allergies: [], 
				info: "some info"
			}); 
        
        
		const id = response.body.id;    
		const path = "/api/dishes/" + id;
        
		response = await request(app)
			.get(path)
			.send();

		const dish = response.body;


		expect(response.statusCode).toBe(200);
		expect(isValid.dish(dish)).toBe(true); 
		expect(dish.name).toEqual(name); 
	});

	it("lets user create dish", async () => {

		const agent = await getLoggedInAgent(); 
		const response = await createDishWith(agent); 

		expect(response.statusCode).toBe(201);
		expect(response.body.id).toBeDefined();
	});

	it("if creating while not logged in, returns 401", async () => {

		// NOTE: not logged in
		const agent = await request.agent(app);
		const response = await createDishWith(agent); 
        
		expect(response.statusCode).toBe(401); 
		
	});

	it("lets user update dish", async () => {

		const agent = await getLoggedInAgent(); 
		let response = await createDishWith(agent);
        
		const location = response.header.location; 
		const id = response.body.id;
		const newName = "NEW NAME";

		response = await agent
			.get("/api/dishes/" + id)
			.send();

		const dish = response.body;
	
		dish.name = newName; 

		response = await agent
			.put(location)
			.send(dish)
			.set("Content-Type", "application/json");

		expect(response.statusCode).toBe(204); 
        
		// Retrieve it again to see if the new name was stored 
		response = await agent 
			.get("/api/dishes/" + id)
			.send(); 

		expect(response.body.name).toEqual(newName); 
	});

	it("if updating while not logged in, returns 401", async () => {

		const loggedInAgent = await getLoggedInAgent();
		const postResponse = await createDishWith(loggedInAgent);
		const location = postResponse.header.location;
		const id = postResponse.body.id;

		// NOTE: not logged in
		const loggedOutAgent = await request.agent(app);
        
		const getResponse = await loggedOutAgent
			.get("/api/dishes/" + id)
			.send();

		expect(getResponse.statusCode).toBe(200);

		const newName = "NEW NAME";
		const dish = getResponse.body;
		dish.name = newName;

		const putResponse = await loggedOutAgent
			.put(location)
			.send(dish)
			.set("Content-Type", "application/json");

		expect(putResponse.statusCode).toBe(401);
	});

	it("returns 404 if getting non-existent dish", async () => {

		const response = await request(app)
			.get("/api/dishes/NON-EXISTING")
			.send(); 

		expect(response.statusCode).toBe(404); 
	});
    
	it("can delete data", async () => {

		const agent = await getLoggedInAgent();
		const postResponse = await createDishWith(agent);
		const id = postResponse.body.id;

		const existsBeforeDeleting = await resourceExists(id); 
		expect(existsBeforeDeleting).toBe(true); 

		const deleteResponse = await agent
			.delete("/api/dishes/" + id)
			.send(); 
            
		expect(deleteResponse.statusCode).toBe(204); 
        
		const existsAfterDeleting = await resourceExists(id);
		expect(existsAfterDeleting).toBe(false);
	});

	it("returns 404 if deleting non-existent dish", async () => {

		const agent = await getLoggedInAgent(); 
		const deleteResponse = await agent
			.delete("/api/dishes/NON-EXISTING")
			.send();
            
		expect(deleteResponse.statusCode).toBe(404); 
	});
    
	it("Fails to delete when not logged in.", async () => {


		const loggedInAgent = await getLoggedInAgent();
		let postResponse = await createDishWith(loggedInAgent);
		const id = postResponse.body.id;

		// NOTE: not logged in
		const loggedOutAgent = await request.agent(app);

		const existsBefore = await resourceExists(id);
		expect(existsBefore).toBe(true);

		const deleteResponse = await loggedOutAgent
			.delete("/api/dishes/" + id)
			.send(); 
        
		const existsAfter = await resourceExists(id);
		expect(existsAfter).toBe(true);
		expect(deleteResponse.statusCode).toBe(401);
	}); 
    
});