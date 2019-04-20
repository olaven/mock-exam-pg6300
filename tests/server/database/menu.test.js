const dishes = require("../../../src/server/database/dishes");
const menu = require("../../../src/server/database/menu");
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

		menu.clear(); 
	}); 


	it("can persist new menu-item", () => {

		const menuItem = getMenuItemOn(day.MONDAY); 
		menu.persist(menuItem); 

		const retrieved = menu.retrieve(menuItem.day);
        
		expect(retrieved.day).toEqual(day.MONDAY);
		expect(retrieved.dishId).toEqual(menuItem.dishId);  
	});

	it("makes it impossible to have multiple menu-items on same day", () => {

		[
			getMenuItemOn(day.SUNDAY), getMenuItemOn(day.SUNDAY), 
			getMenuItemOn(day.SUNDAY), getMenuItemOn(day.SUNDAY), 
			getMenuItemOn(day.SUNDAY), getMenuItemOn(day.SUNDAY),
		].forEach(menuItem => {
			menu.persist(menuItem); 
		}); 
            
		expect(menu.retrieveAll().length).toEqual(1); 
	});

	it("can update menu", () => {

		const original = getMenuItemOn(day.SATURDAY); 
		menu.persist(original); 
		expect(menu.retrieve(day.SATURDAY)).toEqual(original); 
		// NOTE: original and updated may (by random chance) be the same.
		// however, in almost all cases, this will test for updates

		const updated = getMenuItemOn(day.SATURDAY);
		menu.update(updated); 
		expect(menu.retrieve(day.SATURDAY)).toEqual(updated); 
	});

	it("throw error if the day is not valid", () => {

		const invalidMenuItem = getMenuItemOn("NOT A DAY"); 
		expect(() => {
			menu.persist(invalidMenuItem);
		}).toThrow("menuItem is invalid");
	});
    
	it("throw dishId is undefined", () => {

		const invalidMenuItem = getMenuItemOn(day.MONDAY);
		invalidMenuItem.dishId = undefined; 

		expect(() => {
			menu.persist(invalidMenuItem);
		}).toThrow("menuItem is invalid");
	});
    
	it("throws error if dishId is not valid", () => {

		const invalidMenuItem = getMenuItemOn(day.SATURDAY);
		invalidMenuItem.dishId = "NOT A DISH"; 
        
		expect(() => {
			menu.persist(invalidMenuItem);
		}).toThrow("dish is not registered");
	}); 

	it("can remove menuItem", () => {

		const menuItem = getMenuItemOn(day.TUESDAY); 
		menu.persist(menuItem); 
		expect(menu.retrieve(day.TUESDAY)).toBeDefined(); 

		menu.remove(day.TUESDAY); 
		expect(menu.retrieve(day.TUESDAY)).not.toBeDefined();
	});
});
