const React = require("react");
const { shallow, mount } = require("enzyme");
const { MemoryRouter } = require("react-router-dom");

const { app } = require("../../../src/server/app");
// const  fetching = require("../../../src/client/fetching").default;
const { asyncCheckCondition, overrideFetch } = require("../../mytest-utils");
const { AddDish } = require("../../../src/client/pages/addDish.jsx");

const getAddDish = (props) => 
	mount(<AddDish {...props}/>);

const enterInput = (wrapper, name, price, info, allergies) => {

	const nameInput = wrapper.find("#Name").at(0);
	const priceInput = wrapper.find("#Price").at(0);
    const infoInput = wrapper.find("#Info").at(0);
	//const allergiesInput = wrapper.find("#Allergies").at(0); 

	nameInput.simulate("change", { target: { value: name } });
	priceInput.simulate("change", { target: { value: price } });
    infoInput.simulate("change", { target: { value: info } });
	//allergiesInput.simulate("change", { target: { value: allergies } });
};

const clickButton = (wrapper) => {

    const button = wrapper.find("#add-button").at(0);
    button.simulate("click");
}

describe("the page for adding dishes.", () => {

	beforeAll(() => {
		overrideFetch(app);
	});

	it("button is enabled on valid input", async () => {
        
        const wrapper = getAddDish({ username: "Chewie" }); 
        enterInput(wrapper, "blue millk", 299, "Totally completely ethically sourced from Tatooine.", []); 

        const button = wrapper.find("#add-button").at(0); 
        const disabled = button.props().disabled;
        expect(disabled).not.toBe(true);  
    });
    
    it("has disabled button on invalid input", () => {

        const wrapper = getAddDish({ username: "Leia" });
        enterInput(wrapper, "Braised Shaak Roast", -20, "Bad buisniess, this price is..", []);

        const button = wrapper.find("#add-button").at(0);
        const disabled = button.props().disabled;
        expect(disabled).toBe(true);  
    })
    
	it("renders just one of the buttons", () => {

        const wrapper = getAddDish({ username: "Han Solo" })
        const buttons = wrapper.html().split("#add-button"); 
        expect(buttons.length).toBe(1); 
    });
});