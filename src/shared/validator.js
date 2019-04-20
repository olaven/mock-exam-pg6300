/**
 * Returns true if the object 
 * truthy values for all required 
 * fields. 
 * 
 * NOTE: .id is excluded.
 */
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
			!menuItem.dish ||
			!menuItem.day
		) return false;

		return true;
	}
};

module.exports = {
	isValid
};