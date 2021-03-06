const { addDemoMenuItems } = require("./demo"); 
const { day } = require("../../shared/day");
const { isValid } = require("../../shared/validator"); 


/**
 * NOTE: 
 * A menu is the menu for the week. 
 * That is, one dish for every day.
 * Using the day as key prevents multiple menus per day. 
 */

const dishes = require("./dishes"); 
const menus = new Map();

// add the days 
Array.from(Object.values(day)).forEach(day => {
	menus.set(day, null);
});

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

const retrieveAll = () => {

	const days = Object.values(day);

	return days.map(d => {
		
		const menu = menus.get(d);
		if (!menu) {
			return {
				dishId: null, 
				day: d 
			};
		} else {
			return menu; 
		}
	});
};
	
const retrieve = day => 
	menus.get(day); 

const update = (menuItem) => {

	menus.set(menuItem.day, menuItem);
	return menuItem;
};

const remove = day => {

	if(!menus.get(day)) {
		return false; 
	}
	menus.delete(day);
	return true; 
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
