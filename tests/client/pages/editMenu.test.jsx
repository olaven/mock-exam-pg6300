const React = require("react");
const { shallow, mount, render } = require("enzyme");
const { MemoryRouter } = require("react-router-dom");

const { app } = require("../../../src/server/app");
const { retrieveAll } = require("../../../src/server/database/dishes");
const { EditMenus } = require("../../../src/client/pages/editMenus.jsx");
const { overrideWebSocket, overrideFetch, asyncCheckCondition } = require("../../mytest-utils");




describe("the page for editing menus.", () => {

    beforeAll(() => {

        overrideFetch(app);
    });

    it("renders one select for every day", async () => {

        const wrapper = mount(<EditMenus />); 

        await asyncCheckCondition(() => {
            wrapper.update(); 
            return wrapper.find(".edit-menu-select").length > 0; 
        }, 1000, 100); 

        const selects = wrapper.find(".edit-menu-select"); 
        expect(selects.length).toBe(7);
    })

    //NOTE: Assuming demo data 
    it("fetches every possible dish", async () => {

        const wrapper = mount(<EditMenus />);
        const count = retrieveAll().length; 

        await asyncCheckCondition(() => {
            wrapper.update();
            return wrapper.state().dishes.length > 0
        }, 1000, 100);

        const dishes = wrapper.state().dishes
        expect(dishes.length).toBe(count);
    })
});