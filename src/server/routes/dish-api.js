const express = require("express");

const { code } = require("../../shared/http");
const { isValid } = require("../../shared/validator");
const { createDish, retrieveDish, retrieveAllDishes, updateDish, deleteDish } = require("../database/dishes");

const router = express.Router();


router.get("/dishes", (req, res) => {
	
	//TODO: Filter on stuff wiht query
	res.status(code.OK).send(retrieveAllDishes());
}); 

router.get("/dishes/:id", (req, res) => {

	const id = req.params.id;
	const dish = retrieveDish(id);
	if (!dish) {
		res.status(code.NOT_FOUND).send();
	} else {
		res.status(code.OK).send(dish);
	}
});

router.delete("/dishes/:id", (req, res) => {

	if (!req.user) {
		
		res.status(code.UNAUTHORIZED).send();
		return; 

		//NOTE: If I add check for "this user is a cook", would send code.FORBIDDEN if user is not 
		//https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses#6937030
	}

	const id = req.params.id;
	if (!id) {
		res.status(code.BAD_REQUEST).send();
		return;
	}

	const dish = retrieveDish(id);
	if (!dish) {
		res.status(code.NOT_FOUND).send();
	} else {
		deleteDish(dish.id);
		res.status(code.NO_CONTENT).send(dish);
	}
});

router.post("/dishes", (req, res) => {

	if (!req.user) {
		
		res.status(code.UNAUTHORIZED).send();
		return;
		//NOTE: If I add check for "this user is a cook", would send code.FORBIDDEN if user is not 
		//https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses#6937030
	}

	const dish = req.body;

	const valid = isValid.dish(dish);
	if (!valid) {

		res.status(code.BAD_REQUEST).send();
		return;
	}

	const id = createDish(dish);

	res.header("location", "/api/dishes/" + id);
	res.status(code.CREATED).send({
		id
	});
});

router.put("/dishes/:id", (req, res) => {

	if (!req.user) {

		res.status(code.UNAUTHORIZED).send();
		return;
		//NOTE: If I add check for "this user is a cook", would send code.FORBIDDEN if user is not 
		//https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses#6937030
	} 
	
	const dish = req.body;

	const valid = isValid.dish(dish);
	if (!valid || !dish.id) {

		res.status(code.BAD_REQUEST).send();
		return;
	} 
	
	try {

		updateDish(dish);
		res.status(code.NO_CONTENT).send();
	} catch (error) {

		res.status(code.NOT_FOUND).send(error.message); 
	}
});


module.exports = router;
