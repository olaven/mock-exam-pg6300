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
		id: nanoid(),
		dishId: demoDishes[0], 
		day: day.MONDAY
	},
	{
		id: nanoid(),
		dishId: demoDishes[1], 
		day: day.TUESDAY
	},
	{
		id: nanoid(),
		dishId: demoDishes[2],
		day: day.WEDNESDAY
	},
	{
		id: nanoid(),
		dishId: demoDishes[3],
		day: day.THURSDAY
	},
	{
		id: nanoid(),
		dishId: demoDishes[4],
		day: day.FRIDAY
	},
	{
		id: nanoid(),
		dishId: demoDishes[5],
		day: day.SATURDAY
	},
	{
		id: nanoid(),
		dishId: demoDishes[6],
		day: day.SUNDAY
	}
]; 

const addDemoMenuItems = database => {
	
	demoDishes.forEach(menuItem => {
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