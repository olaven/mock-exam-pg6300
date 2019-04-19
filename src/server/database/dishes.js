const nanoid = require("nanoid");

// id - dish 
const dishes = new Map(); 

/**
 * 
 * @param {string} name 
 * @param {number} price 
 * @param {Allergy[]} allergies 
 * @param {string} info  
 */
const createDish = (name, price, allergies, info) => {

	const id = nanoid(); 
	const dish = {
		id, name, price, allergies, info
	};
    
	/* collision probability similar to UUID v4 (https://github.com/ai/nanoid#normal)
    For these purposes (cantina app), I am going to assume that there is no collision */
	dishes.set(id, dish);
	return id; 
};

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
	updateDish, 
	deleteDish, 
	clearDishes,
};