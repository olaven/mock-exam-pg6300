const { addDemoMenuItems } = require("./demo"); 
const { isValid } = require("../../shared/validator"); 


/**
 * NOTE: 
 * A menu is the menu for the week. 
 * That is, one dish for every day.
 * Using the day as key prevents multiple menus per day. 
 */

const dishes = require("./dishes"); 
const menu = new Map();

//TODO: Check if environment is development 
addDemoMenuItems(menu);


const persist = (menuItem) => {

	if (!isValid.menuItem(menuItem)) {
		throw "menuItem is invalid";
	}

	if(!dishes.retrieveAll()
		.map(dish => dish.id)
		.includes(menuItem.dishId)) {
		throw "dish is not registered"; 
	}

	menu.set(menuItem.day, menuItem);
	return menuItem.day;
};

const retrieveAll = () =>
	Array.from(menu.values());

const retrieve = day => 
	menu.get(day); 

const update = (menuItem) => {

	menu.set(menuItem.day, menuItem);
};

const remove = day => {

	menu.delete(day);
};

const clear = () => {

	menu.clear();
};


module.exports = {
	persist,
	retrieve,
	retrieveAll,
	update,
	remove,
	clear,
};
