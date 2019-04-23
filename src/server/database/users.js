const { addDemoUsers } = require("./demo.js");


let users = new Map();

if (process.env.ENVIRONMENT !== "production") {
	addDemoUsers(users);
} else {

	//adding 
	users.set("admin chef", {
		username: "admin chef", 
		password: "kittens"
	}); 
}

const getUser = (username) => {

	return users.get(username);
};

const verifyUser = (username, password) => {

	const user = users.get(username);
	if (!user) return false;
	return user.password === password;
};

const createUser = (username, password) => {

	const exists = users.get(username);

	if (exists) {
		return false;
	}
    
	const user = {
		username: username, 
		password: password 
		//TODO: add more user data 
	};

	users.set(username, user);
	return true;
};

const clearUsers = () => {

	users = new Map();
};

module.exports = {
	getUser,
	verifyUser,
	createUser, 
	clearUsers
};
