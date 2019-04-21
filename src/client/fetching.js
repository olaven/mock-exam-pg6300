/**
 * NOTE: Some of these functions are a bit redundant. 
 * For example, I could just expose 'fetchToJson' and have 
 * the functionality. However, the approach I am taking now 
 * is slightly more readable. 
 * 
 * It is also helpful to have a "single source of truth" for the 
 * api-paths. 
 */

const menus = async () => {

	const menus = await fetchToJson("/api/menus");
	return menus; 
};

const menu = async (day) => {

	const menu = await fetchToJson("/api/menus/" + day); 
	return menu;
};

const dishes = async () => {

	const dishes = await fetchToJson("/api/dishes");
	return dishes;
};

const dish = async (id) => {

	const dish = await fetchToJson("/api/dishes/" + id);
	return dish;
};


const fetchToJson = async (path) => {

	const response = await fetch(path);
	const json = await response.json();

	return json;
};

module.exports = {
	menus, 
	menu, 
	dishes, 
	dish
};