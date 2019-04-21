const { allergy } = require("../../../src/shared/allergy");
const { day } = require("../../../src/shared/day");


const demoDishes = [
	{
		id: "pancake-id",
		name: "pancakes",
		price: 10,
		allergies: [allergy.DAIRY, allergy.GLUTEN],
		info: "Pancakes with jam, sugar and brown cheese!"
	},
	{
		id: "lasagne-id",
		name: "lasagne",
		price: 10,
		allergies: [allergy.GLUTEN],
		info: "Homemade lasagne with aubergine."
	},
	{
		id: "sushi-id",
		name: "sushi",
		price: 25,
		allergies: [allergy.FISH, allergy.SOY],
		info: "Sushi with tuna, salmon and avocado."
	},
	{
		id: "meatballs-id",
		name: "Spicy meatballs",
		price: 15,
		allergies: [allergy.SOY],
		info: "Meatballs with homemade sauce. Optional pasta on the side."
	},
	{
		id: "spagetthi-id",
		name: "Spagetthi",
		price: 10,
		allergies: [allergy.DAIRY, allergy.GLUTEN],
		info: "Spagetthi served with grated parmesan and oregano-sauce."
	},
	{
		id: "cod-id",
		name: "Fried cod with potatoes",
		price: 15,
		allergies: [allergy.FISH],
		info: "Served with vegetables and Béchamel sauce."
	},
	{
		id: "chocolate-id",
		name: "Chocolate cake",
		price: 20,
		allergies: [allergy.DAIRY, allergy.GLUTEN],
		info: "Because every day shouldn't be healthy!"
	},
	{
		id: "onion-id",
		name: "Onion soup",
		price: 10,
		allergies: [],
		info: "Homemade, traditional onion soup."
	},
	{
		id: "chicken-id",
		name: "Grilled chicken",
		price: 20,
		allergies: [],
		info: "Served with rice and boiled vedgetables!"
	},
	{
		id: "pizza-id",
		name: "Pizza",
		price: 20,
		allergies: [allergy.DAIRY, allergy.GLUTEN],
		info: "Various pizzas!"
	}
]; 

const demoMenuItems = [
	{
		dishId: "pizza-id", 
		day: day.MONDAY
	},
	{
		dishId: "chicken-id", 
		day: day.TUESDAY
	},
	{
		dishId: "meatballs-id",
		day: day.WEDNESDAY
	},
	{
		dishId: "cod-id",
		day: day.THURSDAY
	},
	{
		dishId: "lasagne-id",
		day: day.FRIDAY
	},
	{
		dishId: "pancake-id",
		day: day.SATURDAY
	},
	{
		dishId: "chocolate-id",
		day: day.SUNDAY
	}
]; 

const addDemoMenuItems = database => {
	
	demoMenuItems.forEach(menuItem => {
		database.set(menuItem.day, menuItem); 
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