const express = require("express");

const { code } = require("../../shared/http");
const { isValid } = require("../../shared/validate");
const { retrieveDish, retrieveAllDishes, updateDish, deleteDish } = require("../database/dishes");

const router = express.Router();


router.get("/dish:id", (req, res) => {

	if (req.param.id) {
        
		const dish = retrieveDish(req.param.id);
		if (!dish) {
			res.status(code.NOT_FOUND).send();
		} else {
			res.status(code.OK).send(dish);
		}
		return; 
	}
    
	res.status(code.OK).send(retrieveAllDishes());   
});

router.delete("/dish:id", (req, res) => {

	if (!req.user) {
		
		res.status(code.UNAUTHORIZED).send();

		//NOTE: If I add check for "this user is a cook", would send code.FORBIDDEN if user is not 
		//https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses#6937030
	} else {

		const dish = retrieveDish(req.param.id);
		if (!dish) {
			res.status(code.NOT_FOUND).send();
		} else {
			deleteDish(dish.id);
			res.status(code.NO_CONTENT).send(dish);
		}
		return;
	}
});

router.post("/dish", (req, res) => {

	const dish = req.body; 
	if (!isValid.dish(dish)) {

		res.status(code.BAD_REQUEST).send();
		return; 
	}

	res.status(code.CREATED).send(); 
});

router.put("/dish", (req, res) => {

	if (!req.user) {

		res.status(code.UNAUTHORIZED).send();
		return;
		//NOTE: If I add check for "this user is a cook", would send code.FORBIDDEN if user is not 
		//https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses#6937030
	} 
	
	const dish = req.param.body;
	
	if (!isValid.dish(dish) || !dish.id) {

		res.status(code.BAD_REQUEST).send();
		return;
	} 
	
	updateDish(dish);
});

router.get;

module.exports = router;
