// id - dish 
const dishes = new Map(); 

/**
 * 
 * @param {string} name 
 * @param {number} price 
 * @param {Allergy[]} allergies 
 * @param {string} info  
 */
const create = (name, price, allergies, info) => {

	
};

const retrieve = (id) => {

	return dishes.get(id); 
};

const update = (dish) => {

	const old = dishes.get(dish.id);
	if (!old) throw "cannot update dish that doesn't exist";
    
	dishes.set(dish.id, dish);
};

// NOTE: "delete" is reserved 
const remove = (id) => {

	dishes.delete(id);
};


module.exports = {
	create,
	retrieve, 
	update, 
	remove
};