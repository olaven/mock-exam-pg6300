// /**
//  * NOTE: This file is partially copied from:
//  * https://github.com/arcuri82/web_development_and_api_design/blob/ad18f9a63c5b62316abaf0644072434e02860d7b/les11/forum/src/server/schema.js
//  */

const { gql } = require("apollo-server-express");

const typeDefs = gql `
    

    type Query{
        
        authenticationError: String
        
        getMenus: [Menu]
    
        getMenuByDay(day: Day!) : Menu
    }

    type Mutation {
        createMenu(day: Day!, dishId: String!): Day
    }

    type Menu {
        day: Day
        dishId: String
    }

    type Dish {
        name: String! 
        info: String!
        price: Int! 
        allergies: [Allergy]
    }

    enum Day {
        MONDAY
        TUESDAY
        WEDNESDAY
        THURSDAY
        FRIDAY
        SATURDAY
        SUNDAY
    }

    enum Allergy {
        NUTS
        FISH
        DAIRY
        SOY
        GLUTEN
    }
`;

module.exports = typeDefs;