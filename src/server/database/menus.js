const { addDemoMenuItems } = require("./demo"); 
const { isValid } = require("../../shared/validator"); 


/**
 * NOTE: 
 * A menu is the menu for the week. 
 * That is, one dish for every day.
 * Using the day as key prevents multiple menus per day. 
 */

const dishes = require("./dishes"); 
const menus = new Map();

if (process.env.ENVIRONMENT !== "production") {
	addDemoMenuItems(menus);
}



const persist = (menuItem) => {

	if (!isValid.menuItem(menuItem)) {
		throw "menuItem is invalid";
	}

	if(!dishes.retrieveAll()
		.map(dish => dish.id)
		.includes(menuItem.dishId)) {
		throw "dish is not registered"; 
	}

	menus.set(menuItem.day, menuItem);
	return menuItem.day;
};

const retrieveAll = () => 
	Array.from(menus.values());
	
const retrieve = day => 
	menus.get(day); 

const update = (menuItem) => {

	menus.set(menuItem.day, menuItem);
};

const remove = day => {

	menus.delete(day);
};

const clear = () => {

	menus.clear();
};


module.exports = {
	persist,
	retrieve,
	retrieveAll,
	update,
	remove,
	clear,
};
