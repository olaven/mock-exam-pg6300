const React = require("react");
const { shallow, mount } = require("enzyme");
const { MemoryRouter } = require("react-router-dom");

const { Home } = require("../../../src/client/pages/home.jsx");

const getHome = (props) => {

	const routerWrapper = mount(
		<MemoryRouter>
			<Home
				{...props} />
		</MemoryRouter>
	);

	return routerWrapper.find(Home);
}; 

describe("the home page.", () => {

	it("renders some content.", () => {

		const wrapper = getHome(null); 
		const home = wrapper.find("#home");

		expect(home).not.toBeNull();
	});

	it("only renders one message only", () => {
        
		const wrapper = getHome(null); 
		const messages = wrapper.find(".homeMessage");
		expect(messages.length).toEqual(1);
	});

	it("does not render admin-options when user logged out", () => {

		const wrapper = getHome({
			username: null 
		}); 

		expect(wrapper.html()).not.toContain("Admin options"); 
	});

	it("does render edit when logged in", () => {

		const wrapper = getHome({
			username: "Charlie Banks"
		}); 
		expect(wrapper.html()).toContain("Admin options"); 
	});
});