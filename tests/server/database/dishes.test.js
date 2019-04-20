const dishes = require("../../../src/server/database/dishes");
const { allergy } = require("../../../src/shared/allergy");

// id, name, price, allergies, info
const getTestDish = () => {

	return {
		name: "pancakes",
		price: 20,
		allergies: [allergy.DAIRY, allergy.GLUTEN],
		info: "Delicious pancakes for everyone!"
	};
};

const createTestDish = () => {

	const dish = getTestDish(); 
	const id = dishes.create(dish);
	return id;
};

describe("The Dish-database", () => {

	beforeEach(() => {

		dishes.clear();
	});

	it("can create new dishes", () => {

		const dish = getTestDish(); 
		const id = dishes.create(dish); 
		const retrieved = dishes.retrieve(id);

		expect(retrieved.id).toEqual(id);
		expect(retrieved.name).toEqual(dish.name);
		expect(retrieved.price).toEqual(dish.price);
		expect(retrieved.allergies).toEqual(dish.allergies);        
	});
    
	it("gives id to stored dishes", () => {

		const dish = getTestDish(); 
		expect(dish.id).toBeUndefined();

		const id = dishes.create(dish); 
		const retrieved = dishes.retrieve(id);

		expect(retrieved.id).toBeDefined(); 
	});
 
	it("can update dish", () => {

		const updateName = "UPDATED NAME FOR PANCAKES!";
		const id = createTestDish(); 
		const original = dishes.retrieve(id);

		original.name = updateName;
		dishes.update(original);
		
		const updated = dishes.retrieve(id);
		expect(updated.name).toEqual(updateName);
	});

	it("throws error if when udpating, if ID does not exist", () => {

		const dish = getTestDish(); 
		dish.id = "NONEXISTENT_ID";

		expect(() => {
			dishes.update(dish);
		}).toThrow("cannot update dish that doesn't exist"); 
	});

	it("can delete dishes", () => {

		const id = createTestDish(); 
		const before = dishes.retrieve(id);

		dishes.remove(id);
		const after = dishes.retrieve(id);

		expect(before).toBeDefined();
		expect(after).toBeUndefined(); 
	});
});
