const React = require("react");
const { shallow, mount, render } = require("enzyme");
const { MemoryRouter, Link } = require("react-router-dom");

const { LinkToHome } = require("../../../src/client/components/linkToHome");
const { asyncCheckCondition } = require("../../mytest-utils");



const getLinkToHome = props => {
    
    const routerWrapper = mount(<MemoryRouter>
        <LinkToHome {...props} />
    </MemoryRouter>);

    return routerWrapper.find(LinkToHome);
}

describe("the page for editing menus.", () => {

    it("displays link", () => {

        
        const wrapper = getLinkToHome(); 
        expect(wrapper.html()).toContain("Go back to home."); 
    }); 

    it("can display custom page name", () => {

        const pagename = "My custom page name";
        const wrapper = getLinkToHome({pagename}); 

        expect(wrapper.html()).toContain(pagename);
    }); 
});