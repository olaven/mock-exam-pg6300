const { day } = require("../shared/day"); 


const isValid = {

	//TODO: Move if not used in frontend
	dish: dish => {

		if (
			!dish.name ||
            !dish.price ||
            dish.allergies === null || dish.allergies === undefined ||
            !dish.info
		)  return false; 
        
		return true; 
	}, 
	menuItem: menuItem => {

		if (
			!menuItem.dishId ||
			!Object.values(day).includes(menuItem.day)
		) return false;

		return true;
	},
	day: dayValue => {
		return Object.values(day).includes(dayValue);
	}
};

module.exports = {
	isValid
};