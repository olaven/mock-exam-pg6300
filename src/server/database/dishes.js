// id - dish 
const dishes = new Map(); 

const create = () => {

	
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