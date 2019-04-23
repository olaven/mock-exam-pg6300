const dishes = require("../../../src/server/database/dishes");
const menus = require("../../../src/server/database/menus");
const { day } = require("../../../src/shared/day");


const getMenuItemOn = day => {

	const allDishes = dishes.retrieveAll(); 
	const dishId = allDishes[Math.floor(Math.random() * allDishes.length)].id; 

	return {
		day, 
		dishId
	};
};

describe("The Menu-database", () => {

	beforeEach(() => {

		menus.clear(); 
	}); 

	it("can persist new menu-item", () => {

		const menuItem = getMenuItemOn(day.MONDAY); 
		menus.persist(menuItem); 

		const retrieved = menus.retrieve(menuItem.day);
        
		expect(retrieved.day).toEqual(day.MONDAY);
		expect(retrieved.dishId).toEqual(menuItem.dishId);  
	});

	it("makes it impossible to have multiple menu-items on same day", () => {

		[
			getMenuItemOn(day.SUNDAY), getMenuItemOn(day.SUNDAY), 
			getMenuItemOn(day.SUNDAY), getMenuItemOn(day.SUNDAY), 
			getMenuItemOn(day.SUNDAY), getMenuItemOn(day.SUNDAY),
		].forEach(menuItem => {
			menus.persist(menuItem); 
		}); 
		
		// NOTE: all days are returned, but only one should be day.SUNDAY 
		const sundays = menus.retrieveAll().filter(menu => menu.day === day.SUNDAY);
		expect(sundays.length).toEqual(1);
	});

	it("can update menu", () => {

		const original = getMenuItemOn(day.SATURDAY); 
		menus.persist(original); 
		expect(menus.retrieve(day.SATURDAY)).toEqual(original); 
		// NOTE: original and updated may (by random chance) be the same.
		// however, in almost all cases, this will test for updates

		const updated = getMenuItemOn(day.SATURDAY);
		menus.update(updated); 
		expect(menus.retrieve(day.SATURDAY)).toEqual(updated); 
	});

	it("throw error if the day is not valid", () => {

		const invalidMenuItem = getMenuItemOn("NOT A DAY"); 
		expect(() => {
			menus.persist(invalidMenuItem);
		}).toThrow("menuItem is invalid");
	});
    
	it("throw dishId is undefined", () => {

		const invalidMenuItem = getMenuItemOn(day.MONDAY);
		invalidMenuItem.dishId = undefined; 

		expect(() => {
			menus.persist(invalidMenuItem);
		}).toThrow("menuItem is invalid");
	});
    
	it("throws error if dishId is not valid", () => {

		const invalidMenuItem = getMenuItemOn(day.SATURDAY);
		invalidMenuItem.dishId = "NOT A DISH"; 
        
		expect(() => {
			menus.persist(invalidMenuItem);
		}).toThrow("dish is not registered");
	}); 

	it("can remove menuItem", () => {

		const menuItem = getMenuItemOn(day.TUESDAY); 
		menus.persist(menuItem); 
		expect(menus.retrieve(day.TUESDAY)).toBeDefined(); 

		menus.remove(day.TUESDAY); 
		expect(menus.retrieve(day.TUESDAY)).not.toBeDefined();
	});
});
