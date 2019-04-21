const express = require("express");

const { code } = require("../../shared/http");
const { isValid } = require("../../shared/validator");
const { isAuthenticated } = require("../middleware");
const menus = require("../database/menus");


const router = express.Router();

router.get("/menus", (req, res) => {

	const payload = menus.retrieveAll(); 
	res.status(code.OK).send(payload);
});

router.get("/menus/:day", (req, res) => {

	const day = req.params.day;
	if (!isValid.day(day)) {

		res.status(code.BAD_REQUEST).send(); 
		return; 
	} 


	const menuItem = menus.retrieve(day);
    
	/*
    NOTE: Here, I am saying that the request is valid, 
    even if the item is not defined. In other words, my 
    server does not consider it an error if no meal is 
    served on a given day.
    */
	if (!menuItem) {
        
		res.status(code.OK).send(null); 
	} else {
        
		res.status(code.OK).send(menuItem);
	}
});

router.delete("/menus/:day", isAuthenticated, (req, res) => {

	const day = req.params.day;
	if (!day) {
		res.status(code.BAD_REQUEST).send();
		return;
	}

	const menuItem = menus.retrieve(day);
	if (!day) {
		res.status(code.NOT_FOUND).send();
	} else {
		menus.remove(menuItem.day);
		res.status(code.NO_CONTENT).send(menuItem);
	}
});

router.post("/menus", isAuthenticated, (req, res) => {

	const menuItem = req.body;

	const valid = isValid.menuItem(menuItem);
	if (!valid) {

		res.status(code.BAD_REQUEST).send();
		return;
	}

	const day = menus.persist(menuItem);

	res.header("location", "/api/menus/" + day);
	res.status(code.CREATED).send({
		day
	});
});

router.put("/menus/:day", isAuthenticated, (req, res) => {

	const menuItem = req.body;

	const valid = isValid.dish(menuItem);
	if (!valid) {

		res.status(code.BAD_REQUEST).send();
		return;
	}

	try {

		menus.update(menuItem);
		res.status(code.NO_CONTENT).send();
	} catch (error) {

		res.status(code.NOT_FOUND).send(error.message);
	}
});


module.exports = router;
