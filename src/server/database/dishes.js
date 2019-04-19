const nanoid = require("nanoid");

const { addDemoDishes } = require("./demo.js");

// id - dish 
const dishes = new Map(); 

//TODO: Check if environment is development 
addDemoDishes(dishes); 

/**
 * 
 * @param {string} name 
 * @param {number} price 
 * @param {Allergy[]} allergies 
 * @param {string} info  
 */
const createDish = (dish) => {

	const id = nanoid(); 
	dish.id = id;
    
	/* collision probability similar to UUID v4 (https://github.com/ai/nanoid#normal)
    For these purposes (cantina app), I am going to assume that there is no collision */
	dishes.set(id, dish);
	return id; 
};

const retrieveAllDishes = () => 
	Array.from(dishes.values());

const retrieveDish = (id) => {

	return dishes.get(id); 
};

const updateDish = (dish) => {

	const old = dishes.get(dish.id);
	if (!old) throw "cannot update dish that doesn't exist";
    
	dishes.set(dish.id, dish);
};

const deleteDish = (id) => {

	dishes.delete(id);
};

const clearDishes = () => {

	dishes.clear(); 
};


module.exports = {
	createDish,
	retrieveDish, 
	retrieveAllDishes,
	updateDish, 
	deleteDish, 
	clearDishes,
};

