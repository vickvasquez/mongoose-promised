"use strict";

// run tests using
// npm run test-e2e

// configure chai assertions
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect;
var Q = require("q");

var mongoose = require("./../index.js"); // require('mongoose-promised')
var CustomerModel = require("./../samples/customerModel.js");

describe("mongoose-promised", function() {

	var mongoUrl = "mongodb://localhost:27017/mongoose-promised-test";

	it("Should connect to database", function(){
		return mongoose.connectQ(mongoUrl);
	});

	it("Should add a document", function() {

		var model = new CustomerModel({
			email:"davide.icardi@gmail.com",
			firstName:"Davide",
			lastName:"Icardi"
		});

		var customer = model.saveQ()
			.spread(function (document, numberAffected){
				return document;
			});

		return expect(customer).to.eventually.have.property("_id");
	});

	it("Should find documents", function() {

	  	var results = CustomerModel
		  	.where({email : "davide.icardi@gmail.com"})
		  	.findQ();

		return expect(results).to.eventually.have.property("length", 1);
	});

	it("Should remove a document", function() {

	  	var numberAffected = CustomerModel
		  	.where({email : "davide.icardi@gmail.com"})
		  	.removeQ()
		  	.spread(function (numberAffected, result){
					return numberAffected;
				});

		return expect(numberAffected).to.eventually.equal(1);
	});

});
