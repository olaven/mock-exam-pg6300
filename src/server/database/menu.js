const { addDemoMenuItems } = require("./demo"); 
const { isValid } = require("../../shared/validator"); 


/**
 * NOTE: 
 * A menu is the menu for the week. 
 * That is, one dish for every day.
 * Using the day as key prevents multiple menus per day. 
 */

const menu = new Map();

//TODO: Check if environment is development 
addDemoMenuItems(menu);


const persist = (menuItem) => {

	if (!isValid.menuItem(menuItem)) {
		throw "invalid menu"; 
	}

	menu.set(menuItem.day, menuItem);
	return menuItem.day;
};

const retrieveAll = () =>
	Array.from(menu.values());

const retrieve = day => 
	menu.get(day); 

const update = (menuItem) => {

	const old = menu.get(menuItem.id);
	if (!old) throw "cannot update menuItem that doesn't exist";

	menu.set(menuItem.id, menuItem);
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
