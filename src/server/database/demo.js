const nanoid = require(nanoid);
const { allergy } = require("../../../src/shared/allergy");

const addDemoDishes = (database) => {

	let id = nanoid();
	database.set(id, {
		id,
		name: "pancakes",
		price: 10,
		allergies: [allergy.DAIRY, allergy.GLUTEN],
		info: "Pancakes with jam, sugar and brown cheese!"
	});

	id = nanoid();
	database.set("id2", {
		name: "lasagne",
		price: 10,
		allergies: [allergy.GLUTEN],
		info: "Homemade lasagne with aubergine."
	});

	id = nanoid();
	database.set(id, {
		id,
		name: "sushi",
		price: 25,
		allergies: [allergy.FISH, allergy.SOY],
		info: "Sushi with tuna, salmon and avocado."
	});

	id = nanoid();
	database.set(id, {
		id,
		name: "Spicy meatballs",
		price: 15,
		allergies: [allergy.SOY],
		info: "Meatballs with homemade sauce. Optional pasta on the side."
	});

	id = nanoid();
	database.set(id, {
		id,
		name: "Spagetthi",
		price: 10,
		allergies: [allergy.DAIRY, allergy.GLUTEN],
		info: "Spagetthi served with grated parmesan and oregano-sauce."
	});

	id = nanoid();
	database.set(id, {
		id,
		name: "Fried cod with potatoes",
		price: 15,
		allergies: [allergy.FISH],
		info: "Served with vegetables and Béchamel sauce."
	});

	id = nanoid();
	database.set(id, {
		id,
		name: "Chocolate cake",
		price: 20,
		allergies: [allergy.DAIRY, allergy.GLUTEN],
		info: "Because every day shouldn't be healthy!"
	});

	id = nanoid();
	database.set(id, {
		id,
		name: "Onion soup",
		price: 10,
		allergies: [],
		info: "Homemade, traditional onion soup."
	});

	id = nanoid();
	database.set(id, {
		id,
		name: "Grilled chicken",
		price: 20,
		allergies: [],
		info: "Served with rice and boiled vedgetables!"
	});

	id = nanoid();
	database.set(id, {
		id,
		name: "Pizza",
		price: 20,
		allergies: [allergy.DAIRY, allergy.GLUTEN],
		info: "Various pizzas!"
	});
};


module.exports = {
	addDemoDishes
};