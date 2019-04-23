const React = require("react");
const { shallow, mount } = require("enzyme");
const { MemoryRouter } = require("react-router-dom");

const { app } = require("../../../src/server/app");
const { asyncCheckCondition, overrideFetch} = require("../../mytest-utils");
const { Week } = require("../../../src/client/pages/week.jsx");

const getWeek = (props) => {

	const routerWrapper = mount(
		<Week
			{...props} />
		
	);

	return routerWrapper.find(Week);
};

describe("the week-page.", () => {

	beforeAll(() => {
		overrideFetch(app);
	});

	it("renders header", () => {

		const wrapper = getWeek(); 
		expect(wrapper.html().includes("The menu this week")).toBe(true);
	});
    
	it("renders every day of the week", () => {

		const wrapper = getWeek(); 
		const cards = wrapper.find(".menu-card");
		expect(cards.length).toBe(7);
	});
    
	it("fetches menus after rendering", async () => {

		const wrapper = getWeek(); 
		await asyncCheckCondition(() => {
			wrapper.update();
			return !(wrapper.html().includes("Nothing served this day"));
		}, 3000, 100);

		wrapper.html()//? 
		
		//NOTE: assuming that tests are not run in production mode. 
		expect(wrapper.html().includes("Nothing served this day")).toBe(false);
	});

	it("converts menus to a map", async () => {

		const wrapper = getWeek();
		await asyncCheckCondition(() => {
			wrapper.update();
			return (wrapper.state().menus.size > 0); 
		}, 2000, 100);

		expect(wrapper.state().menus.size).toBeGreaterThan(0);
	});
});