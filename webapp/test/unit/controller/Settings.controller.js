/*global QUnit*/

sap.ui.define([
	"sap/com/postconsumption/postConsumption/controller/Settings.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Settings Controller");

	QUnit.test("I should test the Settings controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});