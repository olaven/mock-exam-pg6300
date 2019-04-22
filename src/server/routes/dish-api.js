const express = require("express");

const { isAuthenticated } = require("../middleware");
const { code } = require("../../shared/http");
const { isValid } = require("../../shared/validator");
const dishes = require("../database/dishes");
const menus = require("../database/menus");

const router = express.Router();


router.get("/dishes", (req, res) => {
	
	let retrieved = dishes.retrieveAll(); 

	if (req.query.allergies) {

		const allergies = req.query.allergies;

		retrieved = retrieved.filter(dish =>
			dish.allergies.some(allergy =>
				allergies.includes(allergy)
			)
		);
	}
	res.status(code.OK).send(retrieved);
}); 

router.get("/dishes/:id", (req, res) => {

	const id = req.params.id;
	const dish = dishes.retrieve(id);

	if (!dish) {
		res.status(code.NOT_FOUND).send();
	} else {
		res.status(code.OK).send(dish);
	}
});

router.delete("/dishes/:id", isAuthenticated, (req, res) => {


	const id = req.params.id;
	if (!id) {
		res.status(code.BAD_REQUEST).send();
		return;
	}

	const dish = dishes.retrieve(id);
	if (!dish) {
		res.status(code.NOT_FOUND).send();
	} else {
		dishes.remove(dish.id);

		//updating menus that have this dish registered 
		menus.retrieveAll()
			.filter(menu => menu.dishId === id)
			.forEach(menu => {menu.dishId = null;});

		res.status(code.NO_CONTENT).send(dish);
	}
});

router.post("/dishes", isAuthenticated, (req, res) => {


	const dish = req.body;

	const valid = isValid.dish(dish);
	if (!valid) {

		res.status(code.BAD_REQUEST).send();
		return;
	}

	const id = dishes.persist(dish);

	res.header("location", "/api/dishes/" + id);
	res.status(code.CREATED).send({ id });
});

router.put("/dishes/:id", isAuthenticated, (req, res) => {
	
	const dish = req.body;

	const valid = isValid.dish(dish);

	if (dish.id !== req.params.id) {

		res.status(code.CONFLICT).send();
		return;
	}

	if (!valid || !dish.id) {

		res.status(code.BAD_REQUEST).send();
		return;
	} 
	
	try {

		dishes.update(dish);
		res.status(code.NO_CONTENT).send();
	} catch (error) {

		res.status(code.NOT_FOUND).send(error.message); 
	}
});


module.exports = router;
