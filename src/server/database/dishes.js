const nanoid = require("nanoid");

const { addDemoDishes } = require("./demo.js");

// id - dish 
const dishes = new Map(); 

if (process.env.ENVIRONMENT !== "production") {
	addDemoDishes(dishes);
}

const persist = (dish) => {

	const id = nanoid(); 
	dish.id = id;
    
	/* collision probability similar to UUID v4 (https://github.com/ai/nanoid#normal)
    For these purposes (cantina app), I am going to assume that there is no collision */
	dishes.set(id, dish);
	return id; 
};

const retrieveAll = () => 
	Array.from(dishes.values());

const retrieve = id => 
	dishes.get(id);

const update = (dish) => {

	const old = dishes.get(dish.id);
	if (!old) throw "cannot update dish that doesn't exist";
    
	dishes.set(dish.id, dish);
};

const remove = (id) => {

	dishes.delete(id);
};

const clear = () => {

	dishes.clear(); 
};


module.exports = {
	persist,
	retrieve, 
	retrieveAll,
	update, 
	remove, 
	clear,
};

