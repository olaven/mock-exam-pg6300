const React = require("react");
const { shallow, mount } = require("enzyme");
const { MemoryRouter } = require("react-router-dom");

const { app } = require("../../../src/server/app");
const { Chat } = require("../../../src/client/pages/chat.jsx");
const { overrideWebSocket, overrideFetch, asyncCheckCondition} = require("../../mytest-utils");

const getChat = (props) => {

	const routerWrapper = mount(
		<MemoryRouter>
			<Chat
				{...props} />
		</MemoryRouter>
	);

	return routerWrapper.find(Chat);
};

const sendMessage = (wrapper, message) => {
    
	const input = wrapper.find("#chat-input").at(0);
	const button = wrapper.find("#chat-button").at(0);
	
	input.simulate("change", { target: { value: message } });

	button.simulate("click");
};

let server; 
let port; 

describe("The chat page.", () => {

	beforeAll((done) => {

		server = app.listen(0, () => {
			port = server.address().port;
			done();
		});


		overrideFetch(app);
		overrideWebSocket();
	});

	afterAll(() => {
		server.close(); 
	});

	it("renders some content.", () => {

		const wrapper = getChat({ username: "Fooie"});
		const chat = wrapper.find("#chat").get(0);

		expect(chat).not.toBeUndefined();
	});

	it("chat does not display (initially) when user is logged out", () => {

		const wrapper = getChat({ username: null});
		expect(wrapper.html().includes("id=\"chat\"")).toBe(false);
	});

	it("asks for username of logged out user", () => {

		const wrapper = getChat({ username: null }); 
		expect(wrapper.html().includes("id=\"chat-id-input\"")).toBe(true);
	})

	it("shows chat-input when user is logged in", () => {

		const wrapper = getChat({ username: "fooie" });
		expect(wrapper.html().includes("id=\"chat\"")).toBe(true);
	});

	it("state updates when username is entered", () => {

		const wrapper = getChat({ username: null });
		const username = "updated username"; 

		const input = wrapper.find("#username-text").at(0)
		const button = wrapper.find("#username-button").at(0)

		input.simulate("change", { target: { value: username } });
		button.simulate("click");

		asyncCheckCondition(() => {
			wrapper.update(); 
			return wrapper.state().username === username; 
		});

		expect(wrapper.state().username).toEqual(username);
	})

	it("renders chat when user has ented temporary username", () => {

		const wrapper = getChat({ username: null });
		const username = "updated username";

		const input = wrapper.find("#username-text").at(0)
		const button = wrapper.find("#username-button").at(0)

		input.simulate("change", { target: { value: username } });
		button.simulate("click");

		asyncCheckCondition(() => {
			wrapper.update();
			return wrapper.html().includes("id=\"chat\"")
		});

		expect(wrapper.html().includes("id=\"chat\"")).toEqual(true); 
	})
	// it("shows sent message", async () => {

	// 	const message = "This is an important message!";
	// 	const wrapper = getChat({username: "fooie"});
        
	// 	sendMessage(wrapper, message);
        
	// 	asyncCheckCondition(() => {
	// 		wrapper.update();
	// 		console.log("wrapper updated: ", wrapper.html());
	// 		return wrapper.html().includes(message).toBe(true);
	// 	}, 4000, 100);

	// 	expect(wrapper.html().includes(message)).toBe(true);
	// });
});