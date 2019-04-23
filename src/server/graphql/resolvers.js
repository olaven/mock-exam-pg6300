/**
 * NOTE: This file is partially copied from: 
 * https://github.com/arcuri82/web_development_and_api_design/blob/ad18f9a63c5b62316abaf0644072434e02860d7b/les11/forum/src/server/resolvers.js
 * 
 * As of now, this graphQL API is just going to mirror 
 * the REST-API in ../routes
 */

const { AuthenticationError } = require("apollo-server-express");

const { day } = require("../../shared/day");
const { allergy } = require("../../shared/allergy");
const menus = require("../database/menus");
const dishes = require("../database/dishes");


module.exports = {

    Day: day,
    
    Allergy: allergy,

	Query: {
		getMenus: (parent, args, context, info) => {
			return menus.retrieveAll(); 
		},
		getMenuByDay: (parent, args, context, info) => {
            return menus.retrieve(day);
		}
	},

	Mutation: {
		createMenu: (parent, args, context, info) => {
			return menus.persist({day: args.day, dishId: args.dishId});
		}
	},

	/*
        When fields in the schema do not match 1-to-1 the fields in our domain models,
        we need to specify how to "resolve" them.
        In our case, types like News, Author and Comment in the schema are objects, ie
        nodes in the GraphQL graph.
        But, in our domain model, those are just ids.
        So, we need to map from id to object.
     */
	/*
        Data: {
            id: (parent, args, context, info) => {
                return data.getById
            },
            message: (parent, args, context, info) => {
                return parent.comments ? parent.comments.length : 0;
            }, 
            checked: (parent, args, context, info) => {

            }
        }
        */
};