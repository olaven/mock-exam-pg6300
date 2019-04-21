const nanoid = require("nanoid");
const { allergy } = require("../../../src/shared/allergy");
const { day } = require("../../../src/shared/day");

const demoDishes = [
	{
		id: nanoid(),
		name: "pancakes",
		price: 10,
		allergies: [allergy.DAIRY, allergy.GLUTEN],
		info: "Pancakes with jam, sugar and brown cheese!"
	},
	{
		id: nanoid(),
		name: "lasagne",
		price: 10,
		allergies: [allergy.GLUTEN],
		info: "Homemade lasagne with aubergine."
	},
	{
		id: nanoid(),
		name: "sushi",
		price: 25,
		allergies: [allergy.FISH, allergy.SOY],
		info: "Sushi with tuna, salmon and avocado."
	},
	{
		id: nanoid(),
		name: "Spicy meatballs",
		price: 15,
		allergies: [allergy.SOY],
		info: "Meatballs with homemade sauce. Optional pasta on the side."
	},
	{
		id: nanoid(),
		name: "Spagetthi",
		price: 10,
		allergies: [allergy.DAIRY, allergy.GLUTEN],
		info: "Spagetthi served with grated parmesan and oregano-sauce."
	},
	{
		id: nanoid(),
		name: "Fried cod with potatoes",
		price: 15,
		allergies: [allergy.FISH],
		info: "Served with vegetables and Béchamel sauce."
	},
	{
		id: nanoid(),
		name: "Chocolate cake",
		price: 20,
		allergies: [allergy.DAIRY, allergy.GLUTEN],
		info: "Because every day shouldn't be healthy!"
	},
	{
		id: nanoid(),
		name: "Onion soup",
		price: 10,
		allergies: [],
		info: "Homemade, traditional onion soup."
	},
	{
		id: nanoid(),
		name: "Grilled chicken",
		price: 20,
		allergies: [],
		info: "Served with rice and boiled vedgetables!"
	},
	{
		id: nanoid(),
		name: "Pizza",
		price: 20,
		allergies: [allergy.DAIRY, allergy.GLUTEN],
		info: "Various pizzas!"
	}
]; 

const demoMenuItems = [
	{
		dishId: demoDishes[0].id, 
		day: day.MONDAY
	},
	{
		dishId: demoDishes[1].id, 
		day: day.TUESDAY
	},
	{
		dishId: demoDishes[2].id,
		day: day.WEDNESDAY
	},
	{
		dishId: demoDishes[3].id,
		day: day.THURSDAY
	},
	{
		dishId: demoDishes[4].id,
		day: day.FRIDAY
	},
	{
		dishId: demoDishes[5].id,
		day: day.SATURDAY
	},
	{
		dishId: demoDishes[6].id,
		day: day.SUNDAY
	}
]; 

const addDemoMenuItems = database => {
	
	demoMenuItems.forEach(menuItem => {
		database.set(menuItem.id, menuItem); 
	}); 
}; 

const addDemoDishes = database => {

	demoDishes.forEach(dish => {
		database.set(dish.id, dish); 
	}); 
};


module.exports = {
	addDemoDishes, 
	addDemoMenuItems
};