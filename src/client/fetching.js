/**
 * NOTE: Some of these functions are a bit redundant. 
 * For example, I could just expose 'fetchToJson' and have 
 * the functionality. However, the approach I am taking now 
 * is slightly more readable. 
 * 
 * It is also helpful to have a "single source of truth" for the 
 * api-paths. 
 */

import { code } from "../shared/http"; 

const get = {

	menus: async () => {

		const menus = await getToJson("/api/menus");
		return menus;
	}, 

	menu: async () => {

		const menus = await getToJson("/api/menus");
		return menus;
	}, 

	dishes: async () => {

		const dishes = await getToJson("/api/dishes/");
		return dishes;
	}, 

	dish: async (id) => {

		const dish = await getToJson("/api/dishes/" + id);
		return dish;
	}
};

const put = {

    menu: async (menu) => {

        const response = await fetch("/api/menus/" + menu.day, {
            method: "put",
            headers: {
                    "Content-Type": "application/json"
                },
            body: JSON.stringify(menu)
        }); 

        if (response.status === code.NO_CONTENT) {
            return true; 
        } 
        return false; 
	},
	
	dish: async (dish) => {

		const response = await fetch("/api/dishes/" + dish.id, {
			method: "put",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(dish)
		});

		if (response.status === code.NO_CONTENT) {
			return true;
		}
		return false;
	}
}

//NOTE: 'delete' is reserved
const del = {

	dish: async (id) => {

		const response = await fetch("/api/dishes/" + id, {
			method: "delete"
		}); 

		if (response.status === code.NO_CONTENT) {
			return true 
		}

		return false; 
	},

	menu: async (day) => {

		const response = await fetch("/api/menus/" + day, {
			method: "delete"
		}); 

		if (response.status === code.NO_CONTENT) {
			return true; 
		}
		return false; 
	}
}

const post = {

	dish: async (dish) => {

		const payload = JSON.stringify(dish);

		const response = await fetch("/api/dishes", {
			method: "post", 
			headers: {
				'Content-Type': 'application/json'
			},
			body: payload
		}); 

		if(response.status === code.CREATED) {
			return true; 
		} 

		return false; 
	}
}


const getToJson = async (path) => {

	const response = await fetch(path);
	const json = await response.json();

	return json;
};

export default { get, put, del, post }