/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sap/com/postconsumption/postConsumption/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});